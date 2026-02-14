<script setup lang="ts">
import { TESTIMONIAL_BLOCKS } from "~/data/blocks/testimonial";
</script>

<template>
  <div class="space-y-12">
    <BlocksCard
      v-for="block in TESTIMONIAL_BLOCKS"
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
