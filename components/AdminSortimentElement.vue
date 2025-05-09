<script setup lang="ts">
const client = useSupabaseClient();

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
  id: string;
  Dold?: boolean; // Add Dold property
}

const expanded = ref(false);

const showConfirmModal = ref(false);

watch(showConfirmModal, () => {
  if (showConfirmModal.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});

const deletePlant = async () => {
  const { error } = await client.from('sortiment').delete().eq('id', props.plant.id);
  if (error) {
    console.log(error);
  }
  if (!error) {
    console.log('deleted');
    showConfirmModal.value = false;
    refreshNuxtData();
  }
};

const isEditing = ref(false);

const editedPlant = reactive({
  artnamn: '',
  svensktNamn: '',
  pris: 0,
  antal: 0,
  zon: '',
  höjd: '',
  kruka: '',
});

onMounted(() => {
  if (props.plant) {
    editedPlant.artnamn = props.plant.Artnamn;
    editedPlant.svensktNamn = props.plant.SvensktNamn;
    editedPlant.pris = props.plant.Pris;
    editedPlant.antal = props.plant.Antal;
    editedPlant.zon = props.plant.Zon;
    editedPlant.höjd = props.plant.Höjd;
    editedPlant.kruka = props.plant.Kruka;
  }
});

const updatePlant = async () => {
  for (const name in editedPlant) {
    const { data, error } = await client
      .from('sortiment')
      .update({
        [name.charAt(0).toUpperCase() + name.slice(1)]: editedPlant[name],
      })
      .eq('id', props.plant?.id)
      .select();
    if (error) {
      console.log(error);
    }
    if (!error) {
      isEditing.value = false;
      refreshNuxtData();
      console.log('updated');
    }
    if (data) {
      console.log(data);
    }
  }
};

const toggleHidePlant = async () => {
  const newDold = !props.plant.Dold;
  const { error } = await client
    .from('sortiment')
    .update({ Dold: newDold })
    .eq('id', props.plant.id);
  if (error) {
    console.log(error);
  } else {
    refreshNuxtData();
    console.log('Dold toggled:', newDold);
  }
};
</script>

<template>
  <div class="list-el admin" v-if="plant" @click="expanded = !expanded">
    <teleport to="body">
      <div class="modal" v-if="showConfirmModal">
        <div class="modal-content">
          <h1>Är du säker att du vill ta bort?</h1>
          <button @click="deletePlant()">Ja</button>
          <button @click="showConfirmModal = false">Nej</button>
        </div>
      </div>
    </teleport>
    <div class="column-align">
      <p>{{ plant.Artnamn }}</p>
      <p>{{ plant.SvensktNamn }}</p>
      <p class="hide-on-phone">{{ plant.Zon }}</p>
      <p class="hide-on-phone">{{ plant.Antal }}</p>
      <p class="end-text">{{ plant.Pris }}kr</p>
    </div>
    <div v-if="expanded" class="admin-expanded" @click.stop="">
      <p>Kruka: {{ plant.Kruka }}</p>
      <p v-if="plant.Höjd">Höjd: {{ plant.Höjd }} cm</p>
      <p v-if="plant.Zon" class="hide-on-pc">Zon: {{ plant.Zon }}</p>
      <p v-if="plant.Antal" class="hide-on-pc">{{ plant.Antal }} st</p>
      <button @click="toggleHidePlant">
        <Icon
          :name="plant.Dold ? 'material-symbols:visibility' : 'material-symbols:visibility-off'"
        />
        {{ plant.Dold ? 'Visa' : 'Dölj' }}
      </button>
      <button @click.stop="showConfirmModal = true">
        <Icon name="material-symbols:delete-forever-rounded" /> Ta bort
      </button>
      <button @click="isEditing = !isEditing">
        <p v-if="isEditing">
          <Icon name="material-symbols:cancel-outline-rounded" />
          Avbryt
        </p>
        <p v-else>
          <Icon name="material-symbols:edit" />
          Ändra
        </p>
      </button>
      <div v-if="isEditing" class="edit">
        <div>
          <label>Artnamn: </label>
          <input type="text" v-model="editedPlant.artnamn" />
        </div>
        <div>
          <label>Svenskt Namn: </label>
          <input type="text" v-model="editedPlant.svensktNamn" />
        </div>
        <div>
          <label>Pris: </label>
          <input type="text" v-model="editedPlant.pris" />
        </div>
        <div>
          <label>Antal: </label>
          <input type="text" v-model="editedPlant.antal" />
        </div>
        <div>
          <label>Zon: </label>
          <input type="text" v-model="editedPlant.zon" />
        </div>
        <div>
          <label>Höjd: </label>
          <input type="text" v-model="editedPlant.höjd" />
        </div>
        <div>
          <label>Kruka: </label>
          <input type="text" v-model="editedPlant.kruka" />
        </div>
        <button @click="updatePlant()">Uppdatera</button>
      </div>
    </div>
  </div>
</template>

<style>
.list-el {
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
}

.list-el:hover {
  background: rgba(238, 172, 6, 0.2);
}

.modal {
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  z-index: 3;
  backdrop-filter: blur(2px);
}

.modal-content {
  background: var(--backround-color);
  padding: 1rem;
  border-radius: 0.5rem;
}

.edit > div {
  max-width: 20rem;
  display: grid;
  grid-template-columns: 2fr 3fr;
  place-items: center start;
}

.edit input {
  width: 100%;
}

.admin-expanded {
  padding: 0.5rem;
}
</style>
