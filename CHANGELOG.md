# Changelog

All notable changes to this project will be documented in this file.

This changelog is automatically generated using [changelogen](https://github.com/unjs/changelogen).
Run `pnpm changelog` to preview or `pnpm release` to bump version locally.

## v0.1.0

### 🚀 Features

- **Learn Hub**: Nuxt Content-powered learning center with articles on theming, components, Tailwind CSS, and best practices
- **Design Tools**: Interactive utilities including color converter, contrast checker, palette generator, and palette viewer
- **Enhanced Workflows**: CodeQL security scanning, visual regression testing, automated releases, PR labeling, stale issue management

### 💅 Refactors

- **Navigation**: Modular route definitions in `app/utils/navigation/`

### 📖 Documentation

- Comprehensive AGENTS.md, copilot-instructions.md, and README.md updates

### 🤖 CI

- Visual regression testing workflow
- CodeQL code security scanning
- Automated release workflow with changelogen
- PR auto-labeling based on file paths
- Stale issue/PR management
- New contributor welcome messages

---

## v0.0.1 (Initial)

### 🚀 Features

- Visual theme editing (semantic palettes, per-role shades, neutral palette, radius, font)
- Independent light/dark mode theme fields
- Export as `app.config.ts`, CSS variables, and JSON
- Theme presets (built-in + saved) with undo/redo history
- AI-assisted theme generation (BYOK: OpenAI, Anthropic, Google)
- Live iframe preview with fullscreen mode
- Source code viewer for blocks/templates

### 📦 Build

- Nuxt 4 + TypeScript + Vue 3
- Nuxt UI v4 + Tailwind CSS v4
- Pinia + pinia-plugin-persistedstate
- VueUse composables
- AI SDK with provider adapters
- zod runtime validation
- nuxt-security

### ✅ Tests

- Unit tests with Vitest + happy-dom
- E2E tests with Playwright
- CI/CD with GitHub Actions
