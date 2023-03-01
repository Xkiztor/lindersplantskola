<script setup>
defineProps({
  blok: Object,
});
</script>

<template>
  <div
    v-editable="blok"
    class="grid"
    :style="{ gridTemplateColumns: blok.ratio }"
  >
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<style>
.grid {
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr; */
  place-items: center;
}
</style>
