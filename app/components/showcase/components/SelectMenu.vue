<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Select Menu"
      description="Popover-based searchable select with filtering."
      :prop-hints="['items']"
    >
      <UFormField label="Framework">
        <USelectMenu :items="frameworks" placeholder="Select a framework" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Multiple Selection"
      description="Select multiple items from the list."
      :prop-hints="['multiple']"
    >
      <UFormField label="Technologies">
        <USelectMenu
          :items="technologies"
          multiple
          placeholder="Choose technologies..."
        />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Groups"
      description="Items organized into labeled groups."
    >
      <UFormField label="Component">
        <USelectMenu :items="groupedItems" placeholder="Pick a component" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icon"
      description="Select menu with leading icon."
      :prop-hints="['icon']"
    >
      <UFormField label="Status">
        <USelectMenu
          icon="i-lucide-filter"
          :items="statuses"
          placeholder="Filter by status"
        />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const frameworks = [
  "Nuxt",
  "Next.js",
  "SvelteKit",
  "Remix",
  "Astro",
  "SolidStart",
];
const technologies = [
  "TypeScript",
  "JavaScript",
  "Vue",
  "React",
  "Svelte",
  "Tailwind CSS",
  "Node.js",
];

const groupedItems = [
  {
    label: "Element",
    children: [{ label: "Button" }, { label: "Badge" }, { label: "Avatar" }],
  },
  {
    label: "Form",
    children: [{ label: "Input" }, { label: "Select" }, { label: "Checkbox" }],
  },
  {
    label: "Overlay",
    children: [{ label: "Modal" }, { label: "Drawer" }, { label: "Toast" }],
  },
];

const statuses = ["Active", "Inactive", "Pending", "Archived"];
</script>
