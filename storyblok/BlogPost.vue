<script setup>
// import cloneDeep from 'clone-deep';
const props = defineProps({ blok: Object });

console.log(props.blok);

const resolvedRichText = computed(() => renderRichText(props.blok.richText));

// const mySchema = cloneDeep(RichTextSchema); // you can make a copy of the default RichTextSchema
// ... and edit the nodes and marks, or add your own.
// Check the base RichTextSchema source here https://github.com/storyblok/storyblok-js-client/blob/v4/source/schema.js
console.log(RichTextSchema.nodes.image('alt', 'hello'));

// const articleContent = computed(() =>
//   renderRichText(props.blok.richText, {
//     schema: mySchema,
//     resolver: (component, blok) => {
//       switch (component) {
//         case 'my-custom-component':
//           return `<div class="my-component-class">${blok.text}</div>`;
//         default:
//           return 'Resolver not defined';
//       }
//     },
//   })
// );
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
