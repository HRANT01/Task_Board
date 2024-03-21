import { defineStore } from 'pinia';
import axios from 'axios';

export const useRegisterStore = defineStore({
  id: 'register',
  state: () => ({
    registrationStatus: null,
  }),
  actions: {
    async A_Register(payload) {
      try {
        const response = await axios.post(
          'https://trello.backend.tests.nekidaem.ru/api/v1/users/create/',
          {
            username: payload.username,
            email: payload.email,
            password: payload.password,
          }
        );
        this.registrationStatus = response.data;
        return this.$state.registrationStatus;
      } catch (error) {
        return  error.response;
      }
    },
  },
});
