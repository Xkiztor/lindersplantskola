<script setup lang="ts">
const { fetchAllNews } = useNews();
const stories = await fetchAllNews();

const textPreview = computed(() => {});
console.log(stories);
</script>

<template>
  <div class="blog-page">
    <h1>Senaste nyheterna</h1>
    <div class="blog-grid">
      <div v-for="blog in stories" class="post-preview">
        <nuxt-link :to="'/' + blog.full_slug">
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
.blog-page {
  padding: 0 1rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
}

@media screen and (min-width: 500px) {
  .blog-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 800px) {
  .blog-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
