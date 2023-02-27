<script setup>
defineProps({ blok: Object})
</script>


<template>
  <div v-editable="blok">
    {{ blok.headline }}
  </div>
</template>


<style>

</style>