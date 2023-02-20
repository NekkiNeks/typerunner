import { defineStore } from "pinia";
import api from "../helpers/api";
import { useUserStore } from "./userStore";

type iState = {
  lastScore: null | number;
  allScores: number[];
};

export const useScoreStore = defineStore("score", {
  state: (): iState => ({ lastScore: null, allScores: [] }),

  actions: {
    async updateScore(score: number) {
      const userStore = useUserStore();
      if (userStore.logged) {
        const data = await api.post("/result/add", { result: score });
        console.log(data, " отправлен на сервер");
      }
      this.lastScore = score;
      this.allScores.push(score);
    },
  },
});
