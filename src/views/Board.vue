<template>
  <div class="bg-gray-600 w-full h-auto overflow-auto">
    <div class="h-screen w-[80%] m-auto">
      <div class="relative flex justify-end top-1">
        <custom-button class="hidden sm:block" @click="logout">Log Out</custom-button>
      </div>
      <!-- Burger icon button for smaller screens -->
      <div class="relative flex justify-end top-3 text-black">
        <button class="sm:hidden burger-button">
          <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M4 6h16M4 12h16m-7 6h7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            ></path>
          </svg>
        </button>
      </div>
      <div class="dragArea flex justify-between m-auto gap-6 pt-10">
        <div v-for="(column, index) in cards" :key="index" class="column w-full h-fit bg-gray-700">
          <h3 :style="{ backgroundColor: columnColors[index] }" class="text-lg text-white w-full pl-2 p-2">
            {{ column.name }} ({{ column.cards.length }})</h3>
          <VueDraggableNext :list="column.cards" class="" group="cards" @change="dragCard">
            <div v-for="card in column.cards" :key="card.id" class="card">
              <Card :card-content="card.text" :card-id="card.id" @delete-card="handleDeleteCard"/>
            </div>
          </VueDraggableNext>
          <div v-if="isAddingTask && activeColumnIndex === index">
            <textarea
                v-model="taskText"
                class="w-[90%] bg-gray-500 m-3 outline-0 text-sm h-14 p-1"
                placeholder="Type Card Header"></textarea>
          </div>
          <span v-if="!isAddingTask || activeColumnIndex !== index" class=" block w-[80%] cursor-pointer m-auto"
                @click="addTask(index)"> Add Task + </span>
          <div class="flex justify-between">
            <span v-if="isAddingTask && activeColumnIndex === index"
                  class="ml-4 cursor-pointer text-center border-2 border-gray-500 w-[60%] text-white bg-gray-500 m-1"
                  @click="addTaskToColumn">Add Task +</span>
            <span v-if="isAddingTask && activeColumnIndex === index"
                  class="inline right-0 mr-4 text-white m-1 cursor-pointer" @click="cancelTaskAdding">X</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {VueDraggableNext} from 'vue-draggable-next';
import Card from "../components/UI/Card.vue";
import {useCardStore} from '../store/card.js';
import {useAuthStore} from '../store/auth/login.js';
import CustomButton from "../components/UI/CustomButton.vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const cardStore = useCardStore();
const router = useRouter()

const isAddingTask = ref<boolean>(false)
const activeColumnIndex = ref<number>(-1);
const taskText = ref<string>('')

const addTask = (columnIndex: number) => {
  isAddingTask.value = true;
  activeColumnIndex.value = columnIndex;
}

const logout = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');

  router.push('/');
}

const addTaskToColumn = async () => {
  try {
    const columnIndex = activeColumnIndex.value;
    const column = columns[columnIndex];

    if (column) {
      const cardData = {
        row: columnIndex.toString(),
        text: taskText.value
      };

      const newCard = await cardStore.createCard(cardData);

      column.cards.push(newCard);

      taskText.value = '';
      isAddingTask.value = false;
      activeColumnIndex.value = -1;
    } else {
      console.error('Column not found');
    }
  } catch (error) {
    console.error('Error adding task to column:', error);
  }
}


const cancelTaskAdding = () => {
  isAddingTask.value = false;
  activeColumnIndex.value = -1;
}

const columns = [
  {name: 'On-Hold', cards: []},
  {name: 'In-progress', cards: []},
  {name: 'Needs-Review', cards: []},
  {name: 'Approved', cards: []},
];

const cards = ref(null);

const columnColors = ['rgb(251,153,70)', 'rgb(42,146,191)', 'rgba(255,255,0,0.63)', '#00b961'];

onMounted(async () => {
  try {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedRefreshToken) {
      await authStore.refreshAccessToken(storedRefreshToken);
    }

    const fetchedCards = await cardStore.fetchCards();

    if (Array.isArray(fetchedCards)) {
      fetchedCards.forEach(card => {
        const columnIdx = parseInt(card.row);
        columns[columnIdx].cards.push(card);
      });

      columns.forEach(column => {
        column.cards = [];
      });

      fetchedCards.forEach(card => {
        const columnIdx = parseInt(card.row);
        columns[columnIdx].cards.push({...card, seq_num: card.seq_num});
      });
      cards.value = columns;
    } else {
      console.error('Error fetching cards: Cards not found');
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
});

const dragCard = async (event: any) => {
  try {
    if (event.added) {
      const cardId = event.added.element.id;
      const columnIndex = event.added?.element.row;
      const newPosition = {row: columnIndex.toString(), seq_num: event.added?.element.seq_num};

      await cardStore.updateCardPosition(cardId, newPosition);
    }
  } catch (error) {
    console.error('Error logging:', error);
  }
}


const handleDeleteCard = async (cardId) => {
  try {
    await cardStore.deleteCard(cardId);

    columns.forEach(column => {
      column.cards = column.cards.filter(card => card.id !== cardId);
    });

    cards.value = [...columns];
  } catch (error) {
    console.error('Error deleting card:', error);
  }
}

</script>

<style scoped>
.dragArea {
  display: flex;
}


</style>
