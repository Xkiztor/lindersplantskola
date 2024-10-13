<script setup>
const client = useSupabaseClient();

// ------------ heroBilder ----------------
const heroBilderSaved = ref(false);

const heroBilderInput = ref();

watch(heroBilderInput, () => {
  heroBilderSaved.value = false;
});

const heroBilderUpdate = async () => {
  console.log('updating');

  const { data, error } = await client
    .from('lindersplantskola-config')
    // .update({ värde: `test` })
    .update({ värde: `${heroBilderInput.value}` })
    .eq('inställning', 'heroBilder')
    .select();
  if (error) console.error(error);
  if (data) {
    console.log(data);
    heroBilderSaved.value = true;
  }
};
// --------------------

// ------------ heroText ----------------
const heroTextSaved = ref(false);

const heroTextInput = ref();

watch(heroTextInput, () => {
  heroBilderSaved.value = false;
});

const heroTextUpdate = async () => {
  console.log('updating');

  const { data, error } = await client
    .from('lindersplantskola-config')
    // .update({ värde: `test` })
    .update({ värde: `${heroTextInput.value}` })
    .eq('inställning', 'heroText')
    .select();
  if (error) console.error(error);
  if (data) {
    console.log(data);
    heroTextSaved.value = true;
  }
};

// --------------------------

const { data: images } = await useAsyncData(
  'lindersplantskola-config',
  async () => {
    const { data, error } = await client
      .from('lindersplantskola-config')
      .select();
    // .single();
    // .eq('inställning', 'heroBilder')
    if (error) console.error(error);
    if (data) {
      console.log(data);

      console.log(data.filter((e) => e.inställning === 'heroBilder')[0].värde);

      heroBilderInput.value = data.filter(
        (e) => e.inställning === 'heroBilder'
      )[0].värde;

      heroTextInput.value = data.filter(
        (e) => e.inställning === 'heroText'
      )[0].värde;
    }

    return data.värde;
  }
);
</script>

<template>
  <div>
    <div class="inställning">
      <h2>Bilder i bildkarusselen</h2>
      <p>Format: ["https", "https"]</p>
      <textarea type="text" v-model="heroBilderInput" />
      {{ images }}
      <div class="save">
        <button @click="heroBilderUpdate()">Spara</button>
        <p class="saved" v-if="heroBilderSaved">Sparad!</p>
      </div>
    </div>
    <div class="inställning">
      <h2>Beskrivning brevid bildkarussel</h2>
      <p>Format:</p>
      <textarea type="text" v-model="heroTextInput" />
      {{ images }}
      <div class="save">
        <button @click="heroTextUpdate()">Spara</button>
        <p class="saved" v-if="heroTextSaved">Sparad!</p>
      </div>
    </div>
    <div class="inställning">
      <h2>Öppetider</h2>
      <p>Format:</p>
      <textarea type="text" v-model="heroTextInput" />
      {{ images }}
      <div class="save">
        <button @click="heroTextUpdate()">Spara</button>
        <p class="saved" v-if="heroTextSaved">Sparad!</p>
      </div>
    </div>
  </div>
</template>

<style>
.inställning {
  margin-bottom: 1rem;
}

.inställning textarea {
  width: 100%;
  resize: vertical;
  min-height: 5rem;
}

.save {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
</style>
