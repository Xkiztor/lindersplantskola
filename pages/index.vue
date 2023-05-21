<script setup lang="ts">
const story = await useAsyncStoryblok('home', { version: 'draft' });

console.log(story);

const { fetchAllBlogs } = useBlogs();
const blogs = await fetchAllBlogs();

const { fetchAllNews } = useNews();
const news = await fetchAllNews();

onMounted(() => {
  console.log(story.value);
});
</script>

<template>
  <div class="home-page">
    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <StoryblokComponent v-if="story" :blok="story.content" />
    <div class="home-page-align">
      <div class="latest-from-blog">
        <h1>Senast från bloggen</h1>
        <!-- <div class="latest">
          <div class="blog-preview">
            <nuxt-link :to="blogs[0].full_slug">
              <h2>{{ blogs[0].content.title }}</h2>
            </nuxt-link>
            <nuxt-link :to="blogs[0].full_slug">
              <img :src="blogs[0].content.preview.filename" alt="" />
            </nuxt-link>
            <p>
              {{ blogs[0].content.description }}
            </p>
          </div>
        </div> -->
      </div>
      <div class="latest-from-news">
        <h1>Senaste nyheten</h1>
        <!-- <div class="latest">
          <div class="blog-preview">
            <nuxt-link :to="news[0].full_slug">
              <h2>{{ news[0].content.title }}</h2>
            </nuxt-link>
            <nuxt-link :to="news[0].full_slug">
              <img :src="news[0].content.preview.filename" alt="" />
            </nuxt-link>
            <p>
              {{ news[0].content.description }}
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
.home-page .grid-component .post-preview {
  height: 100%;
}

.blog-grid.latest {
  grid-template-columns: 1fr;
}

.home-page-align {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.home-page-align > div {
  padding-top: 1rem;
}

.home-page-align h1 {
  color: var(--text-color);
  text-decoration: underline;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
