<template>
  <div class="relative">
    <span class="text-gray-500 absolute top-0 right-4 cursor-pointer z-10" @click="deleteCard">x</span>
    <div class="text-left card bg-black m-2 p-4 cursor-move relative">

      <h1 class="text-xl text-white">id: {{ props.cardId }}</h1>
      <p class="text-gray-500">{{ props.cardContent }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>


const emit = defineEmits<{
  (e: 'delete-card', value: number): void
}>()

const props = defineProps<{
  cardId: number,
  cardContent: string
}>()

const deleteCard = () => {
  emit('delete-card', props.cardId)
}

</script>

<style lang="scss" scoped>

</style>