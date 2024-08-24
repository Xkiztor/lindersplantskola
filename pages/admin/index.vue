<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const enteredPassword = useCookie('enteredPassword', { maxAge: 60604800 });

definePageMeta({
  middleware: ['admin'],
});
</script>

<template>
  <div><h1>Admin Panelen</h1></div>
  <div v-if="runtimeConfig.public.ADMIN_PASSWORD === enteredPassword">
    <button @click="navigateTo('/admin/sortiment-change')">
      Ändra sortiment
    </button>
    <button @click="navigateTo('/admin/index-change')">Ändra förstasida</button>
    <button @click="enteredPassword = ''">Logga ut</button>
  </div>
  <div v-else>
    <button @click="navigateTo('/admin/login')">Logga in</button>
  </div>
</template>

<style></style>
