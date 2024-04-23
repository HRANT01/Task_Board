import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'
import Registration from "../views/Registration.vue";
import Board from "../views/Board.vue";

const routes = [
  {
    path: '/',
    redirect: '/Task_Board/' // Redirect to the base URL
  },
  {
    path: '/Task_Board/', // Notice the leading and trailing slashes
    component: Login
  },
  {
    path: '/Task_Board/registration', // Notice the leading slash
    component: Registration
  },
  {
    path: '/taskBoard', // Notice the leading slash
    component: Board
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
