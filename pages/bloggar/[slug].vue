<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;

const { fetchBlogBySlug } = useBlogs();
const story = await fetchBlogBySlug(slug as string);

const { fetchAllBlogs } = useBlogs();
const stories = await fetchAllBlogs();

console.log(story);
</script>

<template>
  <!-- <div>{{ story.content.title }}</div> -->
  <!-- v-for="blok in story.content" -->
  <div class="article-page">
    <StoryblokComponent :key="story.content._uid" :blok="story.content" />
    <div class="other-blogs">
      <h1>Annat från bloggen</h1>
      <h3 v-for="blog in stories">
        <nuxt-link :to="blog.slug">{{ blog.content.title }}</nuxt-link>
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
