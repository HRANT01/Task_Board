import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import Board from '../views/Board.vue';

const routes = [
  {
    path: '/Task_Board/', // Adjust the base path if necessary
    component: Login
  },
  {
    path: '/Task_Board/registration',
    component: Registration
  },
  {
    path: '/Task_Board/taskBoard',
    component: Board
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
