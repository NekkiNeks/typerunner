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
      const data = await api.post<loginResponse>("/auth/login", {
        login,
        password,
      });

      this.login = data.user.login;
      this.id = data.user.id;
      localStorage.setItem("token", data.token);
      this.logged = true;
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
    },

    aLogout() {
      this.id = null;
      this.login = null;
      this.logged = false;
      localStorage.removeItem("token");
    },
  },
});
