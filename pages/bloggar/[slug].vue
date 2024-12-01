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
      .eq('title', `${slug.replaceAll('+', ' ')}`)
      .single();
    if (error) console.error(error);
    console.log(data);

    return data;
  }
);

console.log(blog.value.content);

const separatedString = computed(() => {
  return blog.value.content.split(/[\[\]]/).filter((str) => str !== '');
});

console.log(separatedString.value);

const checkIfLink = (string) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(string);
};

const checkIfSpacer = (string) => {
  return string === 'n';
};

const senasteBloggarna = ref([]);
var antalBloggar = 10;
const { data: otherBlogs } = await useAsyncData(
  'lindersplantskola-other-blogs',
  async () => {
    const { data, error } = await client
      .from('lindersplantskola-bloggar')
      .select()
      .order('post_date', { ascending: false })
      .neq('title', `${slug.replaceAll('+', ' ')}`);
    if (error) console.error(error);
    console.log(data);
    senasteBloggarna.value = data.slice(0, antalBloggar);
    return data;
  }
);

const date = computed(() => {
  console.log(blog.value.post_date);
  let datum = new Date(blog.value.post_date);
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
        <h1>{{ blog.title }}</h1>
        <p>{{ date }}</p>
      </header>
      <!-- <p class="ingress">{{ blog.ingress }}</p>
      <div v-for="string in separatedString">
        <img :src="string" v-if="checkIfLink(string)" />
        <p v-else-if="checkIfSpacer(string)" class="spacer"></p>
        <p v-else>{{ string }}</p>
      </div> -->
      {{ blog.content }}
    </article>
    <div class="other-blogs">
      <h1>Senaste från bloggen</h1>
      <ul>
        <li v-for="otherblog in senasteBloggarna">
          <NuxtLink :to="`./${otherblog.title.replaceAll(' ', '+')}`">{{
            otherblog.title
          }}</NuxtLink>
        </li>
        <li class="end">
          + {{ otherBlogs.length - antalBloggar }} st till
          <NuxtLink class="alla-bloggar" to="/bloggar"
            >Se alla bloggar</NuxtLink
          >
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
  margin-bottom: 3rem;
}

.article-page article {
  max-width: 50ch;
}

.article-page article h1 {
  font-size: 2.5rem;
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

.article-page .ingress {
  margin-bottom: 1rem;
  font-weight: 800;
}

/* .other-blogs h1 {
  margin-bottom: 1rem;
} */

.other-blogs h3 {
  margin: 1rem 0;
}
.other-blogs {
  text-align: start;
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
  margin: 0.75rem 0;
}

.other-blogs ul {
  list-style: outside disc;
}

@media screen and (min-width: 900px) {
  .other-blogs a {
    font-size: 1.25rem;
  }
  .article-page {
    grid-template-columns: 3fr 1fr;
  }
}

@media screen and (min-width: 1000px) {
  .other-blogs a {
    font-size: 1.3rem;
  }
}

.other-blogs .end {
  border-top: 2px dotted var(--border-color);
  padding-top: 0.5rem;
  list-style: none;
  line-height: 1.3;
}

.other-blogs .end a {
  display: block;
}

.other-blogs .end,
.other-blogs .end * {
  font-size: 1.2rem;
}
</style>
