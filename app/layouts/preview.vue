<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";
import { useThemeStore } from "~/stores/theme";
import { sanitizeNavigationPath } from "~/utils/helpers";

useThemeApply();

const store = useThemeStore();
const colorMode = useColorMode();
const router = useRouter();
const route = useRoute();

useHead({
  link: [
    {
      rel: "canonical",
      href: computed(
        () => `https://nuxt-theme-builder.vercel.app${route.path}`,
      ),
    },
  ],
});

// Flag to suppress navigate-parent when the parent itself triggered the navigation
const navigatingFromParent = ref(false);

// Preserve ?preview query on every in-iframe navigation so the preview layout stays active
router.beforeEach((to) => {
  if (!("preview" in to.query)) {
    return { path: to.path, query: { ...to.query, preview: "" } };
  }
});

// After navigation completes, notify parent of user-initiated link clicks
router.afterEach((to) => {
  if (navigatingFromParent.value) {
    navigatingFromParent.value = false;
    return;
  }
  window.parent?.postMessage(
    { type: "navigate-parent", path: to.path },
    window.location.origin,
  );
});

// Listen for theme & color-mode sync messages from parent frame
function handleMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) return;

  if (event.data?.type === "theme-sync") {
    store._syncConfig(event.data.config);
  }
  if (event.data?.type === "colormode-sync") {
    colorMode.preference = event.data.mode;
  }
  if (event.data?.type === "request-ready") {
    window.parent?.postMessage(
      { type: "preview-ready" },
      window.location.origin,
    );
  }
  if (event.data?.type === "navigate") {
    const safePath = sanitizeNavigationPath(String(event.data.path));
    if (safePath) {
      navigatingFromParent.value = true;
      router.push(safePath).then(() => {
        navigatingFromParent.value = false;
        window.parent?.postMessage(
          { type: "navigate-done" },
          window.location.origin,
        );
      });
    }
  }
}

// Forward undo/redo shortcuts to the parent frame
function handleKeydown(e: KeyboardEvent) {
  const mod = e.ctrlKey || e.metaKey;
  if (!mod || e.key !== "z") return;

  e.preventDefault();
  window.parent?.postMessage(
    { type: "keyboard-shortcut", key: "z", shift: e.shiftKey },
    window.location.origin,
  );
}

onMounted(() => {
  window.addEventListener("message", handleMessage);
  document.addEventListener("keydown", handleKeydown);
  window.parent?.postMessage({ type: "preview-ready" }, window.location.origin);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
  document.removeEventListener("keydown", handleKeydown);
});

// Allow scrolling inside the iframe (main.css sets body overflow:hidden)
useHead({
  style: [
    {
      key: "preview-overflow",
      innerHTML: "body { overflow: auto !important; }",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg)">
    <slot />
  </div>
</template>
