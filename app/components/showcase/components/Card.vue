<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Header + Body + Footer"
      description="Classic card with structured regions. Header for context, body for content, footer for actions."
    >
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">Project Overview</h3>
            <UBadge label="Active" color="success" variant="soft" />
          </div>
        </template>
        <p class="text-sm text-(--ui-text-muted)">
          This project is currently in development. All milestones are on track
          and the team is making steady progress toward the Q2 deadline.
        </p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              label="Details"
              color="neutral"
              variant="ghost"
              size="sm"
            />
            <UButton label="Open" color="primary" variant="solid" size="sm" />
          </div>
        </template>
      </UCard>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Profile Card"
      description="Compact card showing a user profile with avatar and description."
    >
      <UCard class="max-w-sm">
        <div class="flex items-center gap-3 mb-3">
          <UAvatar
            src="https://i.pravatar.cc/128?u=alice"
            alt="Alice Johnson"
            size="lg"
          />
          <div>
            <p class="font-semibold">Alice Johnson</p>
            <p class="text-sm text-(--ui-text-muted)">Lead Designer</p>
          </div>
        </div>
        <p class="text-sm text-(--ui-text-muted)">
          Passionate about creating intuitive interfaces and building design
          systems that scale across products.
        </p>
      </UCard>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Form Card"
      description="Card containing a form layout with input fields and a submit action."
    >
      <UCard class="max-w-sm">
        <template #header>
          <h3 class="font-semibold">Quick Feedback</h3>
        </template>
        <div class="space-y-3">
          <UInput
            placeholder="Your name"
            icon="i-lucide-user"
            aria-label="Your name"
          />
          <UTextarea
            placeholder="Write your feedback..."
            :rows="3"
            aria-label="Your feedback"
          />
        </div>
        <template #footer>
          <UButton label="Submit" color="primary" variant="solid" block />
        </template>
      </UCard>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Stats Cards"
      description="Grid of metric cards displaying key performance indicators."
    >
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <UCard v-for="stat in stats" :key="stat.label">
          <div class="flex items-center gap-3">
            <UIcon :name="stat.icon" class="size-8 text-(--ui-primary)" />
            <div>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
              <p class="text-xs text-(--ui-text-muted)">{{ stat.label }}</p>
            </div>
          </div>
        </UCard>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Nested Cards"
      description="Cards nested within a parent card to create sectioned content."
    >
      <UCard>
        <template #header>
          <h3 class="font-semibold">Team Members</h3>
        </template>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <UCard v-for="member in members" :key="member.name">
            <div class="flex items-center gap-2">
              <UAvatar :src="member.avatar" :alt="member.name" size="sm" />
              <div>
                <p class="text-sm font-medium">{{ member.name }}</p>
                <p class="text-xs text-(--ui-text-muted)">{{ member.role }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </UCard>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Minimal Card"
      description="Simple card with body content only, no header or footer."
    >
      <UCard class="max-w-sm">
        <p class="text-sm text-(--ui-text-muted)">
          A lightweight card for displaying short content snippets without extra
          structure or actions.
        </p>
      </UCard>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { label: "Total Users", value: "12,458", icon: "i-lucide-users" },
  { label: "Revenue", value: "$84.2K", icon: "i-lucide-dollar-sign" },
  { label: "Active Projects", value: "34", icon: "i-lucide-folder-open" },
];

const members = [
  {
    name: "Alice Johnson",
    role: "Designer",
    avatar: "https://i.pravatar.cc/128?u=alice",
  },
  {
    name: "Bob Martinez",
    role: "Developer",
    avatar: "https://i.pravatar.cc/128?u=bob",
  },
  {
    name: "Carol White",
    role: "PM",
    avatar: "https://i.pravatar.cc/128?u=carol",
  },
  {
    name: "David Kim",
    role: "QA",
    avatar: "https://i.pravatar.cc/128?u=david",
  },
];
</script>
