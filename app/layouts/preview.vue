<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";
import { useThemeStore } from "~/stores/theme";
import { sanitizeNavigationPath } from "~/utils/helpers";
import { MSG } from "~/utils/iframeProtocol";
import type { IframeToParentMessage, IframeMessage } from "~/utils/iframeProtocol";

import { SITE_URL } from "~/utils/seoDescriptions";

useThemeApply();

const store = useThemeStore();
const colorMode = useColorMode();
const router = useRouter();
const route = useRoute();

useHead({
  link: [
    {
      rel: "canonical",
      href: computed(() => `${SITE_URL}${route.path}`),
    },
  ],
});

// Flag to suppress navigate-parent when the parent itself triggered the navigation
const navigatingFromParent = ref(false);

// Preserve ?preview query on every in-iframe navigation so the preview layout stays active
router.beforeEach((to) => {
  if (!("preview" in to.query)) {
    return {
      path: to.path,
      query: { ...to.query, preview: "" },
      hash: to.hash,
    };
  }
});

// After navigation completes, notify parent of user-initiated link clicks
function postToParent(data: IframeToParentMessage) {
  window.parent?.postMessage(data, window.location.origin);
}

router.afterEach((to) => {
  if (navigatingFromParent.value) {
    navigatingFromParent.value = false;
    return;
  }
  postToParent({ type: MSG.NAVIGATE_PARENT, path: to.path });
});

// Listen for theme & color-mode sync messages from parent frame
function handleMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) return;
  const msg = event.data as IframeMessage | undefined;
  if (!msg?.type) return;

  if (msg.type === MSG.THEME_SYNC) {
    store._syncConfig(msg.config);
  }
  if (msg.type === MSG.COLORMODE_SYNC) {
    colorMode.preference = msg.mode;
  }
  if (msg.type === MSG.REQUEST_READY) {
    postToParent({ type: MSG.PREVIEW_READY });
  }
  if (msg.type === MSG.NAVIGATE) {
    const safePath = sanitizeNavigationPath(String(msg.path));
    if (safePath) {
      navigatingFromParent.value = true;
      router.push(safePath).then(() => {
        navigatingFromParent.value = false;
        postToParent({ type: MSG.NAVIGATE_DONE });
      });
    }
  }
}

// Forward undo/redo shortcuts to the parent frame
function handleKeydown(e: KeyboardEvent) {
  const mod = e.ctrlKey || e.metaKey;
  if (!mod || e.key !== "z") return;

  e.preventDefault();
  postToParent({ type: MSG.KEYBOARD_SHORTCUT, key: "z", shift: e.shiftKey });
}

onMounted(() => {
  window.addEventListener("message", handleMessage);
  document.addEventListener("keydown", handleKeydown);
  postToParent({ type: MSG.PREVIEW_READY });
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
  <main class="min-h-screen bg-(--ui-bg)">
    <slot />
  </main>
</template>
