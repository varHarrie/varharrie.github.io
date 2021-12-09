import { h, VNode } from 'vue';
import { RouteRecordRaw, RouterView } from 'vue-router';

const NestComponent = {
  render: (): VNode => h(RouterView),
};

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue') },
  {
    path: '/posts',
    props: { milestone: Number(import.meta.env.VITE_GITHUB_MILESTONE_POSTS) },
    component: NestComponent,
    children: [
      { path: '', name: 'posts', component: () => import('./views/Articles.vue') },
      { path: '/posts/:id', name: 'post', component: () => import('./views/Article.vue') },
    ],
  },
  {
    path: '/snippets',
    props: { milestone: Number(import.meta.env.VITE_GITHUB_MILESTONE_SNIPPETS) },
    component: NestComponent,
    children: [
      { path: '', name: 'snippets', component: () => import('./views/Articles.vue') },
      { path: '/snippets/:id', name: 'snippet', component: () => import('./views/Article.vue') },
    ],
  },
  { path: '/projects', name: 'projects', component: () => import('./views/Projects.vue') },
];

export default routes;
