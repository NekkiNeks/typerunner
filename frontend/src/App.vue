<script setup lang="ts">
import Typer from "./components/Typer.vue";
import Scoreboard from "./components/Scoreboard.vue";
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";
</script>

<template>
  <Navbar />
  <router-view></router-view>
</template>

<style scoped></style>
