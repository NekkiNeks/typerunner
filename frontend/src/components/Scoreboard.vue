<script setup lang="ts">
import { useScoreStore } from "../store/scoreStore";

const { lastScore, allScores } = useScoreStore();
</script>

<template>
  <p v-if="lastScore">Последний результат: {{ lastScore }}</p>
  <ul>
    <li v-for="score of allScores">{{ score }}</li>
  </ul>
</template>

<style></style>
