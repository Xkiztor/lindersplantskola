<script setup lang="ts">
const props = defineProps({ blok: Object });

const { fetchBlogBySlug } = useBlogs();
const story = await fetchBlogBySlug(props.blok?.blog as string);

const { fetchAllBlogs } = useBlogs();
const stories = await fetchAllBlogs();

console.log(story);
console.log(stories);

console.log(props.blok?.blog);
</script>

<template>
  <div v-editable="props.blok" class="post-preview">
    <nuxt-link :to="story.full_slug">
      <img :src="story.content.preview.filename" alt="" />
    </nuxt-link>
    <nuxt-link :to="'/' + story.full_slug">
      <h2>{{ story.content.title }}</h2>
    </nuxt-link>
    <p>
      {{ story.content.description }}
    </p>
  </div>
</template>

<style></style>
