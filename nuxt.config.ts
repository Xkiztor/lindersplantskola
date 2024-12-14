// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/mdc',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  runtimeConfig: {
    public: {
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
      MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
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
