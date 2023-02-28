import { defineStore } from "pinia";
import api from "../helpers/api";
import { useUserStore } from "./userStore";

type Result = {
  id: string;
  value: number;
};

type iState = {
  lastScore: null | number;
  allScores: number[];
};

export const useScoreStore = defineStore("score", {
  state: (): iState => ({ lastScore: null, allScores: [] }),

  actions: {
    async aUpdateScore() {
      const userStore = useUserStore();
      if (userStore.logged) {
        const scores = await api.get(`/result/${userStore.id}`);
        this.allScores = scores.map((item: Result) => item.value);
      }
    },
    async aAdd(score: number) {
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
