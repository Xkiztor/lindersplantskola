<script setup>
const pingRes = ref(null);

async function ping() {
  const response = await $fetch('/api/ping'); // Calls the API route
  // const response = await $fetch('/api/test'); // Calls the API route
  pingRes.value = response;
  console.log(response);
}

const res = ref(null);

async function add() {
  const response = await $fetch('/api/addsubscriber'); // Calls the API route
  // const response = await $fetch('/api/test'); // Calls the API route
  res.value = response;
  console.log(response);
}
</script>

<template>
  <div>
    <button @click="ping()">Ping</button>
    <button @click="add()">Add</button>
  </div>
</template>

<style></style>
