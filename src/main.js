import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import VueSweetalert2 from "vue-sweetalert2";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "sweetalert2/dist/sweetalert2.min.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "./i18n";

import "primeflex/primeflex.scss";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
pinia.use(piniaPluginPersistedstate);
app.use(PrimeVue);
app.use(router);
app.use(VueSweetalert2);

app.mount("#app");
