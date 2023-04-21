import { createApp } from "vue";
import { GlobalEvents } from "vue-global-events";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import Notifications from "@kyvg/vue3-notification";

import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Notifications);
app.component("GlobalEvents", GlobalEvents);

app.mount("#app");
