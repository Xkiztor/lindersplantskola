<script setup>
const client = useSupabaseClient();

const { data: list } = await useAsyncData('sortiment', async () => {
  const { data } = await client.from('sortiment-import').select();
  // .eq('name', 'My Restaurant Name')
  // .single();
  return data;
});

console.log(list.value);

const searchQuery = ref('');

const filteredList = computed(() => {
  let newList = list.value;

  let queryArray = searchQuery.value.toLowerCase().split(' ');

  console.log(queryArray);

  // let svensktNamnFilter = newList.filter((item) =>
  //   // (item) => item.SvensktNamn.toLowerCase().includes(queryArray)
  //   // console.log(item.SvensktNamn.toLowerCase())
  // );

  // let svensktNamnFilter = newList.filter((item) =>
  //   queryArray.every((str) => item.SvensktNamn.toLowerCase().includes(str))
  // );

  let artnamnFilter = list.value.filter((item) =>
    queryArray.every((str) => item.Artnamn.toLowerCase().includes(str))
  );

  // const combinedArray = artnamnFilter.concat(svensktNamnFilter);

  // const uniqueArray = [...new Set(combinedArray)];

  return artnamnFilter;
});
</script>

<template>
  <div class="sortiment">
    <h1 class="title">Sortiment</h1>
    <div class="filters">
      <div>
        <input type="text" placeholder="Sök" v-model="searchQuery" />
      </div>
    </div>
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
        <SortimentElement v-for="plant in filteredList" :plant="plant" />
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
  position: sticky;
  /* height: 2rem; */
  top: 0;
  background: var(--backround-image);
}

.column-titles h3 {
  /* font-size: 2rem; */
}

@media screen and (min-width: 600px) {
  .column-titles h3 {
    font-size: 1.8rem;
  }
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
  .column-titles.column-align {
    padding: 1rem 1rem 0.5rem;
  }
}

.end-text {
  text-align: end;
}

.sortiment .top-part {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  align-items: center;
  justify-content: space-between;
}

@media screen and (min-width: 700px) {
  .sortiment .title {
    font-size: 2.5rem;
  }
}
</style>
