import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
  },
  {
    path: '/satong',
    name: 'satong',
    component: () => import('@/views/Satong.vue'),
  },
  {
    path: '/404',
    name: '404error',
    component: () => import('@/components/common/404error.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
