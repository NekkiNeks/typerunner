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
  <p>this is userpage {{ userStore.login }}</p>
  <button @click="logout">Выйти</button>
</template>
