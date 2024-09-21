<script setup>
const client = useSupabaseClient();

const { data: images } = await useAsyncData(
  'lindersplantskola-config',
  async () => {
    const { data, error } = await client
      .from('lindersplantskola-config')
      .select()
      .eq('inställning', 'heroBilder')
      .single();
    if (error) console.error(error);
    if (data) {
      console.log(data);
      heroBilderInput.value = data.värde;
    }

    return data.värde;
  }
);

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
</script>

<template>
  <div>
    <div>
      <h2>Bilder i bildkarusselen</h2>
      <p>Format: ["https", "https"]</p>
      <textarea type="text" v-model="heroBilderInput" />
      {{ images }}
      <button @click="heroBilderUpdate()">Spara</button>
      <p class="saved" v-if="heroBilderSaved">Sparad!</p>
    </div>
    <div>
      <h2>Beskrivning brevid bildkarussel</h2>
      <p>Format:</p>
      <textarea type="text" v-model="heroBilderInput" />
      {{ images }}
      <button @click="heroBilderUpdate()">Spara</button>
      <p class="saved" v-if="heroBilderSaved">Sparad!</p>
    </div>
  </div>
</template>

<style></style>
