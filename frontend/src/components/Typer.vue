<script setup lang="ts">
import { GlobalEvents } from "vue-global-events";
import { useScoreStore } from "../store/scoreStore";
import { ref, reactive, onMounted, watch } from "vue";

import Spinner from "./Spinner.vue";
import { MdTimetoleave } from "oh-vue-icons/icons";
import api from "../helpers/api";

const scoreStore = useScoreStore();

async function getTextFromDatabase() {
  const result = await api.get("/text");
  return result;
}

async function sendResultToDatabase(score: number) {
  try {
    const floorScore = Math.floor(score);
    await scoreStore.aAdd(floorScore);
  } catch (err: any) {
    console.log("send result to database error", err.message);
  }
}

// Refs
const time = ref(0);
const text = ref("");
const loading = ref(false);
const inputCounter = ref(0);
const average = ref(0);

watch(time, (newValue) => {
  average.value = newValue ? (inputCounter.value / newValue) * 60000 : 0;
});

// timer
let interval: ReturnType<typeof setInterval> | null = null;

function startTimer() {
  time.value = 100;
  interval = setInterval(() => (time.value += 100), 100);
}

function stopTimer() {
  if (interval) {
    time.value = 0;
    clearInterval(interval);
  }
}

// typer
async function fetchText() {
  const data = await getTextFromDatabase();
  text.value = data;
}

async function submitResults() {
  loading.value = true;
  await sendResultToDatabase(average.value);
  await fetchText();
  resetInput();
  loading.value = false;
}

function handleInput(event: KeyboardEvent) {
  if (time.value === 0) startTimer();

  if (event.key === text.value[inputCounter.value]) {
    inputCounter.value++;
  }

  if (inputCounter.value === text.value.length) {
    submitResults();
  }
}

function resetInput() {
  inputCounter.value = 0;
  stopTimer();
}

onMounted(() => {
  loading.value = true;
  fetchText().then(() => (loading.value = false));
});
</script>

<template>
  <div v-if="loading" class="loader">loading...</div>

  <div v-else>
    <div class="input">
      <GlobalEvents
        @keypress="handleInput($event)"
        @keydown.esc="resetInput()"
      />

      time: {{ (time / 1000).toFixed(1) }} <br />
      avg: {{ average.toFixed() }} <br />

      <span
        v-for="(letter, index) in text"
        :class="{
          typed: index < inputCounter,
          untyped: index > inputCounter,
          cursor: index === inputCounter,
        }"
        >{{ letter }}</span
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.input {
  font-family: monospace;
  line-height: 1.5;
  font-size: 26px;
}

.typed {
  color: #444;
}

.cursor {
  text-decoration: underline;
}
</style>
