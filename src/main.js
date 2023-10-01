

import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import ToastPlugin from 'vue-toast-notification';
import store from './store';
const app = createApp(App);

app.use(store)

app.use(router);
app.use(ToastPlugin);

app.mount('#app');
