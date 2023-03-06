<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import api from "../helpers/api";
import { ClientError, ServerError } from "../helpers/Errors";

type Result = {
  value: number;
  user: {
    login: string;
  };
};

const loading = ref(false);
const error = ref<string | null>(null);
const results = ref<Result[]>([]);
const page = ref(1);

async function prevPage() {
  if (page.value > 1) {
    page.value = page.value - 1;
    fetchData();
  }
}
async function nextPage() {
  if (page.value < 10) {
    page.value = page.value + 1;
    fetchData();
  }
}

async function fetchData() {
  try {
    error.value = null;
    loading.value = true;
    const data = await api.get(`/result/best?page=${page.value}&per_page=10`);
    console.log(data);
    results.value = data;
    loading.value = false;
  } catch (err) {
    if (err instanceof ClientError) error.value = err.message;
    if (err instanceof ServerError) {
      console.error(err.message);
      error.value = "Ошибка соединения с сервером";
    }
    console.log(err);
  }
}

onMounted(() => fetchData());
</script>
<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loading">Loading</div>

  <div v-else v-for="result in results">
    <div>
      <pre>{{ JSON.stringify(result.user, null) }}</pre>
      <p>{{ result.user.login }} - {{ result.value }}</p>
    </div>
  </div>

  <div class="paginator">
    <button @click="prevPage()">prev</button>
    {{ page }}
    <button @click="nextPage()">next</button>
  </div>
</template>
