<template>
  <section>
    <h2 class="text-lg font-semibold mb-4">Tabs</h2>

    <UTabs :items="tabs">
      <template #overview>
        <div class="p-4 space-y-2">
          <p class="font-medium">Project Overview</p>
          <p class="text-sm text-(--ui-text-muted)">
            This dashboard gives you a bird's-eye view of your project status,
            recent activity, and upcoming deadlines. Use the sidebar navigation
            to drill into specific sections.
          </p>
          <div class="flex gap-4 mt-3">
            <div class="text-center">
              <p class="text-2xl font-bold text-primary">24</p>
              <p class="text-xs text-(--ui-text-muted)">Tasks</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-primary">8</p>
              <p class="text-xs text-(--ui-text-muted)">In Progress</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-primary">16</p>
              <p class="text-xs text-(--ui-text-muted)">Completed</p>
            </div>
          </div>
        </div>
      </template>

      <template #members>
        <div class="p-4 space-y-3">
          <p class="font-medium">Team Members</p>
          <div
            v-for="member in members"
            :key="member.name"
            class="flex items-center gap-3"
          >
            <UAvatar :src="member.avatar" :alt="member.name" size="sm" />
            <div>
              <p class="text-sm font-medium">{{ member.name }}</p>
              <p class="text-xs text-(--ui-text-muted)">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </template>

      <template #settings>
        <div class="p-4 space-y-3">
          <p class="font-medium">Settings</p>
          <USwitch v-model="emailNotifs" label="Email notifications" />
          <USwitch v-model="slackNotifs" label="Slack notifications" />
          <USwitch v-model="publicProject" label="Public project" />
        </div>
      </template>
    </UTabs>
  </section>
</template>

<script setup lang="ts">
const tabs = [
  { label: "Overview", slot: "overview" },
  { label: "Members", slot: "members" },
  { label: "Settings", slot: "settings" },
];

const members = [
  {
    name: "Alice Johnson",
    role: "Lead Designer",
    avatar: "https://i.pravatar.cc/128?u=alice",
  },
  {
    name: "Bob Martinez",
    role: "Frontend Dev",
    avatar: "https://i.pravatar.cc/128?u=bob",
  },
  {
    name: "Carol White",
    role: "Backend Dev",
    avatar: "https://i.pravatar.cc/128?u=carol",
  },
];

const emailNotifs = ref(true);
const slackNotifs = ref(false);
const publicProject = ref(true);
</script>
