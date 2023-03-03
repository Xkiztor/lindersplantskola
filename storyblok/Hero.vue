<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="hero">
    <div class="hero-grid">
      <StoryblokComponent
        v-for="blok in blok.content"
        :key="blok._uid"
        :blok="blok"
      />
      <div>
        <h1>{{ blok.title }}</h1>
        <h2>{{ blok.text1 }}</h2>
        <h2>{{ blok.text2 }}</h2>
      </div>
    </div>
  </div>
</template>

<style>
.hero {
  background: var(--beige-background);
  padding: 1rem;
  border-radius: 0.5rem;
  /* height: 17rem; */
}

.hero h1 {
  color: var(--text-color-on-white);
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2.4rem;
}

.hero h2 {
  font-size: 1.5rem;
  color: var(--border-color);
  margin-top: 1rem;
}

@media screen and (min-width: 700px) {
  .hero .hero-grid {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  .hero h2 {
    font-size: 1.75rem;
  }
  .hero h1 {
    margin-bottom: 2rem;
  }
}

@media screen and (min-width: 1000px) {
  .hero .hero-grid {
    gap: 3rem;
  }
}

.hero-grid {
  display: grid;
  gap: 1rem;
  place-items: center;
  grid-template-rows: 1fr min-content;
  grid-template-columns: 1fr;
}
</style>
