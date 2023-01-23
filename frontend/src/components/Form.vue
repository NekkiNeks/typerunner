<script setup lang="ts">
import { reactive, ref } from "vue";
import { Form, Field, useField } from "vee-validate";
import { useUserStore } from "../store/userStore";
import Spinner from "./Spinner.vue";

import { router } from "../router";

const { aLogin, aRegister } = useUserStore();
const props = defineProps<{ registration?: boolean }>();
const loading = ref(false);
const error = ref("");

const rules = {
  isRequired: (value: any) => {
    return value ? true : "Поле обязательно для заполнения";
  },
};

const fields = reactive({
  login: useField("login", rules.isRequired),
  password: useField("password", rules.isRequired),
  email: props.registration ? useField("email", rules.isRequired) : null,
});

async function handleSubmit(e: any) {
  loading.value = true;
  error.value = "";

  try {
    if (props.registration) {
      await aRegister(e.login, e.password, e.email);
      console.log("Регистрация выполнена");
      router.push({ path: "/user" });
    } else {
      await aLogin(e.login, e.password);
      console.log("Вход выполнен");
      router.push({ path: "/user" });
    }
  } catch (err: any) {
    console.error(err.message);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div v-if="!loading" class="form-container">
    <div v-if="error" class="error-container">
      {{ error }}
    </div>
    <Form @submit="handleSubmit" autocomplete="off">
      <div class="email-container" v-if="fields.email">
        <Field
          :class="{ invalid: fields.email.errorMessage }"
          name="email"
          placeholder="Почтовый ящик"
          v-model="fields.email.value"
        />
      </div>
      <div class="login-container">
        <Field
          :class="{ invalid: fields.login.errorMessage }"
          name="login"
          placeholder="Логин"
          v-model="fields.login.value"
        />
        <span class="error">{{ fields.login.errorMessage }}</span>
      </div>
      <div class="password-container">
        <Field
          :class="{ invalid: fields.password.errorMessage }"
          name="password"
          type="password"
          placeholder="Пароль"
          v-model="fields.password.value"
        />
        <span class="error">{{ fields.password.errorMessage }}</span>
      </div>

      <button class="submit">-></button>
    </Form>
  </div>
  <div v-else class="loading-container">
    <Spinner />
  </div>
</template>

<style scoped lang="scss">
form {
  display: inline-block;
}

input {
  font-size: 40px;
  font-family: monospace;
  background-color: inherit;
  border: none;
  border-bottom: 3px solid #888;
  color: inherit;
  outline: none;

  &:focus {
    border-bottom-color: #fff;
  }

  &.invalid {
    border-bottom-color: rgb(190, 50, 50);
  }
}

button {
  font-size: 40px;
  background-color: inherit;
  border: none;
  color: #888;
  font-family: monospace;
  outline: none;

  &:hover,
  &:focus {
    color: #fff;
  }
}

.error-container {
  color: rgb(190, 50, 50);
}

.error {
  color: rgb(190, 50, 50);
  font-size: 14px;
  font-family: monospace;

  &:hover::before {
    content: "test";
  }
}
</style>
