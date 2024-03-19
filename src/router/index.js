import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'


const routes = [
  {
    path: '/',
    component: Login
  },
  // {
  //   path: '/about',
  //   component: About
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
