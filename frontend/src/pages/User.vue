<script setup lang="ts">
import { useUserStore } from "../store/userStore";
import { router } from "../router";
const userStore = useUserStore();

function logout() {
  userStore.aLogout();
  router.push({ path: "/login" });
}

console.log(userStore.info);
</script>

<template>
  <div class="user-container">
    <h1>
      @{{ userStore.login }}
      <span v-if="userStore.info.verified" title="Подтверждено!">👌</span>
    </h1>
    <button @click="logout">Выйти</button>
  </div>
</template>

<style scoped lang="scss">
.user-container {
  display: flex;
  flex-direction: column;
}

button {
  font-size: 20px;
}
</style>
