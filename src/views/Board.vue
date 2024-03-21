<template>
  <div class="bg-gray-600 w-full h-auto overflow-auto">
    <div class="h-screen w-[80%] m-auto">
      <div class="dragArea flex justify-between m-auto gap-6 pt-10">
        <div v-for="(column, index) in cards" :key="index" class="column w-full h-fit bg-gray-700">
          <h3 :style="{ backgroundColor: columnColors[index] }" class="text-lg text-white w-full pl-2 p-2">
            {{ column.name }}</h3>
          <VueDraggableNext :list="column.cards" class="" group="cards" @change="log">
            <div v-for="card in column.cards" :key="card.id">
              <Card :card-content="card.text" :card-id="card.id"/>
            </div>
          </VueDraggableNext>
          <div v-if="isAddingTask && activeColumnIndex === index">
            <textarea
                v-model="taskText"
                class="w-[90%] bg-gray-500 m-3 outline-0 text-sm h-14 p-1"
                placeholder="Type Card Header"></textarea>
          </div>
          <span v-if="!isAddingTask || activeColumnIndex !== index" class=" block w-[80%] cursor-pointer m-auto" @click="addTask(index)"> Add Task + </span>
          <div class="flex justify-between">
            <span v-if="isAddingTask && activeColumnIndex === index" class="ml-4 cursor-pointer text-center border-2 border-gray-500 w-[60%] text-white bg-gray-500 m-1" @click="addTaskToColumn" >Add Task +</span>
            <span v-if="isAddingTask && activeColumnIndex === index" class="inline right-0 mr-4 text-white m-1 cursor-pointer" @click="cancelTaskAdding">X</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import Card from "../components/UI/Card.vue";
import { useCardStore } from '../store/card.js';
import { useAuthStore } from '../store/auth/login.js';

const authStore = useAuthStore();
const cardStore = useCardStore();

const isAddingTask = ref<boolean>(false)
const activeColumnIndex = ref<number>(-1);
const taskText = ref<string>('')

const addTask = (columnIndex: number) => {
  isAddingTask.value = true;
  activeColumnIndex.value = columnIndex;
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
  { name: 'On-Hold', cards: [] },
  { name: 'In-progress', cards: [] },
  { name: 'Needs-Review', cards: [] },
  { name: 'Approved', cards: [] },
];

const cards = ref(null);

const columnColors = ['rgb(251,153,70)', 'rgb(42,146,191)', 'rgb(255,255,0)', '#00b961'];

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
        columns[columnIdx].cards.push(card);
      });

      cards.value = columns;
    } else {
      console.error('Error fetching cards: Cards not found');
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
});

const log = (event: any) => {
  console.log(event)
}
</script>

<style scoped>
.dragArea {
  display: flex;
}

</style>
