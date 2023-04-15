<script setup>
const client = useSupabaseClient();

const { data: list } = await useAsyncData('sortiment', async () => {
  const { data } = await client.from('sortiment-import').select();
  // .eq('name', 'My Restaurant Name')
  // .single();
  return data;
});

console.log(list.value);

const exampleList = ref([
  { name: 'Abelia chinensis', count: 3 },
  { name: 'Abelia mosanensis', count: 4 },
  { name: 'Euphorbia Blackbird', count: 1 },
  { name: 'Fagus sylvatica', count: 2 },
  { name: 'Fallopia baldschuanica', count: 10 },
  { name: 'Fargesia denudata', count: 120 },
  { name: 'Fargesia rufa', count: 3 },
  { name: 'Festuca gautieri', count: 5 },
  { name: 'Ginkgo biloba', count: 3 },
  { name: 'Glyceria maxima', count: 4 },
  { name: 'Helictrotrichon sempervirens', count: 3 },
  { name: 'Molinia caerulea', count: 3 },
  { name: 'Morus nigra', count: 8 },
]);
</script>

<template>
  <div>
    <h1>Sortiment</h1>
    <div class="list-wrapper">
      <div class="column-titles column-align">
        <h3>Namn</h3>
        <h3 class="hide-on-phone">Svenskt Namn</h3>
        <h3 class="hide-on-pc">Sv. Namn</h3>
        <!-- <h3>Storlek</h3> -->
        <h3 class="hide-on-phone">Zon</h3>
        <h3 class="hide-on-phone">Antal</h3>
        <h3 class="end-text">Pris</h3>
      </div>
      <div class="list">
        <SortimentElement v-for="plant in list" :plant="plant" />
        <!-- <div v-for="plant in list" class="list-el column-align">
          <p>{{ plant.Artnamn }}</p>
          <p>{{ plant.Pris }} kr</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
.list-wrapper {
  margin: 2rem 0;
}

.list {
  display: flex;
  /* gap: 0.5rem; */
  flex-direction: column;
}

.column-align {
  /* grid-template-columns: 16fr 8fr 8fr 2fr 2fr 4fr; */
  grid-template-columns: 16fr 8fr 4fr;
  display: grid;
}

.column-titles {
  color: var(--primary);
  padding: 0.5rem;
  /* margin-top: 2rem; */
  border-bottom: 1px solid var(--border-color);
  white-space: nowrap;
}

@media screen and (max-width: 700px) {
  .hide-on-phone {
    display: none;
  }
}

@media screen and (min-width: 700px) {
  .hide-on-pc {
    display: none;
  }
  .column-align {
    /* grid-template-columns: 16fr 8fr 8fr 2fr 2fr 4fr; */
    grid-template-columns: 16fr 8fr 3fr 3fr 4fr;
    display: grid;
  }
}

.end-text {
  text-align: end;
}
</style>
