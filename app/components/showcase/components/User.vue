<script setup lang="ts">
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default User"
      description="User display with avatar, name, and description."
    >
      <UUser
        name="Jane Cooper"
        description="Product Designer"
        :avatar="{ src: 'https://i.pravatar.cc/128?u=user-jane' }"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="User component at different sizes."
      :prop-hints="['size']"
    >
      <div class="space-y-4">
        <UUser
          v-for="size in sizes"
          :key="size"
          :size="size"
          name="Jane Cooper"
          :description="size"
          :avatar="{ src: 'https://i.pravatar.cc/128?u=user-sizes' }"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Name Only"
      description="User display without description."
    >
      <UUser
        name="John Doe"
        :avatar="{ src: 'https://i.pravatar.cc/128?u=user-john' }"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Initials"
      description="User with avatar falling back to initials."
    >
      <div class="space-y-3">
        <UUser name="Alice Brown" description="Engineering Lead" />
        <UUser name="Bob Chen" description="Backend Developer" />
        <UUser name="Carol Davis" description="UI Designer" />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
