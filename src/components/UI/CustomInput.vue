<template>
  <div class="flex flex-col">
    <label :for="props.placeholder" :class="`text-${props.textColor} pb-1`">{{props.label}}</label>
    <input
        :id="props.placeholder"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        :type="props.inputType"
        :placeholder="props.placeholder"
        class="bg-gray-00 p-3 rounded-lg outline-0 "
        :class="{'border-4 border-red-700': errorMessage}"
    >
    <span class="text-red-500" v-if="props.errorMessage">{{ props.errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
  label?: string
  errorMessage?: string
  inputType?: string
  textColor?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'inputting'): void
}>()

const updateValue = (value: string) => {
  emit("update:modelValue", value);
  emit('inputting')
}
</script>

<style scoped>
/* Your scoped styles */
</style>
