<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const enteredPassword = useCookie('enteredPassword', { maxAge: 60604800 });
const passwordInputValue = ref('');

// console.log(runtimeConfig.public.ADMIN_PASSWORD);

const login = () => {
  enteredPassword.value = passwordInputValue.value;
  console.log(passwordInputValue.value);
  console.log(enteredPassword.value);

  if (passwordInputValue.value === runtimeConfig.public.ADMIN_PASSWORD) {
    navigateTo('/admin');
  }
};
</script>

<template>
  <form @submit.prevent="login">
    <input type="password" v-model="passwordInputValue" />
    <button type="submit" @click="login">Login</button>
  </form>
</template>

<style></style>
