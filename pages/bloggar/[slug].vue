<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;

const { fetchBlogBySlug } = useBlogs();
const story = await fetchBlogBySlug(slug as string);

console.log(story);
</script>

<template>
  <!-- <div>{{ story.content.title }}</div> -->
  <!-- v-for="blok in story.content" -->
  <div class="article-page">
    <StoryblokComponent :key="story.content._uid" :blok="story.content" />
    <div>
      <h1>Annat från bloggen</h1>
    </div>
  </div>
</template>

<style>
.article-page {
  display: grid;
  place-items: start center;
  gap: 1rem;
}

@media screen and (min-width: 700px) {
  .article-page {
    grid-template-columns: 3fr 1fr;
  }
}
</style>
