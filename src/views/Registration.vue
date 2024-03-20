<template>
  <div class="bg-amber-50 w-full h-screen flex justify-center items-center">
    <div class="bg-blue-950 p-8 rounded-2xl flex flex-col min-w-80 w-[30%] ">
      <h1 class="text-white text-3xl mb-5">Create Account</h1>
      <div class="pb-4">
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
      <div class="pb-4">
        <custom-input
            v-model="email"
            placeholder="Email"
            label="Esmail"
            input-type="email"
            text-color="white"
            :error-message="emailError"
            @inputting="resetErrors"
        />
      </div>
      <div class="pb-4">
        <custom-input
            v-model="choosePassword"
            placeholder="Choose Password"
            label="Choose Password"
            input-type="text"
            text-color="white"
            :error-message="choosePasswordError"
            @inputting="resetErrors"
        />
      </div>
      <div class="pb-4">
        <custom-input
            v-model="repeatPassword"
            placeholder="Repeat Password"
            label="Repeat Password"
            input-type="text"
            text-color="white"
            :error-message="repeatPasswordError"
            @inputting="resetErrors"
        />
      </div>
      <div class="flex justify-between items-center pt-3">
        <CustomButton @click="checkPasswords">Create Account</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from "../components/UI/CustomInput.vue";
import CustomButton from "../components/UI/CustomButton.vue";
import { useRegisterStore } from '../store/auth/register';
import { useRouter } from "vue-router";


const registerStore = useRegisterStore();
const router = useRouter()

const userName = ref('')
const email = ref('')
const choosePassword = ref('')
const repeatPassword = ref('')



const checkPasswords = () => {
  if(choosePassword.value === repeatPassword.value && repeatPassword.value  && choosePassword.value) {
    register()
  } else {
    choosePasswordError.value = 'Passwords should be filled and match'
    repeatPasswordError.value = 'Passwords should be filled and match'
    return
  }
}

const register = async () => {
  const response = await registerStore.A_Register({
    username: userName.value,
    email: email.value,
    password: choosePassword.value,
  });
  if (response.status >= 400) {
    choosePasswordError.value = response.data.password ? response.data.password[0] : '';
    repeatPasswordError.value = response.data.password ? response.data.password[0] : '';
    userNameError.value = response.data.username ? response.data.username[0] : '';
  } else {
    await router.push('/taskBoard')
  }
};





const userNameError = ref('')
const emailError = ref('')
const choosePasswordError = ref('')
const repeatPasswordError = ref('')

const resetErrors = () => {
  userNameError.value = ''
  emailError.value = ''
  choosePasswordError.value = ''
  repeatPasswordError.value = ''
}

</script>

<style lang="scss" scoped>

</style>
