<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Table</h3>

    <UTable :data="users" :columns="columns">
      <template #status-cell="{ row }">
        <UBadge
          :label="row.original.status"
          :color="statusColor(row.original.status)"
          variant="soft"
        />
      </template>
    </UTable>
  </section>
</template>

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
