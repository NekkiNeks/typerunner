<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <notifications />
  <div class="wrapper">
    <Navbar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
}

main {
  padding: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
