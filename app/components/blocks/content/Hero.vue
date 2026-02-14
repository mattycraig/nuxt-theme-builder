<script setup lang="ts">
import { HERO_BLOCKS } from "~/data/blocks/hero";
</script>

<template>
  <BlocksCard
    v-for="block in HERO_BLOCKS"
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
