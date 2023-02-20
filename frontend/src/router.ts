import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./store/userStore";

//components
import Home from "./pages/Home.vue";
import Leaderboard from "./pages/Leaderboard.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import User from "./pages/User.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/scores", component: Leaderboard },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/user", component: User },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const { logged, aVerificateByToken } = useUserStore();

  const token = localStorage.getItem("token");
  if (!logged && token) {
    try {
      await aVerificateByToken(token);
    } catch (err: any) {
      console.log("Ошибка аутентификации по токену.");
      localStorage.removeItem("token");
    }
  }

  // Если юзер не залогинен, то он не может перейти на страницу юзера
  if (!logged && to.path === "/user") {
    return { path: "/login" };
  }

  if (logged && (to.path === "/login" || to.path === "/register")) {
    return { path: "/" };
  }
});

export { router };
