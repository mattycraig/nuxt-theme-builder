# Nuxt UI Theme Builder

[![CI](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml)
[![Dependency Review](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/security.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/security.yml)

A single-page Nuxt 4 app for visually configuring [Nuxt UI v4](https://ui.nuxt.com) design tokens — colors, radius, font, neutral shades — and exporting the result as `app.config.ts`, CSS, or JSON.

**Live:** [nuxt-theme-builder.vercel.app](https://nuxt-theme-builder.vercel.app)

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
# Unit tests (Vitest)
pnpm test

# Unit tests in watch mode
pnpm test:watch

# Unit tests with coverage
pnpm test -- --coverage

# E2E tests (Playwright)
pnpm test:e2e

# E2E with browser UI
pnpm test:e2e:ui
```

## Build

```bash
pnpm build
pnpm preview    # preview production build locally
```

## CI/CD

This project uses **GitHub Actions** for continuous integration and **Vercel** for deployment.

### Workflows

| Workflow                                                 | Trigger               | What it does                                                  |
| -------------------------------------------------------- | --------------------- | ------------------------------------------------------------- |
| **CI** (`.github/workflows/ci.yml`)                      | Push/PR to `main`     | Lint, typecheck, unit tests (with coverage), E2E tests, build |
| **Dependency Review** (`.github/workflows/security.yml`) | PR to `main`          | Scans dependency changes for known vulnerabilities            |
| **Lighthouse** (`.github/workflows/lighthouse.yml`)      | Vercel preview deploy | Audits performance, accessibility, best practices, SEO        |

### Deployment

Vercel auto-deploys on every push:

- **Preview:** Every PR gets a unique preview URL
- **Production:** Merges to `main` deploy to [nuxt-theme-builder.vercel.app](https://nuxt-theme-builder.vercel.app)

CI acts as the quality gate — all checks must pass before PRs can be merged.

### Recommended Branch Protection Rules

Configure these in **GitHub → Settings → Branches → Branch protection rules** for `main`:

- **Require status checks to pass before merging** — select: `Lint`, `Typecheck`, `Unit Tests`, `E2E Tests`, `Build`
- **Require branches to be up to date before merging**
- **Require pull request reviews before merging** (1 approval)
- **Do not allow bypassing the above settings**
- **Automatically delete head branches**

## License

[MIT](./LICENSE)
