import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'
import Registration from "../views/Registration.vue";
import Board from "../views/Board.vue";

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/registration',
    component: Registration
  },
  {
    path: '/taskBoard',
    component: Board
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory('/Task_Board/'),
  routes
});

export default router;
