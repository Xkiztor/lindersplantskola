<script setup>
const props = defineProps(['string', 'src', 'alt']);

var source = props.src;
var index = 0;

const imageOpened = ref(false);

const openImage = () => {
  imageOpened.value = !imageOpened.value;
  index = state.currentPageImages.value.indexOf(props.src);
  getImage(index);
};

const state = useGlobalState();

const target = ref();

onClickOutside(target, () => {
  imageOpened.value = false;
});

const compressedUrl = computed(() => {
  return props.src.replace('/upload/', '/upload/t_700bred/');
});
const bigImageUrl = computed(() => {
  return props.src.replace('/upload/', '/upload/t_2000bred/');
});

// const getImage = (i) => {
//   source = state.currentPageImages.value[i]
// }

// const next = () => {
//   if(state.currentPageImages.value.length !== index + 1) {
//     imageOpened.value = true
//     getImage(index + 1)
//     index = index + 1
//   }
// }
// const previous = () => {
//   if(index !== 0) {
//     imageOpened.value = true
//     getImage(index - 1)
//     index = index - 1
//   }
// }
</script>

<template>
  <div class="screen-cover" id="image-screen-cover" v-if="imageOpened">
    <NuxtImg :src="bigImageUrl" :alt="source" ref="target" />
    <!-- <button class="switch previous" @click="previous()"><Icon name="material-symbols:arrow-left-rounded"/></button> -->
    <!-- <button class="switch next" @click="next()"><Icon name="material-symbols:arrow-right-rounded"/></button> -->
    <NuxtLink :to="source" target="_blank">
      <Icon name="material-symbols:open-in-new-rounded" />Öppna full bild
    </NuxtLink>
  </div>
  <NuxtImg
    class="article-image"
    @click="openImage()"
    :src="compressedUrl"
    :alt="compressedUrl"
    :class="alt"
    loading="lazy"
  />
</template>

<style>
/* .screen-cover .switch {
  position: absolute;
  background: none;
  opacity: 0.5;
  border: none;
  padding: 0;
}

.screen-cover .switch:hover {
  border: none;
  opacity: 0.8;
}
.screen-cover .switch * {
  font-size: 5rem;
}

.switch.previous {
  left: 0.5rem;
  top: 50%;
  transform: translate(0, -50%);
}
.switch.next {
  right: 0.5rem;
  top: 50%;
  transform: translate(0, -50%);
} */

.article-page .screen-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  /* justify-content: center; */
  /* flex-shrink: 1; */
  backdrop-filter: blur(2px);
  padding: 2rem 2rem 4rem;
  object-fit: scale-down;
}

.article-page .screen-cover img {
  box-shadow: 0 0 100px 5px rgba(0, 0, 0, 0.5);
  max-height: 100%;
  /* height: 100%; */
  max-width: 100%;
  /* object-fit: cover; */
  transition: none;
  /* flex-shrink: 1; */
  /* flex-grow: 1; */
  margin: auto;
  border-radius: 1rem;
}

.article-page .screen-cover a {
  position: absolute;
  font-size: 0.9rem;
  opacity: 0.6;
  display: flex;
  align-items: center;
  color: var(--text-color-dark);
}

@media screen and (max-width: 1000px) {
  .article-page .screen-cover a {
    top: 0.75rem;
    left: 0.75rem;
  }
}
@media screen and (min-width: 1000px) {
  .article-page .screen-cover a {
    bottom: 0.75rem;
    left: 0.75rem;
  }
}

article .screen-cover a .icon {
  margin-right: 0.25rem;
}

article .screen-cover a:hover {
  text-decoration: underline;
}
</style>
