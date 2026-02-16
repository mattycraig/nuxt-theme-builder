<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { CHROMATIC_HEX_MAP } from "~/utils/colorPalettes";
import {
  CHROMATIC_PALETTES,
  SEMANTIC_COLOR_KEYS,
  type ChromaticPalette,
  type SemanticColorKey,
} from "~/types/theme";
import {
  parseOklchString,
  rgbToHex,
  formatOklch,
  rgbToOklch,
} from "~/utils/colorConversion";
import { MSG } from "~/utils/iframeProtocol";
import type { ApplyAiThemeMessage } from "~/utils/iframeProtocol";
import { isInIframe } from "~/utils/helpers";

const toast = useToast();
const themeStore = useThemeStore();

const inIframe = isInIframe();

interface GeneratedRole {
  role: SemanticColorKey;
  palette: ChromaticPalette;
  locked: boolean;
}

const roles = ref<GeneratedRole[]>(
  SEMANTIC_COLOR_KEYS.map((role) => ({
    role,
    palette: randomPalette(),
    locked: false,
  })),
);

function randomPalette(exclude?: ChromaticPalette[]): ChromaticPalette {
  const pool = exclude
    ? CHROMATIC_PALETTES.filter((p) => !exclude.includes(p))
    : [...CHROMATIC_PALETTES];
  return pool[Math.floor(Math.random() * pool.length)]!;
}

function generate() {
  const usedPalettes: ChromaticPalette[] = roles.value
    .filter((r) => r.locked)
    .map((r) => r.palette);

  roles.value = roles.value.map((r) => {
    if (r.locked) return r;
    let palette = randomPalette(usedPalettes);
    // Very small chance of collision with 17 palettes, but let's handle it
    while (
      usedPalettes.includes(palette) &&
      usedPalettes.length < CHROMATIC_PALETTES.length
    ) {
      palette = randomPalette(usedPalettes);
    }
    usedPalettes.push(palette);
    return { ...r, palette };
  });
}

function toggleLock(index: number) {
  const role = roles.value[index];
  if (role) role.locked = !role.locked;
}

function getSwatchHex(palette: ChromaticPalette, shade: string): string {
  const oklch = CHROMATIC_HEX_MAP[palette]?.[shade];
  if (!oklch) return "#888888";
  const rgb = parseOklchString(oklch);
  return rgb ? rgbToHex(rgb) : "#888888";
}

const PREVIEW_SHADES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

function generateCssVariables(): string {
  const lines = roles.value.map((r) => {
    const oklch = CHROMATIC_HEX_MAP[r.palette]?.["500"];
    const rgb = oklch ? parseOklchString(oklch) : null;
    const oklchObj = rgb ? rgbToOklch(rgb) : null;
    const value = oklchObj ? formatOklch(oklchObj) : r.palette;
    return `  --ui-color-${r.role}: ${value};`;
  });
  return `:root {\n${lines.join("\n")}\n}`;
}

function generateJson(): string {
  const obj: Record<string, string> = {};
  for (const r of roles.value) {
    obj[r.role] = r.palette;
  }
  return JSON.stringify(obj, null, 2);
}

function generateAppConfig(): string {
  const assignments = roles.value
    .map((r) => `    ${r.role}: '${r.palette}',`)
    .join("\n");
  return `export default defineAppConfig({\n  ui: {\n    colors: {\n${assignments}\n    },\n  },\n})`;
}

function applyToTheme() {
  const colorsUpdate = Object.fromEntries(
    roles.value.map((r) => [r.role, r.palette]),
  );

  if (inIframe) {
    // Build a full config clone with updated colors for the parent store
    const config = JSON.parse(JSON.stringify(themeStore.config));
    Object.assign(config.colors, colorsUpdate);
    Object.assign(config.darkColors, colorsUpdate);
    const message: ApplyAiThemeMessage = { type: MSG.APPLY_AI_THEME, config };
    window.parent.postMessage(message, window.location.origin);
  } else {
    for (const r of roles.value) {
      themeStore.setSemanticColorForMode("light", r.role, r.palette);
      themeStore.setSemanticColorForMode("dark", r.role, r.palette);
    }
  }

  toast.add({
    title: "Applied!",
    description: "Palette applied to your current theme",
    icon: "i-lucide-check-circle",
    color: "success",
  });
}

type ExportTab = "appconfig" | "css" | "json";

const activeTab = ref<ExportTab>("appconfig");

const exportTabs: TabsItem[] = [
  { label: "app.config.ts", icon: "i-lucide-file-cog", value: "appconfig" },
  { label: "CSS Variables", icon: "i-lucide-palette", value: "css" },
  { label: "JSON", icon: "i-lucide-braces", value: "json" },
];

const TAB_META: Record<
  ExportTab,
  { filename: string; language: string; mimeType: string }
> = {
  appconfig: {
    filename: "app.config.ts",
    language: "ts",
    mimeType: "text/typescript",
  },
  css: { filename: "palette.css", language: "css", mimeType: "text/css" },
  json: {
    filename: "palette.json",
    language: "json",
    mimeType: "application/json",
  },
};

const exportSources: Record<ExportTab, () => string> = {
  appconfig: generateAppConfig,
  css: generateCssVariables,
  json: generateJson,
};

const currentCode = computed(() => exportSources[activeTab.value]?.() ?? "");
const currentMeta = computed(
  () => TAB_META[activeTab.value] ?? TAB_META.appconfig,
);

// Generate initial palette
generate();
</script>

<template>
  <div class="space-y-6 mb-12">
    <!-- Action buttons -->
    <div class="flex flex-wrap gap-3">
      <UButton
        icon="i-lucide-shuffle"
        label="Generate"
        color="primary"
        @click="generate"
      />
      <UButton
        icon="i-lucide-paintbrush"
        label="Apply to Theme"
        variant="soft"
        color="primary"
        @click="applyToTheme"
      />
    </div>

    <!-- Role palette cards grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, index) in roles"
        :key="item.role"
        class="rounded-lg border border-default overflow-hidden bg-[var(--ui-bg-default)]"
      >
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <p
              class="text-sm font-semibold text-[var(--ui-text-highlighted)] capitalize"
            >
              {{ item.role }}
            </p>
            <p class="text-xs text-[var(--ui-text-muted)] capitalize">
              {{ item.palette }}
            </p>
          </div>
          <UTooltip
            :text="item.locked ? `Unlock ${item.role}` : `Lock ${item.role}`"
          >
            <UButton
              :icon="item.locked ? 'i-lucide-lock' : 'i-lucide-unlock'"
              variant="ghost"
              color="neutral"
              size="sm"
              :aria-label="
                item.locked ? `Unlock ${item.role}` : `Lock ${item.role}`
              "
              @click="toggleLock(index)"
            />
          </UTooltip>
        </div>
        <div
          class="flex"
          role="img"
          :aria-label="`${item.role} using ${item.palette} palette`"
        >
          <div
            v-for="shade in PREVIEW_SHADES"
            :key="shade"
            class="flex-1 h-12"
            :style="{ backgroundColor: getSwatchHex(item.palette, shade) }"
            :title="`${item.palette}-${shade}: ${getSwatchHex(item.palette, shade)}`"
          />
        </div>
      </div>
    </div>

    <!-- Export palette section -->
    <section aria-labelledby="palette-export-heading">
      <div class="flex items-center gap-2 mb-3">
        <UIcon
          name="i-lucide-file-output"
          class="size-4 text-(--ui-text-muted)"
        />
        <h3
          id="palette-export-heading"
          class="text-sm font-semibold text-(--ui-text-highlighted)"
        >
          Export Palette
        </h3>
      </div>

      <UTabs
        v-model="activeTab"
        :items="exportTabs"
        value-key="value"
        variant="pill"
        size="sm"
        :content="false"
        class="mb-3"
      />

      <SharedCodeBlock
        :code="currentCode"
        :filename="currentMeta.filename"
        :language="currentMeta.language"
        :download-mime-type="currentMeta.mimeType"
        max-height="18rem"
      />
    </section>
  </div>
</template>
