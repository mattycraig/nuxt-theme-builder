<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Avatars</h3>

    <!-- Individual sizes -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Sizes</p>
    <div class="flex items-end gap-3 mb-6">
      <div v-for="size in sizes" :key="size" class="text-center">
        <UAvatar
          :src="`https://i.pravatar.cc/128?u=${size}`"
          :alt="`User ${size}`"
          :size="size"
        />
        <p class="text-xs text-(--ui-text-muted) mt-1">{{ size }}</p>
      </div>
    </div>

    <!-- Avatar Group -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Avatar Group</p>
    <UAvatarGroup size="md">
      <UAvatar src="https://i.pravatar.cc/128?u=group1" alt="Member 1" />
      <UAvatar src="https://i.pravatar.cc/128?u=group2" alt="Member 2" />
      <UAvatar src="https://i.pravatar.cc/128?u=group3" alt="Member 3" />
      <UAvatar src="https://i.pravatar.cc/128?u=group4" alt="Member 4" />
      <UAvatar src="https://i.pravatar.cc/128?u=group5" alt="Member 5" />
    </UAvatarGroup>
  </section>
</template>

<script setup lang="ts">
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>
