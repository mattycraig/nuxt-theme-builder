<script setup lang="ts">
defineProps<{
  source: string;
  filePath: string;
  loading: boolean;
  error: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div
    class="flex-1 overflow-hidden bg-(--ui-bg-muted) p-4 sm:p-6 flex justify-center items-stretch"
  >
    <div
      class="relative h-full w-full rounded-xl shadow-xl overflow-hidden source-code-wrapper"
    >
      <CodeBlock
        :code="source"
        :filename="filePath"
        language="vue"
        max-height="none"
        :loading="loading"
        :error="error"
        download-mime-type="text/plain"
        @retry="emit('retry')"
      />
    </div>
  </div>
</template>

<style scoped>
.source-code-wrapper :deep(.code-block) {
  height: 100%;
  border-radius: 0.75rem;
}

.source-code-wrapper :deep(.code-block__content) {
  height: calc(100% - 2.75rem);
}
</style>
