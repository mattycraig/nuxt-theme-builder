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
- The default layout renders the page twice: hidden (for route reactivity) and inside the iframe (visible, `?preview`). Don't remove the hidden `<slot />` wrapper in `default.vue`.
- Every postMessage handler checks `event.origin === window.location.origin` and switches on `MSG.*` constants. Add new message types to `iframeProtocol.ts` (constant + interface + the right union) before using them.
- Navigation paths from messages go through `sanitizeNavigationPath`. Parent and iframe both suppress echo navigations with a flag; preserve that when changing navigation.
- `useSourceCode`, `usePreviewFullscreen`, `useSaveThemeModal`, and `useExportPanel` are module-level singletons shared by several components. Code that reacts to shared state must tolerate being registered once per caller (dedupe fetches, ignore stale responses).
- Source view is only for `/templates/*` (not the index). If retrieval changes, keep `modules/source-code-embed.ts`, `server/api/source/[...path].get.ts`, `app/utils/security.ts` (`isAllowedSourcePath`), and `useSourceCode` in sync.
- The source map is built once at Nuxt startup. Restart `pnpm dev` to see edits to page source in the viewer.
