<script setup lang="ts">
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Group"
      description="Overlapping avatars indicating team membership."
    >
      <UAvatarGroup size="md">
        <UAvatar src="https://i.pravatar.cc/128?u=ag1" alt="Member 1" />
        <UAvatar src="https://i.pravatar.cc/128?u=ag2" alt="Member 2" />
        <UAvatar src="https://i.pravatar.cc/128?u=ag3" alt="Member 3" />
        <UAvatar src="https://i.pravatar.cc/128?u=ag4" alt="Member 4" />
      </UAvatarGroup>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Max Overflow"
      description="Group limited to a max count, showing +N for remaining."
      :prop-hints="['max']"
    >
      <UAvatarGroup :max="3" size="md">
        <UAvatar src="https://i.pravatar.cc/128?u=agm1" alt="Person 1" />
        <UAvatar src="https://i.pravatar.cc/128?u=agm2" alt="Person 2" />
        <UAvatar src="https://i.pravatar.cc/128?u=agm3" alt="Person 3" />
        <UAvatar src="https://i.pravatar.cc/128?u=agm4" alt="Person 4" />
        <UAvatar src="https://i.pravatar.cc/128?u=agm5" alt="Person 5" />
        <UAvatar src="https://i.pravatar.cc/128?u=agm6" alt="Person 6" />
        <UAvatar src="https://i.pravatar.cc/128?u=agm7" alt="Person 7" />
        <UAvatar src="https://i.pravatar.cc/128?u=agm8" alt="Person 8" />
      </UAvatarGroup>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Avatar groups at different sizes."
      :prop-hints="['size']"
    >
      <div class="space-y-4">
        <div v-for="size in sizes" :key="size">
          <p class="text-xs text-(--ui-text-muted) mb-1">{{ size }}</p>
          <UAvatarGroup :size="size">
            <UAvatar src="https://i.pravatar.cc/128?u=ags1" alt="Person 1" />
            <UAvatar src="https://i.pravatar.cc/128?u=ags2" alt="Person 2" />
            <UAvatar src="https://i.pravatar.cc/128?u=ags3" alt="Person 3" />
          </UAvatarGroup>
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Initials Fallback"
      description="Group mixing images and initial-based avatars."
    >
      <UAvatarGroup size="md">
        <UAvatar src="https://i.pravatar.cc/128?u=agf1" alt="Alice" />
        <UAvatar text="BM" />
        <UAvatar src="https://i.pravatar.cc/128?u=agf3" alt="Carol" />
        <UAvatar text="DK" />
      </UAvatarGroup>
    </ShowcaseSpecimen>
  </div>
</template>
