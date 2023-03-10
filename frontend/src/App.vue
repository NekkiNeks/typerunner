<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <notifications
    position="bottom center"
    width="60%"
    classes="custom-notification"
  />
  <div class="wrapper">
    <Navbar />
    <main>
      <router-view></router-view>
    </main>
    <a href="https://github.com/nekkineks/typerunner" class="gitlink">
      <v-icon class="icon" name="la-github" scale="2" fill="#242424" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.gitlink {
  background-color: #e2e2e2;
  transform: translate(-50%, 50%) rotate(-135deg);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 120px;
  height: 120px;
  overflow: hidden;
  color: black;

  .icon {
    position: absolute;
    bottom: 8px;
    left: 43px;
    transform: rotate(135deg);
  }
}

main {
  padding: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
