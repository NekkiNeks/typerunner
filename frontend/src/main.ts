import { createApp } from "vue";
import { GlobalEvents } from "vue-global-events";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import Notifications from "@kyvg/vue3-notification";

import { MdTimerOutlined } from "oh-vue-icons/icons";
import { PrSpinner } from "oh-vue-icons/icons";
import { RiUser3Fill, LaGithub } from "oh-vue-icons/icons";
addIcons(MdTimerOutlined, PrSpinner, RiUser3Fill, LaGithub);

import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Notifications);
app.component("v-icon", OhVueIcon);
app.component("GlobalEvents", GlobalEvents);

app.mount("#app");
