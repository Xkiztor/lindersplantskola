<script setup>
const client = useSupabaseClient();

const { data: list } = await useAsyncData('sortiment', async () => {
  const { data, error } = await client
    .from('sortiment')
    .select()
    .order('Artnamn', { ascending: true })
    .eq('Dold', 'FALSE');
  // .single();
  if (error) {
    console.error(error);
  }
  console.log(data);
  return data;
});

console.log(list.value);

const vetenQuery = ref('');
const svenskQuery = ref('');

const filteredList = computed(() => {
  let newList = list.value;

  let vetenArray = vetenQuery.value.toLowerCase().split(' ');
  let svenskArray = svenskQuery.value.toLowerCase().split(' ');

  // console.log(queryArray);

  // let svensktNamnFilter = newList.filter((item) =>
  //   // (item) => item.SvensktNamn.toLowerCase().includes(queryArray)
  //   // console.log(item.SvensktNamn.toLowerCase())
  // );

  // let svensktNamnFilter = newList.filter((item) =>
  //   queryArray.every((str) => item.SvensktNamn.toLowerCase().includes(str))
  // );

  let vetenFilter = list.value.filter((item) =>
    vetenArray.every((str) => item.Artnamn.toLowerCase().includes(str))
  );
  let svenskFilter = vetenFilter.filter((item) =>
    svenskArray.every((str) => item.SvensktNamn.toLowerCase().includes(str))
  );

  // const combinedArray = artnamnFilter.concat(svensktNamnFilter);

  // const uniqueArray = [...new Set(combinedArray)];

  return svenskFilter;
});

useSeoMeta({
  title: 'Sortiment - Linders Plantskola',
  ogTitle: 'Sortiment',
  description: 'Här kan bläddra runt bland vårt sortiment.',
  ogDescription:
    'Här kan du se vårt sortiment. Vi har ett brett sortiment av växter, främst ligoser.',
});
</script>

<template>
  <div class="sortiment">
    <div class="top-align">
      <h1 class="title">Sortiment</h1>
      <div class="filters">
        <div>
          <p>Vetenskapligt namn</p>
          <div class="close-align">
            <input
              :class="{ inputed: vetenQuery }"
              type="text"
              placeholder="Sök"
              v-model="vetenQuery"
            />
            <button v-if="vetenQuery" @click="vetenQuery = ''">
              <Icon name="material-symbols-light:close-rounded" />
            </button>
          </div>
        </div>
        <div>
          <p>Svenskt namn</p>
          <div class="close-align">
            <input
              :class="{ inputed: svenskQuery }"
              type="text"
              placeholder="Sök"
              v-model="svenskQuery"
            />
            <button v-if="svenskQuery" @click="svenskQuery = ''">
              <Icon name="material-symbols-light:close-rounded" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="column-titles column-align">
        <h3 :class="{ searched: vetenQuery }">Namn</h3>
        <h3 :class="{ searched: svenskQuery }" class="hide-on-phone">Svenskt Namn</h3>
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

.column-titles .searched {
  text-decoration: underline 3px;
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

.sortiment .filters input {
  text-align: left;
  border: 2px solid transparent;
  width: 100%;
  padding: 0.35rem;
}

@media screen and (min-width: 400px) {
  .sortiment .filters input {
    padding: 0.5rem;
  }
}

.sortiment .filters .close-align {
  position: relative;
}

.sortiment .filters button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  aspect-ratio: 1/1;
  background: none;
  font-size: 1.5rem;
  padding: 0;
  display: grid;
  place-items: center;
  margin: 0;
}

.filters input.inputed {
  border-color: var(--primary);
}

.filters {
  margin-top: 1rem;
}

@media screen and (min-width: 400px) {
  .filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
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
    padding: 1rem 1.4rem 0.5rem;
  }
  .top-align {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  .filters {
    justify-content: flex-start;
    gap: 1rem;
    margin-top: 0;
  }
  .sortiment .title {
    font-size: 3.5rem;
  }
}
</style>
