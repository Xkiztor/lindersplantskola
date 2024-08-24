<script setup>
const client = useSupabaseClient();

// ------------ heroBilder ----------------
const heroBilderSaved = ref(false);

const heroBilderInput = ref();

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
// --------------------
</script>

<template>
  <div>
    <div>
      <h2>Bilder i bildkarusselen</h2>
      <p>Format: ["https", "https"]</p>
      <textarea type="text" v-model="heroBilderInput" />
      {{ images }}
      <button @click="heroBilderUpdate()">Spara</button>
    </div>
  </div>
</template>

<style></style>
