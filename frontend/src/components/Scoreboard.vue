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
  <div class="score-container">
    <p v-if="userStore.lastScore" class="last-score">
      {{ userStore.lastScore }} СВМ
    </p>
    <ul class="results-list">
      <li v-for="score of userStore.lastScores">{{ score }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.score-container {
  padding: 1rem;
  text-align: right;
}
.last-score {
  font-size: 40px;
  margin-bottom: 1rem;
}

.results-list {
  list-style: none;

  background: -webkit-linear-gradient(#aaa, #333);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
