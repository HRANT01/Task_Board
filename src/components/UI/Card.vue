<template>
  <div class="text-left card bg-black m-2 p-4 cursor-move">
    <h1 class="text-xl text-white">id: {{props.cardId}}</h1>
    <p class="text-gray-500">{{props.cardContent}}</p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  cardId: number,
  cardContent: string
}>()

</script>

<style lang="scss" scoped>

</style>