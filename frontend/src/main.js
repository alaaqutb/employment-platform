import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { store } from "./axios/store";
import axios from "axios";
import mitt from "mitt";
import Notifications from '@kyvg/vue3-notification'

import "./assets/main.css";
// let token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers.common["authorization"] = "Bearer " + token;
// }
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(Notifications, { name: "alert" })
// app.use(store);

app.mount("#app");
