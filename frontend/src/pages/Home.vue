<script setup lang="ts">
import Typer from "../components/Typer.vue";
import Scoreboard from "../components/Scoreboard.vue";
</script>

<template>
  <div class="container">
    <!-- <Scoreboard /> -->
    <Typer />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
