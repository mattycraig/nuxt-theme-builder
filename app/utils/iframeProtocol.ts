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
 */

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
} as const;

export type MessageType = (typeof MSG)[keyof typeof MSG];
