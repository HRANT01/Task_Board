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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
