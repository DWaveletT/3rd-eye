import { createRouter, createWebHistory } from 'vue-router'

import BlogHome from '@/pages/BlogHome.vue';
import TestPage from '@/pages/TestPage.vue';
import NotFound from '@/pages/NotFound.vue';

import PArticle from '@/pages/article/PArticle.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogHome
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage
    },
    {
      path: '/article/:id',
      name: 'article',
      component: PArticle
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: NotFound
    }
  ]
});

export default router
