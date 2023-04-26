import { defineStore } from "pinia";
import api from "../helpers/api";
import { useScoreStore } from "./scoreStore";

type iState = {
  id: string | null;
  login: string | null;
  logged: boolean;
  info: Record<string, any>;
};

type loginResponse = {
  user: {
    id: string;
    login: string;
    verified: boolean;
  };
  token: string;
};

export const useUserStore = defineStore("user", {
  state: (): iState => ({ id: null, login: null, logged: false, info: {} }),

  actions: {
    async aLogin(login: string, password: string) {
      const data = await api.post<loginResponse>("/auth/login", {
        login,
        password,
      });

      this.login = data.user.login;
      this.id = data.user.id;
      localStorage.setItem("token", data.token);
      this.logged = true;
      this.info.verified = data.user.verified;
    },
    async aRegister(login: string, password: string, email: string) {
      const data = await api.post<loginResponse>("/auth/register", {
        login,
        password,
        email,
      });
      this.login = data.user.login;
      this.id = data.user.id;
      localStorage.setItem("token", data.token);
      this.logged = true;
    },

    async aVerificateByToken() {
      const data = await api.post<loginResponse>("/auth/token", {});
      this.login = data.user.login;
      this.id = data.user.id;
      this.logged = true;
      this.info.verified = data.user.verified;
    },

    aLogout() {
      const scoreStore = useScoreStore();
      this.id = null;
      this.login = null;
      this.logged = false;
      this.info = {};
      scoreStore.$reset();

      localStorage.removeItem("token");
    },
  },
});
