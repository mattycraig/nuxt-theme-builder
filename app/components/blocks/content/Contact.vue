<script setup lang="ts">
import { CONTACT_BLOCKS } from "~/data/blocks/contact";
</script>

<template>
  <BlocksCard
    v-for="block in CONTACT_BLOCKS"
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
