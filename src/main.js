import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import { cookieValidate } from './checkToken'
import store from './store.js'


const app = createApp(App);

app.config.globalProperties.axios = axios
axios.get('/sanctum/csrf-cookie')

app.use(router);
app.use(store);

cookieValidate();

app.mount('#app')
