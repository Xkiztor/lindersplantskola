<script setup lang="ts">
const props = defineProps(['image', 'index', 'currentNum']);
</script>

<template>
  <img
    v-if="currentNum === props.index"
    :src="props.image.filename"
    alt=""
    class="carousel-image"
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
