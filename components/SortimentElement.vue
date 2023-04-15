<script setup lang="ts">
const props = defineProps({
  plant: Object as () => Plant,
});

interface Plant {
  Artnamn: string;
  SvensktNamn: string;
  Zon: string;
  Antal: number;
  Pris: number;
  Kruka: string;
  Höjd: string;
}

const expanded = ref(false);
</script>

<template>
  <!-- <div
    class="list-el"
    @click="expanded = !expanded"
    v-if="plant"
    :class="{ 'make-room': expanded }"
  > -->
  <div class="list-el" @click="expanded = !expanded" v-if="plant">
    <div class="column-align">
      <p>{{ plant.Artnamn }}</p>
      <p>{{ plant.SvensktNamn }}</p>
      <!-- <p>{{ plant.Kruka }} - {{ plant.Höjd }} cm</p> -->
      <p>{{ plant.Zon }}</p>
      <p>{{ plant.Antal }}</p>
      <p class="center-text">{{ plant.Pris }}kr</p>
    </div>
    <Transition>
      <div class="expanded" v-if="expanded">
        <h1>{{ plant.Artnamn }}, {{ plant.SvensktNamn }}</h1>
        <p>Kruka: {{ plant.Kruka }}</p>
        <p v-if="plant.Höjd">Höjd: {{ plant.Höjd }} cm</p>
      </div>
    </Transition>
  </div>
</template>

<style>
.list-el {
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  /* border-top: 1px solid var(--border-color); */
  cursor: pointer;
  transition: all 100ms;
  border-color: var(--border-color);
}

.list-el:hover {
  background: rgba(238, 172, 6, 0.2);
}

/* .list-el:has(.expanded) {
  margin: 1rem 0;
} */

.expanded * {
  margin-top: 0.5em;
}

.make-room {
  border: 1px solid var(--border-color);
  margin: 1rem 0;
  border-radius: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.15s ease;
  /* position: absolute; */
}

.v-enter-from,
.v-leave-to {
  /* transform: translateY(-100px); */
  opacity: 0;
}
</style>
