/**
 * Iframe ↔ Parent postMessage protocol.
 *
 * All message types exchanged between the editor (default layout) and the
 * live preview iframe (preview layout). Both sides must use these constants
 * instead of raw string literals.
 *
 * Message flow:
 *
 *   Parent → Iframe:
 *     THEME_SYNC       — Push full ThemeConfig to iframe
 *     COLORMODE_SYNC   — Push color-mode preference ("light" | "dark" | "system")
 *     NAVIGATE         — Tell iframe to navigate to a route
 *     REQUEST_READY    — Ask iframe to re-emit PREVIEW_READY (fallback for race)
 *
 *   Iframe → Parent:
 *     PREVIEW_READY    — Iframe has mounted and is ready to receive messages
 *     NAVIGATE_DONE    — Iframe completed a parent-initiated navigation
 *     NAVIGATE_PARENT  — User clicked a link inside the iframe
 *     KEYBOARD_SHORTCUT — Forward keyboard shortcut (e.g., undo/redo) to parent
 *
 *   Iframe → Parent (AI):
 *     APPLY_AI_THEME   — AI page requests theme application via parent store
 *
 *   Iframe → Parent (Homepage):
 *     RANDOMIZE_THEME  — Homepage requests random theme generation via parent store
 */

import type { ThemeConfig } from "~/types/theme";

export const MSG = {
  // Parent → Iframe
  THEME_SYNC: "theme-sync",
  COLORMODE_SYNC: "colormode-sync",
  NAVIGATE: "navigate",
  REQUEST_READY: "request-ready",

  // Iframe → Parent
  PREVIEW_READY: "preview-ready",
  NAVIGATE_DONE: "navigate-done",
  NAVIGATE_PARENT: "navigate-parent",
  KEYBOARD_SHORTCUT: "keyboard-shortcut",

  // AI → Parent
  APPLY_AI_THEME: "apply-ai-theme",

  // Homepage → Parent
  RANDOMIZE_THEME: "randomize-theme",
} as const;

export type MessageType = (typeof MSG)[keyof typeof MSG];

// ── Typed message payloads (discriminated union) ────────────────────

/** Parent → Iframe: push full theme state */
export interface ThemeSyncMessage {
  type: typeof MSG.THEME_SYNC;
  config: ThemeConfig;
}

/** Parent → Iframe: push color-mode preference */
export interface ColorModeSyncMessage {
  type: typeof MSG.COLORMODE_SYNC;
  mode: string;
}

/** Parent → Iframe: navigate to a route */
export interface NavigateMessage {
  type: typeof MSG.NAVIGATE;
  path: string;
}

/** Parent → Iframe: ask iframe to re-emit PREVIEW_READY */
export interface RequestReadyMessage {
  type: typeof MSG.REQUEST_READY;
}

/** Iframe → Parent: iframe has mounted and is ready */
export interface PreviewReadyMessage {
  type: typeof MSG.PREVIEW_READY;
}

/** Iframe → Parent: parent-initiated navigation completed */
export interface NavigateDoneMessage {
  type: typeof MSG.NAVIGATE_DONE;
}

/** Iframe → Parent: user clicked a link inside the iframe */
export interface NavigateParentMessage {
  type: typeof MSG.NAVIGATE_PARENT;
  path: string;
}

/** Iframe → Parent: forward keyboard shortcut to parent */
export interface KeyboardShortcutMessage {
  type: typeof MSG.KEYBOARD_SHORTCUT;
  key: string;
  shift: boolean;
}

/** AI → Parent: apply generated theme to parent store */
export interface ApplyAiThemeMessage {
  type: typeof MSG.APPLY_AI_THEME;
  config: ThemeConfig;
  save?: boolean;
  export?: boolean;
}

/** Iframe → Parent: randomize theme in parent store */
export interface RandomizeThemeMessage {
  type: typeof MSG.RANDOMIZE_THEME;
}

/** All valid iframe protocol messages */
export type IframeMessage =
  | ThemeSyncMessage
  | ColorModeSyncMessage
  | NavigateMessage
  | RequestReadyMessage
  | PreviewReadyMessage
  | NavigateDoneMessage
  | NavigateParentMessage
  | KeyboardShortcutMessage
  | ApplyAiThemeMessage
  | RandomizeThemeMessage;

/** Messages sent from parent to iframe */
export type ParentToIframeMessage =
  | ThemeSyncMessage
  | ColorModeSyncMessage
  | NavigateMessage
  | RequestReadyMessage;

/** Messages sent from iframe to parent */
export type IframeToParentMessage =
  | PreviewReadyMessage
  | NavigateDoneMessage
  | NavigateParentMessage
  | KeyboardShortcutMessage
  | ApplyAiThemeMessage
  | RandomizeThemeMessage;
