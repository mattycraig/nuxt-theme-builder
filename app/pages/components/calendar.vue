<template>
  <div class="p-6 space-y-8 max-w-5xl mx-auto">
    <UPageHeader
      headline="Components"
      title="Calendar"
      description="Date picker and calendar using your current theme."
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
    <ShowcaseCalendar />
  </div>
</template>
