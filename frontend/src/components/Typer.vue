<script setup lang="ts">
import { GlobalEvents } from "vue-global-events";
import { useScoreStore } from "../store/scoreStore";
import { ref, reactive, onMounted, watch } from "vue";

import Spinner from "./Spinner.vue";
import { MdTimetoleave } from "oh-vue-icons/icons";

const { updateScore } = useScoreStore();

async function getTextFromDatabase() {
  const result = await new Promise<string>((r) => {
    const text = "Повседневная практика.";
    setTimeout(() => r(text), 1000);
  });
  return result;
}

async function sendResultToDatabase(score: number) {
  try {
    await new Promise<void>((r) => {
      setTimeout(() => r(), 1000);
    });
    updateScore(score);
  } catch (err: any) {
    console.log("send result to database error", err.message);
  }
}

// class Text {
//   value: string | null = null;
//   typed: string[] = [];
//   buffer: string = "";

//   async updateText() {
//     this.value = null;
//     this.typed = [];
//     this.value = await getTextFromDatabase();
//     this.buffer = this.value;
//   }

//   input(letter: string) {
//     if (this.value && this.value[0] === letter) {
//       this.typed.push(this.value[0]);
//       this.value = this.value.slice(1);
//     }
//   }

//   reset() {
//     this.typed = [];
//     this.value = this.buffer;
//   }
// }

// class Timer {
//   value: number;
//   interval: any;

//   constructor() {
//     this.value = 0;
//   }

//   start() {
//     this.value += 100;
//     this.interval = setInterval(() => (this.value += 100), 100);
//   }

//   reset() {
//     clearInterval(this.interval);
//     this.value = 0;
//   }

//   getAverage(typedLength: number) {
//     return (typedLength / this.value) * 60000;
//   }
// }

// class Typer {
//   public text: Text;
//   public timer: Timer;
//   public average = 0;
//   public active = false;
//   public loading = false;
//   public ready = false;

//   constructor() {
//     this.text = reactive(new Text()); // Иначе не работает ререндер при обновлении свойств
//     this.timer = new Timer();
//     this.text.updateText();
//   }

// handleInput(event: KeyboardEvent) {
//   if (!this.text.value)
//     throw new Error("Попытка обработать не полученный текст!");
//   if (!this.active) this.start();
//   this.text.input(event.key);
//   this.average = this.timer.getAverage(this.text.typed.length);
//   if (this.text.value.length < 1) this.submit();
// }

//   start() {
//     this.active = true;
//     this.timer.start();
//   }

//   async submit() {
//     this.loading = true;
//     this.timer.reset();
//     await sendResultToDatabase(Math.floor(this.average));
//     await this.text.updateText();
//     this.average = 0;
//     this.active = false;
//     this.loading = false;
//   }

//   reset() {
//     this.active = false;
//     this.average = 0;
//     this.timer.reset();
//     this.text.reset();
//   }
// }

// const typer = ref(new Typer());

// Refs
const time = ref(0);
const text = ref("");
const loading = ref(false);
const inputCounter = ref(0);
const average = ref(0);

// watch(inputCounter, (newValue) => {
//   average.value = newValue ? (newValue / time.value) * 60000 : 0;
// });
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

      time: {{ time }} <br />
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
