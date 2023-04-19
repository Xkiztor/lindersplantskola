<script setup lang="ts">
const story = await useAsyncStoryblok('home', { version: 'draft' });

console.log(story);

const { fetchAllBlogs } = useBlogs();
const blogs = await fetchAllBlogs();

onMounted(() => {
  console.log(story.value);
});
</script>

<template>
  <div>
    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <StoryblokComponent v-if="story" :blok="story.content" />
    <div class="home-page-align">
      <div class="latest-from-blog">
        <h1>Senast från bloggen</h1>
        <div class="blog-grid latest">
          <!-- <div v-for="blog in blogs">
            <nuxt-link :to="blog.full_slug">
              <h2>{{ blog.content.title }}</h2>
            </nuxt-link>
            <nuxt-link :to="blog.full_slug">
              <img :src="blog.content.preview.filename" alt="" />
            </nuxt-link>
            <p>
              {{ blog.content.description }}
            </p>
          </div> -->
          <div>
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
        </div>
      </div>
      <div>
        <!-- <StoryblokComponent v-if="story" :blok="story.latestNews" /> -->
      </div>
    </div>
  </div>
</template>

<style>
.latest-from-blog {
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
</style>
