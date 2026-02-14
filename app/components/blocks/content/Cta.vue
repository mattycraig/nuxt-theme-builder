<script setup lang="ts">
import { CTA_BLOCKS } from "~/data/blocks/cta";
</script>

<template>
  <BlocksCard
    v-for="block in CTA_BLOCKS"
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
