import { describe, it, expect, vi, beforeEach } from "vitest";
import { sanitizeNavigationPath } from "~/utils/helpers";
import { ThemeConfigSchema } from "~/types/theme";
import { DEFAULT_THEME } from "~/utils/defaults";

/**
 * Tests for the handleIframeMessage dispatch logic in usePreviewIframe.
 *
 * Since the composable is tightly coupled to lifecycle hooks, DOM APIs,
 * and iframe communication, we extract and test the message handler logic
 * as a standalone function (same pattern as useKeyboardShortcuts tests).
 */

// Action callbacks that the message handler triggers
const actions = {
  setIframeLoading: vi.fn(),
  setIframeReady: vi.fn(),
  syncThemeToIframe: vi.fn(),
  syncColorModeToIframe: vi.fn(),
  navigateIframe: vi.fn(),
  navigateTo: vi.fn(),
  loadConfig: vi.fn(),
  toastAdd: vi.fn(),
  openSaveAs: vi.fn(),
  exportOpen: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
  setNavigatingFromIframe: vi.fn(),
};

interface IframeMessageContext {
  routePath: string;
  iframeSrc: string;
  iframeInitialSrc: string;
  colorModePreference: string;
  storeConfig: unknown;
}

/**
 * Simulates the handleIframeMessage switch logic from usePreviewIframe.
 * Extracted here for testability without lifecycle hooks or DOM dependencies.
 */
function simulateHandleIframeMessage(
  event: { origin: string; data: Record<string, unknown> },
  ctx: IframeMessageContext,
) {
  if (event.origin !== "http://localhost:3000") return;

  switch (event.data?.type) {
    case "navigate-done":
      actions.setIframeLoading(false);
      break;

    case "navigate-parent": {
      const path = sanitizeNavigationPath(String(event.data.path));
      if (path && path !== ctx.routePath) {
        actions.setNavigatingFromIframe(true);
        actions.navigateTo(path);
      }
      break;
    }

    case "preview-ready":
      actions.setIframeReady(true);
      actions.setIframeLoading(false);
      actions.syncThemeToIframe(ctx.storeConfig);
      actions.syncColorModeToIframe(ctx.colorModePreference);
      if (ctx.iframeSrc !== ctx.iframeInitialSrc) {
        actions.navigateIframe(ctx.iframeSrc);
      }
      break;

    case "apply-ai-theme": {
      const validated = ThemeConfigSchema.safeParse(event.data.config);
      if (validated.success) {
        actions.loadConfig(validated.data);
        actions.toastAdd({
          title: "Theme applied",
          color: "success",
        });
        if (event.data.save) {
          actions.openSaveAs();
        }
        if (event.data.export) {
          actions.exportOpen();
        }
      }
      break;
    }

    case "keyboard-shortcut": {
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
}

describe("usePreviewIframe — message handler logic", () => {
  const ORIGIN = "http://localhost:3000";

  const defaultCtx: IframeMessageContext = {
    routePath: "/",
    iframeSrc: "/?preview",
    iframeInitialSrc: "/?preview",
    colorModePreference: "light",
    storeConfig: DEFAULT_THEME,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("origin check", () => {
    it("ignores messages from other origins", () => {
      simulateHandleIframeMessage(
        { origin: "https://evil.com", data: { type: "navigate-done" } },
        defaultCtx,
      );
      expect(actions.setIframeLoading).not.toHaveBeenCalled();
    });

    it("processes messages from same origin", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "navigate-done" } },
        defaultCtx,
      );
      expect(actions.setIframeLoading).toHaveBeenCalledWith(false);
    });
  });

  describe("navigate-done", () => {
    it("sets iframeLoading to false", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "navigate-done" } },
        defaultCtx,
      );
      expect(actions.setIframeLoading).toHaveBeenCalledWith(false);
    });
  });

  describe("navigate-parent", () => {
    it("navigates host to sanitized path", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "navigate-parent", path: "/ai" } },
        defaultCtx,
      );
      expect(actions.navigateTo).toHaveBeenCalledWith("/ai");
      expect(actions.setNavigatingFromIframe).toHaveBeenCalledWith(true);
    });

    it("does not navigate when path matches current route", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "navigate-parent", path: "/" } },
        defaultCtx,
      );
      expect(actions.navigateTo).not.toHaveBeenCalled();
    });

    it("does not navigate for invalid paths", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: {
            type: "navigate-parent",
            path: "https://evil.com/attack",
          },
        },
        defaultCtx,
      );
      expect(actions.navigateTo).not.toHaveBeenCalled();
    });

    it("does not navigate for paths with special characters", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: {
            type: "navigate-parent",
            path: "/foo<script>alert(1)</script>",
          },
        },
        defaultCtx,
      );
      expect(actions.navigateTo).not.toHaveBeenCalled();
    });
  });

  describe("preview-ready", () => {
    it("marks iframe as ready and stops loading", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "preview-ready" } },
        defaultCtx,
      );
      expect(actions.setIframeReady).toHaveBeenCalledWith(true);
      expect(actions.setIframeLoading).toHaveBeenCalledWith(false);
    });

    it("syncs theme and color mode on ready", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "preview-ready" } },
        defaultCtx,
      );
      expect(actions.syncThemeToIframe).toHaveBeenCalledWith(DEFAULT_THEME);
      expect(actions.syncColorModeToIframe).toHaveBeenCalledWith("light");
    });

    it("does not navigate iframe when src matches initial", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "preview-ready" } },
        defaultCtx,
      );
      expect(actions.navigateIframe).not.toHaveBeenCalled();
    });

    it("navigates iframe when src differs from initial", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "preview-ready" } },
        { ...defaultCtx, iframeSrc: "/ai?preview" },
      );
      expect(actions.navigateIframe).toHaveBeenCalledWith("/ai?preview");
    });
  });

  describe("apply-ai-theme", () => {
    it("loads valid theme and shows toast", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: { type: "apply-ai-theme", config: DEFAULT_THEME },
        },
        defaultCtx,
      );
      expect(actions.loadConfig).toHaveBeenCalled();
      expect(actions.toastAdd).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Theme applied", color: "success" }),
      );
    });

    it("ignores invalid theme config", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: { type: "apply-ai-theme", config: { invalid: true } },
        },
        defaultCtx,
      );
      expect(actions.loadConfig).not.toHaveBeenCalled();
    });

    it("opens save modal when save flag is true", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: {
            type: "apply-ai-theme",
            config: DEFAULT_THEME,
            save: true,
          },
        },
        defaultCtx,
      );
      expect(actions.openSaveAs).toHaveBeenCalled();
    });

    it("does not open save modal when save flag is absent", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: { type: "apply-ai-theme", config: DEFAULT_THEME },
        },
        defaultCtx,
      );
      expect(actions.openSaveAs).not.toHaveBeenCalled();
    });

    it("opens export panel when export flag is true", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: {
            type: "apply-ai-theme",
            config: DEFAULT_THEME,
            export: true,
          },
        },
        defaultCtx,
      );
      expect(actions.exportOpen).toHaveBeenCalled();
    });

    it("does not open export panel when export flag is absent", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: { type: "apply-ai-theme", config: DEFAULT_THEME },
        },
        defaultCtx,
      );
      expect(actions.exportOpen).not.toHaveBeenCalled();
    });
  });

  describe("keyboard-shortcut", () => {
    it("calls undo for z key without shift", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: { type: "keyboard-shortcut", key: "z", shift: false },
        },
        defaultCtx,
      );
      expect(actions.undo).toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
    });

    it("calls redo for z key with shift", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: { type: "keyboard-shortcut", key: "z", shift: true },
        },
        defaultCtx,
      );
      expect(actions.redo).toHaveBeenCalled();
      expect(actions.undo).not.toHaveBeenCalled();
    });

    it("does nothing for non-z keys", () => {
      simulateHandleIframeMessage(
        {
          origin: ORIGIN,
          data: { type: "keyboard-shortcut", key: "x", shift: false },
        },
        defaultCtx,
      );
      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
    });
  });

  describe("unknown message types", () => {
    it("does nothing for unknown type", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: { type: "unknown-type" } },
        defaultCtx,
      );
      // No action callbacks should be called
      expect(actions.setIframeLoading).not.toHaveBeenCalled();
      expect(actions.setIframeReady).not.toHaveBeenCalled();
      expect(actions.navigateTo).not.toHaveBeenCalled();
      expect(actions.loadConfig).not.toHaveBeenCalled();
    });

    it("does nothing for null data", () => {
      simulateHandleIframeMessage(
        { origin: ORIGIN, data: null as unknown as Record<string, unknown> },
        defaultCtx,
      );
      expect(actions.setIframeLoading).not.toHaveBeenCalled();
    });
  });
});
