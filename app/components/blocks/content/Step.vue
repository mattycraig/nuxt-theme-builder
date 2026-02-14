<script setup lang="ts">
import { STEP_BLOCKS } from "~/data/blocks/step";
</script>

<template>
  <div class="space-y-12">
    <BlocksCard
      v-for="block in STEP_BLOCKS"
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
