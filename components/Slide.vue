<script setup lang="ts">
const props = defineProps(['image', 'index', 'currentNum']);
</script>

<template>
  <nuxt-img
    v-if="currentNum === props.index"
    :src="props.image.filename + '/m/'"
    alt=""
    class="carousel-image"
    quality="20"
    width="200"
    height="100"
  />
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  position: absolute;
}

.slide-leave-from {
  position: absolute;
}
</style>
