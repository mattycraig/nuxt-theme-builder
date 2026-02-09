import { useThemeStore } from "~/stores/theme";

/**
 * Manages the iframe-based preview panel communication.
 *
 * The editor uses an embedded iframe to render the live theme preview.
 * This composable handles:
 * - Two-way postMessage communication (theme sync, color mode sync, navigation)
 * - Iframe readiness detection with fallback re-request
 * - Route synchronization between host and iframe without full reloads
 */
export function usePreviewIframe() {
  const store = useThemeStore();
  const route = useRoute();
  const colorMode = useColorMode();

  const previewFrame = ref<HTMLIFrameElement>();
  const iframeLoading = ref(true);
  const iframeReady = ref(false);

  const iframeSrc = computed(() => `${route.path}?preview`);
  const iframeInitialSrc = ref(`${route.path}?preview`);

  // When the iframe itself navigates (user clicked a link), skip echoing navigate back
  const navigatingFromIframe = ref(false);

  // ─── Outbound Messages ───────────────────────────────────────────────

  function postToIframe(data: Record<string, unknown>) {
    previewFrame.value?.contentWindow?.postMessage(
      data,
      window.location.origin,
    );
  }

  function syncThemeToIframe(config: unknown) {
    postToIframe({
      type: "theme-sync",
      config: structuredClone(toRaw(config)),
    });
  }

  function syncColorModeToIframe(mode: string) {
    postToIframe({ type: "colormode-sync", mode });
  }

  function navigateIframe(path: string) {
    postToIframe({ type: "navigate", path });
  }

  // ─── Watchers ────────────────────────────────────────────────────────

  // Navigate iframe via postMessage instead of reloading on route change
  watch(iframeSrc, (newSrc) => {
    if (navigatingFromIframe.value) {
      navigatingFromIframe.value = false;
      iframeLoading.value = false;
      return;
    }
    if (!iframeReady.value) return;
    iframeLoading.value = true;
    navigateIframe(newSrc);
  });

  // Sync theme config on every change
  watch(
    () => store.config,
    (newConfig) => syncThemeToIframe(newConfig),
    { deep: true },
  );

  // Sync color mode preference
  watch(
    () => colorMode.preference,
    (pref) => syncColorModeToIframe(pref),
  );

  // ─── Inbound Message Handler ─────────────────────────────────────────

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

  function handleIframeMessage(event: MessageEvent) {
    if (event.origin !== window.location.origin) return;

    switch (event.data?.type) {
      case "navigate-done":
        iframeLoading.value = false;
        break;

      case "navigate-parent": {
        const path = sanitizeNavigationPath(String(event.data.path));
        if (path && path !== route.path) {
          navigatingFromIframe.value = true;
          navigateTo(path);
        }
        break;
      }

      case "preview-ready":
        iframeReady.value = true;
        iframeLoading.value = false;
        syncThemeToIframe(store.config);
        syncColorModeToIframe(colorMode.preference);
        // Navigate iframe to current route if it differs from the initial src
        if (iframeSrc.value !== iframeInitialSrc.value) {
          navigateIframe(iframeSrc.value);
        }
        break;
    }
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────

  /**
   * Fallback: if the iframe loads before the parent registers the listener,
   * the initial preview-ready message is lost. Re-request it on iframe load.
   */
  function handleIframeLoad() {
    if (!iframeReady.value) {
      postToIframe({ type: "request-ready" });
    }
  }

  onMounted(() => {
    if (import.meta.client) {
      window.addEventListener("message", handleIframeMessage);
      // Re-request readiness in case iframe loaded before hydration
      nextTick(() => {
        if (!iframeReady.value && previewFrame.value?.contentWindow) {
          postToIframe({ type: "request-ready" });
        }
      });
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      window.removeEventListener("message", handleIframeMessage);
    }
  });

  return {
    previewFrame,
    iframeLoading,
    iframeReady,
    iframeInitialSrc,
    handleIframeLoad,
  };
}
