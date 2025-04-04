import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import "./style.css";

const app = createApp(App);

// Install the router plugin
app.use(router);
app.use(createPinia());
app.mount("#app");
