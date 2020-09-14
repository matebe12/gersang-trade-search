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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
