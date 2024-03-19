import { createRouter, createWebHistory } from 'vue-router';
import Hello from '../components/TailwindTest.vue';


const routes = [
  {
    path: '/',
    component: Hello
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
