import 'virtual:windi.css';
import './style.css';

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import routes from './routes';

const i18n = createI18n({ legacy: false, locale: 'en' });

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount('body');

document.title = import.meta.env.VITE_APP_TITLE;
