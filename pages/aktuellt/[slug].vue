<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;

const { fetchNewsBySlug } = useNews();
const story = await fetchNewsBySlug(slug as string);

const { fetchAllNews } = useNews();
const stories = await fetchAllNews();

console.log(story);
console.log(stories);
</script>

<template>
  <!-- <div>{{ story.content.title }}</div> -->
  <!-- v-for="blok in story.content" -->
  <div class="article-page">
    <StoryblokComponent
      v-if="story"
      :key="story.content._uid"
      :blok="story.content"
    />
    <div class="other-blogs">
      <h1>Andra nyheter</h1>
      <h3 v-for="news in stories">
        <nuxt-link :to="news.slug">{{ news.content.title }}</nuxt-link>
      </h3>
    </div>
  </div>
</template>

<style>
.article-page {
  display: grid;
  place-items: start center;
  gap: 5rem;
}

.article-page a {
  color: var(--link-color);
}

/* .other-blogs h1 {
  margin-bottom: 1rem;
} */

.other-blogs h3 {
  margin: 1rem 0;
}
.other-blogs {
  text-align: center;
}
.other-blogs h3 a {
  background: none;
  text-decoration: none;
  color: var(--link-color);
}
.other-blogs h3 a:hover {
  color: var(--primary);
  text-decoration: underline;
}

@media screen and (min-width: 700px) {
  .other-blogs {
    text-align: start;
  }

  .other-blogs h3 a {
    font-size: 1.25rem;
  }
  .article-page {
    grid-template-columns: 3fr 1fr;
  }
}

@media screen and (min-width: 1000px) {
  .other-blogs h3 a {
    font-size: 1.5rem;
  }
}
</style>
