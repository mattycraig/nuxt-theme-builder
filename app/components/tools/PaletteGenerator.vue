<script setup lang="ts">
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

const toast = useToast();
const { copy } = useClipboard();

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

const PREVIEW_SHADES = ["300", "400", "500", "600", "700"] as const;

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

function copyFormat(format: "css" | "json" | "appconfig") {
  const generators: Record<string, () => string> = {
    css: generateCssVariables,
    json: generateJson,
    appconfig: generateAppConfig,
  };
  const generator = generators[format];
  if (!generator) return;
  const output = generator();
  copy(output);
  toast.add({
    title: "Copied!",
    description: `Palette exported as ${format.toUpperCase()}`,
    icon: "i-lucide-clipboard-check",
    color: "success",
  });
}

// Generate initial palette
generate();
</script>

<template>
  <div class="space-y-6 mb-12">
    <div class="flex flex-wrap gap-3">
      <UButton
        icon="i-lucide-shuffle"
        label="Generate"
        color="primary"
        @click="generate"
      />
      <UButton
        icon="i-lucide-clipboard-copy"
        label="Copy CSS"
        variant="outline"
        color="neutral"
        @click="copyFormat('css')"
      />
      <UButton
        icon="i-lucide-braces"
        label="Copy JSON"
        variant="outline"
        color="neutral"
        @click="copyFormat('json')"
      />
      <UButton
        icon="i-lucide-file-code"
        label="Copy app.config"
        variant="outline"
        color="neutral"
        @click="copyFormat('appconfig')"
      />
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, index) in roles"
        :key="item.role"
        class="rounded-lg border border-[var(--ui-border-default)] overflow-hidden bg-[var(--ui-bg-default)]"
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

    <UCard>
      <template #header>
        <h3 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">
          CSS Variables Preview
        </h3>
      </template>
      <pre
        class="text-xs font-mono whitespace-pre-wrap text-[var(--ui-text-default)] overflow-x-auto"
        >{{ generateCssVariables() }}</pre
      >
    </UCard>
  </div>
</template>
