import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./axios/store";
import axios from 'axios';

import "./assets/main.css";
let token = localStorage.getItem('token') ;
if( token ){
     axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
}
const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
