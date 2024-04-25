import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'
import Registration from "../views/Registration.vue";
import Board from "../views/Board.vue";

const routes = [
  {
    path: '/', // Notice the leading and trailing slashes
    component: Login
  },
  {
    path: '/registration', // Notice the leading slash
    component: Registration
  },
  {
    path: '/taskBoard', // Notice the leading slash
    component: Board
  }
];

const router = createRouter({
  history: createWebHistory('/Task_Board/'),
  routes
});

export default router;
