<script setup lang="ts">
const props = defineProps({ blok: Object });

const { fetchBlogBySlug } = useBlogs();
const story = await fetchBlogBySlug(props.blok?.blog as string);

const { fetchAllBlogs } = useBlogs();
const blogs = await fetchAllBlogs();
</script>

<template>
  <!-- <div v-editable="props.blok" class="post-preview">
    <nuxt-link :to="story.full_slug">
      <img :src="story.content.preview.filename" alt="" />
    </nuxt-link>
    <nuxt-link :to="'/' + story.full_slug">
      <h2>{{ story.content.title }}</h2>
    </nuxt-link>
    <p>
      {{ story.content.description }}
    </p>
  </div> -->
  <div v-editable="props.blok" class="post-preview">
    <nuxt-link :to="blogs[0].full_slug">
      <img :src="blogs[0].content.preview.filename" alt="" />
    </nuxt-link>
    <nuxt-link :to="blogs[0].full_slug">
      <h2>{{ blogs[0].content.title }}</h2>
    </nuxt-link>
    <p>
      {{ blogs[0].content.description }}
    </p>
  </div>
</template>

<style>
/* .blog-preview {
  background: var(--beige-background);
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--text-color-on-white);
}

.blog-preview a {
  text-decoration: none;
  color: var(--text-color-on-white);
}

.blog-preview img {
  border-radius: 0.5rem;
  width: 100%;
  height: 12rem;
  margin: 0 0 0.5rem;
  object-fit: cover;
} */
</style>
