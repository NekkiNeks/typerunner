import { defineStore } from "pinia";
import api from "../helpers/api";

type iState = {
  id: string | null;
  login: string | null;
  logged: boolean;
};

type loginResponse = {
  user: {
    id: string;
    login: string;
  };
  token: string;
};

export const useUserStore = defineStore("user", {
  state: (): iState => ({ id: null, login: null, logged: false }),

  actions: {
    async aLogin(login: string, password: string) {
      const response = await api.post<loginResponse>("/auth/login", {
        login,
        password,
      });
      if (!response.success)
        throw new Error(`Ошибка при логине: ${response.message}`);
      this.login = response.data.user.login;
      this.id = response.data.user.id;
      localStorage.setItem("token", response.data.token);
      this.logged = true;
    },
    async aRegister(login: string, password: string, email: string) {
      const response = await api.post<loginResponse>("/auth/register", {
        login,
        password,
        email,
      });
      if (!response.success)
        throw new Error(`Ошибка при регистрации: ${response.message}`);
      this.login = response.data.user.login;
      this.id = response.data.user.id;
      localStorage.setItem("token", response.data.token);
      this.logged = true;
    },

    async aVerificateByToken(token: string) {
      const response = await api.post<loginResponse>("/auth/token", {});
      if (!response.success)
        throw new Error(`Ошибка при верификации: ${response.message}`);
      this.login = response.data.user.login;
      this.id = response.data.user.id;
      this.logged = true;
    },

    aLogout() {
      this.id = null;
      this.login = null;
      this.logged = false;
      localStorage.removeItem("token");
    },
  },
});
