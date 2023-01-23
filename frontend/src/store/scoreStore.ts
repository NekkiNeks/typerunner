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
        const response = await api.post("/add", { userResult: score });
        if (!response.success) throw new Error(response.message);
        console.log(`ID: ${userStore.id} отпрален на сервер`);
      }
      this.lastScore = score;
      this.allScores.push(score);
    },
  },
});
