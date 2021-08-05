import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue') },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('./views/Articles.vue'),
    props: { milestone: Number(import.meta.env.VITE_GITHUB_MILESTONE_POSTS) },
  },
  { path: '/posts/:id', name: 'post', component: () => import('./views/Article.vue') },
  {
    path: '/snippets',
    name: 'snippets',
    component: () => import('./views/Articles.vue'),
    props: { milestone: Number(import.meta.env.VITE_GITHUB_MILESTONE_SNIPPETS) },
  },
  { path: '/snippets/:id', name: 'snippet', component: () => import('./views/Article.vue') },
  { path: '/projects', name: 'projects', component: () => import('./views/Projects.vue') },
  { path: '/about', name: 'about', component: () => import('./views/About.vue') },
];

export default routes;
