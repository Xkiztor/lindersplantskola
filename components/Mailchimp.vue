<script setup>
const data = ref(null);

async function fetchData() {
  const response = await $fetch('/api/test'); // Calls the API route
  data.value = response;
  console.log(response);
}
</script>

<template>
  <div><button @click="fetchData()">Test</button></div>
</template>

<style></style>
