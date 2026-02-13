<template>
  <div class="p-6 space-y-8 max-w-5xl mx-auto">
    <UPageHeader
      headline="Components"
      title="Avatars"
      description="Avatar components with sizes, groups, and fallbacks using your current theme."
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
    <ShowcaseAvatars />
  </div>
</template>
