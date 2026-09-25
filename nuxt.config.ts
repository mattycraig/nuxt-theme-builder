import {
  NOINDEX_DEMO_ROUTES,
  PREVIEW_SHELL_PATH,
  PUBLIC_PRERENDER_ROUTES,
} from "./shared/constants/routes";
import { DEFAULT_FONT, FONT_ENTRIES } from "./shared/constants/theme";

const nitroPreset = process.env.NITRO_PRESET || "vercel";
const enableIsrRouteRules =
  nitroPreset === "vercel" &&
  process.env.VERCEL === "1" &&
  process.env.VERCEL_ENV === "production";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@vercel/analytics/nuxt",
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/mdc",
    "@nuxtjs/sitemap",
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
    sources: ["/api/__sitemap__/urls"],
    exclude: [...NOINDEX_DEMO_ROUTES, PREVIEW_SHELL_PATH],
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Nuxt UI Theme Builder",
      url: "https://nuxt-ui-themes.com",
      logo: "https://nuxt-ui-themes.com/android-chrome-512x512.png",
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
    // Every theme-selectable font from shared/constants/theme. Only the default
    // font is preloaded; the rest are registered but resolve on demand, avoiding
    // 35×4-weight metadata resolution that stalls cold start.
    families: FONT_ENTRIES.map(({ name }) => ({
      name,
      provider: "google" as const,
      global: true,
      ...(name === DEFAULT_FONT ? {} : { preload: false }),
    })),
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
    // removeLoggers strips console/debugger through `esbuild.drop`, which
    // Vite 8 ignores. The client minifier does it instead (vite.$client).
    removeLoggers: false,
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
    // Prerender: Homepage and static info pages (no server-side data deps)
    "/": { prerender: true },
    "/about": { prerender: true },
    "/help": { prerender: true },
    "/privacy": { prerender: true },
    "/contact": { prerender: true },

    // Blank page every preview iframe starts on (see PREVIEW_SHELL_PATH)
    [PREVIEW_SHELL_PATH]: {
      prerender: true,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    },

    // Demo pages are noindex, listed one by one: "/components/**" also
    // matches /components itself, and the sitemap drops any route whose
    // rules carry a noindex header.
    ...Object.fromEntries(
      NOINDEX_DEMO_ROUTES.map((path) => [
        path,
        { headers: { "X-Robots-Tag": "noindex, follow" } },
      ]),
    ),

    // ISR depends on Vercel's production runtime. Disable it for local/dev
    // and CI node-server previews so direct route requests do not 500.
    ...(enableIsrRouteRules
      ? {
          "/components/**": { isr: 3600 },
          "/blocks/**": { isr: 3600 },
          "/templates/**": { isr: 3600 },
          "/tools/**": { isr: 3600 },
        }
      : {}),
    "/learn": { prerender: true },
    "/learn/**": { prerender: true },

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
    // MDC's built-in highlight API also receives raw code in query params
    "/api/_mdc/highlight": {
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
    $client: {
      build: {
        rolldownOptions: {
          output: {
            minify: {
              compress: { dropConsole: true, dropDebugger: true },
              mangle: true,
              codegen: true,
            },
          },
        },
      },
    },
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
    // Force-bundle shiki into serverless output so subpath imports
    // (shiki/core, shiki/engine/javascript, etc.) resolve on Vercel
    externals: {
      inline: ["shiki"],
    },
    // Prerender learn pages so Nuxt Content SQLite queries happen at build
    // time rather than in Vercel Lambda (where better-sqlite3 fails to load)
    prerender: {
      routes: [
        ...PUBLIC_PRERENDER_ROUTES,
      ],
    },
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
    preset: nitroPreset,
  },
});
