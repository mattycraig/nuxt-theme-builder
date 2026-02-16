import { useThemeStore } from "~/stores/theme";
import { sanitizeNavigationPath, showThemeAppliedToast } from "~/utils/helpers";
import { ThemeConfigSchema } from "~/types/theme";
import type { ThemeConfig } from "~/types/theme";
import { MSG } from "~/utils/iframeProtocol";

/** Callback interface for the message handler, enabling direct unit testing. */
export interface IframeMessageActions {
  setIframeLoading: (v: boolean) => void;
  setIframeReady: (v: boolean) => void;
  syncThemeToIframe: (config: unknown) => void;
  syncColorModeToIframe: (mode: string) => void;
  navigateIframe: (path: string) => void;
  navigateTo: (path: string) => void;
  loadConfig: (config: ThemeConfig) => void;
  showToast: () => void;
  openSaveAs: () => void;
  exportOpen: () => void;
  undo: () => void;
  redo: () => void;
  setNavigatingFromIframe: (v: boolean) => void;
}

export interface IframeMessageContext {
  routePath: string;
  iframeSrc: string;
  iframeInitialSrc: string;
  colorModePreference: string;
  storeConfig: unknown;
  origin: string;
}

/**
 * Creates the iframe message handler. Exported for direct unit testing.
 */
export function createIframeMessageHandler(
  actions: IframeMessageActions,
  getContext: () => IframeMessageContext,
) {
  return (event: MessageEvent) => {
    const ctx = getContext();
    if (event.origin !== ctx.origin) return;

    switch (event.data?.type) {
      case MSG.NAVIGATE_DONE:
        actions.setIframeLoading(false);
        break;

      case MSG.NAVIGATE_PARENT: {
        const path = sanitizeNavigationPath(String(event.data.path));
        if (path && path !== ctx.routePath) {
          actions.setNavigatingFromIframe(true);
          actions.navigateTo(path);
        }
        break;
      }

      case MSG.PREVIEW_READY:
        actions.setIframeReady(true);
        actions.setIframeLoading(false);
        actions.syncThemeToIframe(ctx.storeConfig);
        actions.syncColorModeToIframe(ctx.colorModePreference);
        if (ctx.iframeSrc !== ctx.iframeInitialSrc) {
          actions.navigateIframe(ctx.iframeSrc);
        }
        break;

      case MSG.APPLY_AI_THEME: {
        const validated = ThemeConfigSchema.safeParse(event.data.config);
        if (validated.success) {
          actions.loadConfig(validated.data as ThemeConfig);
          actions.showToast();
          if (event.data.save) {
            actions.openSaveAs();
          }
          if (event.data.export) {
            actions.exportOpen();
          }
        }
        break;
      }

      case MSG.KEYBOARD_SHORTCUT: {
        if (event.data.key === "z") {
          if (event.data.shift) {
            actions.redo();
          } else {
            actions.undo();
          }
        }
        break;
      }
    }
  };
}

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

  const handleIframeMessage = createIframeMessageHandler(
    {
      setIframeLoading: (v) => { iframeLoading.value = v; },
      setIframeReady: (v) => { iframeReady.value = v; },
      syncThemeToIframe,
      syncColorModeToIframe,
      navigateIframe,
      navigateTo: (path) => { navigatingFromIframe.value = true; navigateTo(path); },
      loadConfig: (config) => { store.loadConfig(config); },
      showToast: () => { showThemeAppliedToast(toast); },
      openSaveAs: () => { openSaveAs(); },
      exportOpen: () => { exportPanel.open(); },
      undo: () => { store.undo(); },
      redo: () => { store.redo(); },
      setNavigatingFromIframe: (v) => { navigatingFromIframe.value = v; },
    },
    () => ({
      routePath: route.path,
      iframeSrc: iframeSrc.value,
      iframeInitialSrc: iframeInitialSrc.value,
      colorModePreference: colorMode.preference,
      storeConfig: store.config,
      origin: window.location.origin,
    }),
  );

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
