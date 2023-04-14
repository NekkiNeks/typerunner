<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import Spinner from "../components/Spinner.vue";
import api from "../helpers/api";
import { ClientError, ServerError } from "../helpers/Errors";
import { useUserStore } from "../store/userStore";
import dayjs from "../helpers/dayjs";

type Result = {
  value: number;
  user: {
    login: string;
  };
  created_at: string;
};

const userStore = useUserStore();
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
  <div v-if="loading">
    <Spinner />
  </div>

  <div v-else class="container">
    <div v-for="result in results">
      <div class="result">
        <p>
          @{{ result.user.login }}
          {{ result.user.login === userStore.login ? "(Это вы)" : "" }} -
          {{ result.value }} СВМ Дата:
          {{ dayjs(result.created_at).fromNow() }}
        </p>
      </div>
    </div>

    <div class="paginator">
      <button @click="prevPage()">{{ "<-" }}</button>
      {{ page }}
      <button @click="nextPage()">{{ "->" }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}

.result {
  width: 100%;
  background-color: #343434;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
button {
  font-size: 20px;
}
</style>
