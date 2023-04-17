<script setup lang="ts">
import { useUserStore } from "../store/userStore";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { login, logged } = storeToRefs(userStore);
</script>

<template>
  <header class="navbar-container">
    <p class="logo">🌪️⌨️ TYPERUNNER</p>
    <nav class="nav">
      <router-link to="/">/Главная</router-link>
      <router-link to="/scores">/Таблица лидеров</router-link>
      <template v-if="logged">
        <router-link to="/user">@{{ login }}</router-link>
      </template>

      <template v-else>
        <router-link to="/login">/Логин</router-link>
        <router-link to="/register">/Регистрация</router-link>
      </template>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.navbar-container {
  background-color: #222;
  padding: 1rem;
  margin-top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

nav {
  display: flex;

  a {
    margin-left: 1rem;
    color: #eee;
  }
}

.logo {
  margin: 0;
  font-size: 20px;
}

@media all and (display-mode: fullscreen) {
  .navbar-container {
    display: none;
  }
}
</style>
