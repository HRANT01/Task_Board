<template>
  <div class="bg-amber-50 w-full min-h-screen flex justify-center items-center min-w-96 h-screen">
    <div class="w-[20%] bg-blue-950 p-8 rounded-2xl flex flex-col min-w-80">
      <h1 class="text-white text-3xl mb-5">Login</h1>
      <span class="text-red-500" v-if="loginError">{{ loginError }}</span>
      <div class="pb-1">
        <custom-input
            v-model="userName"
            placeholder="Login"
            label="User Name"
            input-type="text"
            text-color="white"
            :error-message="userNameError"
            @inputting="resetErrors"
        />
      </div>
      <div class="pb-1">
        <custom-input
            v-model="password"
            placeholder="Password"
            label="Password"
            input-type="password"
            text-color="white"
            :error-message="passwordError"
            @inputting="resetErrors"
        />
      </div>
      <div class="flex justify-between items-center pt-3">
        <router-link to="/Task_Board/registration" class="underline text-blue-400">Create Account</router-link>
        <CustomButton @click="login">Sign In</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/login';
import CustomInput from "../components/UI/CustomInput.vue";
import CustomButton from "../components/UI/CustomButton.vue";


const authStore = useAuthStore();
const router = useRouter()

const loginError = ref<string>('')
const userName = ref<string>('')
const password = ref<string>('')
const userNameError = ref<string>('')
const passwordError = ref<string>('')


const login = async () => {
  const response = await authStore.A_Login({ username: userName.value, password: password.value })

  if (response && response.status >= 400) {
    loginError.value = response.data.detail;
    passwordError.value = response.data.password ? response.data.password[0] : '';
    userNameError.value = response.data.username ? response.data.username[0] : '';
  } else {
    await router.push('/taskBoard')
  }
};

const resetErrors = () => {
  loginError.value = ''
  passwordError.value = ''
  userNameError.value = ''
}



</script>

<style lang="scss" scoped>

</style>
