<script setup lang="ts">
import Typer from "../components/Typer.vue";
import Scoreboard from "../components/Scoreboard.vue";
import Icons from "../components/Icons.vue";
import Clock from "../components/Clock.vue";
</script>

<template>
  <div class="clock">
    <Clock />
  </div>

  <div class="scoreboard">
    <Scoreboard />
  </div>
  <div class="container">
    <Typer />
  </div>

  <div class="icons"><Icons /></div>
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

.clock {
  position: absolute;
  top: 0;
  left: 0;
  display: none;

  @media all and (display-mode: fullscreen) {
    & {
      display: block;
    }
  }
}

.scoreboard {
  top: 0;
  right: 0;
  z-index: 10;
  position: absolute;
}

.icons {
  position: absolute;
  bottom: 50px;
}
</style>
