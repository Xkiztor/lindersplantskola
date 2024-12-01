<script setup>
const client = useSupabaseClient();

const { data: bloggar } = await useAsyncData('bloggar', async () => {
  const { data, error } = await client
    .from('bloggar-import')
    .select()
    .order('post_date', { ascending: true });
  // .eq('Dold', 'FALSE');m
  // .single();
  if (error) {
    console.error(error);
  }
  console.log(data);
  return data;
});

const formattedList = computed(() => {
  var newList = bloggar.value;

  // newList = newList.map(item => (...item, post_content: item.post_content.replace(/<[^>]*>/g, '')))

  // - <img/> to ![]()
  newList = newList.map((item) => ({
    ...item, // Keep other properties intact
    post_content_formatted: item.post_content
      ? item.post_content
          .replace(/<img[^>]*>/g, '![]()')
          .replace(/<[^>]*>/g, '\n')
          .replace(/\n+/g, '\n')
          .trim()
      : // .replace(/<[^!>]*>/g, '\n')
        item.post_content,
  }));

  // - filter html tags
  // newList = newList.map((item) => ({
  //   ...item, // Keep other properties intact
  //   post_content_formatted: item.post_content
  //     ? item.post_content.replace(/<[^!>]*>/g, '-removed-')
  //     : // .replace(/<[^>]*>/g, '\n')
  //       // .replace(/\n+/g, '\n')
  //       // .trim()
  //       item.post_content,
  // }));

  console.log(newList);

  return newList;
});

const upload = async () => {
  const { data, error } = await client
    .from('bloggar-new')
    .insert(formattedList.value)
    .select();

  // .eq('Dold', 'FALSE');m
  // .single();
  if (error) {
    console.error(error);
  }
  console.log(data);
  return data;
};
</script>

<template>
  <div class="bloggar">
    <button @click="upload()">Ladda upp</button>
    <ul>
      <li v-for="blog in formattedList">
        <p class="title">{{ blog.post_title }}</p>
        <p>{{ blog.post_content }}</p>
        <p>{{ blog.post_content_formatted }}</p>
      </li>
    </ul>
  </div>
</template>

<style>
.bloggar li {
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
}

.bloggar li p {
  margin-bottom: 1rem;
}
</style>
