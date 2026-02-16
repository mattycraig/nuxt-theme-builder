import { useThemeStore } from "~/stores/theme";
import { sanitizeNavigationPath, showThemeAppliedToast } from "~/utils/helpers";
import { ThemeConfigSchema } from "~/types/theme";
import type { ThemeConfig } from "~/types/theme";
import { MSG } from "~/utils/iframeProtocol";

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
  const toast = useToast();
  const { openSaveAs } = useSaveThemeModal();
  const exportPanel = useExportPanel();

  const previewFrame = ref<HTMLIFrameElement>();
  const iframeLoading = ref(true);
  const iframeReady = ref(false);

  const iframeSrc = computed(() => `${route.path}?preview`);
  const iframeInitialSrc = ref(`${route.path}?preview`);

  // When the iframe itself navigates (user clicked a link), skip echoing navigate back
  const navigatingFromIframe = ref(false);

  // Outbound Messages ───────────────────────────────────────────────

  function postToIframe(data: Record<string, unknown>) {
    previewFrame.value?.contentWindow?.postMessage(
      data,
      window.location.origin,
    );
  }

  function syncThemeToIframe(config: unknown) {
    postToIframe({
      type: MSG.THEME_SYNC,
      config: structuredClone(toRaw(config)),
    });
  }

  function syncColorModeToIframe(mode: string) {
    postToIframe({ type: MSG.COLORMODE_SYNC, mode });
  }

  function navigateIframe(path: string) {
    postToIframe({ type: MSG.NAVIGATE, path });
  }

  // Watchers ────────────────────────────────────────────────────────

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

  // Inbound Message Handler ─────────────────────────────────────────

  function handleIframeMessage(event: MessageEvent) {
    if (event.origin !== window.location.origin) return;

    switch (event.data?.type) {
      case MSG.NAVIGATE_DONE:
        iframeLoading.value = false;
        break;

      case MSG.NAVIGATE_PARENT: {
        const path = sanitizeNavigationPath(String(event.data.path));
        if (path && path !== route.path) {
          navigatingFromIframe.value = true;
          navigateTo(path);
        }
        break;
      }

      case MSG.PREVIEW_READY:
        iframeReady.value = true;
        iframeLoading.value = false;
        syncThemeToIframe(store.config);
        syncColorModeToIframe(colorMode.preference);
        // Navigate iframe to current route if it differs from the initial src
        if (iframeSrc.value !== iframeInitialSrc.value) {
          navigateIframe(iframeSrc.value);
        }
        break;

      case MSG.APPLY_AI_THEME: {
        const validated = ThemeConfigSchema.safeParse(event.data.config);
        if (validated.success) {
          store.loadConfig(validated.data as ThemeConfig);
          showThemeAppliedToast(toast);
          if (event.data.save) {
            openSaveAs();
          }
          if (event.data.export) {
            exportPanel.open();
          }
        }
        break;
      }

      case MSG.KEYBOARD_SHORTCUT: {
        if (event.data.key === "z") {
          if (event.data.shift) {
            store.redo();
          } else {
            store.undo();
          }
        }
        break;
      }
    }
  }

  // Lifecycle ───────────────────────────────────────────────────────

  /**
   * Fallback: if the iframe loads before the parent registers the listener,
   * the initial preview-ready message is lost. Re-request it on iframe load.
   */
  function handleIframeLoad() {
    if (!iframeReady.value) {
      postToIframe({ type: MSG.REQUEST_READY });
    }
  }

  onMounted(() => {
    if (import.meta.client) {
      window.addEventListener("message", handleIframeMessage);
      // Re-request readiness in case iframe loaded before hydration
      nextTick(() => {
        if (!iframeReady.value && previewFrame.value?.contentWindow) {
          postToIframe({ type: MSG.REQUEST_READY });
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
    iframeSrc,
    iframeInitialSrc,
    handleIframeLoad,
    syncThemeToIframe,
  };
}
