<script setup lang="ts">
import type {
  ButtonProps,
  ContentNavigationLink,
  ContentSurroundLink,
  ContentTocLink,
  DropdownMenuItem,
  PageLink,
  TableColumn,
  TabsItem,
} from "@nuxt/ui";

const toast = useToast();

// ---------------------------------------------------------------------------
// Shared article styles
// ---------------------------------------------------------------------------

const h2Class =
  "scroll-mt-[calc(var(--ui-header-height)+1.5rem)] text-2xl font-bold text-(--ui-text-highlighted) mt-12 mb-4";
const h3Class =
  "scroll-mt-[calc(var(--ui-header-height)+1.5rem)] text-xl font-semibold text-(--ui-text-highlighted) mt-8 mb-3";
const pClass = "my-4 leading-7 text-(--ui-text)";
const codeClass =
  "px-1.5 py-0.5 text-sm font-mono font-medium rounded-(--ui-radius) border border-(--ui-border-muted) bg-(--ui-bg-muted) text-(--ui-text-highlighted)";
const preClass =
  "overflow-x-auto px-4 py-3 font-mono text-sm/6 text-(--ui-text-highlighted) bg-(--ui-bg-muted)";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

const currentPage = "Installation";

function openPage(title: string) {
  if (title === currentPage) return;
  toast.add({
    title,
    description: "Only the Installation page is written in this demo.",
    icon: "i-lucide-book-open",
  });
}

const sections = [
  {
    title: "Getting Started",
    icon: "i-lucide-rocket",
    pages: [
      { title: "Introduction", icon: "i-lucide-sparkles" },
      { title: "Installation", icon: "i-lucide-download" },
      { title: "Migration", icon: "i-lucide-arrow-right-left", badge: "v2" },
      { title: "Contributing", icon: "i-lucide-git-pull-request" },
    ],
  },
  {
    title: "Components",
    icon: "i-lucide-box",
    pages: [
      { title: "Button", icon: "i-lucide-mouse-pointer-click" },
      { title: "Card", icon: "i-lucide-square" },
      { title: "Dialog", icon: "i-lucide-app-window", badge: "New" },
      { title: "Input", icon: "i-lucide-text-cursor-input" },
      { title: "Select", icon: "i-lucide-chevrons-up-down" },
      { title: "Tabs", icon: "i-lucide-panel-top" },
      { title: "Toast", icon: "i-lucide-bell" },
    ],
  },
  {
    title: "Theming",
    icon: "i-lucide-palette",
    pages: [
      { title: "Design tokens", icon: "i-lucide-braces" },
      { title: "Colors", icon: "i-lucide-swatch-book" },
      { title: "Typography", icon: "i-lucide-type" },
      { title: "Dark mode", icon: "i-lucide-moon" },
    ],
  },
  {
    title: "Composables",
    icon: "i-lucide-function-square",
    pages: [
      { title: "useToast", icon: "i-lucide-message-square" },
      { title: "useDialog", icon: "i-lucide-layers" },
      { title: "useBreakpoints", icon: "i-lucide-monitor-smartphone" },
    ],
  },
];

// Leaves have no `path`, so they render as buttons and stay inactive unless
// they are the current page (a real docs site passes content routes instead).
const navigation: ContentNavigationLink[] = sections.map((section) => ({
  title: section.title,
  path: "",
  icon: section.icon,
  children: section.pages.map((page) => ({
    title: page.title,
    path: "",
    badge: page.badge,
    active: page.title === currentPage,
    onClick: () => openPage(page.title),
  })),
}));

const searchGroups = sections.map((section) => ({
  id: section.title,
  label: section.title,
  items: section.pages.map((page) => ({
    label: page.title,
    icon: page.icon,
    onSelect: () => openPage(page.title),
  })),
}));

const versionItems: DropdownMenuItem[] = [
  { label: "v2.4 (latest)", icon: "i-lucide-check", type: "checkbox", checked: true },
  { label: "v2.3", type: "checkbox", checked: false },
  { label: "v1.x", type: "checkbox", checked: false },
];

// ---------------------------------------------------------------------------
// Page header & surround
// ---------------------------------------------------------------------------

const headerLinks: ButtonProps[] = [
  {
    label: "Copy page",
    icon: "i-lucide-copy",
    color: "neutral",
    variant: "outline",
    size: "sm",
    onClick: () =>
      toast.add({
        title: "Copied as Markdown",
        icon: "i-lucide-clipboard-check",
        color: "success",
      }),
  },
  {
    label: "Edit on GitHub",
    icon: "i-simple-icons-github",
    color: "neutral",
    variant: "ghost",
    size: "sm",
    to: "https://github.com",
    target: "_blank",
  },
];

const surround: ContentSurroundLink[] = [
  {
    title: "Introduction",
    description: "What Lumen UI is, how it is built, and when to reach for it.",
    path: "/templates/docs",
  },
  {
    title: "Migration",
    description: "Upgrade an existing v1 project to v2 step by step.",
    path: "/templates/docs",
  },
];

// ---------------------------------------------------------------------------
// Table of contents
// ---------------------------------------------------------------------------

const tocLinks: ContentTocLink[] = [
  { id: "prerequisites", depth: 2, text: "Prerequisites" },
  {
    id: "install-the-package",
    depth: 2,
    text: "Install the package",
    children: [
      { id: "package-manager", depth: 3, text: "Package managers" },
      { id: "register-the-module", depth: 3, text: "Register the module" },
    ],
  },
  {
    id: "configure-your-theme",
    depth: 2,
    text: "Configure your theme",
    children: [
      { id: "import-the-stylesheet", depth: 3, text: "Import the stylesheet" },
      { id: "set-brand-colors", depth: 3, text: "Set your brand colors" },
    ],
  },
  { id: "module-options", depth: 2, text: "Module options" },
  { id: "verify-the-setup", depth: 2, text: "Verify the setup" },
];

const communityLinks: PageLink[] = [
  { label: "Star on GitHub", icon: "i-lucide-star", to: "https://github.com", target: "_blank" },
  { label: "Join the Discord", icon: "i-simple-icons-discord", to: "https://discord.com", target: "_blank" },
  { label: "Release notes", icon: "i-lucide-scroll-text", to: "https://github.com", target: "_blank" },
];

// ---------------------------------------------------------------------------
// Article content
// ---------------------------------------------------------------------------

const prerequisites = [
  { label: "Node.js", value: "20.19 or newer (22 LTS recommended)" },
  { label: "Vue", value: "3.5 or newer, or Nuxt 4" },
  { label: "Tailwind CSS", value: "v4, installed automatically if missing" },
];

const installTabs = [
  { label: "pnpm", icon: "i-simple-icons-pnpm", command: "pnpm add @lumen-ui/vue" },
  { label: "npm", icon: "i-simple-icons-npm", command: "npm install @lumen-ui/vue" },
  { label: "yarn", icon: "i-simple-icons-yarn", command: "yarn add @lumen-ui/vue" },
  { label: "bun", icon: "i-simple-icons-bun", command: "bun add @lumen-ui/vue" },
] satisfies (TabsItem & { command: string })[];

const configCode = `export default defineNuxtConfig({
  modules: ["@lumen-ui/vue/nuxt"],
  css: ["~/assets/css/main.css"],
  lumen: {
    prefix: "L",
    fonts: true,
  },
});`;

const cssCode = `@import "tailwindcss";
@import "@lumen-ui/vue";`;

const appConfigCode = `export default defineAppConfig({
  lumen: {
    colors: {
      primary: "indigo",
      neutral: "zinc",
    },
  },
});`;

const verifyCode = `<template>
  <LButton icon="i-lucide-rocket" @click="launch">
    Launch
  </LButton>
</template>`;

interface ModuleOption {
  name: string;
  type: string;
  default: string;
  description: string;
}

const moduleOptions: ModuleOption[] = [
  {
    name: "prefix",
    type: "string",
    default: '"L"',
    description: "Prefix added to every auto-imported component.",
  },
  {
    name: "fonts",
    type: "boolean",
    default: "true",
    description: "Load the font family set in your theme.",
  },
  {
    name: "colorMode",
    type: "boolean",
    default: "true",
    description: "Add light and dark mode support with no flash on load.",
  },
  {
    name: "theme.colors",
    type: "string[]",
    default: '["primary", …]',
    description: "Semantic color aliases generated as CSS variables.",
  },
];

const optionColumns: TableColumn<ModuleOption>[] = [
  { accessorKey: "name", header: "Option" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "default", header: "Default" },
  { accessorKey: "description", header: "Description" },
];

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

const feedback = ref<"yes" | "no" | null>(null);

function sendFeedback(value: "yes" | "no") {
  feedback.value = value;
  toast.add({
    title: "Thanks for the feedback",
    description: value === "yes" ? "Glad this page helped." : "We'll use this to improve the guide.",
    icon: "i-lucide-heart",
  });
}
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg)">
    <UHeader to="/templates/docs" title="Lumen UI" mode="slideover">
      <template #title>
        <span
          class="flex size-7 items-center justify-center rounded-(--ui-radius) bg-primary text-(--ui-bg)"
          aria-hidden="true"
        >
          <UIcon name="i-lucide-sparkles" class="size-4" />
        </span>
        <span>Lumen</span>
        <UBadge label="v2.4" color="neutral" variant="subtle" size="sm" class="mb-0.5" />
      </template>

      <UContentSearchButton :collapsed="false" class="w-72" />

      <template #right>
        <UContentSearchButton collapsed class="lg:hidden" />
        <UDropdownMenu :items="versionItems" :content="{ align: 'end' }">
          <UButton
            label="v2.4"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-chevron-down"
            class="hidden sm:inline-flex"
          />
        </UDropdownMenu>
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com"
          target="_blank"
          aria-label="Lumen UI on GitHub"
        />
      </template>

      <template #body>
        <UContentNavigation :navigation="navigation" highlight />
      </template>
    </UHeader>

    <UContentSearch :groups="searchGroups" :color-mode="false" />

    <UContainer>
      <UPage>
        <template #left>
          <UPageAside>
            <UContentNavigation :navigation="navigation" highlight />
          </UPageAside>
        </template>

        <UPageHeader
          headline="Getting Started"
          title="Installation"
          description="Add Lumen UI to a new or existing Vue or Nuxt project, wire up the stylesheet, and ship your first themed component in under five minutes."
          :links="headerLinks"
        />

        <UPageBody>
          <article>
            <p :class="pClass">
              Lumen UI ships as a single package that works with plain Vue 3 and Nuxt. The Nuxt module
              auto-imports every component, while Vue projects register a plugin. Either way you get the
              same accessible primitives, design tokens, and <code :class="codeClass">L</code>-prefixed
              components.
            </p>

            <h2 id="prerequisites" :class="h2Class">Prerequisites</h2>
            <p :class="pClass">Before you start, make sure your project meets these requirements:</p>
            <ul class="my-4 space-y-2 ps-6 list-disc marker:text-(--ui-text-muted)">
              <li v-for="item in prerequisites" :key="item.label" class="leading-7">
                <strong class="font-semibold text-(--ui-text-highlighted)">{{ item.label }}</strong>
                {{ item.value }}
              </li>
            </ul>

            <h2 id="install-the-package" :class="h2Class">Install the package</h2>
            <p :class="pClass">
              Lumen UI is published to npm as <code :class="codeClass">@lumen-ui/vue</code>. It has no
              runtime dependencies beyond Vue and Tailwind CSS.
            </p>

            <h3 id="package-manager" :class="h3Class">Using a package manager</h3>
            <div class="my-5 overflow-hidden rounded-(--ui-radius) border border-(--ui-border-muted)">
              <UTabs
                :items="installTabs"
                variant="link"
                size="sm"
                :ui="{
                  list: 'px-2 border-b border-(--ui-border-muted) bg-(--ui-bg)',
                  content: 'm-0',
                }"
              >
                <template #content="{ item }">
                  <pre :class="preClass"><code><span class="text-(--ui-text-muted) select-none" aria-hidden="true">$ </span>{{ item.command }}</code></pre>
                </template>
              </UTabs>
            </div>

            <h3 id="register-the-module" :class="h3Class">Register the module</h3>
            <p :class="pClass">
              In a Nuxt app, add the module to <code :class="codeClass">nuxt.config.ts</code>. Components
              and composables are then available everywhere without manual imports.
            </p>
            <figure class="my-5 overflow-hidden rounded-(--ui-radius) border border-(--ui-border-muted)">
              <figcaption
                class="flex items-center gap-2 border-b border-(--ui-border-muted) bg-(--ui-bg) px-4 py-2.5 text-sm text-(--ui-text)"
              >
                <UIcon name="i-simple-icons-nuxtdotjs" class="size-4 text-(--ui-text-muted)" aria-hidden="true" />
                nuxt.config.ts
              </figcaption>
              <pre :class="preClass"><code>{{ configCode }}</code></pre>
            </figure>

            <UAlert
              color="info"
              variant="subtle"
              icon="i-lucide-info"
              title="Using plain Vue?"
              description="Call app.use(lumen()) from @lumen-ui/vue/plugin in main.ts instead, then add the Vite plugin so components are resolved at build time."
              class="my-6"
            />

            <h2 id="configure-your-theme" :class="h2Class">Configure your theme</h2>
            <p :class="pClass">
              Every component reads its colors, radius, and font from CSS variables, so a theme change is a
              config change, never a rewrite. Start by importing the base stylesheet.
            </p>

            <h3 id="import-the-stylesheet" :class="h3Class">Import the stylesheet</h3>
            <figure class="my-5 overflow-hidden rounded-(--ui-radius) border border-(--ui-border-muted)">
              <figcaption
                class="flex items-center gap-2 border-b border-(--ui-border-muted) bg-(--ui-bg) px-4 py-2.5 text-sm text-(--ui-text)"
              >
                <UIcon name="i-lucide-file-code" class="size-4 text-(--ui-text-muted)" aria-hidden="true" />
                assets/css/main.css
              </figcaption>
              <pre :class="preClass"><code>{{ cssCode }}</code></pre>
            </figure>

            <h3 id="set-brand-colors" :class="h3Class">Set your brand colors</h3>
            <p :class="pClass">
              Map the semantic <code :class="codeClass">primary</code> and
              <code :class="codeClass">neutral</code> aliases to any Tailwind palette in
              <code :class="codeClass">app.config.ts</code>. Changes apply instantly with hot reload.
            </p>
            <figure class="my-5 overflow-hidden rounded-(--ui-radius) border border-(--ui-border-muted)">
              <figcaption
                class="flex items-center gap-2 border-b border-(--ui-border-muted) bg-(--ui-bg) px-4 py-2.5 text-sm text-(--ui-text)"
              >
                <UIcon name="i-lucide-file-code" class="size-4 text-(--ui-text-muted)" aria-hidden="true" />
                app.config.ts
              </figcaption>
              <pre :class="preClass"><code>{{ appConfigCode }}</code></pre>
            </figure>

            <UAlert
              color="success"
              variant="subtle"
              icon="i-lucide-lightbulb"
              title="Tip"
              description="Prefer semantic classes such as text-primary and bg-elevated over raw palette shades. They follow your theme, including dark mode, automatically."
              class="my-6"
            />

            <h2 id="module-options" :class="h2Class">Module options</h2>
            <p :class="pClass">
              Pass these under the <code :class="codeClass">lumen</code> key in your Nuxt config, or as the
              first argument to the Vue plugin.
            </p>
            <div class="my-5 overflow-hidden rounded-(--ui-radius) border border-(--ui-border)">
              <UTable :data="moduleOptions" :columns="optionColumns" class="text-sm">
                <template #name-cell="{ row }">
                  <code :class="codeClass">{{ row.original.name }}</code>
                </template>
                <template #type-cell="{ row }">
                  <span class="font-mono text-sm text-(--ui-text-highlighted)">{{ row.original.type }}</span>
                </template>
                <template #default-cell="{ row }">
                  <span class="font-mono text-sm text-(--ui-text-muted)">{{ row.original.default }}</span>
                </template>
                <template #description-cell="{ row }">
                  <span class="block min-w-56 whitespace-normal text-(--ui-text)">
                    {{ row.original.description }}
                  </span>
                </template>
              </UTable>
            </div>

            <h2 id="verify-the-setup" :class="h2Class">Verify the setup</h2>
            <p :class="pClass">
              Drop a button into any page and start the dev server. If it renders with your primary color
              and rounded corners, everything is wired up correctly.
            </p>
            <figure class="my-5 overflow-hidden rounded-(--ui-radius) border border-(--ui-border-muted)">
              <figcaption
                class="flex items-center gap-2 border-b border-(--ui-border-muted) bg-(--ui-bg) px-4 py-2.5 text-sm text-(--ui-text)"
              >
                <UIcon name="i-simple-icons-vuedotjs" class="size-4 text-(--ui-text-muted)" aria-hidden="true" />
                pages/index.vue
              </figcaption>
              <pre :class="preClass"><code>{{ verifyCode }}</code></pre>
              <div class="flex items-center gap-3 border-t border-(--ui-border-muted) bg-(--ui-bg) px-4 py-4">
                <span class="text-xs font-medium uppercase tracking-wide text-(--ui-text-muted)">Preview</span>
                <UButton icon="i-lucide-rocket" label="Launch" size="sm" />
              </div>
            </figure>

            <UAlert
              color="warning"
              variant="subtle"
              icon="i-lucide-triangle-alert"
              title="Styles not applied?"
              :ui="{ title: 'text-(--ui-text-highlighted)', description: 'text-(--ui-text-toned) opacity-100' }"
              description="Make sure main.css is imported once, before any other stylesheet. Importing Tailwind twice resets the theme variables Lumen UI depends on."
              class="my-6"
            />
          </article>

          <USeparator />

          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
              <p class="text-sm font-medium text-(--ui-text-highlighted)">Was this page helpful?</p>
              <UButton
                icon="i-lucide-thumbs-up"
                label="Yes"
                size="sm"
                :color="feedback === 'yes' ? 'primary' : 'neutral'"
                :variant="feedback === 'yes' ? 'soft' : 'outline'"
                :aria-pressed="feedback === 'yes'"
                @click="sendFeedback('yes')"
              />
              <UButton
                icon="i-lucide-thumbs-down"
                label="No"
                size="sm"
                :color="feedback === 'no' ? 'primary' : 'neutral'"
                :variant="feedback === 'no' ? 'soft' : 'outline'"
                :aria-pressed="feedback === 'no'"
                @click="sendFeedback('no')"
              />
            </div>
            <p class="text-sm text-(--ui-text-muted)">Last updated on October 2, 2026</p>
          </div>

          <UContentSurround :surround="surround" />
        </UPageBody>

        <template #right>
          <UContentToc :links="tocLinks" title="On this page" highlight>
            <template #bottom>
              <USeparator type="dashed" />
              <UPageLinks title="Community" :links="communityLinks" />
            </template>
          </UContentToc>
        </template>
      </UPage>
    </UContainer>
  </div>
</template>
