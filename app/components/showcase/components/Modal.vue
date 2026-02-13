<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Modal"
      description="Standard dialog overlay for confirmations and forms."
    >
      <UButton label="Open Modal" @click="defaultOpen = true" />
      <UModal
        v-model:open="defaultOpen"
        title="Confirm Action"
        description="Are you sure you want to proceed?"
      >
        <template #body>
          <p class="text-sm text-(--ui-text-muted)">
            This action cannot be undone.
          </p>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              label="Cancel"
              variant="outline"
              color="neutral"
              @click="defaultOpen = false"
            />
            <UButton
              label="Confirm"
              color="primary"
              @click="defaultOpen = false"
            />
          </div>
        </template>
      </UModal>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Form Modal"
      description="Modal containing a form with input fields."
    >
      <UButton label="Create Item" variant="outline" @click="formOpen = true" />
      <UModal
        v-model:open="formOpen"
        title="New Item"
        description="Fill in the details to create a new item."
      >
        <template #body>
          <div class="space-y-4">
            <UFormField label="Name" required>
              <UInput placeholder="Item name" />
            </UFormField>
            <UFormField label="Description">
              <UTextarea placeholder="Optional description..." :rows="3" />
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
            <UButton label="Create" color="primary" @click="formOpen = false" />
          </div>
        </template>
      </UModal>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Fullscreen Modal"
      description="Modal that takes up the full viewport."
      :prop-hints="['fullscreen']"
    >
      <UButton
        label="Open Fullscreen"
        variant="subtle"
        @click="fullscreenOpen = true"
      />
      <UModal v-model:open="fullscreenOpen" title="Fullscreen View" fullscreen>
        <template #body>
          <p class="text-sm text-(--ui-text-muted)">
            This modal occupies the entire screen, suitable for rich editing
            experiences.
          </p>
          <UButton
            label="Close"
            class="mt-4"
            variant="outline"
            @click="fullscreenOpen = false"
          />
        </template>
      </UModal>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const defaultOpen = ref(false);
const formOpen = ref(false);
const fullscreenOpen = ref(false);
</script>
