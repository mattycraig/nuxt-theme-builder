---
paths:
  - "content/**"
  - "content.config.ts"
  - "app/data/**"
  - "app/utils/seoDescriptions.ts"
  - "app/utils/navigation/**"
  - "shared/constants/routes.ts"
  - "app/pages/learn/**"
---

# Content, navigation, and SEO rules

- Learn articles live at `content/learn/<category>/<slug>.md`. Frontmatter is validated by `content.config.ts`: `title`, `description`, `category` (`theming` | `components` | `tailwind` | `best-practices`), `date` (string), plus optional `format` (`guide` | `reference` | `tip`), `order`, `tags`, `image`, `featured`.
- A new article needs its route in `LEARN_ROUTES` (`shared/constants/routes.ts`, which feeds the sitemap and prerender list) and an entry in `app/utils/navigation/learn.ts`.
- Articles must reflect the current product. When palettes, fonts, or features change, grep `content/` and `app/data/*.md` for stale lists (for example, the neutral palette names).
- Every route needs a title/description: `PAGE_TITLES` / `PAGE_DESCRIPTIONS` in `app/utils/seoDescriptions.ts` (or page-level `useSeoMeta`). Demo routes stay `noindex` via `NOINDEX_DEMO_ROUTES`.
- Indexable pages must render directly in the editor, not in the preview iframe (`isFramedRoute`), because the iframe document is `noindex`. The indexable-pages smoke spec in `tests/e2e/smoke/preview-smoke.spec.ts` checks this.
- `app/data/{about,help,privacy,contact}.md` are rendered with `<MDC>` on their pages. Keep them accurate, since help.md documents the editor.
