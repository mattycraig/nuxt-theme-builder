<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Empty State"
      description="Placeholder for sections with no data."
      :prop-hints="['icon', 'title', 'description']"
    >
      <UEmpty
        icon="i-lucide-inbox"
        title="No messages"
        description="Your inbox is empty. New messages will appear here."
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Action"
      description="Empty state with a call-to-action button."
      :prop-hints="['actions']"
    >
      <UEmpty
        icon="i-lucide-folder-open"
        title="No projects yet"
        description="Get started by creating your first project."
        :actions="[
          { label: 'Create project', icon: 'i-lucide-plus', color: 'primary' },
        ]"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Search Results"
      description="Empty state specific to a search with no matches."
    >
      <UEmpty
        icon="i-lucide-search-x"
        title="No results found"
        description="Try adjusting your search terms or filters."
        :actions="[
          { label: 'Clear filters', variant: 'outline', color: 'neutral' },
        ]"
      />
    </ShowcaseSpecimen>
  </div>
</template>
