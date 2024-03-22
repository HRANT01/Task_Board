import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null,
    refreshToken: null
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
        this.$state.token = response.data.access;
        this.$state.refreshToken = response.data.refresh;

        localStorage.setItem('token', this.$state.token);
        localStorage.setItem('refreshToken', this.$state.refreshToken);

        return this.$state.token;
      } catch (error) {
        return error.response;
      }
    },
    async refreshAccessToken(token) {
      try {
        const response = await axios.post(
          'https://trello.backend.tests.nekidaem.ru/api/v1/users/token/refresh/',
          {
            refresh: token,
          }
        );

        this.$state.token = response.data.access;

      } catch (error) {
        console.error(error)
      }
    },
  },
});
