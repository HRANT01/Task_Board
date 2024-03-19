<template>
  <div>
    <button class="animated-button p-2 border-2 rounded-2xl outline-0"><slot></slot></button>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.animated-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.animated-button:hover {
  background-color: #2980b9;
}

.animated-button:active {
  transform: translateY(2px);
}
</style>