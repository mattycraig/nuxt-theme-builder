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

  mdc: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      langs: ["vue", "ts", "css", "json", "bash", "html", "js", "yaml"],
    },
  },

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
        { rel: "dns-prefetch", href: "https://picsum.photos" },
        { rel: "preconnect", href: "https://picsum.photos", crossorigin: "" },
        { rel: "dns-prefetch", href: "https://i.pravatar.cc" },
        { rel: "preconnect", href: "https://i.pravatar.cc", crossorigin: "" },
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
      // Sans-serif
      { name: "Public Sans", provider: "google", global: true },
      { name: "DM Sans", provider: "google", global: true },
      { name: "Figtree", provider: "google", global: true },
      { name: "Geist", provider: "google", global: true },
      { name: "Inter", provider: "google", global: true },
      { name: "Lato", provider: "google", global: true },
      { name: "Montserrat", provider: "google", global: true },
      { name: "Nunito", provider: "google", global: true },
      { name: "Open Sans", provider: "google", global: true },
      { name: "Outfit", provider: "google", global: true },
      { name: "Plus Jakarta Sans", provider: "google", global: true },
      { name: "Poppins", provider: "google", global: true },
      { name: "Raleway", provider: "google", global: true },
      { name: "Roboto", provider: "google", global: true },
      { name: "Source Sans 3", provider: "google", global: true },
      { name: "Space Grotesk", provider: "google", global: true },
      { name: "Work Sans", provider: "google", global: true },
      // Serif
      { name: "Lora", provider: "google", global: true },
      { name: "Merriweather", provider: "google", global: true },
      { name: "Playfair Display", provider: "google", global: true },
      { name: "Source Serif 4", provider: "google", global: true },
      { name: "Libre Baskerville", provider: "google", global: true },
      { name: "DM Serif Display", provider: "google", global: true },
      { name: "Crimson Text", provider: "google", global: true },
      // Monospace
      { name: "JetBrains Mono", provider: "google", global: true },
      { name: "Fira Code", provider: "google", global: true },
      { name: "Source Code Pro", provider: "google", global: true },
      { name: "IBM Plex Mono", provider: "google", global: true },
      { name: "Space Mono", provider: "google", global: true },
      // Display
      { name: "Sora", provider: "google", global: true },
      { name: "Archivo", provider: "google", global: true },
      { name: "Lexend", provider: "google", global: true },
      { name: "Urbanist", provider: "google", global: true },
      { name: "Bricolage Grotesque", provider: "google", global: true },
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
    rateLimiter: process.env.NODE_ENV === "development" ? false : undefined,
    headers: {
      contentSecurityPolicy:
        process.env.NODE_ENV === "development"
          ? false
          : {
              "default-src": ["'self'"],
              "script-src": [
                "'self'",
                "'nonce-{{nonce}}'",
                "'strict-dynamic'",
                "'wasm-unsafe-eval'",
              ],
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
    xssValidator: {
      throwError: true,
    },
  },

  routeRules: {
    // XSS validator disabled because this endpoint accepts raw source code
    // strings (e.g. Vue SFC, TypeScript) that inherently contain HTML-like
    // syntax which triggers false positives. The returned HTML is generated
    // by Shiki (which escapes code tokens) and is only rendered via v-html
    // in CodeBlock.vue with CSP nonce protection.
    "/api/highlight": {
      security: {
        xssValidator: false,
      },
    },
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
