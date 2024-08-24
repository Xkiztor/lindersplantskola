<script setup lang="ts">
const props = defineProps(['image', 'index', 'currentNum']);
</script>

<template>
  <!-- <Transition name="slide"> -->
  <img
    v-if="currentNum === props.index"
    :src="props.image"
    class="carousel-image"
    width="200"
    height="100"
  />
  <!-- </Transition> -->
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  position: absolute;
  opacity: 0;
}

.slide-leave-from {
  position: absolute;
}
</style>
