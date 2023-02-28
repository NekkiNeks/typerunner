<script setup lang="ts">
import { useScoreStore } from "../store/scoreStore";
import { onMounted, ref } from "vue";

const userStore = useScoreStore();
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    await userStore.aUpdateScore();
  } catch (err: any) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);
</script>

<template>
  <p v-if="userStore.lastScore">
    Последний результат: {{ userStore.lastScore }}
  </p>
  <ul>
    <li v-for="score of userStore.allScores">{{ score }}</li>
  </ul>
</template>

<style></style>
