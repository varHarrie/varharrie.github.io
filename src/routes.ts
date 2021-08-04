import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue') },
  { path: '/posts', name: 'posts', component: () => import('./views/Posts.vue') },
  { path: '/snippets', name: 'snippets', component: () => import('./views/Snippets.vue') },
  { path: '/projects', name: 'projects', component: () => import('./views/Projects.vue') },
  { path: '/about', name: 'about', component: () => import('./views/About.vue') },
];

export default routes;
