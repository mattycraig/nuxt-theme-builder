<script setup lang="ts">
import { STATISTIC_BLOCKS } from "~/data/blocks/statistic";
</script>

<template>
  <div class="space-y-12">
    <BlocksCard
      v-for="block in STATISTIC_BLOCKS"
      :id="block.id"
      :key="block.id"
      :title="block.title"
      :description="block.description"
      :prompt="block.prompt"
      :source="block.source"
    >
      <component :is="block.component" />
    </BlocksCard>
  </div>
</template>
