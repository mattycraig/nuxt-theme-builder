<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Basic Links"
      description="Styled link elements for navigation."
    >
      <div class="flex flex-wrap gap-4">
        <ULink to="#" active-class="text-(--ui-primary)">Home</ULink>
        <ULink to="#" active-class="text-(--ui-primary)">About</ULink>
        <ULink to="#" active-class="text-(--ui-primary)">Documentation</ULink>
        <ULink to="#" active-class="text-(--ui-primary)">Contact</ULink>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="External Links"
      description="Links opening in a new tab with external attribute."
      :prop-hints="['external', 'target']"
    >
      <div class="space-y-2">
        <ULink
          to="https://nuxt.com"
          external
          target="_blank"
          class="flex items-center gap-1 text-sm"
        >
          Nuxt Homepage
          <UIcon name="i-lucide-external-link" class="size-3" />
        </ULink>
        <ULink
          to="https://ui.nuxt.com"
          external
          target="_blank"
          class="flex items-center gap-1 text-sm"
        >
          Nuxt UI Docs
          <UIcon name="i-lucide-external-link" class="size-3" />
        </ULink>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Inactive vs Active"
      description="Link styling for active state indication."
      :prop-hints="['active']"
    >
      <div class="flex gap-4">
        <ULink to="#" active active-class="text-(--ui-primary) font-semibold"
          >Active Link</ULink
        >
        <ULink to="#" inactive-class="text-(--ui-text-muted)"
          >Inactive Link</ULink
        >
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
