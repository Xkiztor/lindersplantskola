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
  heroTextSaved.value = false;
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

// ------------ öppetTider ----------------
const öppetTiderSaved = ref(false);
const öppetTiderInput = ref();
watch(heroTextInput, () => {
  öppetTiderSaved.value = false;
});
const öppetTiderUpdate = async () => {
  console.log('updating');
  const { data, error } = await client
    .from('lindersplantskola-config')
    // .update({ värde: `test` })
    .update({ värde: `${öppetTiderInput.value}` })
    .eq('inställning', 'öppetTider')
    .select();
  if (error) console.error(error);
  if (data) {
    console.log(data);
    öppetTiderSaved.value = true;
  }
};

// --------------------------
// ------------ superlistaReklamTitel ----------------
const superlistaReklamTitelSaved = ref(false);
const superlistaReklamTitelInput = ref();
watch(heroTextInput, () => {
  superlistaReklamTitelSaved.value = false;
});
const superlistaReklamTitelUpdate = async () => {
  console.log('updating');
  const { data, error } = await client
    .from('lindersplantskola-config')
    // .update({ värde: `test` })
    .update({ värde: `${superlistaReklamTitelInput.value}` })
    .eq('inställning', 'superlistaReklamTitel')
    .select();
  if (error) console.error(error);
  if (data) {
    console.log(data);
    superlistaReklamTitelSaved.value = true;
  }
};

// --------------------------
// ------------ superlistaReklamTitel ----------------
const superlistaReklamContentSaved = ref(false);
const superlistaReklamContentInput = ref();
watch(heroTextInput, () => {
  superlistaReklamContentSaved.value = false;
});
const superlistaReklamContentUpdate = async () => {
  console.log('updating');
  const { data, error } = await client
    .from('lindersplantskola-config')
    // .update({ värde: `test` })
    .update({ värde: `${superlistaReklamContentInput.value}` })
    .eq('inställning', 'superlistaReklamContent')
    .select();
  if (error) console.error(error);
  if (data) {
    console.log(data);
    superlistaReklamContentSaved.value = true;
  }
};

// --------------------------
// ------------ superlistaReklamTitel ----------------
const superlistaReklamBildSaved = ref(false);
const superlistaReklamBildInput = ref();
watch(heroTextInput, () => {
  superlistaReklamBildSaved.value = false;
});
const superlistaReklamBildUpdate = async () => {
  console.log('updating');
  const { data, error } = await client
    .from('lindersplantskola-config')
    // .update({ värde: `test` })
    .update({ värde: `${superlistaReklamBildInput.value}` })
    .eq('inställning', 'superlistaReklamBild')
    .select();
  if (error) console.error(error);
  if (data) {
    console.log(data);
    superlistaReklamBildSaved.value = true;
  }
};

// --------------------------

// --------------------------

const { data: settings } = await useAsyncData('lindersplantskola-config', async () => {
  const { data, error } = await client.from('lindersplantskola-config').select();
  // .single();
  // .eq('inställning', 'heroBilder')
  if (error) console.error(error);
  if (data) {
    console.log(data);

    console.log(data.filter((e) => e.inställning === 'heroBilder')[0].värde);

    heroBilderInput.value = data.filter((e) => e.inställning === 'heroBilder')[0].värde;

    heroTextInput.value = data.filter((e) => e.inställning === 'heroText')[0].värde;

    öppetTiderInput.value = data.filter((e) => e.inställning === 'öppetTider')[0].värde;

    superlistaReklamTitelInput.value = data.filter(
      (e) => e.inställning === 'superlistaReklamTitel'
    )[0].värde;
    superlistaReklamContentInput.value = data.filter(
      (e) => e.inställning === 'superlistaReklamContent'
    )[0].värde;
    superlistaReklamBildInput.value = data.filter(
      (e) => e.inställning === 'superlistaReklamBild'
    )[0].värde;
  }

  return data.värde;
});
</script>

<template>
  <div>
    <div class="inställning">
      <h2>Bilder i bildkarusselen</h2>
      <p>Format: ["https", "https"]</p>
      <textarea type="text" v-model="heroBilderInput" />
      <div class="save">
        <button @click="heroBilderUpdate()">Spara</button>
        <p class="saved" v-if="heroBilderSaved">Sparad!</p>
      </div>
    </div>
    <div class="inställning">
      <h2>Beskrivning brevid bildkarussel</h2>
      <p>Format: ["", ""]</p>
      <textarea type="text" v-model="heroTextInput" />
      <div class="save">
        <button @click="heroTextUpdate()">Spara</button>
        <p class="saved" v-if="heroTextSaved">Sparad!</p>
      </div>
    </div>
    <div class="inställning">
      <h2>Öppetider</h2>
      <p>Format: ["", ""]</p>
      <textarea type="text" v-model="öppetTiderInput" />
      <div class="save">
        <button @click="öppetTiderUpdate()">Spara</button>
        <p class="saved" v-if="öppetTiderSaved">Sparad!</p>
      </div>
    </div>
    <div class="inställning">
      <h2>Superlista reklam titel</h2>
      <p>Format:</p>
      <textarea type="text" v-model="superlistaReklamTitelInput" />
      <div class="save">
        <button @click="superlistaReklamTitelUpdate()">Spara</button>
        <p class="saved" v-if="superlistaReklamTitelSaved">Sparad!</p>
      </div>
    </div>
    <div class="inställning">
      <h2>Superlista reklam innehåll</h2>
      <p>Format:</p>
      <textarea type="text" v-model="superlistaReklamContentInput" />
      <div class="save">
        <button @click="superlistaReklamContentUpdate()">Spara</button>
        <p class="saved" v-if="superlistaReklamContentSaved">Sparad!</p>
      </div>
    </div>
    <div class="inställning">
      <h2>Superlista reklam bild</h2>
      <p>Format: https</p>
      <textarea type="text" v-model="superlistaReklamBildInput" />
      <div class="save">
        <button @click="superlistaReklamBildUpdate()">Spara</button>
        <p class="saved" v-if="superlistaReklamBildSaved">Sparad!</p>
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
