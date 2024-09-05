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

const imagesOld = [
  'https://lindersplantskola.se/wp/wp-content/uploads/2019/08/48563-492x328.jpg',
  'https://lindersplantskola.se/wp/wp-content/uploads/2018/12/Li_95322-492x328.jpg',
];

const client = useSupabaseClient();

const { data: images } = await useAsyncData(
  'lindersplantskola-config',
  async () => {
    const { data, error } = await client
      .from('lindersplantskola-config')
      .select()
      .eq('inställning', 'heroBilder')
      .single();
    if (error) console.error(error);

    return JSON.parse(data.värde);
  }
);

console.log(images.value);
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
        <h2>
          Linders Plantskola är en småskalig och hantverksmässig plantskola
          strax utanför Hörby, mitt i vackra Skåne.
        </h2>
        <h2>
          Här finns många ovanliga växter att se i arboretumet och köpa i
          plantskolan.
        </h2>
        <h2>Välkomna!</h2>
      </div>
    </div>
    <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    <div class="home-page-align">
      <article>
        <header><h1>Öppettider</h1></header>
        <section>
          <p>
            2024 har vi har öppet alla lördagar i maj och september kl.11-15. Då
            är även Esters café öppet. Välkomna!
          </p>
        </section>
      </article>
      <article>
        <!-- <h1>Nyhetsbrev</h1> -->
        <!-- <Mailchimp /> -->
      </article>
      <!-- <div class="latest-from-blog">
        <h1>Senast från bloggen</h1>
        <div class="latest">
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
        </div>
      </div>
      <div class="latest-from-news">
        <h1>Senaste nyheten</h1>
        <div class="latest">
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
        </div>
      </div> -->
    </div>
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
  padding-top: 1rem;
}

@media screen and (min-width: 700px) {
  .home-page-align {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 1rem;
  }
  .home-page-align > :first-child {
    border-right: var(--dotted-border);
  }
}

.home-page-align > article {
  padding: 3rem;
  padding-top: 2rem;
}

.home-page-align h1 {
  color: var(--text-color);
  text-align: center;
  margin-bottom: 1rem;
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

.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
  position: absolute;
}
</style>
