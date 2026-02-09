<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";
import { useThemeStore } from "~/stores/theme";

useThemeApply();

const store = useThemeStore();
const colorMode = useColorMode();
const router = useRouter();

// Flag to suppress navigate-parent when the parent itself triggered the navigation
const navigatingFromParent = ref(false);

/** Validate postMessage navigation paths — allow only clean relative paths */
function sanitizeNavigationPath(raw: string): string | null {
  if (typeof raw !== "string") return null;
  try {
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    const pathname = url.pathname;
    if (/[^a-zA-Z0-9/_-]/.test(pathname)) return null;
    return pathname;
  } catch {
    return null;
  }
}

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

onMounted(() => {
  window.addEventListener("message", handleMessage);
  window.parent?.postMessage({ type: "preview-ready" }, window.location.origin);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
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
