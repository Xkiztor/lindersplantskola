<script setup lang="ts">
const client = useSupabaseClient();

interface Plant {
  Artnamn: string;
  Svensktnamn: string;
  Zon: string;
  Antal: number;
  Pris: number;
  Kruka: string;
  Höjd: string;
  id: string;
}

const { data: list } = await useAsyncData('sortiment', async () => {
  const { data, error } = await client.from('sortiment-import').select();
  // .eq('name', 'My Restaurant Name')
  // .single();
  if (data) {
    console.log(data);
    return data;
  }
  if (error) {
    console.log(error);
  }
});

definePageMeta({
  middleware: ['admin'],
});

console.log(list.value);

const sortedList = computed(() => {
  console.log('sorting');
  if (!list.value?.length) {
    console.log('no value');
    return [];
  } else {
    return list.value?.sort((a: Plant, b: Plant) => {
      let nameA = a.Artnamn.toUpperCase();
      let nameB = b.Artnamn.toUpperCase();
      if (nameA < nameB) {
        return -1; // a should come before b in the sorted order
      }
      if (nameA > nameB) {
        return 1; // a should come after b in the sorted order
      }
      return 0; // a and b are equal
    });
    // return list.value;
  }
});
</script>

<template>
  <div>
    <h1>Admin Sortiment</h1>
    <div class="list-wrapper">
      <div class="column-titles column-align">
        <h3>Namn</h3>
        <h3>Svenskt Namn</h3>
        <!-- <h3>Storlek</h3> -->
        <h3>Zon</h3>
        <h3>Antal</h3>
        <h3 class="center-text">Pris</h3>
      </div>
      <div class="list">
        <AdminSortimentElement v-for="plant in sortedList" :plant="plant" />
        <!-- <div v-for="plant in list" class="list-el column-align">
          <p>{{ plant.Artnamn }}</p>
          <p>{{ plant.Pris }} kr</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style></style>
