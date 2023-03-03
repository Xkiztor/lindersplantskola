<script setup>
const props = defineProps({ blok: Object });

const currentNum = ref(0);

const handleNext = () => {
  if (currentNum.value + 1 === props.blok.images.length) {
    currentNum.value = 0;
  } else {
    currentNum.value += 1;
  }
  console.log(currentNum.value);
};
const handlePrevious = () => {
  if (currentNum.value === 0) {
    currentNum.value = props.blok.images.length - 1;
  } else {
    currentNum.value -= 1;
  }
  console.log(currentNum.value);
};

console.log(props.blok);
</script>

<template>
  <div class="carousel-container" v-editable="props.blok">
    <Slide
      v-for="(image, index) in props.blok.images"
      :image="image"
      :index="index"
      :current-num="currentNum"
    />
    <div
      class="button-overlay"
      :class="{ 'arrow-background': props.blok.arrowbackground }"
    >
      <button @click="handlePrevious()" class="subtract">
        <Icon name="material-symbols:arrow-back-rounded" />
      </button>
      <button @click="handleNext()" class="add">
        <Icon name="material-symbols:arrow-forward-rounded" />
      </button>
    </div>
  </div>
</template>

<style>
.carousel-image {
  width: 100%;
  height: 18rem;
  object-fit: cover;
  width: 100%;
  border-radius: 0.5rem;
  /* width: 80vw; */
  /* max-height: 100%; */
  /* max-width: 50vw; */
  /* min-height: 100%; */
}

@media screen and (min-width: 700px) {
  .carousel-image {
    object-fit: cover;
    width: 100%;
    height: 25rem;
  }
}

.carousel-container {
  position: relative;
  width: 100%;
}

.button-overlay {
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.button-overlay button {
  width: 1.7rem;
  height: 2.4rem;
  border: none;
  background: var(--beige-background);
  color: var(--text-color-on-white);
}
.button-overlay:not(.arrow-background) button {
  background: none;
  color: white;
  width: 3rem;
}
.button-overlay:not(.arrow-background) button:hover {
  color: rgb(184, 184, 184);
}
.button-overlay:not(.arrow-background) button svg {
  -webkit-filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.7));
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 1));
  scale: 200%;
}

.button-overlay button svg {
  scale: 150%;
}

.button-overlay button:hover {
  color: var(--border-color);
}

.button-overlay .add {
  place-self: center end;
  border-radius: 10rem 0 0 10rem;
  translate: 0.5rem;
}
.button-overlay .subtract {
  place-self: center start;
  border-radius: 0 10rem 10rem 0;
  translate: -0.5rem;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
  position: absolute;
}
</style>
