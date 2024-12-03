// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@vueuse/nuxt', '@nuxtjs/supabase', '@nuxtjs/mdc', '@nuxt/image'],

  runtimeConfig: {
    public: {
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      MAILCHIMP: process.env.MAILCHIMP,
    },
  },

  mdc: {
    components: {
      prose: true, // Disable predefined prose components
      map: {
        img: 'Image',
        a: 'Anchor',
      },
    },
  },

  site: { url: 'https://lindersplantskola.se/', name: 'Linders plantskola' },

  // compatibilityDate: '2024-12-01',
});
