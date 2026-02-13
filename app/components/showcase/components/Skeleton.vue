<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Content Skeleton"
      description="Loading placeholder for text and media content."
    >
      <div class="space-y-3 max-w-sm">
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-5/6" />
        <USkeleton class="h-4 w-2/3" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Card Skeleton"
      description="Skeleton mimicking a profile or media card."
    >
      <div
        class="max-w-xs space-y-3 p-4 border border-(--ui-border) rounded-lg"
      >
        <USkeleton class="h-32 w-full rounded-md" />
        <USkeleton class="h-4 w-2/3" />
        <USkeleton class="h-3 w-full" />
        <USkeleton class="h-3 w-5/6" />
        <div class="flex gap-2 pt-2">
          <USkeleton class="h-8 w-20 rounded-md" />
          <USkeleton class="h-8 w-20 rounded-md" />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="List Skeleton"
      description="Skeleton rows for a list or table."
    >
      <div class="space-y-3 max-w-md">
        <div v-for="i in 4" :key="i" class="flex items-center gap-3">
          <USkeleton class="h-10 w-10 rounded-full" />
          <div class="flex-1 space-y-2">
            <USkeleton class="h-3 w-1/3" />
            <USkeleton class="h-3 w-2/3" />
          </div>
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Dashboard Skeleton"
      description="Full dashboard section loading state."
    >
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="i in 3"
          :key="i"
          class="p-4 border border-(--ui-border) rounded-lg space-y-2"
        >
          <USkeleton class="h-3 w-1/2" />
          <USkeleton class="h-8 w-2/3" />
          <USkeleton class="h-2 w-full" />
        </div>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
