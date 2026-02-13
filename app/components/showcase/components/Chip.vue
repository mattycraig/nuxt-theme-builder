<script setup lang="ts">
const colors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const positions = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Color Palette"
      description="Chips in every semantic color role."
      :prop-hints="['color']"
    >
      <div class="flex flex-wrap gap-2">
        <UChip v-for="color in colors" :key="color" :color="color">
          <UAvatar
            src="https://i.pravatar.cc/128?u=chip-avatar"
            alt="User"
            size="md"
          />
        </UChip>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Chip indicator at various sizes."
      :prop-hints="['size']"
    >
      <div class="flex flex-wrap items-center gap-4">
        <UChip v-for="size in sizes" :key="size" :size="size" color="primary">
          <UButton :label="size" color="neutral" variant="outline" />
        </UChip>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Position"
      description="Chip positioned at different corners."
      :prop-hints="['position']"
    >
      <div class="flex flex-wrap items-center gap-6">
        <UChip
          v-for="pos in positions"
          :key="pos"
          :position="pos"
          color="error"
        >
          <UAvatar
            src="https://i.pravatar.cc/128?u=chip-pos"
            alt="User"
            size="lg"
          />
        </UChip>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Text"
      description="Chip displaying a short count or label."
      :prop-hints="['text']"
    >
      <div class="flex flex-wrap items-center gap-6">
        <UChip text="3" color="error" size="lg">
          <UButton
            icon="i-lucide-bell"
            color="neutral"
            variant="outline"
            size="xl"
          />
        </UChip>
        <UChip text="99+" color="primary" size="lg">
          <UButton
            icon="i-lucide-mail"
            color="neutral"
            variant="outline"
            size="xl"
          />
        </UChip>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Inset Mode"
      description="Chip rendered inside the parent boundary."
      :prop-hints="['inset']"
    >
      <UChip color="success" inset>
        <UAvatar
          src="https://i.pravatar.cc/128?u=chip-inset"
          alt="Online"
          size="lg"
        />
      </UChip>
    </ShowcaseSpecimen>
  </div>
</template>
