<script setup>
const props = defineProps({
  blok: Object,
});
console.log(props.blok);
</script>

<template>
  <div v-editable="props.blok" class="title-component">
    <h1>
      {{ props.blok.content }}
    </h1>
  </div>
</template>

<style>
.grid-component {
  display: grid;
  place-items: center;
}
</style>
