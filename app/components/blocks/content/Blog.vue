<script setup lang="ts">
import { BLOG_BLOCKS } from "~/data/blocks/blog";
</script>

<template>
  <div class="space-y-12">
    <BlocksCard
      v-for="block in BLOG_BLOCKS"
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
