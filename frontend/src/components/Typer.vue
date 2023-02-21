<script setup lang="ts">
import { GlobalEvents } from "vue-global-events";
import { useScoreStore } from "../store/scoreStore";
import { ref, reactive, onMounted, watch } from "vue";

import Spinner from "./Spinner.vue";
import { MdTimetoleave } from "oh-vue-icons/icons";

const scoreStore = useScoreStore();

async function getTextFromDatabase() {
  const result = await new Promise<string>((r) => {
    const text = "Повседневная практика.";
    setTimeout(() => r(text), 1000);
  });
  return result;
}

async function sendResultToDatabase(score: number) {
  try {
    await scoreStore.add(score);
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

  if (inputCounter.value === text.value.length - 1) {
    submitResults();
  }

  if (event.key === text.value[inputCounter.value]) {
    inputCounter.value++;
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

<!-- <template>
  <div class="typer" v-if="!typer.loading">
    <GlobalEvents
      @keypress="typer.handleInput($event)"
      @keydown.esc="typer.reset()"
    />
    {{ text }}
    <div class="timer">
      <v-icon name="md-timer-outlined" />
      {{ typer.timer.value / 1000 }} c.
    </div>
    <h2>{{ typer.average.toFixed() }} символов/минуту</h2>
    <div class="input" v-if="typer.text.value">
      <div>
        <span
          v-for="(letter, index) in text"
          :class="{
            typed: index < typer.text.typed.length,
            untyped: index > typer.text.typed.length,
            cursor: index === typer.text.typed.length,
          }"
          >{{ letter }}</span
        >
      </div>
    </div>
  </div>
  <div v-else><Spinner /> Получаем новый текст...</div>

  <div v-else><Spinner /> Отправляем результат...</div>
</template> -->

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
