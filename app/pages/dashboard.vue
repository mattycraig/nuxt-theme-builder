<script setup lang="ts">
const statsCards = [
  {
    label: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: "i-lucide-dollar-sign",
    color: "primary",
  },
  {
    label: "Subscriptions",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: "i-lucide-users",
    color: "secondary",
  },
  {
    label: "Active Users",
    value: "12,234",
    change: "+19%",
    trend: "up",
    icon: "i-lucide-activity",
    color: "success",
  },
  {
    label: "Bounce Rate",
    value: "24.5%",
    change: "-4.3%",
    trend: "down",
    icon: "i-lucide-trending-down",
    color: "warning",
  },
];

const sideNavItems = [
  [
    { label: "Overview", icon: "i-lucide-home", active: true },
    { label: "Analytics", icon: "i-lucide-bar-chart-2" },
    { label: "Customers", icon: "i-lucide-users" },
    { label: "Products", icon: "i-lucide-package" },
    { label: "Orders", icon: "i-lucide-shopping-cart" },
    { label: "Settings", icon: "i-lucide-settings" },
  ],
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    email: "alice@example.com",
    amount: "$250.00",
    status: "Completed",
    date: "2026-02-06",
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    email: "bob@example.com",
    amount: "$150.00",
    status: "Processing",
    date: "2026-02-05",
  },
  {
    id: "ORD-003",
    customer: "Charlie Brown",
    email: "charlie@example.com",
    amount: "$350.00",
    status: "Completed",
    date: "2026-02-05",
  },
  {
    id: "ORD-004",
    customer: "Diana Prince",
    email: "diana@example.com",
    amount: "$450.00",
    status: "Pending",
    date: "2026-02-04",
  },
  {
    id: "ORD-005",
    customer: "Edward Norton",
    email: "edward@example.com",
    amount: "$125.00",
    status: "Failed",
    date: "2026-02-04",
  },
  {
    id: "ORD-006",
    customer: "Fiona Apple",
    email: "fiona@example.com",
    amount: "$890.00",
    status: "Completed",
    date: "2026-02-03",
  },
  {
    id: "ORD-007",
    customer: "George Lucas",
    email: "george@example.com",
    amount: "$75.00",
    status: "Processing",
    date: "2026-02-03",
  },
  {
    id: "ORD-008",
    customer: "Hannah Montana",
    email: "hannah@example.com",
    amount: "$320.00",
    status: "Completed",
    date: "2026-02-02",
  },
];

const statusColor: Record<string, string> = {
  Completed: "success",
  Processing: "info",
  Pending: "warning",
  Failed: "error",
};

const tableColumns = [
  { key: "id", header: "Order" },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount" },
  { key: "status", header: "Status" },
  { key: "date", header: "Date" },
];

const recentActivity = [
  {
    icon: "i-lucide-user-plus",
    title: "New user registered",
    description: "alice@example.com joined",
    time: "2 min ago",
    color: "primary",
  },
  {
    icon: "i-lucide-shopping-cart",
    title: "New order placed",
    description: "Order #ORD-001 — $250.00",
    time: "15 min ago",
    color: "success",
  },
  {
    icon: "i-lucide-alert-circle",
    title: "Payment failed",
    description: "Order #ORD-005 payment declined",
    time: "1 hour ago",
    color: "error",
  },
  {
    icon: "i-lucide-package",
    title: "Product updated",
    description: "Theme Builder Pro v2.0 released",
    time: "3 hours ago",
    color: "info",
  },
  {
    icon: "i-lucide-star",
    title: "New review",
    description: "5-star review from Bob Smith",
    time: "5 hours ago",
    color: "warning",
  },
];

const chartData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 89 },
  { month: "May", value: 95 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 86 },
  { month: "Aug", value: 91 },
  { month: "Sep", value: 68 },
  { month: "Oct", value: 82 },
  { month: "Nov", value: 94 },
  { month: "Dec", value: 100 },
];

const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return recentOrders.slice(start, start + itemsPerPage);
});
</script>

<template>
  <div class="flex h-full min-h-[80vh]">
    <!-- Sidebar Navigation -->
    <aside
      class="hidden lg:flex flex-col w-56 shrink-0 border-r border-(--ui-border) bg-(--ui-bg) py-4"
    >
      <div class="px-4 mb-4">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-layout-dashboard"
            class="size-5 text-(--ui-primary)"
          />
          <span class="font-bold text-(--ui-text-highlighted)">Dashboard</span>
        </div>
      </div>
      <UNavigationMenu
        :items="sideNavItems"
        orientation="vertical"
        class="px-2 flex-1"
      />
      <div class="px-4 pt-4 border-t border-(--ui-border)">
        <div class="flex items-center gap-3">
          <UAvatar text="JD" size="sm" color="primary" />
          <div class="min-w-0">
            <p
              class="text-sm font-medium text-(--ui-text-highlighted) truncate"
            >
              John Doe
            </p>
            <p class="text-xs text-(--ui-text-dimmed) truncate">
              admin@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        <!-- Breadcrumb -->
        <UBreadcrumb
          :items="[
            { label: 'Home', icon: 'i-lucide-home', to: '/' },
            { label: 'Dashboard' },
            { label: 'Analytics' },
          ]"
        />

        <!-- Page Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
              Analytics Overview
            </h1>
            <p class="text-sm text-(--ui-text-muted)">
              Track your business metrics and performance.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <UButton
              label="Export"
              icon="i-lucide-download"
              variant="outline"
              color="neutral"
              size="sm"
            />
            <UButton
              label="Add Widget"
              icon="i-lucide-plus"
              color="primary"
              size="sm"
            />
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <UCard v-for="stat in statsCards" :key="stat.label">
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <p class="text-sm text-(--ui-text-muted)">{{ stat.label }}</p>
                <p class="text-2xl font-bold text-(--ui-text-highlighted)">
                  {{ stat.value }}
                </p>
              </div>
              <div
                class="size-10 rounded-lg flex items-center justify-center"
                :class="`bg-(--ui-${stat.color})/10`"
              >
                <UIcon
                  :name="stat.icon"
                  class="size-5"
                  :class="`text-(--ui-${stat.color})`"
                />
              </div>
            </div>
            <div class="mt-3 flex items-center gap-1">
              <UBadge
                :label="stat.change"
                :color="stat.trend === 'up' ? 'success' : 'error'"
                variant="subtle"
                size="xs"
              />
              <span class="text-xs text-(--ui-text-dimmed)">vs last month</span>
            </div>
          </UCard>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Revenue Chart -->
          <UCard class="lg:col-span-2">
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-(--ui-text-highlighted)">
                    Revenue Overview
                  </h3>
                  <p class="text-sm text-(--ui-text-muted)">
                    Monthly revenue for the current year
                  </p>
                </div>
                <UButton
                  icon="i-lucide-more-horizontal"
                  variant="ghost"
                  color="neutral"
                  size="xs"
                />
              </div>
            </template>

            <!-- Simple bar chart using CSS -->
            <div class="flex items-end gap-2 h-48 pt-4">
              <div
                v-for="bar in chartData"
                :key="bar.month"
                class="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  class="w-full rounded-t-sm bg-(--ui-primary) transition-all duration-300 min-h-[4px]"
                  :style="{ height: `${bar.value * 1.6}px` }"
                />
                <span class="text-[10px] text-(--ui-text-dimmed)">{{
                  bar.month
                }}</span>
              </div>
            </div>
          </UCard>

          <!-- Recent Activity -->
          <UCard>
            <template #header>
              <h3 class="font-semibold text-(--ui-text-highlighted)">
                Recent Activity
              </h3>
            </template>

            <div class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.title"
                class="flex items-start gap-3"
              >
                <div
                  class="size-8 rounded-full flex items-center justify-center shrink-0"
                  :class="`bg-(--ui-${activity.color})/10`"
                >
                  <UIcon
                    :name="activity.icon"
                    class="size-4"
                    :class="`text-(--ui-${activity.color})`"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p
                    class="text-sm font-medium text-(--ui-text-highlighted) truncate"
                  >
                    {{ activity.title }}
                  </p>
                  <p class="text-xs text-(--ui-text-muted) truncate">
                    {{ activity.description }}
                  </p>
                </div>
                <span class="text-xs text-(--ui-text-dimmed) shrink-0">{{
                  activity.time
                }}</span>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Orders Table -->
        <UCard>
          <template #header>
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h3 class="font-semibold text-(--ui-text-highlighted)">
                  Recent Orders
                </h3>
                <p class="text-sm text-(--ui-text-muted)">
                  Manage and track customer orders
                </p>
              </div>
              <div class="flex items-center gap-2">
                <UInput
                  placeholder="Search orders..."
                  icon="i-lucide-search"
                  size="sm"
                  class="w-48"
                />
                <UButton
                  icon="i-lucide-filter"
                  variant="outline"
                  color="neutral"
                  size="sm"
                />
              </div>
            </div>
          </template>

          <UTable :data="paginatedOrders" :columns="tableColumns">
            <template #status-cell="{ row }">
              <UBadge
                :label="row.original.status"
                :color="(statusColor[row.original.status] as any) || 'neutral'"
                variant="subtle"
                size="xs"
              />
            </template>
            <template #customer-cell="{ row }">
              <div class="flex items-center gap-2">
                <UAvatar
                  :text="
                    row.original.customer
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                  "
                  size="xs"
                />
                <div>
                  <p class="text-sm font-medium">{{ row.original.customer }}</p>
                  <p class="text-xs text-(--ui-text-dimmed)">
                    {{ row.original.email }}
                  </p>
                </div>
              </div>
            </template>
          </UTable>

          <template #footer>
            <div class="flex items-center justify-between">
              <p class="text-sm text-(--ui-text-muted)">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }}–{{
                  Math.min(currentPage * itemsPerPage, recentOrders.length)
                }}
                of {{ recentOrders.length }} orders
              </p>
              <UPagination
                v-model:page="currentPage"
                :total="recentOrders.length"
                :items-per-page="itemsPerPage"
                :show-edges="true"
              />
            </div>
          </template>
        </UCard>

        <!-- Bottom Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <!-- Progress Cards -->
          <UCard>
            <template #header>
              <h3 class="font-semibold text-(--ui-text-highlighted)">
                Goals Progress
              </h3>
            </template>
            <div class="space-y-5">
              <div
                v-for="goal in [
                  {
                    label: 'Revenue Target',
                    value: 72,
                    target: '$50K',
                    color: 'primary',
                  },
                  {
                    label: 'New Customers',
                    value: 45,
                    target: '500',
                    color: 'secondary',
                  },
                  {
                    label: 'Retention Rate',
                    value: 89,
                    target: '95%',
                    color: 'success',
                  },
                  {
                    label: 'Support Tickets',
                    value: 35,
                    target: '< 50',
                    color: 'warning',
                  },
                ]"
                :key="goal.label"
                class="space-y-2"
              >
                <div class="flex items-center justify-between text-sm">
                  <span class="text-(--ui-text)">{{ goal.label }}</span>
                  <span class="text-(--ui-text-muted)"
                    >{{ goal.value }}% — Target: {{ goal.target }}</span
                  >
                </div>
                <UProgress
                  :value="goal.value"
                  :color="goal.color as any"
                  size="sm"
                />
              </div>
            </div>
          </UCard>

          <!-- Top Products -->
          <UCard>
            <template #header>
              <h3 class="font-semibold text-(--ui-text-highlighted)">
                Top Products
              </h3>
            </template>
            <div class="space-y-3">
              <div
                v-for="(product, i) in [
                  {
                    name: 'Theme Builder Pro',
                    sales: 1234,
                    revenue: '$24,680',
                    growth: '+12%',
                  },
                  {
                    name: 'Component Library',
                    sales: 856,
                    revenue: '$17,120',
                    growth: '+8%',
                  },
                  {
                    name: 'Dashboard Kit',
                    sales: 543,
                    revenue: '$10,860',
                    growth: '+23%',
                  },
                  {
                    name: 'Icon Pack Premium',
                    sales: 321,
                    revenue: '$3,210',
                    growth: '+5%',
                  },
                  {
                    name: 'Starter Template',
                    sales: 210,
                    revenue: '$2,100',
                    growth: '+15%',
                  },
                ]"
                :key="product.name"
                class="flex items-center gap-3 py-2"
                :class="i < 4 ? 'border-b border-(--ui-border)' : ''"
              >
                <span class="text-sm font-medium text-(--ui-text-dimmed) w-6"
                  >{{ i + 1 }}.</span
                >
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-(--ui-text-highlighted) truncate"
                  >
                    {{ product.name }}
                  </p>
                  <p class="text-xs text-(--ui-text-dimmed)">
                    {{ product.sales }} sales
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                    {{ product.revenue }}
                  </p>
                  <UBadge
                    :label="product.growth"
                    color="success"
                    variant="subtle"
                    size="xs"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
