# AGENTS.md

## Project Overview

**Nuxt UI Theme Builder** is a Nuxt 4 application for building and previewing Nuxt UI v4 themes across real component, block, and template pages.

Core capabilities:

- Visual theme editing (semantic palettes, per-role shades, neutral palette, radius, font)
- Independent light/dark mode theme fields
- Export as `app.config.ts`, CSS variables, and JSON
- Theme presets (built-in + saved), undo/redo history
- AI-assisted theme generation (BYOK: OpenAI, Anthropic, Google)
- Live iframe preview, fullscreen preview, and source-code view for blocks/templates
- Interactive design tools (color converter, contrast checker, palette generator/viewer)
- Learning hub with Nuxt Content-powered articles and guides

## Tech Stack

- Nuxt 4 + TypeScript + Vue 3 (`<script setup>`)
- Nuxt UI v4 + Tailwind CSS v4
- Nuxt Content v3 (learn articles collection)
- Pinia + `pinia-plugin-persistedstate`
- `@vueuse/nuxt`
- `zod` validation
- AI SDK (`ai`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`)
- `nuxt-security` + route-level security overrides
- Vitest (unit) + Playwright (e2e)

## High-Level Architecture

```
app/
├── app.vue                         # Dynamic layout selection (default/preview/coming-soon)
├── layouts/
│   ├── default.vue                 # Main editor + preview shell
│   ├── preview.vue                 # Iframe layout with parent/child sync messaging
│   ├── ai.vue                      # AI page layout
│   └── coming-soon.vue             # Launch-gate layout
├── pages/
│   ├── index.vue                   # Marketing-style home for product sections
│   ├── ai.vue                      # AI theme generator page
│   ├── components/**/*.vue         # Component preview routes
│   ├── blocks/**/*.vue             # Block preview routes
│   ├── templates/**/*.vue          # Full-page template routes
│   ├── tools/*.vue                 # Design utility tools (converter, checker, generators)
│   ├── learn/                      # Learning hub index + article pages
│   └── about/help/privacy/contact.vue
├── components/
│   ├── ai/                         # AI chat/settings UI (→ <Ai*>)
│   ├── editor/                     # Theme editor controls (→ <Editor*>)
│   │   ├── Panel.vue               # Editor orchestrator (→ <EditorPanel>)
│   │   ├── export/                 # Export panel & slideover (→ <EditorExport*>)
│   │   └── preset/                 # Preset selector (→ <EditorPreset*>)
│   ├── layout/                     # Navbar/sidebar/toolbar (→ <Layout*>)
│   ├── learn/                      # Article cards, table of contents (→ <Learn*>)
│   ├── preview/                    # Preview infrastructure (→ <Preview*>)
│   │   ├── SourceCode.vue          # Source viewer (→ <PreviewSourceCode>)
│   │   ├── ViewModeToggle.vue      # Preview/source toggle (→ <PreviewViewModeToggle>)
│   │   └── viewport/               # Viewport controls (→ <PreviewViewport*>)
│   ├── shared/                     # Shared utilities (→ <Shared*>)
│   │   ├── CodeBlock.vue           # Code display (→ <SharedCodeBlock>)
│   │   ├── LoadingSpinner.vue      # Spinner (→ <SharedLoadingSpinner>)
│   │   └── SaveThemeModal.vue      # Save modal (→ <SharedSaveThemeModal>)
│   ├── showcase/                   # Component demo panels (→ <Showcase*>)
│   └── tools/                      # Design tool components (→ <Tools*>)
│       ├── ColorConverter.vue      # Hex/RGB/HSL conversion (→ <ToolsColorConverter>)
│       ├── ContrastChecker.vue     # WCAG contrast (→ <ToolsContrastChecker>)
│       ├── PaletteGenerator.vue    # Generate palettes (→ <ToolsPaletteGenerator>)
│       └── PaletteViewer.vue       # View palette scales (→ <ToolsPaletteViewer>)
├── composables/                    # App behavior modules (theme, iframe sync, source mode, AI, etc.)
├── stores/theme.ts                 # Single source of truth for ThemeConfig + history/presets
├── types/                          # Theme + AI contracts and unions
└── utils/                          # Defaults, presets, CSS generation, nav, helpers, SEO descriptions
    └── navigation/                 # Modular route definitions for sidebar/command palette

content/
└── learn/                          # Nuxt Content articles
    ├── best-practices/             # Best practices guides
    ├── components/                 # Component documentation
    ├── tailwind/                   # Tailwind CSS guides
    └── theming/                    # Theming tutorials

server/
└── api/
    ├── ai/generate.post.ts         # AI theme generation endpoint
    ├── auth/launch.post.ts         # Launch password gate endpoint
    ├── highlight.post.ts           # Shiki highlighting endpoint
    └── source/[...path].get.ts     # Embedded source retrieval endpoint

modules/
└── source-code-embed.ts            # Build-time virtual source map for page .vue files

tests/
├── unit/                           # Composables, store, utils, middleware, types
└── e2e/                            # End-to-end behavior and flows
```

## Runtime Data Flow

1. Editor controls mutate `useThemeStore()`.
2. `useThemeApply()` projects state into:
   - `useAppConfig().ui.colors` for semantic palette names
   - `useHead()` CSS variables for radius, typography, and token overrides
3. Default layout pushes theme + color-mode sync into iframe preview via `postMessage`.
4. Preview layout receives sync, renders selected route, and reports navigation/shortcut events to parent.
5. Export composables generate textual outputs without mutating app runtime.

## Environment & Configuration

Environment variables used by app/runtime:

- `NUXT_PUBLIC_COMING_SOON_ENABLED=true|false`
- `NUXT_COMING_SOON_PASSWORD=...` (required when gate is enabled)

Operational notes:

- AI route is BYOK. Provider API keys are entered in-app, not stored server-side.
- `nuxt-security` headers/CSP are enabled in production.
- `/api/highlight` disables XSS validator by route rule due to raw code input use case.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm generate

pnpm lint
pnpm lint:fix
pnpm typecheck

pnpm test
pnpm test:watch
pnpm test:coverage

pnpm test:e2e
pnpm test:e2e:headed
pnpm test:e2e:ui

# Development workflow automation
pnpm workflow:quick     # Quick: lint + format + typecheck
pnpm workflow:full      # Full: lint + format + typecheck + test

# Platform scripts (full interactive workflow with git)
# Windows:  ./scripts/dev-workflow.ps1
# Unix:     ./scripts/dev-workflow.sh

# Release
pnpm changelog          # Generate changelog preview
pnpm release            # Bump version + changelog + tag
```

## Development Workflow

Automated scripts for running the complete development pipeline:

### Scripts

| Script             | Location   | Platform              |
| ------------------ | ---------- | --------------------- |
| `dev-workflow.ps1` | `scripts/` | Windows (PowerShell)  |
| `dev-workflow.sh`  | `scripts/` | Linux/macOS/CI (Bash) |

### Workflow Steps

1. **Check Status** - Detect changed files
2. **Lint** - Run ESLint with auto-fix
3. **Format** - Run Prettier
4. **Typecheck** - Run TypeScript validation
5. **Test** - Run Vitest unit tests
6. **Stage** - Stage all changes
7. **Commit** - Validate and commit with conventional message
8. **Push** - Push to remote (optional)

### Copilot Integration

Custom chat modes are available in `.vscode/chat-modes.json`:

- **Dev Workflow** - Full pipeline
- **Quick Check** - Lint + typecheck only
- **Commit Ready** - Full pipeline with commit suggestion

Agent instructions: `.github/instructions/dev-workflow-agent.instructions.md`
pnpm test:e2e:ui

```

## Testing & CI

- Unit tests: Vitest with Nuxt test environment (`happy-dom`)
- E2E: Playwright (Chromium)
- CI workflow (`.github/workflows/ci.yml`) runs lint, typecheck, unit coverage, e2e, then build
- E2E nightly workflow (`.github/workflows/e2e-nightly.yml`) runs full regression suite daily
- Security workflow (`.github/workflows/security.yml`) runs dependency review
- CodeQL workflow (`.github/workflows/codeql.yml`) runs code security scanning
- Lighthouse workflow (`.github/workflows/lighthouse.yml`) audits Preview deployments
- Release workflow (`.github/workflows/release.yml`) automates version releases
- Labeler workflow (`.github/workflows/labeler.yml`) auto-labels PRs by file paths
- Stale workflow (`.github/workflows/stale.yml`) manages stale issues/PRs
- Welcome workflow (`.github/workflows/welcome.yml`) greets new contributors

## Code Conventions

- Use setup stores (`defineStore("theme", () => ...)`) and keep mutations explicit.
- Any persisted or imported theme data must be schema-validated with `ThemeConfigSchema`.
- Keep editor controls focused and composable; avoid coupling editor leaf components directly to the store.
- Keep preview pages presentational; app behavior belongs in composables/layout shell.
- Maintain the existing two-strategy theme-apply model (app config colors + injected CSS variables).
- Keep route/navigation additions in sync with `app/utils/navigation/` modules and command palette behavior.
- Learn articles use Nuxt Content collections with category/format schema validation.

## Feature-Specific Guardrails

### Theme Store and History

- Preserve undo/redo behavior for user-facing mutations.
- Do not bypass validation when loading external config.
- Preserve persisted keys: `config`, `savedPresets`, `activePresetName`.

### Preview + Source Mode

- `useSourceCode()` is singleton-state; maintain shared behavior across default and fullscreen views.
- Source retrieval relies on `modules/source-code-embed.ts` + `/api/source/[...path]`.
- Source mode is only available for `/templates/*` routes (excluding the templates index page).

### AI Generation

- Keep request validation (`zod`) strict.
- Keep provider/model selection dynamic and safe.
- Preserve timeout, retry, and provider-specific error mapping behavior.
- Preserve rate-limiting behavior for `/api/ai/generate`.

### Launch Gate

- Coming-soon middleware should only gate non-API routes.
- Gate is enabled only when runtime public flag is true in production.

## Common Contributor Tasks

### Add a New Preview Route

1. Add page in `app/pages/components`, `app/pages/blocks`, or `app/pages/templates`.
2. Register navigation metadata in `app/utils/navigation/`.
3. Validate iframe preview + source code mode behavior.

### Add a New Theme Property

1. Update `app/types/theme.ts` schema/types.
2. Update defaults in `app/utils/defaults.ts`.
3. Add store setter(s) and history handling in `app/stores/theme.ts`.
4. Apply variable mapping in `app/composables/useThemeApply.ts`.
5. Update export serialization in `app/composables/useThemeExport.ts`.
6. Add/adjust editor UI and relevant tests.

### Add a New AI Provider Model

1. Update model list in `app/types/ai.ts`.
2. Ensure provider factory in `server/api/ai/generate.post.ts` supports it.
3. Validate e2e and unit tests for AI settings/chat.

### Add a New Design Tool

1. Create component in `app/components/tools/`.
2. Create page in `app/pages/tools/`.
3. Register navigation metadata in `app/utils/navigation/tools.ts`.
4. Add SEO description in `app/utils/seoDescriptions.ts`.

### Add a Learn Article

1. Create markdown file in `content/learn/<category>/`.
2. Include required frontmatter: `title`, `description`, `category`, `date`, `order`.
3. Articles are auto-discovered by Nuxt Content collection.

## Troubleshooting

- Theme not reflecting: verify `useThemeApply()` is mounted in active layout and that app config fields are mutated, not replaced.
- Iframe out-of-sync: verify `postMessage` origin checks and `preview-ready` handshake paths.
- Source view failures: check `modules/source-code-embed.ts` virtual map and `/api/source` route candidates.
- AI failures: inspect `/api/ai/generate` validation errors, provider quota errors, and timeout handling.
- Launch gate loops: verify cookie `launch_access` behavior and runtime flag/password configuration.

## Notes

- Branch/workflow references use `master` in GitHub Actions.
- `pnpm` is required (enforced by `packageManager`).
```
