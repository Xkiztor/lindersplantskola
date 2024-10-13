<script setup>
const props = defineProps(['element', 'content']);

const processedContent = computed(() => {
  console.log(props.content);
  // console.log(JSON.parse(props.content));
  if (props.content) {
    return props.content;
  } else {
    return [''];
  }
});
</script>

<template>
  <component v-for="text in processedContent" :is="element">
    {{ text }}
  </component>
</template>

<style></style>
