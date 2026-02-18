# Changelog

All notable changes to this project will be documented in this file.

This changelog is automatically generated using [changelogen](https://github.com/unjs/changelogen).
Run `pnpm changelog` to preview or `pnpm release` to bump version locally.

## v1.1.0

### 🚀 Enhancements

- Add error page, landing page, login page, and pricing page with respective components and functionality ([e08380a](https://github.com/mattycraig/nuxt-theme-builder/commit/e08380a))
- Implement iframe preview functionality with drag-to-resize and theme synchronization ([c4af87e](https://github.com/mattycraig/nuxt-theme-builder/commit/c4af87e))
- Enhance dashboard layout with improved navigation and data presentation ([8869530](https://github.com/mattycraig/nuxt-theme-builder/commit/8869530))
- Enhance login and registration forms with improved validation and user feedback ([226816f](https://github.com/mattycraig/nuxt-theme-builder/commit/226816f))
- Enhance blog page with category icons and improved layout components ([1b4c308](https://github.com/mattycraig/nuxt-theme-builder/commit/1b4c308))
- Restructure changelog page with enhanced release details and filtering options ([f8e0e33](https://github.com/mattycraig/nuxt-theme-builder/commit/f8e0e33))
- Adjust default size of collapsible panel and add margin to changelog items ([52aadfe](https://github.com/mattycraig/nuxt-theme-builder/commit/52aadfe))
- Add search groups for editor settings and preview pages with navigation functionality ([563d58f](https://github.com/mattycraig/nuxt-theme-builder/commit/563d58f))
- Enhance search groups with quick actions and color mode toggle ([a2f76c2](https://github.com/mattycraig/nuxt-theme-builder/commit/a2f76c2))
- Enhance chat messages with improved formatting and detailed suggestions ([9991979](https://github.com/mattycraig/nuxt-theme-builder/commit/9991979))
- Enhance iframe navigation and loading state in theme preview ([7d37fb9](https://github.com/mattycraig/nuxt-theme-builder/commit/7d37fb9))
- Add emoji extension to enhance editor functionality ([0a2234f](https://github.com/mattycraig/nuxt-theme-builder/commit/0a2234f))
- Enhance error page with additional error states and improved UI components ([5d9dc2d](https://github.com/mattycraig/nuxt-theme-builder/commit/5d9dc2d))
- Refactor theme management and improve performance ([39f2757](https://github.com/mattycraig/nuxt-theme-builder/commit/39f2757))
- Enhance accessibility and improve UI components across the application ([f85ea8a](https://github.com/mattycraig/nuxt-theme-builder/commit/f85ea8a))
- Add leading item swatch display to color and shade selectors ([70f57e8](https://github.com/mattycraig/nuxt-theme-builder/commit/70f57e8))
- Implement theme management features including save, rename, duplicate, and delete functionality ([480beac](https://github.com/mattycraig/nuxt-theme-builder/commit/480beac))
- Add EditorToolbar component and implement section management in ThemeEditor ([d3ab57c](https://github.com/mattycraig/nuxt-theme-builder/commit/d3ab57c))
- Enhance UDashboardSidebar with customizable header and remove footer ([1469017](https://github.com/mattycraig/nuxt-theme-builder/commit/1469017))
- **theme-editor): enhance theme management with save functionality and section toggling feat(theme-store): add active preset tracking and unsaved changes detection fix(theme): include createdAt and updatedAt in theme presets for better management feat(helpers): implement timeAgo function for relative time display chore(tests:** Add Playwright for end-to-end testing and implement theme saving tests chore: update package.json for Playwright dependencies and scripts chore: disable devtools in production environment ([332f33f](https://github.com/mattycraig/nuxt-theme-builder/commit/332f33f))
- Implement save theme functionality with improved modal handling and duplicate preset feature ([4cdd441](https://github.com/mattycraig/nuxt-theme-builder/commit/4cdd441))
- **theme-editor:** Add hydration state to theme editor and update tests for visibility checks ([312a524](https://github.com/mattycraig/nuxt-theme-builder/commit/312a524))
- Add various templates including error page, landing page, login, and pricing with responsive design and user-friendly features ([485ac00](https://github.com/mattycraig/nuxt-theme-builder/commit/485ac00))
- Enhance component previews with new "All Components" page and improved navigation links ([0b98bc8](https://github.com/mattycraig/nuxt-theme-builder/commit/0b98bc8))
- Enhance navigation menu with icons and descriptions for better usability ([d472422](https://github.com/mattycraig/nuxt-theme-builder/commit/d472422))
- **nuxt:** Add comprehensive documentation for components auto-imports, built-in components, composables, server routes, state management, rendering modes, and web design guidelines ([332c1ce](https://github.com/mattycraig/nuxt-theme-builder/commit/332c1ce))
- Implement navigation path sanitization and enhance security with CSP ([f7f3790](https://github.com/mattycraig/nuxt-theme-builder/commit/f7f3790))
- **theme:** Enhance theme store with structured state management and history support ([313c3d0](https://github.com/mattycraig/nuxt-theme-builder/commit/313c3d0))
- Update EditorRadiusSlider max value to 1 and add breadcrumb navigation to default layout ([d0d41bc](https://github.com/mattycraig/nuxt-theme-builder/commit/d0d41bc))
- Replace static headers with UPageHeader component for improved consistency across blocks and components ([919d9cf](https://github.com/mattycraig/nuxt-theme-builder/commit/919d9cf))
- Implement source code viewer and API for fetching .vue files ([5cc7a2d](https://github.com/mattycraig/nuxt-theme-builder/commit/5cc7a2d))
- Implement export/import functionality with slideover panel and code block component ([b0e2d3b](https://github.com/mattycraig/nuxt-theme-builder/commit/b0e2d3b))
- **help:** Add initial configuration for Squirrel with project and crawler settings ([1df06d2](https://github.com/mattycraig/nuxt-theme-builder/commit/1df06d2))
- Update headings for semantic structure and accessibility improvements across templates ([68b3a9d](https://github.com/mattycraig/nuxt-theme-builder/commit/68b3a9d))
- Update theme colors and add new built-in presets for enhanced customization ([71b610e](https://github.com/mattycraig/nuxt-theme-builder/commit/71b610e))
- Enhance color and shade selection functionality with new shade options and CSS generation ([89943c1](https://github.com/mattycraig/nuxt-theme-builder/commit/89943c1))
- Refactor shade selection components for improved modularity and maintainability ([89ddb3f](https://github.com/mattycraig/nuxt-theme-builder/commit/89ddb3f))
- Add file size limit for theme JSON uploads and integrate nuxt-security for enhanced security headers ([4834b96](https://github.com/mattycraig/nuxt-theme-builder/commit/4834b96))
- Enhance theme presets with descriptions and improve help functionality in editor components ([6ecb893](https://github.com/mattycraig/nuxt-theme-builder/commit/6ecb893))
- Wrap color selection buttons in tooltips for improved accessibility and user experience ([6b19933](https://github.com/mattycraig/nuxt-theme-builder/commit/6b19933))
- Implement JSON editor mode and toggle functionality in theme editor ([0663842](https://github.com/mattycraig/nuxt-theme-builder/commit/0663842))
- Enhance CodeBlock and EditorJsonEditor components with improved props and error handling ([572a70c](https://github.com/mattycraig/nuxt-theme-builder/commit/572a70c))
- Enhance CodeBlock and ThemeEditor components with improved loading states and rendering logic ([5875014](https://github.com/mattycraig/nuxt-theme-builder/commit/5875014))
- Enhance various components with accessibility improvements, SEO metadata, and lazy loading for images ([f6ec4dd](https://github.com/mattycraig/nuxt-theme-builder/commit/f6ec4dd))
- Enhance EditorExportSlideover and SaveThemeModal with improved header layout and accessibility features ([b2e4551](https://github.com/mattycraig/nuxt-theme-builder/commit/b2e4551))
- Update importOpen state to true and improve accessibility for file upload input ([a0301b6](https://github.com/mattycraig/nuxt-theme-builder/commit/a0301b6))
- Enhance CI/CD workflows with Lighthouse and Dependency Review, add test coverage reporting ([816a81a](https://github.com/mattycraig/nuxt-theme-builder/commit/816a81a))
- Add TypeScript declaration for source code map module ([1931d90](https://github.com/mattycraig/nuxt-theme-builder/commit/1931d90))
- Add AI theme generation API and e2e tests ([2f64f30](https://github.com/mattycraig/nuxt-theme-builder/commit/2f64f30))
- Integrate multiple AI providers and enhance settings UI ([1e154f2](https://github.com/mattycraig/nuxt-theme-builder/commit/1e154f2))
- Add regenerate last message functionality and update chat status handling ([5d425bf](https://github.com/mattycraig/nuxt-theme-builder/commit/5d425bf))
- Enhance theme generation with separate light and dark mode configurations ([647ba1d](https://github.com/mattycraig/nuxt-theme-builder/commit/647ba1d))
- Enhance theme editor with mode-aware settings and improved keyboard shortcuts ([c22d955](https://github.com/mattycraig/nuxt-theme-builder/commit/c22d955))
- **security-review:** Add comprehensive security review skill with checklist and best practices ([de7dc16](https://github.com/mattycraig/nuxt-theme-builder/commit/de7dc16))
- **highlight:** Enhance error handling and logging for syntax highlighting ([91582ca](https://github.com/mattycraig/nuxt-theme-builder/commit/91582ca))
- Implement cookie consent functionality with toast notification and privacy policy pages ([621f6f8](https://github.com/mattycraig/nuxt-theme-builder/commit/621f6f8))
- Add LoadingSpinner component and integrate it into various editor components ([aa761a1](https://github.com/mattycraig/nuxt-theme-builder/commit/aa761a1))
- Add utility navigation items and enhance layout components ([264cc50](https://github.com/mattycraig/nuxt-theme-builder/commit/264cc50))
- Enhance CodeBlock component styles and add fullscreen preview tests ([7d00f60](https://github.com/mattycraig/nuxt-theme-builder/commit/7d00f60))
- Implement "Coming Soon" page with password protection and middleware ([d097c48](https://github.com/mattycraig/nuxt-theme-builder/commit/d097c48))
- Implement smoke E2E tests and nightly regression workflow ([27c47bf](https://github.com/mattycraig/nuxt-theme-builder/commit/27c47bf))
- Add build step for E2E preview and update configurations for better indexing and timeout ([90ec184](https://github.com/mattycraig/nuxt-theme-builder/commit/90ec184))
- Implement input sanitization and security checks for AI and highlight APIs ([184ea1e](https://github.com/mattycraig/nuxt-theme-builder/commit/184ea1e))
- Add sitemap configuration and remove outdated testing audit documentation ([e0f6278](https://github.com/mattycraig/nuxt-theme-builder/commit/e0f6278))
- Enhance accessibility and keyboard navigation in preview components; add aria attributes and keyboard resize functionality ([4a3c008](https://github.com/mattycraig/nuxt-theme-builder/commit/4a3c008))
- Add preview components for Alerts, Avatars, Badges, Buttons, Calendar, Cards, Dropdown, Frame, FullscreenOverlay, Inputs, Misc, Navigation, Progress, Table, Tabs, and WidthControls ([83203d7](https://github.com/mattycraig/nuxt-theme-builder/commit/83203d7))
- Add height controls to preview toolbar and related components ([e68e428](https://github.com/mattycraig/nuxt-theme-builder/commit/e68e428))
- Add CodeBlock component for displaying and downloading code snippets feat: create LoadingSpinner component for loading states feat: implement SaveThemeModal for saving user-defined themes feat: add Accordion showcase component with example items feat: create Alerts showcase component demonstrating various alert types feat: implement All showcase component to aggregate all showcase examples feat: add Avatars showcase component to display individual and group avatars feat: create Badges showcase component to demonstrate badge variants feat: implement Buttons showcase component showcasing different button styles feat: add Calendar showcase component for date selection feat: create Cards showcase component with various card layouts feat: implement Dropdown showcase component for action menus feat: add Inputs showcase component demonstrating various form inputs feat: create Misc showcase component for miscellaneous UI elements feat: implement Navigation showcase component for menu navigation feat: add Progress showcase component to display progress bars feat: create Table showcase component for displaying user data feat: implement Tabs showcase component for tabbed navigation ([e27d96d](https://github.com/mattycraig/nuxt-theme-builder/commit/e27d96d))
- Enhance navigation structure by adding component, block, and template items; update related tests ([6a7ca7e](https://github.com/mattycraig/nuxt-theme-builder/commit/6a7ca7e))
- Add breadcrumb navigation tests for nested and top-level routes ([62db19d](https://github.com/mattycraig/nuxt-theme-builder/commit/62db19d))
- Implement manual debounce for radius commit and enhance history management in theme store ([7fc0f9f](https://github.com/mattycraig/nuxt-theme-builder/commit/7fc0f9f))
- Add showcase components for Separator, Skeleton, Slideover, Slider, Stepper, Switch, Table, Tabs, Textarea, Timeline, Toast, Tooltip, Tree, User ([0d76dcf](https://github.com/mattycraig/nuxt-theme-builder/commit/0d76dcf))
- Enhance component index page with search and category filters ([78ceb00](https://github.com/mattycraig/nuxt-theme-builder/commit/78ceb00))
- Enhance iframe message handling for theme and navigation synchronization ([98f6946](https://github.com/mattycraig/nuxt-theme-builder/commit/98f6946))
- Implement category filtering and showcase blocks ([6858d00](https://github.com/mattycraig/nuxt-theme-builder/commit/6858d00))
- Add new blocks for ecommerce, features, footer, gallery, header, hero, pricing, statistics, steps, team, and testimonials ([2938857](https://github.com/mattycraig/nuxt-theme-builder/commit/2938857))
- Enhance hero components with new designs, animations, and improved prompts ([fdf4f00](https://github.com/mattycraig/nuxt-theme-builder/commit/fdf4f00))
- Add new CTA components and update showcase with enhanced descriptions and prompts ([50ac9e5](https://github.com/mattycraig/nuxt-theme-builder/commit/50ac9e5))
- Revamp feature and hero components with new designs and layouts ([97b0f22](https://github.com/mattycraig/nuxt-theme-builder/commit/97b0f22))
- Enhance pricing components with new designs, animations, and improved layouts ([91bcc82](https://github.com/mattycraig/nuxt-theme-builder/commit/91bcc82))
- Enhance testimonial components with new designs, animations, and improved layouts ([6bf14d7](https://github.com/mattycraig/nuxt-theme-builder/commit/6bf14d7))
- **statistics:** Overhaul statistic components with new designs and animations ([29300cb](https://github.com/mattycraig/nuxt-theme-builder/commit/29300cb))
- **blog:** Enhance blog components with new designs, animations, and improved layouts ([4566e4a](https://github.com/mattycraig/nuxt-theme-builder/commit/4566e4a))
- Enhance content components with new designs, animations, and improved layouts ([0d5a559](https://github.com/mattycraig/nuxt-theme-builder/commit/0d5a559))
- **gallery:** Enhance gallery components with new designs and features ([3d80e25](https://github.com/mattycraig/nuxt-theme-builder/commit/3d80e25))
- Add step components for theme creation workflow ([90a8a06](https://github.com/mattycraig/nuxt-theme-builder/commit/90a8a06))
- Add new header components and update showcase with detailed descriptions ([7785d0e](https://github.com/mattycraig/nuxt-theme-builder/commit/7785d0e))
- Add new footer components with enhanced designs and features ([e100010](https://github.com/mattycraig/nuxt-theme-builder/commit/e100010))
- Add new TeamBento and TeamOverlap components with enhanced layouts and features; update team.ts to include new sections ([a5129fc](https://github.com/mattycraig/nuxt-theme-builder/commit/a5129fc))
- **ecommerce:** Enhance product grid and detail components with glow effects, glassmorphism, and atmospheric designs ([a4c03a4](https://github.com/mattycraig/nuxt-theme-builder/commit/a4c03a4))
- Add script to auto-generate VueUse composable documentation ([dbd2db2](https://github.com/mattycraig/nuxt-theme-builder/commit/dbd2db2))
- **seo:** Update homepage description for enhanced clarity and AI features ([2c9f374](https://github.com/mattycraig/nuxt-theme-builder/commit/2c9f374))
- Update favicon and manifest files, add sharp for image processing ([65f0b68](https://github.com/mattycraig/nuxt-theme-builder/commit/65f0b68))
- Enhance learn section with improved article card styles, updated table of contents, and new category index features ([3b00c51](https://github.com/mattycraig/nuxt-theme-builder/commit/3b00c51))
- Add color tools including Palette Generator, Palette Viewer, Color Converter, and Contrast Checker ([c775316](https://github.com/mattycraig/nuxt-theme-builder/commit/c775316))
- Enhance ContrastChecker and PaletteGenerator with improved color picking and theme application features ([59ca517](https://github.com/mattycraig/nuxt-theme-builder/commit/59ca517))
- Implement color tools with enhanced copy functionality and input sanitization ([8cf5571](https://github.com/mattycraig/nuxt-theme-builder/commit/8cf5571))
- Update layout components with responsive adjustments and logo integration ([968994d](https://github.com/mattycraig/nuxt-theme-builder/commit/968994d))
- Refactor iframe handling and toast notifications for theme application consistency ([5beef4d](https://github.com/mattycraig/nuxt-theme-builder/commit/5beef4d))
- Add configuration files for Renovate, Husky, Prettier, Commitlint, and Knip ([29b6470](https://github.com/mattycraig/nuxt-theme-builder/commit/29b6470))
- Update content across documentation and improve SEO descriptions for clarity and engagement ([b6b1dcd](https://github.com/mattycraig/nuxt-theme-builder/commit/b6b1dcd))
- **tests:** Add unit tests for PaletteViewer, composables, server utilities, and shared constants ([f2053c2](https://github.com/mattycraig/nuxt-theme-builder/commit/f2053c2))
- Update .prettierignore to include additional ignored files for better project organization ([724ef2c](https://github.com/mattycraig/nuxt-theme-builder/commit/724ef2c))
- Enhance accessibility with improved aria-labels and update theme color configuration ([a119f3c](https://github.com/mattycraig/nuxt-theme-builder/commit/a119f3c))
- **security:** Enhance security and error handling across the application ([cc5d204](https://github.com/mattycraig/nuxt-theme-builder/commit/cc5d204))
- Add navigation utilities and AI system prompt for theme generation ([f4f2961](https://github.com/mattycraig/nuxt-theme-builder/commit/f4f2961))
- **tests:** Remove outdated technical debt docs for server API, component, layout tests ([ea87521](https://github.com/mattycraig/nuxt-theme-builder/commit/ea87521))
- Add initial project setup with GitHub workflows, issue templates, and code of conduct ([14839a4](https://github.com/mattycraig/nuxt-theme-builder/commit/14839a4))
- Add Vercel configuration for deployment and ISR settings ([59031cb](https://github.com/mattycraig/nuxt-theme-builder/commit/59031cb))
- **agents:** Remove outdated agent and prompt files ([3a35cd1](https://github.com/mattycraig/nuxt-theme-builder/commit/3a35cd1))

### 🩹 Fixes

- Remove unnecessary 'to' attributes from links in blog and login pages ([f64204e](https://github.com/mattycraig/nuxt-theme-builder/commit/f64204e))
- Remove unnecessary blank line in handleDownload function ([82c6f28](https://github.com/mattycraig/nuxt-theme-builder/commit/82c6f28))
- Update watch function to sync selected preset with external config changes ([f9bd794](https://github.com/mattycraig/nuxt-theme-builder/commit/f9bd794))
- Enhance theme synchronization and validation in theme store ([b9c4100](https://github.com/mattycraig/nuxt-theme-builder/commit/b9c4100))
- Correct model value type casting and enhance item label rendering in font picker ([7bd32c9](https://github.com/mattycraig/nuxt-theme-builder/commit/7bd32c9))
- Adjust spacing in ThemeEditor for improved layout consistency ([a78284e](https://github.com/mattycraig/nuxt-theme-builder/commit/a78284e))
- Adjust font size and input size for custom width label and field in the layout ([033b702](https://github.com/mattycraig/nuxt-theme-builder/commit/033b702))
- Update CI workflow triggers to target master branch ([da14d88](https://github.com/mattycraig/nuxt-theme-builder/commit/da14d88))
- Add nuxi prepare step before lint in CI ([1ee34ef](https://github.com/mattycraig/nuxt-theme-builder/commit/1ee34ef))
- **ci:** Resolve typecheck and unit test failures ([043e444](https://github.com/mattycraig/nuxt-theme-builder/commit/043e444))
- Update type definitions and improve test assertions for better clarity ([ab61aff](https://github.com/mattycraig/nuxt-theme-builder/commit/ab61aff))
- Update selectors to use role-based queries for better accessibility ([b513df3](https://github.com/mattycraig/nuxt-theme-builder/commit/b513df3))
- Format destructuring assignment for better readability ([558ac77](https://github.com/mattycraig/nuxt-theme-builder/commit/558ac77))
- Update URLs in README, layout files, and configuration for new domain ([161537d](https://github.com/mattycraig/nuxt-theme-builder/commit/161537d))
- Remove unnecessary line-height style from CodeBlock component ([101b570](https://github.com/mattycraig/nuxt-theme-builder/commit/101b570))
- Update webServer command to include build step for CI environment ([ddf7452](https://github.com/mattycraig/nuxt-theme-builder/commit/ddf7452))
- Update webServer command for CI to use Nitro server ([abc0399](https://github.com/mattycraig/nuxt-theme-builder/commit/abc0399))
- Increase memory limit for build step in CI workflow ([2078d39](https://github.com/mattycraig/nuxt-theme-builder/commit/2078d39))
- Handle optional chaining for item label and description in component filter style: remove unnecessary UI prop from search input test: add environment declaration for coming-soon middleware tests ([15134e7](https://github.com/mattycraig/nuxt-theme-builder/commit/15134e7))
- Update button size in preset selector for better accessibility ([007e25f](https://github.com/mattycraig/nuxt-theme-builder/commit/007e25f))
- Clean up section styles and improve HTML structure in HeroProductLaunch component ([274ae20](https://github.com/mattycraig/nuxt-theme-builder/commit/274ae20))
- Add optional chaining for author avatar and name in BlogCards component ([430fc08](https://github.com/mattycraig/nuxt-theme-builder/commit/430fc08))
- Restrict source mode to specific template routes and update related security checks ([6ad9a2d](https://github.com/mattycraig/nuxt-theme-builder/commit/6ad9a2d))
- Standardize punctuation in documentation for consistency ([a215509](https://github.com/mattycraig/nuxt-theme-builder/commit/a215509))
- **build:** Remove invalid functions config from vercel.json ([1f55de0](https://github.com/mattycraig/nuxt-theme-builder/commit/1f55de0))
- **config:** Resolve knip false positives for Nuxt implicit deps ([2975bbb](https://github.com/mattycraig/nuxt-theme-builder/commit/2975bbb))
- **preview:** Prevent sidebar toggle leaking into preview iframe ([#3](https://github.com/mattycraig/nuxt-theme-builder/pull/3))
- **a11y,seo:** Resolve accessibility and SEO audit issues ([#5](https://github.com/mattycraig/nuxt-theme-builder/pull/5))
- Post-launch Vercel runtime errors (Shiki WASM, better-sqlite3, payload.json, sitemap) ([#6](https://github.com/mattycraig/nuxt-theme-builder/pull/6))
- **api:** Resolve shiki 500 errors on Vercel serverless ([#7](https://github.com/mattycraig/nuxt-theme-builder/pull/7))

### 💅 Refactors

- Update text color classes to use parentheses for CSS variables ([3056413](https://github.com/mattycraig/nuxt-theme-builder/commit/3056413))
- Enhance theme editor and store with token key types and improved structure ([a273ef9](https://github.com/mattycraig/nuxt-theme-builder/commit/a273ef9))
- Simplify tab handling and enhance export panel structure ([37a3c5e](https://github.com/mattycraig/nuxt-theme-builder/commit/37a3c5e))
- Standardize comment formatting across multiple files for improved readability ([5612ee6](https://github.com/mattycraig/nuxt-theme-builder/commit/5612ee6))
- Remove EditorPresetSwatches component and integrate swatch functionality into EditorSwatchStrip ([dec3314](https://github.com/mattycraig/nuxt-theme-builder/commit/dec3314))
- Remove mcp.json configuration file for nuxt-ui server ([0b52b40](https://github.com/mattycraig/nuxt-theme-builder/commit/0b52b40))
- Update EditorToolbar styles and adjust navigation items for improved layout ([718fb54](https://github.com/mattycraig/nuxt-theme-builder/commit/718fb54))
- **tests:** Improve undo/redo tests for slider component ([a1a6bb4](https://github.com/mattycraig/nuxt-theme-builder/commit/a1a6bb4))
- Optimize test waits and improve assertions across multiple test files ([3a56a5d](https://github.com/mattycraig/nuxt-theme-builder/commit/3a56a5d))
- Remove unused block components from navigation ([87efd3d](https://github.com/mattycraig/nuxt-theme-builder/commit/87efd3d))

### 📖 Documentation

- Update .env.example to clarify environment variable usage and add Context7 API key documentation chore: update .gitignore to include VS Code MCP config file ([0ab607a](https://github.com/mattycraig/nuxt-theme-builder/commit/0ab607a))
- Add dev workflow automation, changelog, and update project docs ([eedebb2](https://github.com/mattycraig/nuxt-theme-builder/commit/eedebb2))

### 🏡 Chore

- Trigger deployment ([02bb784](https://github.com/mattycraig/nuxt-theme-builder/commit/02bb784))
- Update deps ([9146e3e](https://github.com/mattycraig/nuxt-theme-builder/commit/9146e3e))
- Add better-sqlite3 to onlyBuiltDependencies in pnpm-workspace.yaml ([1241c92](https://github.com/mattycraig/nuxt-theme-builder/commit/1241c92))
- Update dependencies to latest versions ([1fd8de4](https://github.com/mattycraig/nuxt-theme-builder/commit/1fd8de4))
- Release v1.0.0 — pre-launch hardening ([#4](https://github.com/mattycraig/nuxt-theme-builder/pull/4))

### ✅ Tests

- Update hex value checks to support oklch color format ([acef4e0](https://github.com/mattycraig/nuxt-theme-builder/commit/acef4e0))
- **e2e:** Fix all nightly and local test failures ([db4cfb9](https://github.com/mattycraig/nuxt-theme-builder/commit/db4cfb9))

### 🎨 Styles

- Update UBadge components to use primary color and improve layout in Section and Settings components ([646d7cd](https://github.com/mattycraig/nuxt-theme-builder/commit/646d7cd))
- Adjust USeparator height and margin in Toolbar; update button color and variant in dashboard ([f0d54e9](https://github.com/mattycraig/nuxt-theme-builder/commit/f0d54e9))
- Update NuxtLink class to ensure full height in component list ([cf2cbb2](https://github.com/mattycraig/nuxt-theme-builder/commit/cf2cbb2))

### ❤️ Contributors

- Matthew Craig <themattycraig@gmail.com>
- Matthew Jason Craig <themattycraig@gmail.com>

## v1.0.2

[compare changes](https://github.com/mattycraig/nuxt-theme-builder/compare/v1.0.1...v1.0.2)

### 🩹 Fixes

- **sitemap:** Add dynamic routes for blocks, components, and learn articles ([bc086a0](https://github.com/mattycraig/nuxt-theme-builder/commit/bc086a0))
- **content:** Prerender learn pages to avoid better-sqlite3 in Vercel Lambda ([e3b04cc](https://github.com/mattycraig/nuxt-theme-builder/commit/e3b04cc))
- **server:** Resolve Shiki WASM and payload.json errors on Vercel ([05383b5](https://github.com/mattycraig/nuxt-theme-builder/commit/05383b5))
- **blocks:** Correct code block language from html to vue ([4ed2d62](https://github.com/mattycraig/nuxt-theme-builder/commit/4ed2d62))

### ❤️ Contributors

- Matthew Craig <themattycraig@gmail.com>

## v1.0.1

[compare changes](https://github.com/mattycraig/nuxt-theme-builder/compare/v1.0.0...v1.0.1)

### 🩹 Fixes

- **e2e:** Use Enter key in AI smoke test to avoid notification overlay ([b6f77b9](https://github.com/mattycraig/nuxt-theme-builder/commit/b6f77b9))
- **a11y,seo:** Resolve accessibility and SEO audit issues ([36da5f0](https://github.com/mattycraig/nuxt-theme-builder/commit/36da5f0))

### 🏡 Chore

- Remove @sentry/nuxt — overkill for pre-launch ([ad11fa6](https://github.com/mattycraig/nuxt-theme-builder/commit/ad11fa6))
- Remove visual regression workflow — overkill for pre-launch ([1d8b327](https://github.com/mattycraig/nuxt-theme-builder/commit/1d8b327))

### ❤️ Contributors

- Matthew Craig <themattycraig@gmail.com>

## v1.0.0

Initial public release.
