<script setup>
const client = useSupabaseClient();
const { data: blogs } = await useAsyncData(
  'lindersplantskola-blogs',
  async () => {
    const { data, error } = await client
      .from('lindersplantskola-bloggar')
      .select()
      .order('createdAt', { ascending: false });
    if (error) console.error(error);
    console.log(data);

    return data;
  }
);

const getImage = (text) => {
  const separatedString = text.split(/[\[\]]/).filter((str) => str !== '');

  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  var firstUrl;

  separatedString.reverse().forEach((e) => {
    console.log(e);
    if (urlRegex.test(e)) {
      firstUrl = e;
    }
  });

  return firstUrl;
};
</script>

<template>
  <div class="blog-page">
    <h1>Senaste från bloggen</h1>
    <div class="blog-grid">
      <div
        class="blog-el"
        v-for="blog in blogs"
        @click="navigateTo(`./bloggar/${blog.titel}`)"
      >
        <img :src="getImage(blog.text)" v-if="getImage(blog.text)" alt="" />
        <nuxt-link :to="`./bloggar/${blog.titel}`">
          <h1>{{ blog.titel }}</h1>
        </nuxt-link>
        <p>{{ blog.text.slice(0, 100) }}</p>
      </div>

      <!-- <nuxt-link :to="`./bloggar/${blog.titel}`" v-for="blog in blogs">
        <div class="blog-el">
          <img :src="getImage(blog.text)" v-if="getImage(blog.text)" alt="" />
          <nuxt-link :to="`./bloggar/${blog.titel}`">
            <h1>{{ blog.titel }}</h1>
          </nuxt-link>
          <p>{{ blog.text.slice(0, 100) }}</p>
        </div>
      </nuxt-link> -->
    </div>
  </div>
</template>

<style>
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
.blog-grid .blog-el {
  height: fit-content;
  /* background: var(--beige-background); */
  padding: 1rem;
  border-radius: 0.5rem;
  /* color: var(--border-color); */
  color: var(--text-color);
  border: 1px solid var(--border-color);

  cursor: pointer;
}

.blog-grid .blog-el {
  text-decoration: none;
  /* color: var(--text-color-on-white); */
}

.blog-grid .blog-el h1 {
  color: var(--link-color);
}
.blog-grid .blog-el:has(> h1):hover {
  text-decoration: underline;
}

.blog-grid .blog-el img {
  border-radius: 0.5rem;
  width: 100%;
  height: 12rem;
  margin: 0 0 0.5rem;
  object-fit: cover;
}
</style>
