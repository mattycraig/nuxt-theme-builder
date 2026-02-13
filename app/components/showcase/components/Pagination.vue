<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Pagination"
      description="Page navigation for paginated data."
      :prop-hints="['total', 'page']"
    >
      <UPagination v-model:page="page" :total="100" :items-per-page="10" />
      <p class="text-xs text-(--ui-text-muted) mt-2">Page {{ page }} of 10</p>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Sibling Count"
      description="Control how many page buttons appear around the current page."
      :prop-hints="['siblingCount']"
    >
      <UPagination
        v-model:page="page2"
        :total="200"
        :items-per-page="10"
        :sibling-count="2"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive pagination."
      :prop-hints="['disabled']"
    >
      <UPagination :page="1" :total="50" :items-per-page="10" disabled />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const page = ref(1);
const page2 = ref(5);
</script>
