<script setup>
const client = useSupabaseClient();
const { data: blogs } = await useAsyncData('lindersplantskola-bloggar', async () => {
  const { data, error } = await client
    .from('lindersplantskola-bloggar')
    .select()
    .eq('hidden', false)
    .order('post_date', { ascending: false });
  console.log(data);
  if (error) console.error(error);

  return data;
});

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

const renderDate = (date) => {
  var rawDate = new Date(date);
  var options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return rawDate.toLocaleDateString('sv', options);
};

useSeoMeta({
  title: 'Senaste från bloggen - Linders Plantskola',
  ogTitle: 'Senaste från bloggen',
  description: 'Här kan du läsa de senaste av mina blogginlägg.',
  ogDescription: 'Här kan du läsa alla av mina blogginlägg',
  ogImage: 'https://lindersplantskola.s3.eu-north-1.amazonaws.com/FlygfotoPlantskolanDownscaled',
});
</script>

<template>
  <div class="blog-page">
    <h1>Senaste från bloggen</h1>
    <div class="blog-grid">
      <div
        class="blog-el"
        v-for="blog in blogs"
        @click="navigateTo(`./bloggar/${blog.title.replaceAll(' ', '+')}`)"
      >
        <!-- <img :src="getImage(blog.text)" v-if="getImage(blog.text)" alt="" /> -->
        <NuxtLink :to="`./bloggar/${blog.title.replaceAll(' ', '+')}`">
          <h1>{{ blog.title }}</h1>
        </NuxtLink>
        <p class="date">{{ renderDate(blog.post_date) }}</p>
        <p>{{ blog.content.slice(0, 100) }}</p>
      </div>

      <!-- <NuxtLink :to="`./bloggar/${blog.titel}`" v-for="blog in blogs">
        <div class="blog-el">
          <img :src="getImage(blog.text)" v-if="getImage(blog.text)" alt="" />
          <NuxtLink :to="`./bloggar/${blog.titel}`">
            <h1>{{ blog.titel }}</h1>
          </NuxtLink>
          <p>{{ blog.text.slice(0, 100) }}</p>
        </div>
      </NuxtLink> -->
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
  height: 100%;

  cursor: pointer;
  text-decoration: none;
}

.blog-grid .blog-el h1 {
  color: var(--link-color);
  font-size: 1.6rem;
}
.blog-grid .blog-el:has(> h1):hover {
  text-decoration: underline;
}

.blog-grid .blog-el a {
  text-decoration: none;
}

.blog-grid .blog-el img {
  border-radius: 0.5rem;
  width: 100%;
  height: 12rem;
  margin: 0 0 0.5rem;
  object-fit: cover;
}

.blog-grid .blog-el .date {
  margin: 0.2rem 0 0.6rem;
  color: var(--text-color-mute);
}

.blog-grid .blog-el p {
  opacity: 0.9;
}
</style>
