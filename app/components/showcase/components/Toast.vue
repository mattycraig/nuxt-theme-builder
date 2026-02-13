<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Semantic Toasts"
      description="Toast notifications in all semantic colors."
      :prop-hints="['color', 'title', 'description']"
    >
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="item in toastVariants"
          :key="item.color"
          :label="item.color.charAt(0).toUpperCase() + item.color.slice(1)"
          :color="item.color"
          variant="outline"
          @click="showToast(item)"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Actions"
      description="Toast including action buttons."
    >
      <UButton label="Show Action Toast" @click="showActionToast" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icon"
      description="Toast with a leading icon for visual emphasis."
      :prop-hints="['icon']"
    >
      <UButton
        label="Show Icon Toast"
        variant="subtle"
        @click="showIconToast"
      />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

const toastVariants = [
  {
    color: "primary" as const,
    title: "Information",
    description: "This is an informational message.",
  },
  {
    color: "success" as const,
    title: "Success",
    description: "Operation completed successfully.",
  },
  {
    color: "warning" as const,
    title: "Warning",
    description: "Please review before continuing.",
  },
  {
    color: "error" as const,
    title: "Error",
    description: "Something went wrong.",
  },
  {
    color: "neutral" as const,
    title: "Neutral",
    description: "A plain notification.",
  },
];

function showToast(item: (typeof toastVariants)[number]) {
  toast.add({
    title: item.title,
    description: item.description,
    color: item.color,
  });
}

function showActionToast() {
  toast.add({
    title: "File deleted",
    description: "The file has been moved to trash.",
    actions: [{ label: "Undo", color: "primary" as const }],
  });
}

function showIconToast() {
  toast.add({
    title: "Download complete",
    description: "Your file has been downloaded.",
    icon: "i-lucide-download",
    color: "success",
  });
}
</script>
