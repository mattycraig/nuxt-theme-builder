---
paths:
  - "app/app.vue"
  - "app/layouts/**"
  - "app/composables/usePreview*.ts"
  - "app/composables/useSourceCode.ts"
  - "app/utils/iframeProtocol.ts"
  - "app/components/preview/**"
  - "app/components/layout/**"
  - "modules/**"
  - "server/api/source/**"
---

# Preview, layout, and source-view rules

- `app.vue` decides the layout (`coming-soon` / `preview` / `default`). `definePageMeta({ layout })` is ignored because `<NuxtLayout :name>` wins.
- Only demo routes use the iframe (`isFramedRoute`: `/components/*`, `/blocks/*`, `/templates/*`, and `/ai`). For those, the default layout renders the page twice: hidden and `inert` (for route reactivity) and inside the iframe (visible, `?preview`). Every other page is shown directly in the same `<slot />` container, which scrolls on its own, so the layout resets its scroll position and handles `#hash` targets. Pages meant to be indexed must stay out of the iframe, since the iframe document is `noindex`. Don't remove the `<slot />` wrapper in `default.vue`, and don't split it into two containers (the page would remount when switching modes).
- Preview iframes (editor and fullscreen) always load `PREVIEW_SHELL_PATH` (`/preview`) first, then the parent sends `NAVIGATE` after `PREVIEW_READY`. Never point an iframe `src` at `<route>?preview`: pages are prerendered without their query, so that URL serves the editor's HTML (with its own nested iframe) and only switches layout after hydration. Top-level `?preview` URLs still work, just slowly (the AI e2e specs use them).
- Every postMessage handler checks `event.origin === window.location.origin` and switches on `MSG.*` constants. Add new message types to `iframeProtocol.ts` (constant + interface + the right union) before using them.
- Navigation paths from messages go through `sanitizeNavigationPath`. Parent and iframe both suppress echo navigations with a flag; preserve that when changing navigation.
- `useSourceCode`, `usePreviewFullscreen`, `useSaveThemeModal`, and `useExportPanel` are module-level singletons shared by several components. Code that reacts to shared state must tolerate being registered once per caller (dedupe fetches, ignore stale responses).
- Source view is only for `/templates/*` (not the index). If retrieval changes, keep `modules/source-code-embed.ts`, `server/api/source/[...path].get.ts`, `app/utils/security.ts` (`isAllowedSourcePath`), and `useSourceCode` in sync.
- The source map is built once at Nuxt startup. Restart `pnpm dev` to see edits to page source in the viewer.
