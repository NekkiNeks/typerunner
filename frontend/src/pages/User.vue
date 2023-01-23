<script setup lang="ts">
import { useUserStore } from "../store/userStore";
import { router } from "../router";
const { aLogout } = useUserStore();

function logout() {
  aLogout();
  router.push({ path: "/login" });
}
</script>

<template>
  this is userpage
  <button @click="logout">Выйти</button>
</template>
