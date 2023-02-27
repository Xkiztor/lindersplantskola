<script setup lang='ts'>
// import { StoryblokComponentType } from '@storyblok/js';

defineProps<{
  blok: {
    comment: String,
    name: String
  }
}>()
// defineProps<{
//   blok: StoryblokComponentType<'Sortiment'> & {
//     body: StoryblokComponentType<''>[]
//   }
// }>()
</script>


<template>
  <div v-editable="blok">
    <p>Name: {{ blok.name }}</p>
    <p>Comment: {{ blok.comment }}</p>
  </div>
</template>


<style></style>