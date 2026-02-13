<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Popover"
      description="Click-triggered floating content panel."
    >
      <UPopover>
        <UButton label="Open Popover" />
        <template #content>
          <div class="p-4 space-y-2 w-64">
            <p class="text-sm font-medium">Popover Title</p>
            <p class="text-xs text-(--ui-text-muted)">
              This is popover content with additional information or actions.
            </p>
          </div>
        </template>
      </UPopover>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Actions"
      description="Popover containing interactive elements."
    >
      <UPopover>
        <UButton label="Filter" icon="i-lucide-filter" variant="outline" />
        <template #content>
          <div class="p-4 space-y-3 w-64">
            <p class="text-sm font-medium">Filter by status</p>
            <div class="space-y-2">
              <UCheckbox label="Active" :default-value="true" />
              <UCheckbox label="Pending" />
              <UCheckbox label="Archived" />
            </div>
            <UButton label="Apply" size="sm" block />
          </div>
        </template>
      </UPopover>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="User Profile Card"
      description="Popover showing a quick-glance user card."
    >
      <UPopover>
        <UAvatar
          src="https://i.pravatar.cc/128?u=popover-user"
          alt="User"
          size="md"
          class="cursor-pointer"
        />
        <template #content>
          <div class="p-4 w-64">
            <div class="flex items-center gap-3 mb-3">
              <UAvatar
                src="https://i.pravatar.cc/128?u=popover-user"
                alt="Jane Cooper"
              />
              <div>
                <p class="text-sm font-medium">Jane Cooper</p>
                <p class="text-xs text-(--ui-text-muted)">jane@example.com</p>
              </div>
            </div>
            <USeparator class="mb-3" />
            <div class="space-y-1">
              <UButton
                label="View Profile"
                variant="ghost"
                block
                class="justify-start"
                size="sm"
              />
              <UButton
                label="Settings"
                variant="ghost"
                block
                class="justify-start"
                size="sm"
              />
              <UButton
                label="Sign Out"
                variant="ghost"
                block
                class="justify-start"
                size="sm"
                color="error"
              />
            </div>
          </div>
        </template>
      </UPopover>
    </ShowcaseSpecimen>
  </div>
</template>
