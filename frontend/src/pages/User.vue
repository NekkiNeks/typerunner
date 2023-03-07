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
  <h1>@{{ userStore.login }}</h1>
  <p>userdata:</p>
  <pre>
    {{ JSON.stringify(userStore) }}
  </pre>
  <button @click="logout">Выйти</button>
</template>
