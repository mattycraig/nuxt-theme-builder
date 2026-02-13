<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Input Menu"
      description="Searchable dropdown menu input for selecting from options."
      :prop-hints="['items']"
    >
      <UFormField label="Framework">
        <UInputMenu :items="frameworks" placeholder="Select a framework" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Search"
      description="Input menu that filters as you type."
    >
      <UFormField label="Country">
        <UInputMenu :items="countries" placeholder="Search countries..." />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Multiple Selection"
      description="Select multiple items from the menu."
      :prop-hints="['multiple']"
    >
      <UFormField label="Skills">
        <UInputMenu :items="skills" multiple placeholder="Select skills..." />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive input menu."
      :prop-hints="['disabled']"
    >
      <UFormField label="Locked">
        <UInputMenu
          :items="['Option A']"
          disabled
          placeholder="Not available"
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
  "Solid Start",
];
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
];
const skills = [
  "TypeScript",
  "Vue",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Go",
  "Rust",
];
</script>
