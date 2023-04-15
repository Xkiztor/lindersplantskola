<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const enteredPassword = useCookie('enteredPassword', { maxAge: 60604800 });
const passwordInputValue = ref('');

// console.log(runtimeConfig.ADMIN_PASSWORD);

// const login = () => {
//   enteredPassword.value = passwordInputValue.value;
//   console.log(passwordInputValue.value);
//   console.log(enteredPassword.value);
// };

definePageMeta({
  middleware: ['admin'],
});
</script>

<template>
  <div><h1>Admin Panelen</h1></div>
  <div v-if="runtimeConfig.ADMIN_PASSWORD === enteredPassword">
    <button @click="navigateTo('/admin/sortiment-change')">
      Ändra sortiment
    </button>
    <button @click="enteredPassword = ''">Logga ut</button>
  </div>
  <div v-else>
    <!-- <input type="password" v-model="passwordInputValue" />
    <button @click="login">Login</button> -->
    <button @click="navigateTo('/admin/login')">Logga in</button>
  </div>
</template>

<style></style>
