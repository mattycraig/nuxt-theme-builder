<script setup lang="ts">
import { GALLERY_BLOCKS } from "~/data/blocks/gallery";
</script>

<template>
  <div class="space-y-12">
    <BlocksCard
      v-for="block in GALLERY_BLOCKS"
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
