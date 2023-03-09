<script setup lang="ts"></script>

<template>
  <v-icon class="icon" name="pr-spinner" scale="3" />
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
