<template>
  <div class="bg-amber-50 w-full h-screen flex justify-center items-center">
    <div class="w-[20%] bg-blue-950 p-8 rounded-2xl flex flex-col">
      <h1 class="text-white text-3xl mb-5">Login</h1>
      <div class="pb-1">
        <custom-input
            v-model="login"
            placeholder="Login"
            label="User Name"
            input-type="text"
            text-color="white"
            error-message=""
        />
      </div>
      <div class="pb-1">
        <custom-input
            v-model="password"
            placeholder="Password"
            label="Password"
            input-type="password"
            text-color="white"
            error-message=""
        />
      </div>
      <div class="ml-auto pt-3">
        <CustomButton >Sign In</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from "../components/UI/CustomInput.vue";
import CustomButton from "../components/UI/CustomButton.vue";


const login = ref('')
const password = ref('')

</script>

<style lang="scss" scoped>

</style>
