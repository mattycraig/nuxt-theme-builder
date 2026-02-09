<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { NavigationMenuItem, TableColumn } from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");
const UAvatar = resolveComponent("UAvatar");

type Order = {
  id: string;
  customer: string;
  email: string;
  amount: string;
  status: string;
  date: string;
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

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

const sideNavItems: NavigationMenuItem[][] = [
  [
    { label: "Overview", icon: "i-lucide-home", active: true },
    { label: "Analytics", icon: "i-lucide-bar-chart-2" },
    { label: "Customers", icon: "i-lucide-users" },
    { label: "Products", icon: "i-lucide-package" },
    { label: "Orders", icon: "i-lucide-shopping-cart", badge: "12" },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      defaultOpen: true,
      children: [
        { label: "General" },
        { label: "Members" },
        { label: "Billing" },
        { label: "Notifications" },
      ],
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-lucide-book-open",
      target: "_blank",
    },
    {
      label: "Help & Support",
      icon: "i-lucide-life-buoy",
      target: "_blank",
    },
  ],
];

const toolbarNavItems: NavigationMenuItem[][] = [
  [
    { label: "General", icon: "i-lucide-layout-dashboard", active: true },
    { label: "Reports", icon: "i-lucide-file-bar-chart" },
    { label: "Notifications", icon: "i-lucide-bell" },
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

const tableColumns: TableColumn<Order>[] = [
  { accessorKey: "id", header: "Order" },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const initials = row.original.customer
        .split(" ")
        .map((n: string) => n[0])
        .join("");
      return h("div", { class: "flex items-center gap-2" }, [
        h(UAvatar, { text: initials, size: "xs" }),
        h("div", { class: "min-w-0" }, [
          h(
            "p",
            { class: "text-sm font-medium truncate" },
            row.original.customer,
          ),
          h(
            "p",
            { class: "text-xs text-(--ui-text-dimmed) truncate" },
            row.original.email,
          ),
        ]),
      ]);
    },
  },
  { accessorKey: "amount", header: "Amount" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = (statusColor[row.original.status] as any) || "neutral";
      return h(UBadge, {
        label: row.original.status,
        color,
        variant: "subtle",
        size: "xs",
      });
    },
  },
  { accessorKey: "date", header: "Date" },
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

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

const searchGroups = [
  {
    id: "pages",
    label: "Pages",
    items: [
      {
        label: "Overview",
        icon: "i-lucide-home",
      },
      {
        label: "Analytics",
        icon: "i-lucide-bar-chart-2",
      },
      {
        label: "Customers",
        icon: "i-lucide-users",
      },
      {
        label: "Products",
        icon: "i-lucide-package",
      },
      {
        label: "Orders",
        icon: "i-lucide-shopping-cart",
      },
      {
        label: "Settings",
        icon: "i-lucide-settings",
      },
    ],
  },
  {
    id: "recent",
    label: "Recent Orders",
    items: recentOrders.slice(0, 4).map((o) => ({
      label: `${o.id} — ${o.customer}`,
      suffix: o.amount,
      icon: "i-lucide-receipt",
    })),
  },
];

// Only render the full dashboard shell inside the iframe preview.
// In the default layout the page is mounted in a hidden <slot /> — rendering
// a nested UDashboardGroup/UDashboardSidebar there causes its mobile
// slideover to portal out and conflict with the editor sidebar toggle.
const route = useRoute();
const isPreview = computed(() => "preview" in route.query);
</script>

<template>
  <div v-if="!isPreview" />
  <UDashboardGroup v-else>
    <!-- ================================================================= -->
    <!-- Sidebar — collapsible & resizable, responsive mobile slideover    -->
    <!-- ================================================================= -->
    <UDashboardSidebar
      id="dashboard-sidebar"
      collapsible
      resizable
      :ui="{ footer: 'border-t border-default' }"
      class="bg-elevated/50"
    >
      <template #header="{ collapsed }">
        <div v-if="!collapsed" class="flex items-center gap-2 min-w-0">
          <UIcon
            name="i-lucide-layout-dashboard"
            class="size-5 text-(--ui-primary) shrink-0"
          />
          <span class="font-bold text-(--ui-text-highlighted) truncate">
            Dashboard
          </span>
        </div>
        <UIcon
          v-else
          name="i-lucide-layout-dashboard"
          class="size-5 text-(--ui-primary) mx-auto"
        />
      </template>

      <template #default="{ collapsed }">
        <!-- Search button -->
        <UDashboardSearchButton :collapsed="collapsed" />

        <!-- Primary navigation -->
        <UNavigationMenu
          :collapsed="collapsed"
          :items="sideNavItems[0]"
          orientation="vertical"
        />

        <!-- Secondary / footer navigation -->
        <UNavigationMenu
          :collapsed="collapsed"
          :items="sideNavItems[1]"
          orientation="vertical"
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          :avatar="{ text: 'JD' }"
          :label="collapsed ? undefined : 'John Doe'"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
        />
      </template>
    </UDashboardSidebar>

    <!-- =================================================================
         Search modal — opens via DashboardSearchButton or ⌘K
         ================================================================= -->
    <UDashboardSearch :groups="searchGroups" :color-mode="false" />

    <!-- ================================================================= -->
    <!-- Main Panel                                                        -->
    <!-- ================================================================= -->
    <UDashboardPanel id="dashboard-main">
      <!-- Navbar -->
      <template #header>
        <UDashboardNavbar
          title="Analytics Overview"
          icon="i-lucide-bar-chart-2"
        >
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <div class="flex items-center gap-2">
              <UButton
                label="Export"
                icon="i-lucide-download"
                variant="outline"
                color="neutral"
                size="sm"
                class="hidden sm:inline-flex"
              />
              <UButton
                label="Add Widget"
                icon="i-lucide-plus"
                color="primary"
                size="sm"
              />
            </div>
          </template>
        </UDashboardNavbar>

        <!-- Toolbar -->
        <UDashboardToolbar>
          <template #left>
            <UNavigationMenu :items="toolbarNavItems[0]" highlight />
          </template>

          <template #right>
            <UBreadcrumb
              :items="[
                { label: 'Home', icon: 'i-lucide-home' },
                { label: 'Dashboard' },
                { label: 'Analytics' },
              ]"
              class="hidden sm:flex"
            />
          </template>
        </UDashboardToolbar>
      </template>

      <!-- Panel scrollable body -->
      <template #body>
        <div class="space-y-6">
          <!-- Page Header (visible on mobile where navbar title may be small) -->
          <div class="sm:hidden">
            <h1 class="text-xl font-bold text-(--ui-text-highlighted)">
              Analytics Overview
            </h1>
            <p class="text-sm text-(--ui-text-muted)">
              Track your business metrics and performance.
            </p>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <UCard v-for="stat in statsCards" :key="stat.label">
              <div class="flex items-start justify-between">
                <div class="space-y-1 min-w-0">
                  <p class="text-sm text-(--ui-text-muted) truncate">
                    {{ stat.label }}
                  </p>
                  <p class="text-2xl font-bold text-(--ui-text-highlighted)">
                    {{ stat.value }}
                  </p>
                </div>
                <div
                  class="size-10 rounded-lg flex items-center justify-center shrink-0"
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
                <span class="text-xs text-(--ui-text-dimmed)">
                  vs last month
                </span>
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
                    aria-label="Chart options"
                  />
                </div>
              </template>

              <!-- Simple bar chart using CSS -->
              <div class="flex items-end gap-1 sm:gap-2 h-48 pt-4">
                <div
                  v-for="bar in chartData"
                  :key="bar.month"
                  class="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    class="w-full rounded-t-sm bg-(--ui-primary) transition-all duration-300 min-h-[4px]"
                    :style="{ height: `${bar.value * 1.6}px` }"
                  />
                  <span class="text-[10px] text-(--ui-text-dimmed)">
                    {{ bar.month }}
                  </span>
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
                  <span class="text-xs text-(--ui-text-dimmed) shrink-0">
                    {{ activity.time }}
                  </span>
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
                    class="w-full sm:w-48"
                    aria-label="Search orders"
                  />
                  <UButton
                    icon="i-lucide-filter"
                    variant="outline"
                    color="neutral"
                    size="sm"
                    aria-label="Filter orders"
                  />
                </div>
              </div>
            </template>

            <UTable :data="paginatedOrders" :columns="tableColumns" />

            <template #footer>
              <div
                class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
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
                    <span class="text-(--ui-text-muted)">
                      {{ goal.value }}% — Target: {{ goal.target }}
                    </span>
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
                  <span class="text-sm font-medium text-(--ui-text-dimmed) w-6">
                    {{ i + 1 }}.
                  </span>
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
                  <div class="text-right shrink-0">
                    <p
                      class="text-sm font-semibold text-(--ui-text-highlighted)"
                    >
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
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
