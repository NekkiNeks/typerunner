<script setup lang="ts">
import Typer from "../components/Typer.vue";
import Scoreboard from "../components/Scoreboard.vue";
</script>

<template>
  <div class="scoreboard">
    <Scoreboard />
  </div>
  <div class="container">
    <Typer />
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scoreboard {
  top: 0;
  right: 0;
  z-index: 10;
  position: absolute;
}
</style>
