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

  runtimeConfig: {
    comingSoonPassword: process.env.NUXT_COMING_SOON_PASSWORD || "",
    public: {
      comingSoonEnabled: process.env.NUXT_PUBLIC_COMING_SOON_ENABLED === "true",
    },
  },

  site: {
    url: "https://www.nuxt-ui-themes.com",
    name: "Nuxt UI Theme Builder",
  },

  sitemap: {
    // No dynamic sources in this project — all routes are file-based
    zeroRuntime: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "dns-prefetch", href: "https://picsum.photos" },
        { rel: "preconnect", href: "https://picsum.photos", crossorigin: "" },
        { rel: "dns-prefetch", href: "https://i.pravatar.cc" },
        { rel: "preconnect", href: "https://i.pravatar.cc", crossorigin: "" },
      ],
      meta: [
        { name: "theme-color", content: "#6366f1" },
        { name: "msapplication-TileColor", content: "#1e1b4b" },
        {
          name: "og:image",
          content: "https://www.nuxt-ui-themes.com/og-image.png",
        },
        { name: "og:image:width", content: "1200" },
        { name: "og:image:height", content: "630" },
        { name: "og:image:type", content: "image/png" },
        {
          name: "twitter:image",
          content: "https://www.nuxt-ui-themes.com/og-image.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
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
      pathPrefix: true,
      ignore: [
        "~/components/showcase/**",
        "~/components/blocks/content/**",
        "~/components/blocks/components/**",
      ],
    },
    {
      path: "~/components/showcase",
      pathPrefix: false,
      prefix: "Showcase",
      ignore: ["~/components/showcase/components/**"],
    },
    {
      path: "~/components/showcase/components",
      pathPrefix: false,
      prefix: "Showcase",
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
    // in shared/CodeBlock.vue with CSP nonce protection.
    "/api/highlight": {
      security: {
        xssValidator: false,
      },
    },
    "/coming-soon": {
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
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
