<script setup>
const props = defineProps({ blok: Object });

console.log(props.blok);

const resolvedRichText = computed(() => renderRichText(props.blok.richText));
</script>

<template>
  <div v-editable="props.blok" class="article">
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
.article {
  max-width: 60ch;
}

.article img:not(.carousel-image) {
  width: 100%;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.article hr {
  margin: 2rem 0;
  color: var(--border-color);
}

.article h1 {
  font-size: 2.5rem;
  margin: 1rem 0;
  color: var(--primary);
}

.article h2,
.article h3 {
  margin: 0.5rem 0 0.25rem;
}

.article b {
  font-weight: bold;
}
</style>
