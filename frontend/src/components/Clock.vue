<script setup lang="ts">
import { ref } from "vue";

const ONE_MINUTE = 60000;

function getTime(): string {
  const date = new Date();
  return Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

let time = ref(getTime());

setInterval(() => (time.value = getTime()), ONE_MINUTE);
</script>

<template>
  <div class="clock-container">
    <p>{{ time }}</p>
  </div>
</template>

<style>
.clock-container {
  font-size: 40px;
  padding: 1rem;
}
</style>
