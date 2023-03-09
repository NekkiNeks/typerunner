<script setup lang="ts">
import { useUserStore } from "../store/userStore";
import { router } from "../router";
const userStore = useUserStore();

function logout() {
  userStore.aLogout();
  router.push({ path: "/login" });
}

console.log(userStore);
</script>

<template>
  <div class="user-container">
    <h1>@{{ userStore.login }}</h1>
    <button @click="logout">Выйти</button>
  </div>
</template>

<style scoped lang="scss">
.user-container {
  display: flex;
  flex-direction: column;
}
</style>
