import { defineStore } from "pinia";
import api from "../helpers/api";
import { useUserStore } from "./userStore";

type Result = {
  id: string;
  value: number;
};

type iState = {
  allScores: number[];
};

export const useScoreStore = defineStore("score", {
  state: (): iState => ({ allScores: [] }),

  actions: {
    async aUpdateScore() {
      const userStore = useUserStore();
      if (userStore.logged) {
        const scores = await api.get(`/result/last`);
        this.allScores = scores.map((item: Result) => item.value);
      }
    },
    async aAdd(score: number) {
      const userStore = useUserStore();
      if (userStore.logged) {
        const data = await api.post("/result/add", { result: score });
        console.log(data, " отправлен на сервер");
      }
      this.allScores.push(score);
      if (this.allScores.length > 10) this.allScores.shift();
    },
  },
  getters: {
    lastScores(state) {
      return state.allScores.slice(0, state.allScores.length - 1).reverse();
    },
    lastScore(state) {
      const lastIndex = state.allScores.length - 1;
      return state.allScores[lastIndex];
    },
  },
});
