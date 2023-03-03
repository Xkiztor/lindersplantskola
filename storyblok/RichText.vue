<script setup lang="ts">
const props = defineProps({ blok: Object });

const resolvedRichText = computed(() => renderRichText(props.blok.content));
</script>

<template>
  <div v-editable="props.blok" class="rich-text">
    <div v-html="resolvedRichText"></div>
  </div>
</template>

<style>
.rich-text * {
  color: var(--text-color-on-white);
}

.rich-text h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.rich-text h3 {
  margin-bottom: 1rem;
}
</style>
