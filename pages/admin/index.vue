<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const enteredPassword = useCookie('enteredPassword', { maxAge: 60604800 });

definePageMeta({
  middleware: ['admin'],
});

// const apiTest = () => {
//   console.log('apiTest');
//   fetch('/api/test')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };

// const response = ref(null);
// const callApi = async () => {
//   try {
//     response.value = await $fetch('/api/mailchimp-ping', {
//       method: 'POST', // Use POST if you need to send a body
//       body: {
//         mail: 'ugo.linder@gmail.com',
//       },
//     });
//   } catch (error) {
//     console.error('Error calling API:', error);
//   }
//   console.log(response.value);
// };

const mailPing = () => {
  const { data, pending, error } = useFetch('/api/mailchimp', {
    method: 'POST',
    body: {
      action: 'ping',
    },
  });
  console.log(data);
};
const mailAdd = () => {
  const { data, pending, error } = useFetch('/api/mailchimp', {
    method: 'POST',
    body: {
      action: 'addContact',
      email: 'ugo.linder@gmail.com',
    },
  });
  console.log(data);
};
</script>

<template>
  <div><h1>Admin Panelen</h1></div>
  <div v-if="runtimeConfig.public.ADMIN_PASSWORD === enteredPassword">
    <button @click="navigateTo('/admin/sortiment-change')">Ändra sortiment</button>
    <button @click="navigateTo('/admin/blogg')">Lägg till blogg</button>
    <button @click="navigateTo('/admin/index-change')">Ändra förstasida</button>
    <button @click="enteredPassword = ''">Logga ut</button>
    <button @click="mailPing()">API ping</button>
    <button @click="mailAdd()">API add</button>
  </div>
  <div v-else>
    <button @click="navigateTo('/admin/login')">Logga in</button>
  </div>
</template>

<style></style>
