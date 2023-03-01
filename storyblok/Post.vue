<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="post">
    <img :src="blok.image.filename" alt="Bild" />
    <div>
      <h1>{{ blok.title }}</h1>
      <p>{{ blok.content }}</p>
    </div>
  </div>
</template>

<style>
.post img {
  max-width: 100%;
}

.post {
  margin: 2rem;
}

.post h1 {
  font-size: 3rem;
  color: var(--primary);
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>
