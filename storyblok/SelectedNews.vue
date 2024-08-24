<script setup lang="ts">
const props = defineProps({ blok: Object });

const { fetchNewsBySlug } = useNews();
const story = await fetchNewsBySlug(props.blok?.nyhet as string);

const { fetchAllNews } = useNews();
const stories = await fetchAllNews();

console.log(story);
console.log(stories);

console.log(props.blok?.nyhet);
</script>

<template>
  <div v-editable="props.blok" class="post-preview">
    <nuxt-link :to="story.full_slug">
      <img :src="story.content.preview.filename" alt="" />
    </nuxt-link>
    <nuxt-link class="spacer" :to="'/' + story.full_slug">
      <h2>{{ story.content.title }}</h2>
    </nuxt-link>
    <p>
      {{ story.content.description }}
    </p>
  </div>
</template>

<style></style>
