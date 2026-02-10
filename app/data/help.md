## Getting Started

Design your perfect [Nuxt UI v4](https://ui.nuxt.com){target="_blank"} theme in minutes — no guesswork, no trial-and-error deploys. Pick colors, tweak tokens, see the results live, and walk away with production-ready code.

Here's the workflow:

1. **Open the sidebar** — your theme editor lives in the collapsible left panel. Click the sidebar toggle or swipe from the left on mobile.
2. **Tweak your design tokens** — pick semantic colors, adjust border radius, choose a font, and dial in shade overrides for light and dark modes.
3. **See every change instantly** — the preview updates in real time. Navigate to [Components](/components), [Blocks](/blocks), or [Templates](/templates) to stress-test your theme across real UI patterns.
4. **Export and ship** — grab your finished theme as `app.config.ts`, CSS custom properties, or JSON. Paste it into your project and you're done.

---

## Editor Sidebar

The sidebar organizes every design decision into collapsible sections — expand only what you need:

- **My Themes** — Load, rename, duplicate, export, or delete your saved theme configurations.
- **Presets** — Start fast with a built-in preset like Ocean, Forest, or Sunset, then customize from there.
- **Color Mode** — Switch between light and dark mode to preview your theme in each context.
- **Layout** — Set the global border radius (in rem) and choose a font family.
- **Semantic Colors** — Assign a Tailwind color palette to each semantic slot: primary, secondary, success, info, warning, and error.
- **Neutral Color** — Pick the gray scale (slate, gray, zinc, neutral, stone) for text, backgrounds, and borders.
- **Text Colors** — Control which neutral shade maps to highlighted, default, muted, dimmed, and toned text tokens.
- **Background Colors** — Override neutral shades for default, elevated, accented, and inverted backgrounds.
- **Border Colors** — Override neutral shades for default and accented borders.

Click any section header to expand or collapse it. The **expand/collapse all** button in the toolbar toggles every section at once.

---

## Keyboard Shortcuts

All shortcuts use `Ctrl` on Windows/Linux and `⌘` on macOS.

| Action | Shortcut |
| --- | --- |
| Undo | `Ctrl` + `Z` |
| Redo | `Ctrl` + `Shift` + `Z` |
| Quick-save (or Save As if unnamed) | `Ctrl` + `S` |
| Save As new theme | `Ctrl` + `Shift` + `S` |

Every token change is tracked. Undo goes back up to 50 steps. History resets when you load a preset or saved theme.

---

## Exporting Your Theme

Click the **Export / Import** button in the sidebar footer (or the toolbar on desktop) to open the export panel. Three formats are available — each with copy-to-clipboard and download buttons.

### app.config.ts

Produces a ready-to-paste Nuxt config block that maps your color choices to Nuxt UI's semantic slots:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'violet',
      success: 'green',
      info: 'sky',
      warning: 'amber',
      error: 'red',
      neutral: 'slate',
    },
  },
})
```

**To use it:** drop this into your project's `app.config.ts`. Nuxt UI reads these values at runtime and injects the CSS variables for you.

### CSS Custom Properties

Produces a complete stylesheet containing:

- `@import` statements for Tailwind CSS v4 and Nuxt UI
- A `@theme` block for the `--font-sans` variable
- `:root` overrides for light mode tokens (radius, text, backgrounds, borders)
- `.dark` overrides for dark mode tokens

**To use it:** replace or extend your project's `assets/css/main.css`. Only non-default values are included, so the output stays minimal.

### JSON

Exports the full `ThemeConfig` object — every color, shade override, radius, and font setting in one file.

**To use it:** save as `theme.json` to back up your work, share with teammates, or re-import later.

---

## Importing Themes

The Import section lives inside the same Export / Import panel. Expand **Import Theme** to see two options:

### Paste JSON

1. Open the **Export / Import** panel.
2. Expand **Import Theme**.
3. Paste your theme JSON into the text area.
4. Click **Apply Theme**.

The JSON is validated against the `ThemeConfig` schema. Invalid or missing fields trigger a clear error message so you know exactly what to fix.

### Upload a File

1. Open the **Export / Import** panel.
2. Expand **Import Theme**.
3. Click **Browse file** and select a `.json` file.
4. The contents load automatically — click **Apply Theme** to apply.

Only `.json` files are accepted. The file should match the same `ThemeConfig` format that the JSON export produces.

---

## Saving and Managing Themes

Save as many named themes as you like — they persist in your browser's localStorage and appear in the **My Themes** section of the sidebar.

### Save a Theme

Press `Ctrl` + `S` or click the save icon in the toolbar. If you're editing an existing theme with unsaved changes, it quick-saves in place. Otherwise, a Save As dialog asks for a name.

### Theme Actions

Right-click (or use the context menu) on any saved theme to:

- **Load** — apply it to the editor
- **Rename** — change its display name
- **Duplicate** — fork a copy to experiment with
- **Export JSON** — download it as a `.json` file
- **Delete** — remove it permanently (with confirmation)

---

## Built-in Presets

Don't want to start from a blank canvas? The **Presets** dropdown in the sidebar offers curated configurations like Ocean, Forest, Sunset, and more. Select one to load a complete theme instantly.

Presets are a starting point, not a ceiling. Once loaded, change any token you like — your edits diverge from the preset. Save the result as a new named theme to keep your version.

---

## Preview Pages

The main content area renders a live, interactive preview of your theme. Navigate between three categories to see how your design holds up:

- [**Components**](/components) — individual Nuxt UI components (buttons, cards, tables, inputs, and more) across all variants and sizes.
- [**Blocks**](/blocks) — layout sections like hero areas, feature grids, CTAs, testimonials, and FAQ.
- [**Templates**](/templates) — full page layouts including dashboards, blog, pricing, login, changelog, and beyond.

Resize the preview viewport with the toolbar controls — desktop, tablet, and mobile presets, or enter a custom width. Toggle **Code** to view the source code of the current preview page.

---

## Shade Overrides

Nuxt UI assigns specific neutral shades to semantic tokens like `--ui-text-muted`, `--ui-bg-elevated`, and `--ui-border`. The defaults work well, but sometimes you need more contrast or a subtler feel.

The **Text Colors**, **Background Colors**, and **Border Colors** sections let you override which shade maps to each token — independently for light and dark modes. You get precise control over contrast and readability without touching the underlying color palette.

For example, if your light mode muted text looks too faint, bump it from shade 400 to 500. The CSS export only includes overrides that differ from Nuxt UI's defaults, keeping your output clean.

---

## Frequently Asked Questions

### Where is my theme stored?

In your browser's localStorage under the `theme` key. It persists across page reloads and browser restarts — but it's local to your device and browser. Export your theme regularly to back it up or move it to another machine.

### Does this work with Nuxt UI v3?

This tool targets Nuxt UI v4 (Tailwind CSS v4, new theming system). The exported CSS variables and `app.config` format are v4-specific. You can use the JSON export as a reference for v3 projects, but the token names differ.

### Can I use the exported CSS without Nuxt?

Yes. If you run Nuxt UI in a plain Vue app (without the Nuxt framework), the CSS output still applies — just adjust the import paths. The custom properties (`--ui-radius`, `--ui-text-*`, etc.) follow Nuxt UI's token convention regardless of your build setup.

### How do I reset everything?

Click **Reset to defaults** in the sidebar toolbar to revert all tokens to their initial values. For a complete clean slate, clear the `theme` key from localStorage via DevTools → Application → Local Storage.

### Can I share a theme with a link?

Not via URL at this time. Export your theme as JSON, share the file, and the recipient can import it through the Import panel.
