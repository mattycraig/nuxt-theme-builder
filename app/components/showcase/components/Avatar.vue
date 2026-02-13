<script setup lang="ts">
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Sizes"
      description="Avatar at each available size, from extra-small to extra-large."
      :prop-hints="['size']"
    >
      <div class="flex items-end gap-4">
        <div v-for="size in sizes" :key="size" class="text-center">
          <UAvatar
            :src="`https://i.pravatar.cc/128?u=${size}`"
            :alt="`User avatar ${size}`"
            :size="size"
          />
          <p class="text-xs text-(--ui-text-muted) mt-1.5">{{ size }}</p>
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Avatar Group"
      description="Stacked avatars with overlap to indicate team or group membership."
    >
      <UAvatarGroup size="md">
        <UAvatar src="https://i.pravatar.cc/128?u=group1" alt="Member 1" />
        <UAvatar src="https://i.pravatar.cc/128?u=group2" alt="Member 2" />
        <UAvatar src="https://i.pravatar.cc/128?u=group3" alt="Member 3" />
        <UAvatar src="https://i.pravatar.cc/128?u=group4" alt="Member 4" />
        <UAvatar src="https://i.pravatar.cc/128?u=group5" alt="Member 5" />
      </UAvatarGroup>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Initials"
      description="Fallback to initials when no image is available."
      :prop-hints="['text']"
    >
      <div class="flex items-center gap-3">
        <UAvatar text="AJ" size="md" />
        <UAvatar text="BM" size="md" />
        <UAvatar text="CW" size="md" />
        <UAvatar text="DK" size="md" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icon Fallback"
      description="Display an icon when neither image nor initials are given."
      :prop-hints="['icon']"
    >
      <div class="flex items-center gap-3">
        <UAvatar icon="i-lucide-user" size="md" />
        <UAvatar icon="i-lucide-bot" size="md" />
        <UAvatar icon="i-lucide-building" size="md" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Group with Overflow"
      description="Large avatar group showing the +N overflow indicator."
    >
      <UAvatarGroup :max="4" size="md">
        <UAvatar src="https://i.pravatar.cc/128?u=a1" alt="Person 1" />
        <UAvatar src="https://i.pravatar.cc/128?u=a2" alt="Person 2" />
        <UAvatar src="https://i.pravatar.cc/128?u=a3" alt="Person 3" />
        <UAvatar src="https://i.pravatar.cc/128?u=a4" alt="Person 4" />
        <UAvatar src="https://i.pravatar.cc/128?u=a5" alt="Person 5" />
        <UAvatar src="https://i.pravatar.cc/128?u=a6" alt="Person 6" />
        <UAvatar src="https://i.pravatar.cc/128?u=a7" alt="Person 7" />
      </UAvatarGroup>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Profile Card Pattern"
      description="Avatar used in a user profile card context."
    >
      <div
        class="flex items-center gap-3 p-3 rounded-lg border border-(--ui-border)"
      >
        <UAvatar
          src="https://i.pravatar.cc/128?u=profile"
          alt="Sarah Chen"
          size="lg"
        />
        <div>
          <p class="font-semibold text-sm">Sarah Chen</p>
          <p class="text-xs text-(--ui-text-muted)">Product Designer</p>
        </div>
        <UButton
          label="Follow"
          variant="soft"
          color="primary"
          size="xs"
          class="ml-auto"
        />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
