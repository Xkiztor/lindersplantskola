<script setup lang="ts">
import "~/assets/css/reset.css"

useHead({
  title: 'Linders Superlista',
  meta: [
    { name: 'description', content: 'En lista med tusentals växter att beställa från.' },
    { name: 'keywords', content: 'Lista, Lindersplantskola, superlista, Växter' },
    { name: 'author', content: 'Ugo Linder, Peter Linder' },
  ],
  bodyAttrs: {
    class: 'test'
  },
  htmlAttrs: {
    lang: 'se',
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
      crossorigin: ''
    }
  ]
})
</script>

<template>
  <div>
    <div class="main-page">
      <header>
        <img src="https://lindersplantskola.se/wp/wp-content/themes/linders/library/images/logo.png" alt="logo">
        <nav>
          <nuxt-link to="/">HEM</nuxt-link>
          <nuxt-link to="/sortiment">SORTIMENT</nuxt-link>
          <nuxt-link to="/om-oss">OM OSS</nuxt-link>
          <nuxt-link to="/blogg">BLOGG</nuxt-link>
          <nuxt-link to="https://superlistan.lindersplantskola.se/">SUPERLISTAN</nuxt-link>
        </nav>
      </header>
      <slot />
      <footer>
        footer
      </footer>
    </div>
  </div>
</template>

<style>
:root {
  --backround-image: url("https://lindersplantskola.se/wp/wp-content/themes/linders/library/images/bkgr.png");
  --dotted-border: 4px dotted #8a6205;
  --box-shadow: 0 0 20px #101000;
  --backround-color: #2e1d00;
  --text-color: #f7e8c7;
  --text-color-on-white: #412816;
  --beige-background: rgba(250, 236, 201, 0.851);
  --primary: #eaac06;
}

body {
  background: var(--backround-color);
  color: var(--text-color);
  margin: 0;
  font-family: "Helvetica Neue", 'IBM Plex Sans', Helvetica, Arial, sans-serif;
}

p {
  font-family: 'Times New Roman', Times, serif;
  word-spacing: 0.7px;
  line-height: 1.15;
}

.main-page {
  width: 60rem;
  height: fit-content;
  box-shadow: var(--box-shadow);
  background-image: var(--backround-image);
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  padding: 1rem 3rem;
}

nav {
  border-bottom: var(--dotted-border);
  border-top: var(--dotted-border);
  display: flex;
  padding: 0.5rem 0;
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

.router-link-active {
  background: var(--beige-background);
  color: var(--text-color-on-white);
}

footer {
  border-top: var(--dotted-border);
  padding: 1rem 0;
}

.image-align {
  display: grid;
  grid-template-columns: min-content min-content;
}

.image-align * {
  height: auto;
  width: 100%;
}
</style>