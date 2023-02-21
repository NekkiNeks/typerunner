<script setup lang="ts">
import { GlobalEvents } from "vue-global-events";
import { useScoreStore } from "../store/scoreStore";
import { ref, reactive } from "vue";

import Spinner from "./Spinner.vue";

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

class Text {
  value: string | null = null;
  typed: string[] = [];
  buffer: string = "";

  async updateText() {
    this.value = null;
    this.typed = [];
    this.value = await getTextFromDatabase();
    this.buffer = this.value;
  }

  input(letter: string) {
    if (this.value && this.value[0] === letter) {
      this.typed.push(this.value[0]);
      this.value = this.value.slice(1);
    }
  }

  reset() {
    this.typed = [];
    this.value = this.buffer;
  }
}

class Timer {
  value: number;
  interval: any;

  constructor() {
    this.value = 0;
  }

  start() {
    this.value += 100;
    this.interval = setInterval(() => (this.value += 100), 100);
  }

  reset() {
    clearInterval(this.interval);
    this.value = 0;
  }

  getAverage(typedLength: number) {
    return (typedLength / this.value) * 60000;
  }
}

class Typer {
  public text: Text;
  public timer: Timer;
  public average = 0;
  public active = false;
  public loading = false;
  public ready = false;

  constructor() {
    this.text = reactive(new Text()); // Иначе не работает ререндер при обновлении свойств
    this.timer = new Timer();
    this.text.updateText();
  }

  handleInput(event: KeyboardEvent) {
    if (!this.text.value)
      throw new Error("Попытка обработать не полученный текст!");
    if (!this.active) this.start();
    this.text.input(event.key);
    this.average = this.timer.getAverage(this.text.typed.length);
    if (this.text.value.length < 1) this.submit();
  }

  start() {
    this.active = true;
    this.timer.start();
  }

  async submit() {
    this.loading = true;
    this.timer.reset();
    await sendResultToDatabase(Math.floor(this.average));
    await this.text.updateText();
    this.average = 0;
    this.active = false;
    this.loading = false;
  }

  reset() {
    this.active = false;
    this.average = 0;
    this.timer.reset();
    this.text.reset();
  }
}

const typer = ref(new Typer());
</script>

<template>
  <div class="typer" v-if="!typer.loading">
    <GlobalEvents
      @keypress="typer.handleInput($event)"
      @keydown.esc="typer.reset()"
    />
    <div class="timer">
      <v-icon name="md-timer-outlined" />
      {{ typer.timer.value / 1000 }} c.
    </div>
    <h2>{{ typer.average.toFixed() }} символов/минуту</h2>
    <div class="input" v-if="typer.text.value">
      <span class="typed" v-for="letter of typer.text.typed">{{ letter }}</span>
      <span class="untyped" v-for="letter of typer.text.value">{{
        letter
      }}</span>
    </div>

    <div v-else><Spinner /> Получаем новый текст...</div>
  </div>
  <div v-else><Spinner /> Отправляем результат...</div>
</template>

<style scoped>
.input {
  font-family: monospace;
  line-height: 1.5;
  font-size: 26px;
}

.typed {
  color: #444;
}

.input .untyped:nth-child(1) {
  text-decoration: underline;
}
</style>
