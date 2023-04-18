<script setup lang="ts">
import { GlobalEvents } from "vue-global-events";
import { useScoreStore } from "../store/scoreStore";
import { ref, onMounted, watch } from "vue";

import Spinner from "./Spinner.vue";
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
const error = ref<string | null>(null);

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
  error.value = null;
  loading.value = true;
  try {
    const data = await getTextFromDatabase();
    text.value = data;
  } catch (err: any) {
    error.value = "Ошибка при получении текста с сервера.";
  } finally {
    loading.value = false;
  }
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
  fetchText();
});
</script>

<template>
  <div v-if="loading" class="loader">
    <Spinner />
  </div>

  <div v-else-if="error" class="error">
    <p>{{ error }}</p>
    <button @click="fetchText()">Попробовать снова</button>
  </div>

  <div v-else>
    <div class="input">
      <GlobalEvents
        @keypress="handleInput($event)"
        @keydown.esc="resetInput()"
      />

      <div class="statistics-container">
        <div class="time">Время: {{ (time / 1000).toFixed(1) }} c.</div>
        <div class="average">{{ average.toFixed() }} символов в минуту</div>
      </div>

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
  margin: auto;
  width: 80%;
  text-align: center;
  font-family: monospace;
  line-height: 1.5;
  font-size: 26px;
}

.statistics-container {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
}

.typed {
  color: #444;
}

.cursor {
  text-decoration: underline;
}

.error {
  font-size: 20px;
  text-align: center;

  button {
    font-size: 20px;
  }
}
</style>
