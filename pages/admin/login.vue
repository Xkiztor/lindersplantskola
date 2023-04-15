<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const enteredPassword = useCookie('enteredPassword', { maxAge: 60604800 });
const passwordInputValue = ref('');

console.log(runtimeConfig.ADMIN_PASSWORD);

const login = () => {
  enteredPassword.value = passwordInputValue.value;
  console.log(passwordInputValue.value);
  console.log(enteredPassword.value);

  if (passwordInputValue.value === runtimeConfig.ADMIN_PASSWORD) {
    navigateTo('/admin');
  }
};
</script>

<template>
  <div>
    <input type="password" v-model="passwordInputValue" />
    <button @click="login">Login</button>
  </div>
</template>

<style></style>
