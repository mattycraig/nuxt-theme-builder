import { describe, it, expect, vi, beforeEach } from "vitest";
import { DEFAULT_THEME } from "~/utils/defaults";
import {
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
});
