<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Vertical Scroll Area"
      description="Content container with a custom vertical scrollbar."
    >
      <UScrollArea
        class="h-48 w-full max-w-sm rounded-md border border-(--ui-border) p-4"
      >
        <div class="space-y-4">
          <div v-for="i in 20" :key="i">
            <p class="text-sm font-medium">Item {{ i }}</p>
            <p class="text-xs text-(--ui-text-muted)">
              Description for item number {{ i }}.
            </p>
          </div>
        </div>
      </UScrollArea>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Horizontal Scroll Area"
      description="Horizontally scrollable content."
      :prop-hints="['orientation']"
    >
      <UScrollArea
        orientation="horizontal"
        class="w-full max-w-sm rounded-md border border-(--ui-border) p-4"
      >
        <div class="flex gap-4 w-max">
          <div
            v-for="i in 12"
            :key="i"
            class="flex-none w-32 h-24 rounded-md bg-(--ui-bg-elevated) flex items-center justify-center"
          >
            <span class="text-sm font-medium">Card {{ i }}</span>
          </div>
        </div>
      </UScrollArea>
    </ShowcaseSpecimen>
  </div>
</template>
