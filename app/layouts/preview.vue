<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";
import { useThemeStore } from "~/stores/theme";

useThemeApply();

const store = useThemeStore();
const colorMode = useColorMode();
const router = useRouter();

// Listen for theme & color-mode sync messages from parent frame
function handleMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) return;

  if (event.data?.type === "theme-sync") {
    store._syncConfig(event.data.config);
  }
  if (event.data?.type === "colormode-sync") {
    colorMode.preference = event.data.mode;
  }
  if (event.data?.type === "navigate") {
    const path = String(event.data.path);
    if (path.startsWith("/") && !path.includes("://")) {
      router.push(path).then(() => {
        window.parent?.postMessage(
          { type: "preview-ready" },
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
