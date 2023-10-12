import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import VueSweetalert2 from "vue-sweetalert2";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "sweetalert2/dist/sweetalert2.min.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "primeflex/primeflex.scss";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);
app.use(router);
app.use(VueSweetalert2);

app.mount("#app");
