<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Slideover"
      description="Side panel sliding in from the edge of the screen."
    >
      <UButton label="Open Slideover" @click="defaultOpen = true" />
      <USlideover
        v-model:open="defaultOpen"
        title="Details Panel"
        description="View and manage item details."
      >
        <template #body>
          <p class="text-sm text-(--ui-text-muted)">
            This slideover panel is useful for detail views, settings, or
            additional context without leaving the current page.
          </p>
        </template>
      </USlideover>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Left Side"
      description="Slideover emerging from the left."
      :prop-hints="['side']"
    >
      <UButton label="Open Left" variant="outline" @click="leftOpen = true" />
      <USlideover v-model:open="leftOpen" title="Navigation" side="left">
        <template #body>
          <div class="space-y-2">
            <UButton
              v-for="item in ['Dashboard', 'Projects', 'Team', 'Settings']"
              :key="item"
              :label="item"
              variant="ghost"
              block
              class="justify-start"
            />
          </div>
        </template>
      </USlideover>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Form"
      description="Slideover containing an edit form."
    >
      <UButton
        label="Edit Settings"
        variant="subtle"
        @click="formOpen = true"
      />
      <USlideover
        v-model:open="formOpen"
        title="Project Settings"
        description="Update your project configuration."
      >
        <template #body>
          <div class="space-y-4">
            <UFormField label="Project Name" required>
              <UInput placeholder="My Project" />
            </UFormField>
            <UFormField label="Description">
              <UTextarea placeholder="Describe your project..." :rows="3" />
            </UFormField>
            <UFormField label="Visibility">
              <USelect
                :items="['Public', 'Private', 'Internal']"
                placeholder="Select visibility"
              />
            </UFormField>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              label="Cancel"
              color="neutral"
              variant="outline"
              @click="formOpen = false"
            />
            <UButton label="Save" color="primary" @click="formOpen = false" />
          </div>
        </template>
      </USlideover>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const defaultOpen = ref(false);
const leftOpen = ref(false);
const formOpen = ref(false);
</script>
