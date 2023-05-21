<script setup lang="ts">
const props = defineProps({ blok: Object });

const { fetchNewsBySlug } = useNews();
const story = await fetchNewsBySlug(props.blok?.nyhet as string);

const { fetchAllNews } = useNews();
const news = await fetchAllNews();
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
    <nuxt-link :to="news[0].full_slug">
      <img :src="news[0].content.preview.filename" alt="" />
    </nuxt-link>
    <nuxt-link :to="news[0].full_slug">
      <h2>{{ news[0].content.title }}</h2>
    </nuxt-link>
    <p>
      {{ news[0].content.description }}
    </p>
  </div>
</template>

<style>
/* .news-preview {
  background: var(--beige-background);
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--text-color-on-white);
}

.news-preview a {
  text-decoration: none;
  color: var(--text-color-on-white);
}

.news-preview img {
  border-radius: 0.5rem;
  width: 100%;
  height: 12rem;
  margin: 0 0 0.5rem;
  object-fit: cover;
} */
</style>
