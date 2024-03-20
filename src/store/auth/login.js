import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null,
  }),
  actions: {
    async A_Login(payload) {
      try {
        const response = await axios.post(
          'https://trello.backend.tests.nekidaem.ru/api/v1/users/token/',
          {
            username: payload.username,
            password: payload.password,
          }
        );
        this.token = response.data.token;
        return this.token;
      } catch (error) {
        console.log(error.response, 'eeeeeeeeeeeeeeeeeee')
        return error.response
      }
    },
  },
});
