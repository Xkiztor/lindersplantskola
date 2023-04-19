<script setup>
// import cloneDeep from 'clone-deep';
const props = defineProps({ blok: Object });

console.log(props.blok);

const resolvedRichText = computed(() => renderRichText(props.blok.content));
</script>

<template>
  <div v-editable="props.blok" class="news">
    <StoryblokComponent
      v-for="blok in props.blok.content"
      :key="blok._uid"
      :blok="blok"
    />
    <h1>{{ props.blok.title }}</h1>
    <div v-html="resolvedRichText"></div>
  </div>
</template>

<style>
.news {
  max-width: 60ch;
}

.news img:not(.carousel-image) {
  width: 100%;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.news hr {
  margin: 2rem 0;
  color: var(--border-color);
}

.news h1 {
  font-size: 2.5rem;
  margin: 1rem 0;
  color: var(--primary);
}

.news h2,
.news h3 {
  margin: 0.5rem 0 0.25rem;
}

.news b {
  font-weight: bold;
}
</style>
