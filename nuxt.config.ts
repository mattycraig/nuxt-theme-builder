// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
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
      { name: "DM Sans", provider: "google", global: true },
      { name: "Geist", provider: "google", global: true },
      { name: "Inter", provider: "google", global: true },
      { name: "Poppins", provider: "google", global: true },
      { name: "Outfit", provider: "google", global: true },
      { name: "Raleway", provider: "google", global: true },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
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
});
