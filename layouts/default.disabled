<script setup lang="ts">
import '~/assets/css/reset.css';
import '~/assets/css/main.css';

const { width, height } = useWindowSize();
const { width: secondWidth, height: secondHeight } = useWindowSize();

onMounted(() => {
  width.value = 1000;
  setTimeout(function () {
    width.value = 600;
  }, 100);
  setTimeout(function () {
    width.value = secondWidth.value + 1;
  }, 100);
});

const isSmallScreen = computed(() => {
  console.log(width.value);
  return width.value < 700 ? true : false;
});

const isDropdownOpen = ref(false);

const outsideTarget = ref();

onClickOutside(outsideTarget, () => {
  isDropdownOpen.value = false;
});

const rawDate = new Date();
const year = rawDate.getFullYear();

useHead({
  title: 'Lindersplantskola',
  meta: [
    {
      name: 'description',
      content: 'Småskalig och hantverksmässig plantskola strax utanför Hörby.',
    },
    {
      name: 'keywords',
      content: 'Plantor, Lindersplantskola, plantskola, Växter',
    },
    { name: 'author', content: 'Ugo Linder, Peter Linder' },
  ],
  htmlAttrs: {
    lang: 'se',
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Merriweather&display=swap',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cabin+Sketch&display=swap',
      crossorigin: '',
    },
  ],
});

useSeoMeta({
  title: 'Lindersplantskola',
  ogTitle: 'Plantskola',
  description: 'Småskalig och hantverksmässig plantskola strax utanför Hörby.',
  ogDescription:
    'Småskalig och hantverksmässig plantskola strax utanför Hörby.',
  ogImage:
    'https://lindersplantskola.s3.eu-north-1.amazonaws.com/hemsida-assets/ogImage.jpg',
});
</script>

<template>
  <div>
    <div class="main-page">
      <header>
        <nuxt-link to="/" :style="{ display: width < 700 ? 'none' : 'block' }">
          <img
            src="https://lindersplantskola.s3.eu-north-1.amazonaws.com/hemsida-assets/logo.png"
            alt="brand-logo"
            v-if="width > 700"
          />
        </nuxt-link>
        <nav>
          <div v-if="width < 700" class="mobile-nav">
            <nuxt-link to="/">
              <img
                src="https://lindersplantskola.s3.eu-north-1.amazonaws.com/hemsida-assets/logo.png"
                alt="logo"
              />
            </nuxt-link>
            <button @click.stop="isDropdownOpen = !isDropdownOpen">
              <Icon name="charm:menu-hamburger" />
            </button>
            <div
              class="dropdown"
              v-if="isDropdownOpen"
              ref="outsideTarget"
              @click="isDropdownOpen = false"
            >
              <nuxt-link to="/">HEM</nuxt-link>
              <nuxt-link to="/sortiment">SORTIMENT</nuxt-link>
              <!-- <nuxt-link to="/om-oss">OM OSS</nuxt-link> -->
              <nuxt-link to="/bloggar">BLOGG</nuxt-link>
              <nuxt-link to="https://superlistan.lindersplantskola.se/">
                SUPERLISTAN
              </nuxt-link>
            </div>
          </div>
          <div v-else class="nav-items">
            <nuxt-link to="/">HEM</nuxt-link>
            <nuxt-link to="/sortiment">SORTIMENT</nuxt-link>
            <!-- <nuxt-link to="/om-oss">OM OSS</nuxt-link> -->
            <nuxt-link to="/bloggar">BLOGG</nuxt-link>
            <!-- <nuxt-link to="/aktuellt">NYHETER</nuxt-link> -->
            <nuxt-link to="https://superlistan.lindersplantskola.se/">
              SUPERLISTAN
            </nuxt-link>
          </div>
        </nav>
      </header>
      <!-- <div class="page-content"> -->
      <slot />
      <!-- </div> -->
      <footer>
        <div>
          <div>
            <a href="https://lindersplantskola.se/"
              ><img src="/logo_footer.png" alt="logo"
            /></a>
            <p>Glada och ovanliga växter från egen ekologisk odling.</p>
            <div class="text-stack">
              <p>Peter Linder</p>
              <p>tel: 0733-518 716</p>
              <p>peter@lindersplantskola.se</p>
              <p>
                Köinge 6902, Hörby <i class="max700">- </i>
                <NuxtLink to="./om-oss/hitta-hit" class="hitta-hit max700"
                  >Hitta hit</NuxtLink
                >
              </p>
              <p>
                <a
                  href="https://www.facebook.com/LindersPlantskola"
                  target="_blank"
                  ><Icon name="mdi:facebook-box"
                /></a>
                <a href="https://www.instagram.com/fotodendron/" target="_blank"
                  ><Icon name="mdi:instagram"
                /></a>
              </p>
            </div>
          </div>
          <NuxtLink to="/om-oss/hitta-hit" class="hitta-hit big">
            <Icon name="material-symbols:file-map-rounded" />
            <h2>Hitta hit</h2>
          </NuxtLink>
        </div>
        <div class="bottom-legal">
          <p>© {{ year }} Linders Plantskola</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
html {
  scrollbar-gutter: stable;
}

body {
  background: var(--backround-color);
  color: var(--text-color);
  margin: 0;
  font-family: 'Merriweather', 'Times New Roman', Times, serif;
  width: 100%;
}

h1 {
  font-size: 2rem;
  letter-spacing: -1px;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.5rem;
}

p {
  /* font-family: 'Times New Roman', Times, serif; */
  word-spacing: 0.7px;
  line-height: 1.15;
}

.bold {
  font-weight: 800;
}

h1,
.title,
.column-titles {
  font-family: var(--title-font);
}

.article .title {
  color: var(--primary);
  font-size: 2.5rem;
}

button,
input,
select,
textarea {
  background: var(--beige-background);
  color: var(--text-color-on-white);
  border: none;
  /* border: 1px solid var(--text-color); */
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
  margin-left: 0;
  text-align: center;
}

button,
input,
select {
  transition: all 100ms;
}

button:hover {
  opacity: 0.7;
  cursor: pointer;
}

button:active {
  transform: scale(105%);
}
/*
button:has(.icon) {
  display: grid;
  place-items: center;
  grid-template-columns: auto auto auto;
  gap: 0.25rem;
} */

.main-page {
  max-width: 85rem;
  height: fit-content;
  box-shadow: var(--box-shadow);
  background-image: var(--backround-image);
  /* background: #402814; */
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  padding: 0.5rem 0.25rem 0;
}

@media screen and (min-width: 500px) {
  .main-page {
    padding: 1rem 1rem 0;
  }
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

nav {
  border-bottom: var(--dotted-border);
  border-top: var(--dotted-border);
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;
  letter-spacing: 1px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  margin: 0;
  /* margin-left: 3px; */
  margin-right: 0.5rem;
  transition: all 150ms ease-in-out;
  border-left: 3px solid transparent;
}

nav a:hover {
  border-left: 3px solid var(--primary);
  /* margin-left: 0; */
  background: var(--beige-background);
  color: var(--text-color-on-white);
}

header img {
  max-width: 80vw;
  margin-left: 5px;
}

.mobile-nav {
  display: grid;
  grid-template-columns: 1fr min-content;
  place-items: center start;
  width: 100%;
  position: relative;
}

.mobile-nav button {
  background: none;
  border: none;
  color: var(--text-color);
  height: 2rem;
  padding: 0;
  margin-right: 0.5rem;
  place-self: center end;
}

.mobile-nav button svg {
  height: 1.8em;
  width: 1.8em;
}

.mobile-nav img {
  height: 2rem;
}

.dropdown {
  width: 50vw;
  position: absolute;
  border-radius: var(--border-radius-large);
  z-index: 5;
  right: 0;
  top: 3rem;
  display: flex;
  flex-direction: column;
  background: var(--backround-color);
  padding: 1rem;
}

.dropdown a {
  border-radius: var(--border-radius-large);
}

.nav-items > .router-link-active {
  background: var(--beige-background);
  color: var(--text-color-on-white);
}

.image-align {
  display: grid;
  grid-template-columns: min-content min-content;
}

.image-align * {
  height: auto;
  width: 100%;
}

footer {
  border-top: var(--dotted-border);
  padding: 1rem 0 0;
  font-size: 1.1rem;
}

footer a {
  color: var(--text-color);
}

footer > div {
  display: grid;
  grid-template-columns: 1fr auto;
}

footer .text-stack {
  margin-top: 0.5rem;
  display: grid;
  gap: 0.5rem;
  flex-wrap: wrap;
}

footer .text-stack p {
  padding-right: 1rem;
}

footer .text-stack *:last-child {
  border-right: none;
}

footer .text-stack .icon {
  font-size: 1.3rem;
  margin-right: 0.25rem;
  transform: translate(0, -2px);
}

footer .bottom-legal {
  margin-top: 1rem;
  font-size: 0.8rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  display: grid;
  place-items: center;
  margin-bottom: 0.5rem;
}

footer .hitta-hit {
  color: var(--text-color);
}
footer .hitta-hit.big {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding-left: 2rem;
}

@media screen and (max-width: 700px) {
  footer .hitta-hit.big {
    display: none;
  }
}
@media screen and (min-width: 700px) {
  .max700 {
    display: none;
  }
}

footer .hitta-hit h2 {
  font-size: 1.2rem;
  text-decoration: none;
}

footer .hitta-hit .icon {
  font-size: 3rem;
}

@media screen and (min-width: 700px) {
  footer .text-stack {
    gap: 0.5rem 1rem;
    display: flex;
  }
  footer .text-stack > * {
    padding-right: 1rem;
    border-right: 3px solid var(--text-color);
  }
}

@media screen and (min-width: 800px) {
  .main-page {
    padding: 1rem 7rem 0;
  }
}

@media screen and (min-width: 1200px) {
  body {
    /* padding: 1rem 5rem 0; */
    display: grid;
    place-items: center;
  }
  .main-page {
    margin: 0 2rem;
  }
}

.post-preview {
  /* background: var(--beige-background); */
  padding: 1rem;
  border-radius: 0.5rem;
  color: var(--text-color);
  width: 100%;
}

.post-preview a {
  text-decoration: none;
  color: #fff;
}

.post-preview img {
  border-radius: 0.5rem;
  width: 100%;
  height: 12rem;
  margin: 0 0 0.5rem;
  object-fit: cover;
}

.post-preview a.spacer * {
  margin-bottom: 0.5rem;
}
</style>
