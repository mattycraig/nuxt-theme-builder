<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Drawer"
      description="Slide-in panel from the bottom of the screen."
    >
      <UButton label="Open Drawer" @click="defaultOpen = true" />
      <UDrawer
        v-model:open="defaultOpen"
        title="Drawer Title"
        description="This is a basic drawer panel."
      >
        <template #body>
          <p class="text-sm text-(--ui-text-muted)">
            Drawer content goes here. This is great for mobile-friendly panels
            and action sheets.
          </p>
        </template>
      </UDrawer>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Form Content"
      description="Drawer containing a form for quick input."
    >
      <UButton
        label="Edit Profile"
        variant="outline"
        @click="formOpen = true"
      />
      <UDrawer
        v-model:open="formOpen"
        title="Edit Profile"
        description="Update your display name and bio."
      >
        <template #body>
          <div class="space-y-4">
            <UFormField label="Display Name">
              <UInput placeholder="Your name" />
            </UFormField>
            <UFormField label="Bio">
              <UTextarea
                placeholder="Write something about yourself..."
                :rows="3"
              />
            </UFormField>
            <div class="flex gap-2">
              <UButton label="Save" color="primary" />
              <UButton
                label="Cancel"
                variant="outline"
                color="neutral"
                @click="formOpen = false"
              />
            </div>
          </div>
        </template>
      </UDrawer>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const defaultOpen = ref(false);
const formOpen = ref(false);
</script>
