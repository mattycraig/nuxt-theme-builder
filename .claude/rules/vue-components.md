---
paths:
  - "app/**/*.vue"
---

# Vue component rules

- `<script setup lang="ts">`, typed `defineProps` / `defineEmits`, Composition API only. Nuxt, Vue, VueUse, Pinia store, and component imports are auto-imported, so don't add manual imports for them unless the file already does.
- Component names come from their folder (`pathPrefix: true`): `components/editor/preset/Selector.vue` → `<EditorPresetSelector>`. `components/showcase/**` is exposed as `Showcase*`; `components/blocks/{content,components}/**` are loaded explicitly, not auto-imported.
- Style with Nuxt UI components and semantic tokens (`bg-(--ui-bg-elevated)`, `text-(--ui-text-muted)`, `border-(--ui-border)`, `color="primary"`). Raw palette classes (`bg-blue-500`) don't follow the theme being edited; only use them for fixed decorations such as window-chrome dots.
- Icons: `i-lucide-*`, or `i-simple-icons-*` for brand logos.
- Hydration: SSR and the first client render must match. Values from localStorage, `Date.now()`, `Math.random()`, or `window` belong behind `useMounted()` or `<ClientOnly>`.
- Accessibility (the Lighthouse accessibility gate is 0.9): icon-only buttons need `aria-label`; decorative icons get `aria-hidden="true"`; use real `<button>` / `<a>` elements; keep visible focus styles; announce async status with `aria-live` regions; don't convey meaning by color alone.
- Keep editor leaf components free of direct store coupling where practical. Take `modelValue` + emit updates, and let the panel/orchestrator call store setters.
- No `v-html` except for sanitized, trusted output (see `SharedCodeBlock`, which uses DOMPurify).
