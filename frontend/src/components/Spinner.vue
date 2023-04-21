<script setup lang="ts"></script>

<template>
  <img class="icon" src="/spinner.svg" />
</template>

<style scoped>
.icon {
  animation-name: spin;
  animation-duration: 600ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
