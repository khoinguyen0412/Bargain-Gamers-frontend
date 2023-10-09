import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios.js'
import { cookieValidate } from './checkToken'
import store from './store.js'


const app = createApp(App);

app.use(router);
app.use(store);

cookieValidate();

app.mount('#app')
