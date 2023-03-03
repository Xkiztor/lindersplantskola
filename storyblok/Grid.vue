<script setup>
const props = defineProps({
  blok: Object,
});
console.log(props.blok);
</script>

<template>
  <div
    v-editable="props.blok"
    class="grid"
    :style="{ gridTemplateColumns: blok.ratio, gap: blok.gap + 'rem' }"
  >
    <StoryblokComponent
      v-for="blok in props.blok.columns"
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
