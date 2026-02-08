// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/mdc",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
  ],

  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",

  css: ["~/assets/css/main.css"],

  fonts: {
    families: [
      { name: "Public Sans", provider: "google", global: true },
      { name: "DM Sans", provider: "google" },
      { name: "Geist", provider: "google" },
      { name: "Inter", provider: "google" },
      { name: "Poppins", provider: "google" },
      { name: "Outfit", provider: "google" },
      { name: "Raleway", provider: "google" },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
    },
  },

  colorMode: {
    classSuffix: "",
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  vite: {
    optimizeDeps: {
      include: [
        "@nuxt/ui > prosemirror-state",
        "@nuxt/ui > prosemirror-transform",
        "@nuxt/ui > prosemirror-model",
        "@nuxt/ui > prosemirror-view",
      ],
    },
  },
});
