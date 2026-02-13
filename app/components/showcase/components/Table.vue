<script setup lang="ts">
const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

const users = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Bob Martinez",
    email: "bob@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    name: "Carol White",
    email: "carol@example.com",
    role: "Developer",
    status: "Inactive",
  },
  {
    name: "David Kim",
    email: "david@example.com",
    role: "Designer",
    status: "Active",
  },
  {
    name: "Eva Brown",
    email: "eva@example.com",
    role: "Viewer",
    status: "Pending",
  },
];

const compactColumns = [
  { accessorKey: "endpoint", header: "Endpoint" },
  { accessorKey: "method", header: "Method" },
  { accessorKey: "latency", header: "Latency" },
];

const apiData = [
  { endpoint: "/api/users", method: "GET", latency: "45ms" },
  { endpoint: "/api/users", method: "POST", latency: "120ms" },
  { endpoint: "/api/auth", method: "POST", latency: "89ms" },
  { endpoint: "/api/settings", method: "PUT", latency: "67ms" },
];

function statusColor(status: string) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "Inactive":
      return "neutral" as const;
    case "Pending":
      return "warning" as const;
    default:
      return "neutral" as const;
  }
}
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Basic Table"
      description="Standard data table with column headers and status badge rendering."
    >
      <UTable :data="users" :columns="columns" caption="User directory">
        <template #status-cell="{ row }">
          <UBadge
            :label="row.original.status"
            :color="statusColor(row.original.status)"
            variant="soft"
          />
        </template>
      </UTable>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Compact Data Table"
      description="A smaller, denser table for displaying API metrics or logs."
    >
      <UTable
        :data="apiData"
        :columns="compactColumns"
        caption="API performance"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Table with Row Selection"
      description="Demonstrates how tables can support interactive row selection."
    >
      <UTable
        :data="users.slice(0, 3)"
        :columns="columns.slice(0, 3)"
        caption="Selectable users"
      >
        <template #name-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar
              :src="`https://i.pravatar.cc/128?u=${row.original.name}`"
              :alt="row.original.name"
              size="xs"
            />
            <span class="font-medium">{{ row.original.name }}</span>
          </div>
        </template>
      </UTable>
    </ShowcaseSpecimen>
  </div>
</template>
