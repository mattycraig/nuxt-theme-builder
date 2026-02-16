# Contributing to Nuxt Theme Builder

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Prerequisites

- [Node.js 22](https://nodejs.org/) (pinned in `.node-version`)
- [pnpm 10](https://pnpm.io/) (enforced by `packageManager` field)

## Setup

```bash
git clone https://github.com/<owner>/nuxt-theme-builder.git
cd nuxt-theme-builder
pnpm install
pnpm dev
```

## Development Workflow

### Branch Naming

Use descriptive branch names prefixed by type:

```
feat/add-color-picker
fix/iframe-sync-race
docs/update-readme
refactor/split-navigation
```

### Commit Messages

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via `commitlint`.

**Format:** `<type>(<optional scope>): <description>`

**Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

```bash
# Examples
feat(editor): add font weight selector
fix(preview): resolve iframe sync on navigation
test(store): add undo/redo coverage
docs: update contributing guide
```

- Subject must be lowercase (no Start Case, PascalCase, or UPPER CASE)
- Header max length: 100 characters

### Code Style

- **Vue:** Composition API with `<script setup lang="ts">`
- **State:** Pinia setup stores — keep mutations explicit, preserve undo/redo history
- **Validation:** Schema-validate all persisted or imported theme data with `ThemeConfigSchema`
- **Components:** Auto-imported with `pathPrefix: true` — folder path provides the name prefix
- **Icons:** Lucide iconify names (`i-lucide-*`)

ESLint and Prettier run automatically on staged files via Husky + lint-staged.

### Available Scripts

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `pnpm dev`             | Start development server               |
| `pnpm build`           | Production build                       |
| `pnpm lint`            | Run ESLint                             |
| `pnpm lint:fix`        | Auto-fix lint issues                   |
| `pnpm typecheck`       | TypeScript type checking               |
| `pnpm test`            | Run unit tests (Vitest)                |
| `pnpm test:watch`      | Unit tests in watch mode               |
| `pnpm test:coverage`   | Unit tests with coverage               |
| `pnpm test:e2e`        | Run E2E tests (Playwright)             |
| `pnpm test:e2e:headed` | E2E tests in headed browser            |
| `pnpm workflow:quick`  | Quick: lint + format + typecheck       |
| `pnpm workflow:full`   | Full: lint + format + typecheck + test |

### Automated Workflow

For a streamlined development experience, use the workflow scripts:

**Windows (PowerShell):**

```powershell
./scripts/dev-workflow.ps1 -AutoCommit -Message "feat: add feature"
```

**Linux/macOS/CI (Bash):**

```bash
./scripts/dev-workflow.sh --auto-commit --message "feat: add feature"
```

These scripts run lint → format → typecheck → test → stage → commit in sequence, auto-fixing issues where possible. See `scripts/` for available flags.

## Testing

### Unit Tests

Located in `tests/unit/`. Uses Vitest with `happy-dom` environment.

```bash
pnpm test           # single run
pnpm test:coverage  # with coverage report
```

### E2E Tests

Located in `tests/e2e/`. Uses Playwright (Chromium).

```bash
pnpm test:e2e         # headless
pnpm test:e2e:headed  # visible browser
pnpm test:e2e:ui      # Playwright UI mode
```

## Architecture Quick Reference

| Area          | Location                            | Notes                                             |
| ------------- | ----------------------------------- | ------------------------------------------------- |
| Theme state   | `app/stores/theme.ts`               | Single source of truth                            |
| Theme types   | `app/types/theme.ts`                | Schema + TypeScript types                         |
| Theme apply   | `app/composables/useThemeApply.ts`  | Two-strategy model (app config + CSS vars)        |
| Theme export  | `app/composables/useThemeExport.ts` | Serialization for export formats                  |
| Navigation    | `app/utils/navigation/`             | Modular route definitions                         |
| AI generation | `server/api/ai/generate.post.ts`    | Provider-backed with validation and rate limiting |
| Preview sync  | `app/utils/iframeProtocol.ts`       | Typed postMessage protocol                        |

### Common Tasks

**Add a preview route:** See the "Add a New Preview Route" section in [AGENTS.md](./AGENTS.md).

**Add a theme field:** See the "Add a New Theme Property" section in [AGENTS.md](./AGENTS.md).

**Add an AI model/provider:** See the "Add a New AI Provider Model" section in [AGENTS.md](./AGENTS.md).

**Add a design tool:** See the "Add a New Design Tool" section in [AGENTS.md](./AGENTS.md).

**Add a learn article:** See the "Add a Learn Article" section in [AGENTS.md](./AGENTS.md).

## Pull Requests

1. Fork the repository and create a branch from `master`.
2. Make your changes following the guidelines above.
3. Ensure all checks pass locally: `pnpm lint && pnpm typecheck && pnpm test`.
4. Open a pull request using the [PR template](.github/PULL_REQUEST_TEMPLATE.md).
5. Fill out the checklist — incomplete PRs may be delayed.

## Reporting Issues

Use the appropriate issue template:

- **Bug Report** — for defects and unexpected behavior
- **Feature Request** — for ideas and enhancements

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
