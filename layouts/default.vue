<script setup lang="ts">
import '~/assets/css/reset.css';

const { width, height } = useWindowSize();

const isSmallScreen = computed(() => {
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
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
      crossorigin: '',
    },
  ],
});
</script>

<template>
  <div>
    <div class="main-page">
      <header>
        <nuxt-link to="/">
          <img
            src="https://lindersplantskola.se/wp/wp-content/themes/linders/library/images/logo.png"
            alt="logo"
            v-if="!isSmallScreen"
          />
        </nuxt-link>
        <nav>
          <div v-if="isSmallScreen" class="mobile-nav">
            <img
              src="https://lindersplantskola.se/wp/wp-content/themes/linders/library/images/logo.png"
              alt="logo"
            />
            <button @click="isDropdownOpen = !isDropdownOpen">
              <Icon name="charm:menu-hamburger" />
            </button>
            <div class="dropdown" v-if="isDropdownOpen" ref="outsideTarget">
              <nuxt-link to="/">HEM</nuxt-link>
              <nuxt-link to="/sortiment">SORTIMENT</nuxt-link>
              <nuxt-link to="/om-oss">OM OSS</nuxt-link>
              <nuxt-link to="/bloggar">BLOGG</nuxt-link>
              <nuxt-link to="https://superlistan.lindersplantskola.se/">
                SUPERLISTAN
              </nuxt-link>
            </div>
          </div>
          <div v-else class="nav-items">
            <nuxt-link to="/">HEM</nuxt-link>
            <nuxt-link to="/sortiment">SORTIMENT</nuxt-link>
            <nuxt-link to="/om-oss">OM OSS</nuxt-link>
            <nuxt-link to="/bloggar">BLOGG</nuxt-link>
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
          <a href="https://lindersplantskola.se/"
            ><img src="/logo_footer.png" alt="logo"
          /></a>
          <p>Glada och ovanliga växter från egen ekologisk odling.</p>
          <div class="text-stack">
            <p>Peter Linder</p>
            <p>tel: 0733-518 716</p>
            <p>peter@lindersplantskola.se</p>
          </div>
        </div>
        <div class="bottom-legal">
          <p>© {{ year }} Linders Plantskola</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
:root {
  --backround-image: url('https://lindersplantskola.se/wp/wp-content/themes/linders/library/images/bkgr.png');
  --dotted-border: 4px dotted #6e4422;
  --border-color: #6e4422;
  --box-shadow: 0 0 20px #101000;
  --backround-color: #2e1d00;
  --text-color: #f7e8c7;
  --text-color-on-white: #412816;
  --beige-background: rgb(250, 236, 201);
  --primary: #eaac06;
  --link-color: #f1ca67;
}

body {
  background: var(--backround-color);
  color: var(--text-color);
  margin: 0;
  font-family: 'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 100vw;
}

h1 {
  font-size: 2rem;
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

.main-page {
  max-width: 80rem;
  height: fit-content;
  box-shadow: var(--box-shadow);
  background-image: var(--backround-image);
  /* background: #402814; */
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  padding: 1rem 1rem 0;
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
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  margin: 0;
  margin-left: 3px;
}

nav a:hover {
  border-left: 3px solid var(--primary);
  margin-left: 0;
  background: var(--beige-background);
  color: var(--text-color-on-white);
}

header img {
  max-width: 80vw;
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
  border-radius: 1rem;
  z-index: 5;
  right: 0;
  top: 3rem;
  display: flex;
  flex-direction: column;
  background: var(--backround-color);
  padding: 1rem;
}

.dropdown a {
  border-radius: 1rem;
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
  font-size: 1.2rem;
}

footer .text-stack {
  display: grid;
  gap: 0.5rem;
}

footer > div > * {
  margin: 0 0 0.5rem 0;
}

footer .text-stack * {
  padding-right: 0.5rem;
}

footer .text-stack *:last-child {
  border-right: none;
}

footer .bottom-legal {
  margin-top: 1rem;
  font-size: 0.8rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  display: grid;
  place-items: center;
}

@media screen and (min-width: 500px) {
  .main-page {
    /* padding: 1rem 2rem 0; */
  }
  footer .text-stack {
    gap: 1rem;
    display: flex;
  }
  footer .text-stack * {
    padding-right: 1rem;
    border-right: 3px solid var(--text-color);
  }
}

@media screen and (min-width: 800px) {
  .main-page {
    padding: 1rem 5rem 0;
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
</style>
