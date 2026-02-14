<script setup lang="ts">
import { ECOMMERCE_BLOCKS } from "~/data/blocks/ecommerce";
</script>

<template>
  <BlocksCard
    v-for="block in ECOMMERCE_BLOCKS"
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
