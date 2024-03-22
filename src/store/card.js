import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth/login.js';

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: [],
    error: null,
  }),

  actions: {
    async fetchCards() {
      try {
        const authStore = useAuthStore();

        const accessToken = authStore.$state.token;

        const response = await axios.get('https://trello.backend.tests.nekidaem.ru/api/v1/cards/', {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });

        this.cards = response.data;
        return this.cards;
      } catch (error) {
        this.error = error.message;
      }
    },

    async createCard(cardData) {
      try {
        const authStore = useAuthStore();
        const accessToken = authStore.$state.token;

        const response = await axios.post('https://trello.backend.tests.nekidaem.ru/api/v1/cards/', {
          row: cardData.row,
          text: cardData.text
        }, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });

        return response.data;
      } catch (error) {
        this.error = error.message;
      }
    },
    async updateCardPosition(cardId, newPosition) {
      try {
        const authStore = useAuthStore();
        const accessToken = authStore.$state.token;

        const payload = {
          row: newPosition.row.toString(),
          seq_num: newPosition.seq_num,
          text: "string"
        };

        const response = await axios.patch(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${cardId}/`, payload, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });

        return response.data;

      } catch (error) {
        console.error('Error updating card position:', error);
        throw error;
      }
    },
    async deleteCard(cardId) {
      try {
        const authStore = useAuthStore();
        const accessToken = authStore.$state.token;

        await axios.delete(`https://trello.backend.tests.nekidaem.ru/api/v1/cards/${cardId}/`, {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        });

        this.cards = this.cards.filter(card => card.id !== cardId);
      } catch (error) {
        console.error('Error deleting card:', error);
        throw error;
      }
    },
  },
});
