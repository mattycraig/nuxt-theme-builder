<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Accordion</h3>

    <UAccordion :items="items" />
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    label: "What is Nuxt UI?",
    content:
      "Nuxt UI is a module that provides a set of Vue components and composables built with Tailwind CSS and Headless UI to help you build beautiful and accessible user interfaces.",
  },
  {
    label: "How do I customize the theme?",
    content:
      "You can customize the theme by modifying your app.config.ts file, overriding CSS variables, or using the design tokens provided by Nuxt UI. The theme editor on the left lets you adjust colors, fonts, and radii in real-time.",
  },
  {
    label: "Is it compatible with dark mode?",
    content:
      "Yes! Nuxt UI supports dark mode out of the box. All components automatically adapt to the current color mode. You can toggle between light and dark mode using the built-in color mode composable.",
  },
  {
    label: "Can I use custom icons?",
    content:
      "Absolutely. Nuxt UI uses Iconify under the hood, giving you access to over 200,000 icons from 100+ icon sets. Simply use the icon name as a string prop on supported components.",
  },
];
</script>
