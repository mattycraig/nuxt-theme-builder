import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { nextTick } from "vue";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { DEFAULT_THEME } from "~/utils/defaults";
import { useThemeStore } from "~/stores/theme";
import { mountWithComposable } from "../../setup/component";
import { createThemeConfig } from "../../setup/fixtures";
import {
  usePreviewIframe,
  createIframeMessageHandler,
  type IframeMessageActions,
  type IframeMessageContext,
} from "~/composables/usePreviewIframe";

/**
 * Tests for the handleIframeMessage dispatch logic in usePreviewIframe.
 *
 * Uses the real `createIframeMessageHandler` factory — no duplicated logic.
 */

const ORIGIN = "http://localhost:3000";

const { navigateToMock, toastAddMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
  toastAddMock: vi.fn(),
}));
mockNuxtImport("navigateTo", () => navigateToMock);
mockNuxtImport("useToast", () => () => ({ add: toastAddMock }));

function makeActions(): IframeMessageActions {
  return {
    setIframeLoading: vi.fn(),
    setIframeReady: vi.fn(),
    syncThemeToIframe: vi.fn(),
    syncColorModeToIframe: vi.fn(),
    navigateIframe: vi.fn(),
    navigateTo: vi.fn(),
    loadConfig: vi.fn(),
    showToast: vi.fn(),
    openSaveAs: vi.fn(),
    exportOpen: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    randomizeTheme: vi.fn(),
    setNavigatingFromIframe: vi.fn(),
  };
}

const defaultCtx: IframeMessageContext = {
  routePath: "/",
  iframeSrc: "/?preview",
  iframeInitialSrc: "/?preview",
  colorModePreference: "light",
  storeConfig: DEFAULT_THEME,
  origin: ORIGIN,
};

function createMessageEvent(
  origin: string,
  data: Record<string, unknown> | null,
): MessageEvent {
  return new MessageEvent("message", { origin, data: data as never });
}

describe("usePreviewIframe — message handler logic", () => {
  let actions: IframeMessageActions;
  let handleMessage: (event: MessageEvent) => void;
  let ctx: IframeMessageContext;

  beforeEach(() => {
    actions = makeActions();
    ctx = { ...defaultCtx };
    handleMessage = createIframeMessageHandler(actions, () => ctx);
  });

  describe("origin check", () => {
    it("ignores messages from other origins", () => {
      handleMessage(
        createMessageEvent("https://evil.com", { type: "navigate-done" }),
      );
      expect(actions.setIframeLoading).not.toHaveBeenCalled();
    });

    it("processes messages from same origin", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "navigate-done" }),
      );
      expect(actions.setIframeLoading).toHaveBeenCalledWith(false);
    });
  });

  describe("navigate-done", () => {
    it("sets iframeLoading to false", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "navigate-done" }),
      );
      expect(actions.setIframeLoading).toHaveBeenCalledWith(false);
    });
  });

  describe("navigate-parent", () => {
    it("navigates host to sanitized path", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "navigate-parent", path: "/ai" }),
      );
      expect(actions.navigateTo).toHaveBeenCalledWith("/ai");
      expect(actions.setNavigatingFromIframe).toHaveBeenCalledWith(true);
    });

    it("does not navigate when path matches current route", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "navigate-parent", path: "/" }),
      );
      expect(actions.navigateTo).not.toHaveBeenCalled();
    });

    it("does not navigate for invalid paths", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "navigate-parent",
          path: "https://evil.com/attack",
        }),
      );
      expect(actions.navigateTo).not.toHaveBeenCalled();
    });

    it("does not navigate for paths with special characters", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "navigate-parent",
          path: "/foo<script>alert(1)</script>",
        }),
      );
      expect(actions.navigateTo).not.toHaveBeenCalled();
    });
  });

  describe("preview-ready", () => {
    it("marks iframe as ready and stops loading", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "preview-ready" }),
      );
      expect(actions.setIframeReady).toHaveBeenCalledWith(true);
      expect(actions.setIframeLoading).toHaveBeenCalledWith(false);
    });

    it("syncs theme and color mode on ready", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "preview-ready" }),
      );
      expect(actions.syncThemeToIframe).toHaveBeenCalledWith(DEFAULT_THEME);
      expect(actions.syncColorModeToIframe).toHaveBeenCalledWith("light");
    });

    it("does not navigate iframe when src matches initial", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "preview-ready" }),
      );
      expect(actions.navigateIframe).not.toHaveBeenCalled();
    });

    it("navigates iframe when src differs from initial", () => {
      ctx = { ...defaultCtx, iframeSrc: "/ai?preview" };
      handleMessage(
        createMessageEvent(ORIGIN, { type: "preview-ready" }),
      );
      expect(actions.navigateIframe).toHaveBeenCalledWith("/ai?preview");
    });
  });

  describe("apply-ai-theme", () => {
    it("loads valid theme and shows toast", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "apply-ai-theme",
          config: DEFAULT_THEME,
        }),
      );
      expect(actions.loadConfig).toHaveBeenCalled();
      expect(actions.showToast).toHaveBeenCalled();
    });

    it("ignores invalid theme config", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "apply-ai-theme",
          config: { invalid: true },
        }),
      );
      expect(actions.loadConfig).not.toHaveBeenCalled();
    });

    it("opens save modal when save flag is true", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "apply-ai-theme",
          config: DEFAULT_THEME,
          save: true,
        }),
      );
      expect(actions.openSaveAs).toHaveBeenCalled();
    });

    it("does not open save modal when save flag is absent", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "apply-ai-theme",
          config: DEFAULT_THEME,
        }),
      );
      expect(actions.openSaveAs).not.toHaveBeenCalled();
    });

    it("opens export panel when export flag is true", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "apply-ai-theme",
          config: DEFAULT_THEME,
          export: true,
        }),
      );
      expect(actions.exportOpen).toHaveBeenCalled();
    });

    it("does not open export panel when export flag is absent", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "apply-ai-theme",
          config: DEFAULT_THEME,
        }),
      );
      expect(actions.exportOpen).not.toHaveBeenCalled();
    });
  });

  describe("keyboard-shortcut", () => {
    it("calls undo for z key without shift", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "keyboard-shortcut",
          key: "z",
          shift: false,
        }),
      );
      expect(actions.undo).toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
    });

    it("calls redo for z key with shift", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "keyboard-shortcut",
          key: "z",
          shift: true,
        }),
      );
      expect(actions.redo).toHaveBeenCalled();
      expect(actions.undo).not.toHaveBeenCalled();
    });

    it("does nothing for non-z keys", () => {
      handleMessage(
        createMessageEvent(ORIGIN, {
          type: "keyboard-shortcut",
          key: "x",
          shift: false,
        }),
      );
      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
    });
  });

  describe("unknown message types", () => {
    it("does nothing for unknown type", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "unknown-type" }),
      );
      expect(actions.setIframeLoading).not.toHaveBeenCalled();
      expect(actions.setIframeReady).not.toHaveBeenCalled();
      expect(actions.navigateTo).not.toHaveBeenCalled();
      expect(actions.loadConfig).not.toHaveBeenCalled();
    });

    it("does nothing for null data", () => {
      handleMessage(
        createMessageEvent(ORIGIN, null),
      );
      expect(actions.setIframeLoading).not.toHaveBeenCalled();
    });
  });

  describe("randomize-theme", () => {
    it("calls randomizeTheme action", () => {
      handleMessage(
        createMessageEvent(ORIGIN, { type: "randomize-theme" }),
      );
      expect(actions.randomizeTheme).toHaveBeenCalled();
    });
  });
});

describe("usePreviewIframe — wiring", () => {
  let store: ReturnType<typeof useThemeStore>;
  let postMessage: ReturnType<typeof vi.fn>;
  let mounted: Awaited<
    ReturnType<typeof mountWithComposable<ReturnType<typeof usePreviewIframe>>>
  >;

  function send(data: Record<string, unknown>, origin = window.location.origin) {
    window.dispatchEvent(new MessageEvent("message", { origin, data }));
  }

  function sentTypes(): string[] {
    return postMessage.mock.calls.map(([msg]) => (msg as { type: string }).type);
  }

  beforeEach(async () => {
    store = useThemeStore();
    store.resetToDefaults();
    navigateToMock.mockClear();
    toastAddMock.mockClear();
    postMessage = vi.fn();
    mounted = await mountWithComposable(() => usePreviewIframe());
    mounted.result.previewFrame.value = {
      contentWindow: { postMessage },
    } as unknown as HTMLIFrameElement;
  });

  afterEach(() => {
    mounted.wrapper.unmount();
    useSaveThemeModal().cancel();
    useExportPanel().close();
  });

  it("completes the ready handshake with the current theme and color mode", () => {
    send({ type: "preview-ready" });

    expect(mounted.result.iframeReady.value).toBe(true);
    expect(mounted.result.iframeLoading.value).toBe(false);
    expect(sentTypes()).toEqual(["theme-sync", "colormode-sync"]);
    expect(postMessage.mock.calls[0]![0]).toMatchObject({
      config: store.config,
    });
    expect(postMessage.mock.calls[0]![1]).toBe(window.location.origin);
  });

  it("ignores messages from other origins", () => {
    send({ type: "preview-ready" }, "https://evil.example");
    expect(mounted.result.iframeReady.value).toBe(false);
    expect(postMessage).not.toHaveBeenCalled();
  });

  it("re-requests readiness on iframe load only until the iframe is ready", () => {
    mounted.result.handleIframeLoad();
    expect(sentTypes()).toEqual(["request-ready"]);

    send({ type: "preview-ready" });
    postMessage.mockClear();
    mounted.result.handleIframeLoad();
    expect(postMessage).not.toHaveBeenCalled();
  });

  it("pushes theme changes to the iframe", async () => {
    store.setRadiusForMode("light", 0.75);
    await nextTick();
    expect(sentTypes()).toContain("theme-sync");
    const last = postMessage.mock.calls.at(-1)![0] as { config: { radius: number } };
    expect(last.config.radius).toBe(0.75);
  });

  it("pushes color mode changes to the iframe", async () => {
    useColorMode().preference = "dark";
    await nextTick();
    expect(postMessage).toHaveBeenCalledWith(
      { type: "colormode-sync", mode: "dark" },
      window.location.origin,
    );
    useColorMode().preference = "system";
  });

  it("applies a validated AI theme, shows a toast, and opens save and export", () => {
    const config = createThemeConfig({
      colors: { ...DEFAULT_THEME.colors, primary: "rose" },
    });
    send({ type: "apply-ai-theme", config, save: true, export: true });

    expect(store.config.colors.primary).toBe("rose");
    expect(toastAddMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Theme applied" }),
    );
    expect(useSaveThemeModal().isOpen.value).toBe(true);
    expect(useExportPanel().isOpen.value).toBe(true);
  });

  it("forwards undo and redo shortcuts from the iframe to the store", () => {
    store.setRadiusForMode("light", 0.75);

    send({ type: "keyboard-shortcut", key: "z", shift: false });
    expect(store.config.radius).toBe(DEFAULT_THEME.radius);

    send({ type: "keyboard-shortcut", key: "z", shift: true });
    expect(store.config.radius).toBe(0.75);
  });

  it("randomizes the theme on request", () => {
    const before = JSON.stringify(store.config);
    send({ type: "randomize-theme" });
    expect(JSON.stringify(store.config)).not.toBe(before);
  });

  it("navigates the editor when a link is clicked inside the iframe", () => {
    send({ type: "navigate-parent", path: "/components/button" });
    expect(navigateToMock).toHaveBeenCalledWith("/components/button");
  });

  it("stops listening after unmount", () => {
    mounted.wrapper.unmount();
    send({ type: "preview-ready" });
    expect(mounted.result.iframeReady.value).toBe(false);
  });
});
