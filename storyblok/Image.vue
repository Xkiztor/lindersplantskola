<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok">
    <img :src="blok.image.filename" :alt="blok.title" class="image" />
  </div>
</template>

<style>
.image {
  width: 100%;
  max-height: 100%;
  max-width: 50vw;
  border-radius: 0.25rem;
}
</style>
