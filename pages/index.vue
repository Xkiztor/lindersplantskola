<script setup>
const currentNum = ref(0);

const handleNext = () => {
  if (currentNum.value + 1 === images.value.length) {
    currentNum.value = 0;
  } else {
    currentNum.value += 1;
  }
  console.log(currentNum.value);
};
const handlePrevious = () => {
  if (currentNum.value === 0) {
    currentNum.value = images.value.length - 1;
  } else {
    currentNum.value -= 1;
  }
  console.log(currentNum.value);
};

const client = useSupabaseClient();

const { data: images } = await useAsyncData('lindersplantskola-images', async () => {
  const { data, error } = await client
    .from('lindersplantskola-config')
    .select()
    .eq('inställning', 'heroBilder')
    .single();
  if (error) console.error(error);

  return JSON.parse(data.värde);
});
const { data: heroText } = await useAsyncData('lindersplantskola-heroText', async () => {
  const { data, error } = await client
    .from('lindersplantskola-config')
    .select()
    .eq('inställning', 'heroText')
    .single();
  if (error) console.error(error);

  return JSON.parse(data.värde);
});

const { data: öppetTider } = await useAsyncData('lindersplantskola-öppetTider', async () => {
  const { data, error } = await client
    .from('lindersplantskola-config')
    .select()
    .eq('inställning', 'öppetTider')
    .single();
  if (error) console.error(error);

  return JSON.parse(data.värde);
});
const { data: lindersplantskolaConfig } = await useAsyncData(
  'lindersplantskola-config',
  async () => {
    const { data, error } = await client.from('lindersplantskola-config').select();
    if (error) console.error(error);

    return data.reduce((acc, item) => {
      acc[item.inställning] = item.värde;
      return acc;
    }, {});
  }
);

console.log(lindersplantskolaConfig.value);

useSeoMeta({
  title: 'Linders Plantskola',
  ogTitle: 'Plantskola',
  description: 'Småskalig och hantverksmässig plantskola strax utanför Hörby.',
  ogDescription: 'Småskalig och hantverksmässig plantskola strax utanför Hörby.',
  ogImage:
    'https://oykwqfkocubjvrixrunf.supabase.co/storage/v1/object/public/bilder/DJI_0979%20(Medium).JPG',
});

// ------------ nyhetsbrev ----------------
const mailInput = ref('');
const mailAddError = ref();
const mailAddSuccess = ref(undefined);
const mailAdd = async () => {
  mailAddError.value = {};
  mailAddSuccess.value = undefined;
  const { data } = await useFetch('/api/mailchimp', {
    method: 'POST',
    body: {
      action: 'addContact',
      email: mailInput.value,
    },
  });
  console.log(data.value);
  if (data.value) {
    console.log('data!');
    mailAddSuccess.value = await data.value.success;
  }
  if (data.value.error) {
    console.error('Fel:', data.value.error);
    mailAddError.value = data.value.error;
  }
};

// ----------------------------------------
</script>

<template>
  <div class="home-page">
    <div class="hero hero-grid">
      <div class="carousel-container">
        <Slide
          v-for="(image, index) in images"
          :image="image"
          :index="index"
          :current-num="currentNum"
        />
        <div class="button-overlay">
          <button @click="handlePrevious()" class="subtract">
            <Icon name="material-symbols:arrow-back-rounded" />
          </button>
          <button @click="handleNext()" class="add">
            <Icon name="material-symbols:arrow-forward-rounded" />
          </button>
        </div>
      </div>
      <div class="content">
        <h1>Välkommen till plantskolan!</h1>
        <RichText element="h2" :content="heroText" />
        <div class="seo">
          <h2>
            Linders Plantskola är en småskalig och hantverksmässig plantskola strax utanför Hörby,
            mitt i vackra Skåne.
          </h2>
          <h2>Här finns många ovanliga växter att se i arboretumet och köpa i plantskolan.</h2>
          <h2>Välkomna!</h2>
        </div>
      </div>
    </div>
    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <div class="home-page-align">
      <article
        class="section öppettider"
        alt="Vi har öppet alla lördagar i maj och september kl. 11-15."
      >
        <header><h1>Öppettider</h1></header>
        <section>
          <RichText element="p" :content="öppetTider" />
        </section>
      </article>
      <div class="section nyhetsbrev">
        <h1>Nyhetsbrev</h1>
        <div>
          <p>Anmäl dig gärna till mitt nyhetsbrev!</p>
          <p>
            Du kan läsa gamla nyhetsbrev
            <a
              class="link"
              target="_blank"
              href="https://us7.campaign-archive.com/home/?u=0e9eb9946e9781ae0c59149df&id=9e50a747e2"
              >här</a
            >
          </p>
          <div class="input-align">
            <input v-model="mailInput" placeholder="Epost" type="email" />
            <button
              :disabled="!mailInput"
              :class="{ disabled: !mailInput }"
              @click="mailInput ? mailAdd() : null"
            >
              Prenumerera
            </button>
            <p v-if="mailAddSuccess">
              <Icon size="30" name="material-symbols:check-circle-outline" />
            </p>
          </div>
          <p v-if="mailAddSuccess === false">Fel</p>
          <p v-if="mailAddError?.title === 'Member Exists'" class="error">
            Epostadressen är redan prenumererad
          </p>
          <div class="error" v-else-if="mailAddError?.title">
            ({{ mailAddError?.status }}) {{ mailAddError?.title }}
          </div>
        </div>
      </div>
      <!-- <div class="latest-from-blog">
        <h1>Senast från bloggen</h1>
        <div class="latest">
          <div class="blog-preview">
            <NuxtLink :to="blogs[0].full_slug">
              <h2>{{ blogs[0].content.title }}</h2>
            </NuxtLink>
            <NuxtLink :to="blogs[0].full_slug">
              <img :src="blogs[0].content.preview.filename" alt="" />
            </NuxtLink>
            <p>
              {{ blogs[0].content.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="latest-from-news">
        <h1>Senaste nyheten</h1>
        <div class="latest">
          <div class="blog-preview">
            <NuxtLink :to="news[0].full_slug">
              <h2>{{ news[0].content.title }}</h2>
            </NuxtLink>
            <NuxtLink :to="news[0].full_slug">
              <img :src="news[0].content.preview.filename" alt="" />
            </NuxtLink>
            <p>
              {{ news[0].content.description }}
            </p>
          </div>
        </div>
      </div> -->
    </div>
    <section class="superlistan">
      <div>
        <h1>{{ lindersplantskolaConfig.superlistaReklamTitel }}</h1>
        <!-- <h1>Linders superlista</h1> -->
        <p>
          {{ lindersplantskolaConfig.superlistaReklamContent }}
        </p>
        <!-- <p>
          En chans att hitta det du länge letat efter! Linders superlista är en härligt späckad
          lista med 16 000 rader av ovanliga och odlingsvärda växter att beställa ifrån.
          Beställningen gör du senast 25 februari 2024 för att sedan hämta dina beställda växter på
          Linders plantskola utanför Hörby i Skåne under maj 2024. Tack vare att du gör
          beställningen i förväg och själv hämtar ut dina växter kan jag hålla låga priser i Linders
          superlista.
        </p> -->
        <div>
          <a href="https://superlistan.lindersplantskola.se/" class="linkbutton">
            Till superlistan <Icon name="majesticons:external-link-line" />
          </a>
        </div>
      </div>
      <div class="image">
        <img :src="lindersplantskolaConfig.superlistaReklamBild" alt="" />
      </div>
    </section>
  </div>
</template>

<style>
.home-page p {
  line-height: 1.3em;
}

.home-page .grid-component .post-preview {
  height: 100%;
}

.blog-grid.latest {
  grid-template-columns: 1fr;
}

.home-page-align {
  display: grid;
  grid-template-columns: 1fr;
}

@media screen and (max-width: 700px) {
  .home-page-align {
    margin-top: 1rem;
    border-top: var(--dotted-border);
  }
}

@media screen and (min-width: 700px) {
  .home-page-align {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .home-page-align > :first-child {
    border-right: var(--dotted-border);
  }
}

.home-page-align > .section {
  padding: 2rem 2rem 1rem;
  /* padding-top: 2rem; */
}

@media screen and (min-width: 700px) {
  .home-page-align > .section {
    padding: 2rem 3rem;
  }
}

.home-page-align h1 {
  color: var(--text-color);
  text-align: center;
  margin-bottom: 1rem;
}

.home-page-align .nyhetsbrev {
  text-align: center;
}

.home-page-align .input-align {
  display: flex;
  gap: 0rem;
  justify-content: center;
  align-items: center;
}

.home-page-align input {
  min-width: 50%;
  text-align: start;
}

.hero {
  background: var(--beige-background);
  padding: 1rem;
  border-radius: 0.5rem;
  /* height: 17rem; */
}

.hero h1 {
  color: var(--text-color-on-white);
  font-weight: 900;
  margin-bottom: 1rem;
  font-size: 2.4rem;
}

.hero h2 {
  font-size: 1rem;
  color: var(--border-color);
  margin-top: 1rem;
  line-height: 1.7rem;
}

.hero-grid {
  display: grid;
  gap: 1rem;
  place-items: center;
  grid-template-rows: 1fr min-content;
  grid-template-columns: 1fr;
}

.hero-grid .content {
  padding-right: 2rem;
}

@media screen and (min-width: 700px) {
  .hero.hero-grid {
    gap: 3rem;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  .hero h2 {
    font-size: 1rem;
    line-height: 1.2rem;
  }
  .hero h1 {
    margin-bottom: 2rem;
  }
}

@media screen and (min-width: 1000px) {
  .hero h2 {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
  .hero .hero-grid {
    gap: 3rem;
  }
}

@media screen and (min-width: 1300px) {
  .hero h2 {
    font-size: 1.25rem;
  }
}

@media screen and (max-width: 700px) {
  .hero h1 {
    font-size: 1.75rem;
  }
}

.carousel-image {
  width: 100%;
  height: 18rem;
  object-fit: cover;
  border-radius: 0.5rem;
  /* width: 80vw; */
  /* max-height: 100%; */
  /* max-width: 50vw; */
  /* min-height: 100%; */
}

@media screen and (min-width: 700px) {
  .carousel-image {
    object-fit: cover;
    width: 100%;
    height: 20rem;
  }
}

.carousel-container {
  position: relative;
  width: 100%;
}

.button-overlay {
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.button-overlay button {
  width: 1.7rem;
  height: 2.4rem;
  border: none;
  background: var(--beige-background);
  color: var(--text-color-on-white);
}
.button-overlay:not(.arrow-background) button {
  background: none;
  color: white;
  width: 3rem;
}
.button-overlay:not(.arrow-background) button:hover {
  color: rgb(184, 184, 184);
}
.button-overlay:not(.arrow-background) button svg {
  -webkit-filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.7));
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 1));
  scale: 200%;
}

.button-overlay button svg {
  scale: 150%;
}

.button-overlay button:hover {
  color: var(--border-color);
}

.button-overlay .add {
  place-self: center end;
  border-radius: 10rem 0 0 10rem;
  translate: 0.5rem;
}
.button-overlay .subtract {
  place-self: center start;
  border-radius: 0 10rem 10rem 0;
  translate: -0.5rem;
}

.seo {
  position: absolute;
  opacity: 0;
}

html .seo * {
  font-size: 0.1rem !important;
  margin: 0;
  line-height: 0;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
  position: absolute;
}

section.superlistan {
  border-top: var(--dotted-border);
  padding: 2.5rem 0.5rem 1.5rem;
  display: grid;
  gap: 1rem;
  width: 100%;
}

@media screen and (min-width: 1000px) {
  section.superlistan {
    gap: 4rem;
    grid-template-columns: 1fr 1fr;
  }
}

section.superlistan img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 1rem;
}
@media screen and (max-width: 1000px) {
  section.superlistan .image {
    grid-row: 1;
  }
}

section.superlistan p {
  line-height: 1.4;
}

section.superlistan h1 {
  margin-bottom: 0.5rem;
}

section.superlistan div:has(> .linkbutton) {
  width: 100%;
  font-size: 1rem;
  margin-top: 1rem;
}
section.superlistan .linkbutton {
  width: 100%;
  display: block;
  text-decoration: none;
}
</style>
