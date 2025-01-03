<script setup>
const client = useSupabaseClient();

const route = useRoute();
const router = useRouter();
const { slug } = route.params;
const state = useGlobalState();
const runtimeConfig = useRuntimeConfig();
const enteredPassword = useCookie('enteredPassword', { maxAge: 60604800 });

const { data: blog } = await useAsyncData('lindersplantskola-bloggar', async () => {
  const { data, error } = await client
    .from('lindersplantskola-bloggar')
    .select()
    .eq('title', `${slug.replaceAll('+', ' ')}`)
    .single();
  if (error) console.error(error);
  // console.log(data);

  return data;
});

onMounted(() => {
  state.currentPageImages.value = blog.value.content
    .split(/!\[(?!omslag\])[^]*?\]\(([^)]+)\)/g)
    .filter((str) => str !== '' && str.includes('http') && !str.includes('['));
});

const allaBloggarna = ref();
var antalBloggar = 10;
const { data: otherBlogs } = await useAsyncData('lindersplantskola-other-blogs', async () => {
  const { data, error } = await client
    .from('lindersplantskola-bloggar')
    .select()
    .order('post_date', { ascending: false })
    .neq('title', `${slug.replaceAll('+', ' ')}`);
  if (error) console.error(error);
  // console.log(data);
  allaBloggarna.value = data;
  return data.slice(0, antalBloggar);
});

const postDate = computed(() => {
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
const postModified = computed(() => {
  console.log(blog.value.post_modified);
  let datum = new Date(blog.value.post_modified);
  var options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return datum.toLocaleDateString('sv', options);
});

// ------ Admin ------------
const arDuSaker = ref(false);
const isEditing = ref(false);
const editableBlog = ref();

const deleteBlogg = async () => {
  const { data, error } = await client
    .from('lindersplantskola-bloggar')
    .delete()
    .eq('ID', `${blog.value.ID}`);
  if (error) console.error(error);
  if (!error) {
    router.push('/bloggar');
  }
  // console.log(data);
};

const editBlog = async () => {
  const currentDate = new Date();
  const isoDateTime = currentDate.toISOString().replace('Z', '');
  const { data, error } = await client
    .from('lindersplantskola-bloggar')
    .update({
      title: `${editableBlog.value.title}`,
      content: `${editableBlog.value.content}`,
      post_modified: `${isoDateTime}`,
    })
    .eq('ID', blog.value.ID);
  if (error) console.error(error);
  if (!error) {
    router.push(`/bloggar/${editableBlog.value.title.replaceAll(' ', '+')}`);
    isEditing.value = false;
  }
  // console.log(data);
  return data;
};
</script>

<template>
  <div class="article-page">
    <article>
      <header>
        <h1>{{ blog.title }}</h1>
        <p class="date">
          <span class="mute">Publicerad:</span> {{ postDate }}
          <span v-if="postDate !== postModified"
            ><span class="mute">- Redigerad:</span> {{ postModified }}</span
          >
        </p>

        <!-------------- ADMIN ------------>
        <button
          v-if="enteredPassword === runtimeConfig.public.ADMIN_PASSWORD && !isEditing"
          @click="(isEditing = true), (editableBlog = blog)"
        >
          Redigera
        </button>
        <button
          v-if="enteredPassword === runtimeConfig.public.ADMIN_PASSWORD && isEditing"
          @click="isEditing = false"
        >
          Avbryt
        </button>
        <button
          v-if="enteredPassword === runtimeConfig.public.ADMIN_PASSWORD"
          @click="arDuSaker = !arDuSaker"
        >
          Ta bort
        </button>
        <p v-if="enteredPassword === runtimeConfig.public.ADMIN_PASSWORD && arDuSaker">
          Är du säker?
        </p>
        <button
          v-if="enteredPassword === runtimeConfig.public.ADMIN_PASSWORD && arDuSaker"
          @click="deleteBlogg()"
        >
          Ja
        </button>
        <button
          v-if="enteredPassword === runtimeConfig.public.ADMIN_PASSWORD && arDuSaker"
          @click="arDuSaker = false"
        >
          Avbryt
        </button>

        <form
          class="edit"
          @submit.prevent
          v-if="enteredPassword === runtimeConfig.public.ADMIN_PASSWORD && isEditing"
        >
          <div>
            Titel
            <input v-model="editableBlog.title" type="text" />
          </div>
          <div>
            Innehåll
            <textarea v-model="editableBlog.content" spellcheck="false" type="text" />
          </div>
          <div>
            <div></div>
            <button @click="editBlog()">Spara</button>
          </div>
        </form>

        <!-- --------------- -->
      </header>

      <!-- <p class="ingress">{{ blog.ingress }}</p>
      <div v-for="string in separatedString">
        <img :src="string" v-if="checkIfLink(string)" />
        <p v-else-if="checkIfSpacer(string)" class="spacer"></p>
        <p v-else>{{ string }}</p>
      </div> -->
      <MDC :value="blog.content" />
      <!-- {{ blog.content }} -->
    </article>
    <div class="other-blogs">
      <h1>Senaste från bloggen</h1>
      <ul>
        <li v-for="otherblog in otherBlogs">
          <NuxtLink :to="`./${otherblog.title.replaceAll(' ', '+')}`">{{
            otherblog.title
          }}</NuxtLink>
        </li>
        <li class="end">
          <!-- + {{ allaBloggarna.length - antalBloggar }} st till -->
          <NuxtLink class="alla-bloggar" to="/bloggar">Se alla bloggar</NuxtLink>
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
  width: 100%;
}

.article-page article h1 {
  font-size: 2.5rem;
  color: var(--link-color);
}

.article-image {
  width: 100%;
  /* max-height: 800px; */
  object-fit: cover;
  margin: 1rem 0;
  border-radius: 1rem;
}

.article-image:hover {
  cursor: pointer;
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

.article-page .date {
  margin-top: 0.25rem;
}

.article-page .mute {
  /* color: var(--text-color-mute); */
  opacity: 0.9;
  font-size: 0.9em;
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

form.edit {
  width: 100%;
  max-width: 70ch;
}

form.edit > div {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content max-content;
  place-items: center;
  gap: 0.2rem;
  margin-top: 1rem;
}

form.edit input {
  width: 100%;
  text-align: start;
}

form.edit textarea {
  resize: vertical;
  width: 100%;
  min-height: 70rem;
  text-align: start;
  background: none;
  border: 2px solid var(--primary);
  color: var(--text-color);
}

form.edit textarea:active,
form.edit textarea:focus {
  outline: none;
}

form.edit button {
  width: 100%;
}

.article-page hr {
  border: none;
  opacity: 0;
}
</style>
