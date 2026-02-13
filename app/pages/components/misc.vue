<template>
  <div class="p-6 space-y-8 max-w-5xl mx-auto">
    <UPageHeader
      headline="Components"
      title="Miscellaneous"
      description="Tooltips, separators, color mode switch, and other utility components."
      :links="[
        {
          label: 'All Components',
          icon: 'i-lucide-arrow-left',
          to: '/components',
          variant: 'ghost',
          color: 'neutral',
        },
      ]"
    />
    <ShowcaseMisc />
  </div>
</template>
