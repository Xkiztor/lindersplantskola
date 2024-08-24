<script setup>
const client = useSupabaseClient();

const { data: list } = await useAsyncData('sortiment', async () => {
  const { data, error } = await client.from('sortiment-import').select();
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
    return list.value?.sort((a, b) => {
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

const isAddingPlant = ref(false);

const addingPlant = reactive({
  artnamn: '',
  svensktNamn: '',
  pris: 0,
  antal: 0,
  zon: '',
  höjd: '',
  kruka: '',
});

const addPlant = async () => {
  const { data, error } = await client
    .from('sortiment-import')
    .insert({
      Artnamn: addingPlant.artnamn,
      SvensktNamn: addingPlant.svensktNamn,
      Pris: addingPlant.pris,
      Antal: addingPlant.antal,
      Zon: addingPlant.zon,
      Höjd: addingPlant.höjd,
      Kruka: addingPlant.kruka,
    })
    // .eq('id', props.plant?.id)
    .select();
  if (error) {
    console.log(error);
  }
  if (!error) {
    isAddingPlant.value = false;
    refreshNuxtData();
    console.log('updated');
  }
  if (data) {
    console.log(data);
  }
};
</script>

<template>
  <div>
    <h1>Admin Sortiment</h1>
    <button @click="isAddingPlant = !isAddingPlant">
      <p v-if="isAddingPlant">
        <Icon name="material-symbols:cancel-outline-rounded" />
        Avbryt
      </p>
      <p v-else>
        <Icon name="material-symbols:add-box" />
        Lägg till växt
      </p>
    </button>
    <div v-if="isAddingPlant" class="add-plant">
      <div class="align-column">
        <label>Artnamn: </label>
        <input type="text" v-model="addingPlant.artnamn" />
      </div>
      <div class="align-column">
        <label>Svenskt Namn: </label>
        <input type="text" v-model="addingPlant.svensktNamn" />
      </div>
      <div class="align-column">
        <label>Pris: </label>
        <input type="text" v-model="addingPlant.pris" />
      </div>
      <div class="align-column">
        <label>Antal: </label>
        <input type="text" v-model="addingPlant.antal" />
      </div>
      <div class="align-column">
        <label>Zon: </label>
        <input type="text" v-model="addingPlant.zon" />
      </div>
      <div class="align-column">
        <label>Höjd: </label>
        <input type="text" v-model="addingPlant.höjd" />
      </div>
      <div class="align-column">
        <label>Kruka: </label>
        <input type="text" v-model="addingPlant.kruka" />
      </div>
      <button @click="addPlant">
        <Icon name="material-symbols:add-box" />Lägg till
      </button>
    </div>
    <div class="list-wrapper admin-list-wrapper">
      <div class="column-titles column-align">
        <h3>Namn</h3>
        <h3>Svenskt Namn</h3>
        <!-- <h3>Storlek</h3> -->
        <h3 class="hide-on-phone">Zon</h3>
        <h3 class="hide-on-phone">Antal</h3>
        <h3 class="end-text">Pris</h3>
      </div>
      <div class="list">
        <AdminSortimentElement
          v-for="(plant, index) in sortedList"
          :key="plant.id"
          :plant="plant"
        />
        <!-- <div v-for="plant in list" class="list-el column-align">
          <p>{{ plant.Artnamn }}</p>
          <p>{{ plant.Pris }} kr</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
.admin-list-wrapper .list-el .align-column {
  padding: 0 0.5rem;
}

@media screen and (max-width: 700px) {
  .hide-on-phone {
    display: none;
  }
}

.add-plant .align-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 30rem;
  place-items: center start;
}
</style>
