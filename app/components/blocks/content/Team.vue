<script setup lang="ts">
import { TEAM_BLOCKS } from "~/data/blocks/team";
</script>

<template>
  <BlocksCard
    v-for="block in TEAM_BLOCKS"
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
