<script setup lang="ts">
const props = defineProps(['plant']);
</script>

<template>
  <div class="list-el column-align">
    <p>{{ plant.Artnamn }}</p>
    <p>{{ plant.SvensktNamn }}</p>
    <!-- <p>{{ plant.Kruka }} - {{ plant.Höjd }} cm</p> -->
    <p>{{ plant.Zon }}</p>
    <p>{{ plant.Antal }}</p>
    <p class="center-text">{{ plant.Pris }}kr</p>
  </div>
</template>

<style>
.list-el {
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  /* border-top: 1px solid var(--border-color); */
}
</style>
