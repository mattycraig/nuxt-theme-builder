<script setup lang="ts">
import { FEATURE_BLOCKS } from "~/data/blocks/feature";
</script>

<template>
  <BlocksCard
    v-for="block in FEATURE_BLOCKS"
    :id="block.id"
    :key="block.id"
    :title="block.title"
    :description="block.description"
    :prompt="block.prompt"
    :source="block.source"
  >
    <component :is="block.component" />
  </BlocksCard>
</template>
