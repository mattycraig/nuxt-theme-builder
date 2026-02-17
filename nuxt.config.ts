// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/mdc",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
    "nuxt-schema-org",
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
    url: "https://nuxt-ui-themes.com",
    name: "Nuxt UI Theme Builder",
  },

  sitemap: {
    // No dynamic sources in this project — all routes are file-based
    zeroRuntime: true,
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Nuxt UI Theme Builder",
      url: "https://nuxt-ui-themes.com",
      logo: "https://nuxt-ui-themes.com/android-chrome-512x512.png",
    },
  },

  scripts: {
    defaultScriptOptions: {
      trigger: "onNuxtReady",
    },
  },

  ogImage: {
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
    },
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
          property: "og:image",
          content: "https://nuxt-ui-themes.com/og-image.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
        {
          name: "twitter:image",
          content: "https://nuxt-ui-themes.com/og-image.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    },
  },

  devtools: { enabled: process.env.NODE_ENV === "development" },
  compatibilityDate: "2025-01-01",

  experimental: {
    // Caches build artifacts between restarts — dramatically speeds up subsequent cold starts
    buildCache: true,
  },

  css: ["~/assets/css/main.css"],

  fonts: {
    families: [
      // Default font — preloaded globally for instant availability
      { name: "Geist", provider: "google", global: true },
      // All other theme-selectable fonts: registered but NOT preloaded.
      // @nuxt/fonts resolves metadata on demand instead of at startup,
      // avoiding 35×4-weight resolution that stalls cold start.
      // Sans-serif
      { name: "Public Sans", provider: "google", global: true, preload: false },
      { name: "DM Sans", provider: "google", global: true, preload: false },
      { name: "Figtree", provider: "google", global: true, preload: false },
      { name: "Inter", provider: "google", global: true, preload: false },
      { name: "Lato", provider: "google", global: true, preload: false },
      { name: "Montserrat", provider: "google", global: true, preload: false },
      { name: "Nunito", provider: "google", global: true, preload: false },
      { name: "Open Sans", provider: "google", global: true, preload: false },
      { name: "Outfit", provider: "google", global: true, preload: false },
      {
        name: "Plus Jakarta Sans",
        provider: "google",
        global: true,
        preload: false,
      },
      { name: "Poppins", provider: "google", global: true, preload: false },
      { name: "Raleway", provider: "google", global: true, preload: false },
      { name: "Roboto", provider: "google", global: true, preload: false },
      {
        name: "Source Sans 3",
        provider: "google",
        global: true,
        preload: false,
      },
      {
        name: "Space Grotesk",
        provider: "google",
        global: true,
        preload: false,
      },
      { name: "Work Sans", provider: "google", global: true, preload: false },
      // Serif
      { name: "Lora", provider: "google", global: true, preload: false },
      {
        name: "Merriweather",
        provider: "google",
        global: true,
        preload: false,
      },
      {
        name: "Playfair Display",
        provider: "google",
        global: true,
        preload: false,
      },
      {
        name: "Source Serif 4",
        provider: "google",
        global: true,
        preload: false,
      },
      {
        name: "Libre Baskerville",
        provider: "google",
        global: true,
        preload: false,
      },
      {
        name: "DM Serif Display",
        provider: "google",
        global: true,
        preload: false,
      },
      {
        name: "Crimson Text",
        provider: "google",
        global: true,
        preload: false,
      },
      // Monospace
      {
        name: "JetBrains Mono",
        provider: "google",
        global: true,
        preload: false,
      },
      { name: "Fira Code", provider: "google", global: true, preload: false },
      {
        name: "Source Code Pro",
        provider: "google",
        global: true,
        preload: false,
      },
      {
        name: "IBM Plex Mono",
        provider: "google",
        global: true,
        preload: false,
      },
      { name: "Space Mono", provider: "google", global: true, preload: false },
      // Display
      { name: "Sora", provider: "google", global: true, preload: false },
      { name: "Archivo", provider: "google", global: true, preload: false },
      { name: "Lexend", provider: "google", global: true, preload: false },
      { name: "Urbanist", provider: "google", global: true, preload: false },
      {
        name: "Bricolage Grotesque",
        provider: "google",
        global: true,
        preload: false,
      },
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
    // Disable all security overhead in dev to avoid 431 header-too-large errors
    enabled: process.env.NODE_ENV !== "development",
    rateLimiter: process.env.NODE_ENV === "development" ? false : undefined,
    headers: {
      contentSecurityPolicy: {
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
    // ISR: Homepage and static info pages - revalidate daily
    "/": { isr: 86400 },
    "/about": { isr: 86400 },
    "/help": { isr: 86400 },
    "/privacy": { isr: 86400 },
    "/contact": { isr: 86400 },

    // ISR: Component/block/template preview pages - revalidate hourly
    "/components/**": { isr: 3600 },
    "/blocks/**": { isr: 3600 },
    "/templates/**": { isr: 3600 },
    "/learn/**": { isr: 3600 },
    "/tools/**": { isr: 3600 },

    // Dynamic routes - no caching (AI generation, auth)
    "/ai": { isr: false },
    "/api/**": { isr: false },

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
      isr: false,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        // Pre-bundle CJS deps to avoid repeated transforms during dev
        "@nuxt/ui > prosemirror-state",
        "@nuxt/ui > prosemirror-transform",
        "@nuxt/ui > prosemirror-model",
        "@nuxt/ui > prosemirror-view",
        "zod",
        "pinia",
        "pinia-plugin-persistedstate",
      ],
    },
  },

  nitro: {
    // Vercel-specific configuration
    vercel: {
      config: {
        // Enable on-demand ISR revalidation via bypass token
        bypassToken: process.env.VERCEL_BYPASS_TOKEN,
      },
      functions: {
        // AI generation needs extended duration for LLM round-trips
        maxDuration: 60,
      },
    },
    // Optimize serverless function bundling
    preset: "vercel",
  },
});
