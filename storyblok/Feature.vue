<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok">
    {{ blok.name }}
  </div>
</template>

<style></style>
