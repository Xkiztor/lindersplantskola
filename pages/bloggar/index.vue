<script setup lang="ts">
const { fetchAllBlogs } = useBlogs();
const stories = await fetchAllBlogs();

const textPreview = computed(() => {});
console.log(stories);
</script>

<template>
  <div>
    <h1>Senaste från bloggen</h1>
    <div class="blog-grid">
      <div v-for="blog in stories">
        <nuxt-link :to="blog.full_slug">
          <h2>{{ blog.content.title }}</h2>
        </nuxt-link>
        <nuxt-link :to="blog.full_slug">
          <img :src="blog.content.preview.filename" alt="" />
        </nuxt-link>
        <p>
          {{ blog.content.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.blog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
}

.blog-grid div {
  background: var(--beige-background);
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--border-color);
}

.blog-grid a {
  text-decoration: none;
  color: var(--text-color-on-white);
}

.blog-grid img {
  border-radius: 0.5rem;
  width: 100%;
  height: 12rem;
  margin: 1rem 0 0.5rem;
  object-fit: cover;
}
</style>
