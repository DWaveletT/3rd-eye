import { createRouter, createWebHistory } from 'vue-router'

import BlogHome from '@/pages/blog/BlogHome.vue';
import TestPage from '@/pages/TestPage.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogHome
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/pages/blog/BlogSearch.vue')
    },
    {
      path: '/tool',
      name: 'tool',
      component: () => import('@/pages/tool/ToolHome.vue')
    },
    {
      path: '/tool/editor',
      name: 'tool.editor',
      component: () => import('@/pages/tool/ToolEditor.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/pages/article/PArticle.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: NotFound
    }
  ]
});

export default router
