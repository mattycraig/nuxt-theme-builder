## Getting Started

The Theme Builder is a visual editor for [Nuxt UI v4](https://ui.nuxt.com){target="_blank"} design tokens. It lets you configure semantic colors, neutral palettes, border radius, font families, and per-mode shade overrides — then export production-ready code.

The basic workflow is:

1. **Open the sidebar** — the theme editor lives in the collapsible left panel. Click the sidebar toggle or swipe from the left on mobile.
2. **Edit design tokens** — pick colors, adjust radius, choose a font, and fine-tune shade overrides.
3. **Preview live** — every change updates instantly. Navigate to [Components](/components), [Blocks](/blocks), or [Templates](/templates) to see your theme in different contexts.
4. **Export** — when you're happy, open the Export panel and grab your theme as `app.config.ts`, CSS, or JSON.

---

## Editor Sidebar

The sidebar is organized into collapsible sections. Each controls a different aspect of your theme:

- **My Themes** — Your saved themes. Load, rename, duplicate, export, or delete saved configurations.
- **Presets** — Jump-start your design by selecting a built-in preset like Ocean, Forest, or Sunset.
- **Color Mode** — Toggle between light and dark mode to preview your theme in each context.
- **Layout** — Adjust global border radius (in rem) and choose a font family.
- **Semantic Colors** — Pick a Tailwind color palette for each semantic slot: primary, secondary, success, info, warning, error.
- **Neutral Color** — Choose the gray scale (slate, gray, zinc, neutral, stone) used for text, backgrounds, and borders.
- **Text Colors** — Override which neutral shade maps to highlighted, default, muted, dimmed, and toned text tokens.
- **Background Colors** — Override neutral shades for the default, elevated, accented, and inverted background tokens.
- **Border Colors** — Override neutral shades for the default and accented border tokens.

Click the section header to expand or collapse it. Use the **expand/collapse all** button in the toolbar to toggle every section at once.

---

## Keyboard Shortcuts

All shortcuts use `Ctrl` on Windows/Linux and `⌘` on macOS.

| Action | Shortcut |
| --- | --- |
| Undo last change | `Ctrl` + `Z` |
| Redo last undone change | `Ctrl` + `Shift` + `Z` |
| Quick-save active theme (or Save As) | `Ctrl` + `S` |
| Save As (new name) | `Ctrl` + `Shift` + `S` |

The undo/redo system tracks every token change. You can undo as far back as 50 steps. Undo history resets when you load a preset or saved theme.

---

## Exporting Your Theme

Open the **Export / Import** panel by clicking the button in the sidebar footer (or the toolbar on desktop). The panel offers three export formats. Each has a copy-to-clipboard button and a download button.

### app.config.ts

This format produces a Nuxt `defineAppConfig` block that maps your chosen Tailwind color palettes to Nuxt UI's semantic color slots:

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

**How to use:** Copy the output and replace (or merge with) your project's `app.config.ts`. Nuxt UI reads these values at runtime and injects the corresponding CSS variables automatically.

### CSS Custom Properties

This format produces a complete stylesheet with:

- `@import` statements for Tailwind CSS v4 and Nuxt UI
- A `@theme` block setting the `--font-sans` variable
- `:root` overrides for light mode (radius, text, bg, border tokens)
- `.dark` overrides for dark mode tokens

**How to use:** Replace or extend your project's `assets/css/main.css`. Only non-default values are included in the output, so the CSS stays minimal.

### JSON

Exports the raw `ThemeConfig` object as JSON. This includes every setting: colors, neutral, radius, font, and all light/dark shade overrides.

**How to use:** Save it as `theme.json` to back up your configuration, share it with a colleague, or import it later via the Import panel.

---

## Importing Themes

The Import section is inside the same Export / Import panel. Expand the **Import Theme** collapsible to reveal two options:

### Paste JSON

1. Open the **Export / Import** panel.
2. Expand the **Import Theme** section.
3. Paste your theme JSON into the text area.
4. Click **Apply Theme**.

The JSON is validated against the `ThemeConfig` schema. If any field is invalid or missing, you'll see a specific error message describing the issue.

### Upload a File

1. Open the **Export / Import** panel.
2. Expand the **Import Theme** section.
3. Click **Browse file** and select a `.json` file.
4. The file contents load into the text area automatically. Click **Apply Theme** to apply.

Only `.json` files are accepted. The file should contain a valid `ThemeConfig` object — the same format produced by the JSON export.

---

## Saving and Managing Themes

You can save multiple named themes to your browser's localStorage. Saved themes appear in the **My Themes** section of the sidebar.

### Save a Theme

Press `Ctrl` + `S` (or click the save icon in the toolbar). If you already have an active theme with unsaved changes, it quick-saves to the same name. Otherwise, a Save As dialog opens and prompts for a name.

### Theme Actions

Each saved theme in the sidebar has a context menu with these actions:

- **Load** — apply the saved theme to the editor
- **Rename** — change the theme's display name
- **Duplicate** — create a copy to experiment with
- **Export JSON** — download the theme as a `.json` file
- **Delete** — permanently remove the theme (with confirmation)

---

## Built-in Presets

The **Presets** section in the sidebar offers a dropdown of built-in theme configurations — like Ocean, Forest, Sunset, and more. Selecting a preset loads a complete `ThemeConfig` instantly.

Presets are a great starting point. Once loaded, you can modify any token and the changes will diverge from the preset. Save the result as a new named theme if you want to keep it.

---

## Preview Pages

The main content area renders a live preview of your theme inside an iframe. Navigate between three categories of preview pages:

- [**Components**](/components) — individual Nuxt UI components (buttons, cards, table, inputs, etc.) with all variants and sizes.
- [**Blocks**](/blocks) — pre-built layout blocks like hero sections, feature grids, CTAs, testimonials, and FAQ.
- [**Templates**](/templates) — full page layouts including dashboards, blog, pricing, login, changelog, and more.

You can resize the preview viewport using the width controls in the toolbar (desktop, tablet, mobile presets, or a custom pixel width). The **Code** toggle lets you view the source code of the current preview page.

---

## Shade Overrides

Nuxt UI maps the neutral palette to semantic tokens like `--ui-text-muted`, `--ui-bg-elevated`, and `--ui-border`. By default, each token uses a pre-assigned shade (e.g., shade 400 for muted text in light mode).

The **Text Colors**, **Background Colors**, and **Border Colors** sections in the sidebar let you override which shade maps to each token — independently for light and dark modes. This gives you fine-grained control over contrast and readability without changing the underlying color palette.

For example, if your light mode text feels too low-contrast, you can bump the "muted" text shade from 400 to 500. The CSS export will only include overrides that differ from Nuxt UI's defaults.

---

## Frequently Asked Questions

### Where is my theme stored?

Your theme and saved presets are stored in your browser's localStorage under the `theme` key. Data persists across reloads and browser restarts but is local to your device and browser. Export your theme to back it up or transfer it.

### Does this work with Nuxt UI v3?

This tool targets Nuxt UI v4, which uses Tailwind CSS v4 and a different theming system than v3. The exported CSS variables and app.config format are v4-specific. The JSON export could serve as a reference for v3 projects, but the token names differ.

### Can I use the exported CSS without Nuxt?

The CSS export includes Tailwind CSS v4 and `@nuxt/ui` import statements. If you use Nuxt UI in a plain Vue app (without Nuxt), the CSS output still applies — adjust the import paths as needed. The custom properties (`--ui-radius`, `--ui-text-*`, etc.) follow Nuxt UI's token naming convention.

### How do I reset everything to defaults?

Click "Reset to defaults" in the sidebar toolbar to revert all tokens. For a complete clean slate, clear the `theme` key from your browser's localStorage via DevTools → Application → Local Storage.

### Can I share a theme with a link?

Not directly via URL at this time. Export your theme as JSON and share the file. The recipient can import it via the Import panel in the sidebar.
