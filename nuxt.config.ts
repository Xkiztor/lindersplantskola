// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    ['@storyblok/nuxt', { accessToken: 'a32oT9XFKc0g2yhyjpiQ6Qtt' }],
    '@nuxtjs/supabase',
  ],
  image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com',
    },
  },
  runtimeConfig: {
    public: {
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    },
  },
});
