import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import store from './store';

//createApp(App).use(Quasar, quasarUserOptions).mount('#app')

const myApp = createApp(App);

myApp.use(Vue3Toastify, {
    autoClose: 2000,
    theme: 'light',
  } as ToastContainerOptions);

myApp.use(Quasar, quasarUserOptions);

myApp.use(router);

myApp.use(store);

myApp.mount('#app');