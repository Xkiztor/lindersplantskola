<script setup>
const client = useSupabaseClient();

const route = useRoute();
const { slug } = route.params;

const { data: blog } = await useAsyncData(
  'lindersplantskola-bloggar',
  async () => {
    const { data, error } = await client
      .from('lindersplantskola-bloggar')
      .select()
      .eq('titel', `${slug}`)
      .single();
    if (error) console.error(error);
    console.log(data);

    return data;
  }
);

console.log(blog.value.text);

const separatedString = computed(() => {
  return blog.value.text.split(/[\[\]]/).filter((str) => str !== '');
});

console.log(separatedString.value);

const checkIfLink = (string) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(string);
};

const checkIfSpacer = (string) => {
  return string === 'n';
};

const { data: otherBlogs } = await useAsyncData(
  'lindersplantskola-other-blogs',
  async () => {
    const { data, error } = await client
      .from('lindersplantskola-bloggar')
      .select()
      .order('createdAt', { ascending: false })
      .neq('titel', `${slug}`);
    if (error) console.error(error);
    console.log(data);

    return data;
  }
);

const date = computed(() => {
  console.log(blog.value.createdAt);
  let datum = new Date(blog.value.createdAt);
  var options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return datum.toLocaleDateString('sv', options);
});
</script>

<template>
  <div class="article-page">
    <article>
      <header>
        <h1>{{ slug }}</h1>
        <p>{{ date }}</p>
      </header>
      <div v-for="string in separatedString">
        <!-- <img :src="string" :alt="string" ref="image" v-if="checkIfLink(string)" @click="logFunc($refs.image[0].height)"> -->
        <!-- <img :src="string" :alt="string" ref="image"
        :class="{ 'square': image[0]?.width === image[0]?.height, 'landscape': image[0]?.width > image[0]?.height, 'portrait': image[0]?.width < image[0]?.height }"
        v-if="checkIfLink(string)"> -->
        <img :src="string" v-if="checkIfLink(string)" />
        <p v-else-if="checkIfSpacer(string)" class="spacer"></p>
        <p v-else>{{ string }}</p>
      </div>
    </article>
    <div class="other-blogs">
      <h1>Annat från bloggen</h1>
      <ul>
        <li v-for="blog in otherBlogs">
          <nuxt-link :href="`./${blog.titel}`">{{ blog.titel }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.spacer {
  height: 1em;
}

.article-page {
  display: grid;
  place-items: start center;
  gap: 5rem;
  font-size: 1.2rem;
}

.article-page article {
  max-width: 50ch;
}

.article-page article h1 {
  font-size: 4rem;
}

.article-page img {
  width: 100%;
  max-height: 800px;
  object-fit: cover;
  margin: 1rem 0;
}

.article-page header {
  border-bottom: var(--dotted-border);
  /* border-bottom: 1px solid var(--border-color); */
  margin-bottom: 1rem;
  padding-bottom: 1rem;
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
.other-blogs a {
  background: none;
  text-decoration: none;
  color: var(--link-color);
}
.other-blogs a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.other-blogs li {
  margin: 0.5rem 0;
}

.other-blogs ul {
  list-style: inside disc;
}

@media screen and (min-width: 700px) {
  .other-blogs {
    text-align: start;
  }

  .other-blogs a {
    font-size: 1.25rem;
  }
  .article-page {
    grid-template-columns: 3fr 1fr;
  }
}

@media screen and (min-width: 1000px) {
  .other-blogs a {
    font-size: 1.5rem;
  }
}
</style>
