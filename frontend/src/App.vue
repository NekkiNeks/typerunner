<script setup lang="ts">
import Typer from "./components/Typer.vue";
import Scoreboard from "./components/Scoreboard.vue";
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";
</script>

<template>
  <notifications />
  <Navbar />
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
main {
  padding: 1rem;
}
</style>
