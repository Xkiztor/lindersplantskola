<script setup>
defineProps({
  blok: Object,
});
</script>

<template>
  <div
    v-editable="blok"
    :class="{
      'border-top': blok.top,
      'border-right': blok.right,
      'border-bottom': blok.bottom,
      'border-left': blok.left,
    }"
  >
    <StoryblokComponent
      v-for="blok in blok.content"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<style>
.border-top {
  border-top: var(--dotted-border);
}
.border-right {
  border-right: var(--dotted-border);
}
.border-bottom {
  border-bottom: var(--dotted-border);
}
.border-left {
  border-left: var(--dotted-border);
}
</style>
