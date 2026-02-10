// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/mdc",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "nuxt-security",
  ],

  site: {
    url: "https://nuxt-theme-builder.vercel.app",
    name: "Nuxt UI Theme Builder",
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.svg" },
      ],
      meta: [
        {
          name: "og:image",
          content: "https://nuxt-theme-builder.vercel.app/og-image.png",
        },
      ],
    },
  },

  devtools: { enabled: false },
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

  security: {
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'nonce-{{nonce}}'", "'strict-dynamic'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "connect-src": ["'self'", "https:"],
        "frame-ancestors": ["'self'"],
        "base-uri": ["'none'"],
        "object-src": ["'none'"],
        "script-src-attr": ["'none'"],
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
      },
      permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: [],
      },
      // Defaults already applied by nuxt-security:
      // xContentTypeOptions: 'nosniff'
      // xFrameOptions: 'SAMEORIGIN'
    },
    nonce: true,
  },

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
