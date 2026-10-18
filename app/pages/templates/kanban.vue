<script setup lang="ts">
import type {
  DropdownMenuItem,
  NavigationMenuItem,
  SelectMenuItem,
  TabsItem,
} from "@nuxt/ui";

type Status = "backlog" | "todo" | "in-progress" | "done";
type Label = "feature" | "bug" | "design" | "docs";
type Priority = "urgent" | "high" | "medium" | "low";

interface Member {
  id: string;
  name: string;
  initials: string;
}

interface Subtask {
  label: string;
  done: boolean;
}

interface Activity {
  member: string;
  text: string;
  time: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  labels: Label[];
  priority: Priority;
  due: string;
  subtasks: Subtask[];
  comments: number;
  attachments: number;
  assignees: string[];
  activity: Activity[];
}

const toast = useToast();

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

const sidebarOpen = ref(false);

const mainNavItems: NavigationMenuItem[] = [
  { label: "Inbox", icon: "i-lucide-inbox", badge: "4" },
  { label: "My tasks", icon: "i-lucide-circle-check-big" },
  { label: "Calendar", icon: "i-lucide-calendar-days" },
  { label: "Reports", icon: "i-lucide-chart-no-axes-column" },
];

const projectNavItems: NavigationMenuItem[] = [
  { type: "label", label: "Projects" },
  { label: "Website Redesign", icon: "i-lucide-layout-template", active: true },
  { label: "Mobile App v3", icon: "i-lucide-smartphone" },
  { label: "Design System", icon: "i-lucide-component" },
  { label: "Billing Migration", icon: "i-lucide-credit-card" },
  { label: "Q4 Marketing", icon: "i-lucide-megaphone" },
];

const footerNavItems: NavigationMenuItem[] = [
  { label: "Settings", icon: "i-lucide-settings" },
  { label: "Help & Support", icon: "i-lucide-life-buoy" },
];

// ---------------------------------------------------------------------------
// Board configuration
// ---------------------------------------------------------------------------

const members: Member[] = [
  { id: "ac", name: "Ava Chen", initials: "AC" },
  { id: "mr", name: "Marco Rossi", initials: "MR" },
  { id: "pk", name: "Priya Kapoor", initials: "PK" },
  { id: "jw", name: "Jonah Weiss", initials: "JW" },
  { id: "sl", name: "Sofia Lind", initials: "SL" },
  { id: "dt", name: "Daniel Okafor", initials: "DO" },
];

const memberById = (id: string) => members.find((m) => m.id === id)!;

const columns: { id: Status; label: string; icon: string; iconClass: string }[] = [
  { id: "backlog", label: "Backlog", icon: "i-lucide-circle-dashed", iconClass: "text-(--ui-text-muted)" },
  { id: "todo", label: "To do", icon: "i-lucide-circle", iconClass: "text-info" },
  { id: "in-progress", label: "In progress", icon: "i-lucide-circle-dot", iconClass: "text-warning" },
  { id: "done", label: "Done", icon: "i-lucide-circle-check", iconClass: "text-success" },
];

// `class` darkens the badge text where the default shade is too light for AA on its tint
const labelConfig: Record<Label, { label: string; color: "primary" | "error" | "secondary" | "info"; class?: string }> = {
  feature: { label: "Feature", color: "primary" },
  bug: { label: "Bug", color: "error", class: "text-(--ui-color-error-700) dark:text-error" },
  design: { label: "Design", color: "secondary" },
  docs: { label: "Docs", color: "info" },
};

const priorityConfig: Record<Priority, { label: string; icon: string; class: string }> = {
  urgent: { label: "Urgent", icon: "i-lucide-circle-alert", class: "text-error" },
  high: { label: "High", icon: "i-lucide-arrow-up", class: "text-warning" },
  medium: { label: "Medium", icon: "i-lucide-equal", class: "text-(--ui-text-toned)" },
  low: { label: "Low", icon: "i-lucide-arrow-down", class: "text-(--ui-text-muted)" },
};

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

const steps = (labels: string[], doneCount: number): Subtask[] =>
  labels.map((label, i) => ({ label, done: i < doneCount }));

const tasks = ref<Task[]>([
  {
    id: "WEB-118",
    title: "Audit legacy marketing pages for broken links",
    description: "Crawl every page under /company and /resources, list 404s and redirect chains, and file follow-ups for anything that needs content.",
    status: "backlog",
    labels: ["bug"],
    priority: "low",
    due: "Nov 14",
    subtasks: steps(["Run crawler", "Triage results", "File follow-ups"], 0),
    comments: 2,
    attachments: 0,
    assignees: ["jw"],
    activity: [{ member: "jw", text: "created this task", time: "Oct 2" }],
  },
  {
    id: "WEB-121",
    title: "Write migration guide for the new CMS blocks",
    description: "Document how editors move existing pages onto the new block library, including screenshots of every block variant.",
    status: "backlog",
    labels: ["docs"],
    priority: "medium",
    due: "Nov 20",
    subtasks: steps(["Outline", "Draft", "Screenshots", "Review"], 1),
    comments: 0,
    attachments: 1,
    assignees: ["sl"],
    activity: [{ member: "sl", text: "created this task", time: "Oct 5" }],
  },
  {
    id: "WEB-124",
    title: "Explore illustration style for empty states",
    description: "Three directions for empty-state illustrations that work in light and dark mode without separate assets.",
    status: "backlog",
    labels: ["design"],
    priority: "low",
    due: "Nov 28",
    subtasks: [],
    comments: 5,
    attachments: 3,
    assignees: ["pk", "sl"],
    activity: [{ member: "pk", text: "attached 3 moodboards", time: "Oct 9" }],
  },
  {
    id: "WEB-131",
    title: "Pricing page: annual / monthly toggle",
    description: "Add a billing-period switch to the pricing table. Annual prices show the monthly equivalent and a savings badge.",
    status: "todo",
    labels: ["feature", "design"],
    priority: "high",
    due: "Oct 24",
    subtasks: steps(["Design toggle", "Wire up prices", "Savings badge", "QA"], 1),
    comments: 8,
    attachments: 2,
    assignees: ["ac", "pk"],
    activity: [
      { member: "pk", text: "uploaded final toggle mockups", time: "Oct 15" },
      { member: "ac", text: "moved this from Backlog to To do", time: "Oct 14" },
    ],
  },
  {
    id: "WEB-133",
    title: "Hero video stutters on Safari 18",
    description: "The autoplay hero video drops frames on Safari when the page first loads. Likely caused by the poster swap.",
    status: "todo",
    labels: ["bug"],
    priority: "urgent",
    due: "Oct 20",
    subtasks: steps(["Reproduce", "Fix poster swap", "Verify on iOS"], 1),
    comments: 4,
    attachments: 1,
    assignees: ["mr"],
    activity: [{ member: "mr", text: "reproduced on macOS 15.1", time: "Oct 16" }],
  },
  {
    id: "WEB-135",
    title: "Customer stories index with filters",
    description: "A filterable grid of customer stories by industry and company size, with deep-linkable filter state.",
    status: "todo",
    labels: ["feature"],
    priority: "medium",
    due: "Oct 31",
    subtasks: [],
    comments: 1,
    attachments: 0,
    assignees: ["dt"],
    activity: [{ member: "dt", text: "created this task", time: "Oct 12" }],
  },
  {
    id: "WEB-127",
    title: "New navigation with mega menu",
    description: "Replace the top navigation with a mega menu for Product and Resources. Must be fully keyboard navigable and collapse into a drawer on mobile.",
    status: "in-progress",
    labels: ["feature", "design"],
    priority: "high",
    due: "Oct 22",
    subtasks: steps(["Menu layout", "Keyboard support", "Mobile drawer", "Analytics events", "Accessibility review"], 3),
    comments: 12,
    attachments: 4,
    assignees: ["ac", "mr", "pk"],
    activity: [
      { member: "mr", text: "finished keyboard support", time: "2h ago" },
      { member: "ac", text: "commented on the mobile drawer", time: "Yesterday" },
      { member: "pk", text: "attached updated menu specs", time: "Oct 13" },
    ],
  },
  {
    id: "WEB-129",
    title: "Footer newsletter form fails validation",
    description: "Emails with a plus sign are rejected by the footer signup form. Align the client regex with the API.",
    status: "in-progress",
    labels: ["bug"],
    priority: "high",
    due: "Oct 19",
    subtasks: steps(["Fix regex", "Add tests"], 1),
    comments: 3,
    attachments: 0,
    assignees: ["jw"],
    activity: [{ member: "jw", text: "opened a pull request", time: "4h ago" }],
  },
  {
    id: "WEB-130",
    title: "Component docs for buttons and inputs",
    description: "Usage guidelines, do and don't examples, and props tables for Button, Input, and Select.",
    status: "in-progress",
    labels: ["docs", "design"],
    priority: "medium",
    due: "Oct 27",
    subtasks: steps(["Button", "Input", "Select"], 2),
    comments: 6,
    attachments: 2,
    assignees: ["sl", "pk"],
    activity: [{ member: "sl", text: "published Input docs", time: "Yesterday" }],
  },
  {
    id: "WEB-112",
    title: "Set up visual regression tests",
    description: "Snapshot the top 20 pages in light and dark mode on every pull request.",
    status: "done",
    labels: ["feature"],
    priority: "medium",
    due: "Oct 10",
    subtasks: steps(["Pick tool", "Baseline", "CI job"], 3),
    comments: 7,
    attachments: 1,
    assignees: ["mr", "dt"],
    activity: [{ member: "dt", text: "marked this as done", time: "Oct 10" }],
  },
  {
    id: "WEB-115",
    title: "Brand color tokens in Figma",
    description: "Publish semantic color tokens to the shared Figma library so design and code use the same names.",
    status: "done",
    labels: ["design"],
    priority: "high",
    due: "Oct 8",
    subtasks: steps(["Define tokens", "Publish library"], 2),
    comments: 9,
    attachments: 5,
    assignees: ["pk"],
    activity: [{ member: "pk", text: "published the library", time: "Oct 8" }],
  },
  {
    id: "WEB-116",
    title: "Contributing guide for the website repo",
    description: "Branching, commit conventions, preview deploys, and how to request a design review.",
    status: "done",
    labels: ["docs"],
    priority: "low",
    due: "Oct 6",
    subtasks: [],
    comments: 2,
    attachments: 0,
    assignees: ["sl"],
    activity: [{ member: "sl", text: "marked this as done", time: "Oct 6" }],
  },
]);

const progressOf = (task: Task) => task.subtasks.filter((s) => s.done).length;

// ---------------------------------------------------------------------------
// Toolbar: search, label filter, view switcher
// ---------------------------------------------------------------------------

const search = ref("");
const labelFilter = ref<Label[]>([]);

const labelFilterItems: SelectMenuItem[] = (Object.keys(labelConfig) as Label[]).map((key) => ({
  label: labelConfig[key].label,
  value: key,
  chip: { color: labelConfig[key].color },
}));

const view = ref("board");
const viewItems: TabsItem[] = [
  { label: "Board", value: "board", icon: "i-lucide-square-kanban" },
  { label: "List", value: "list", icon: "i-lucide-list" },
];

const visibleTasks = computed(() => {
  const query = search.value.trim().toLowerCase();
  return tasks.value.filter((task) => {
    const matchesQuery = !query || task.title.toLowerCase().includes(query) || task.id.toLowerCase().includes(query);
    const matchesLabel = !labelFilter.value.length || task.labels.some((l) => labelFilter.value.includes(l));
    return matchesQuery && matchesLabel;
  });
});

const tasksIn = (status: Status) => visibleTasks.value.filter((t) => t.status === status);

// ---------------------------------------------------------------------------
// Moving tasks (drag and drop + "Move to…" menu)
// ---------------------------------------------------------------------------

function moveTask(id: string, status: Status, beforeId?: string) {
  const list = tasks.value;
  const from = list.findIndex((t) => t.id === id);
  if (from === -1 || id === beforeId) return;
  const [task] = list.splice(from, 1);
  const previous = task!.status;
  task!.status = status;
  const to = beforeId ? list.findIndex((t) => t.id === beforeId) : -1;
  if (to === -1) list.push(task!);
  else list.splice(to, 0, task!);
  if (previous !== status) {
    task!.activity.unshift({ member: "ac", text: `moved this to ${columnLabel(status)}`, time: "Just now" });
  }
}

const columnLabel = (status: Status) => columns.find((c) => c.id === status)!.label;

const draggingId = ref<string | null>(null);
const dropColumn = ref<Status | null>(null);
const dropBeforeId = ref<string | null>(null);

function onDragStart(event: DragEvent, task: Task) {
  draggingId.value = task.id;
  event.dataTransfer?.setData("text/plain", task.id);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function onDragEnd() {
  draggingId.value = null;
  dropColumn.value = null;
  dropBeforeId.value = null;
}

function onColumnDragOver(event: DragEvent, status: Status) {
  if (!draggingId.value) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  const overCard = (event.target as HTMLElement | null)?.closest("[draggable='true']");
  if (dropColumn.value !== status || !overCard) dropBeforeId.value = null;
  dropColumn.value = status;
}

function onCardDragOver(task: Task) {
  if (draggingId.value && draggingId.value !== task.id) dropBeforeId.value = task.id;
}

function onDrop(event: DragEvent, status: Status) {
  event.preventDefault();
  const id = event.dataTransfer?.getData("text/plain") || draggingId.value;
  if (id) moveTask(id, status, dropBeforeId.value ?? undefined);
  onDragEnd();
}

function cardMenu(task: Task): DropdownMenuItem[][] {
  return [
    [{ label: "Open details", icon: "i-lucide-panel-right-open", onSelect: () => openTask(task.id) }],
    [
      {
        label: "Move to…",
        icon: "i-lucide-arrow-right-left",
        children: columns.map((column) => ({
          label: column.label,
          icon: column.icon,
          disabled: column.id === task.status,
          onSelect: () => {
            moveTask(task.id, column.id);
            toast.add({ title: `${task.id} moved to ${column.label}`, icon: "i-lucide-check" });
          },
        })),
      },
      { label: "Copy link", icon: "i-lucide-link" },
    ],
    [{ label: "Delete", icon: "i-lucide-trash-2", color: "error", onSelect: () => deleteTask(task.id) }],
  ];
}

function deleteTask(id: string) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  toast.add({ title: `${id} deleted`, icon: "i-lucide-trash-2", color: "error" });
}

let nextId = 140;
function addTask(status: Status) {
  const id = `WEB-${nextId++}`;
  tasks.value.push({
    id,
    title: "Untitled task",
    description: "",
    status,
    labels: [],
    priority: "medium",
    due: "Nov 1",
    subtasks: [],
    comments: 0,
    attachments: 0,
    assignees: ["ac"],
    activity: [{ member: "ac", text: "created this task", time: "Just now" }],
  });
  openTask(id);
}

// ---------------------------------------------------------------------------
// Task detail slideover
// ---------------------------------------------------------------------------

const selectedId = ref<string | null>(null);
const detailOpen = ref(false);
const selectedTask = computed(() => tasks.value.find((t) => t.id === selectedId.value));

const statusItems = columns.map((c) => ({ label: c.label, value: c.id, icon: c.icon }));
const priorityItems = (Object.keys(priorityConfig) as Priority[]).map((key) => ({
  label: priorityConfig[key].label,
  value: key,
  icon: priorityConfig[key].icon,
}));

function openTask(id: string) {
  selectedId.value = id;
  detailOpen.value = true;
}

function setStatus(status: Status) {
  if (selectedTask.value) moveTask(selectedTask.value.id, status);
}

function saveTask(close: () => void) {
  toast.add({ title: "Task updated", icon: "i-lucide-check", color: "success" });
  close();
}

// ---------------------------------------------------------------------------
// Search (⌘K)
// ---------------------------------------------------------------------------

const searchGroups = computed(() => [
  {
    id: "tasks",
    label: "Tasks",
    items: tasks.value.map((t) => ({
      label: t.title,
      suffix: t.id,
      icon: "i-lucide-square-check",
      onSelect: () => openTask(t.id),
    })),
  },
]);
</script>

<template>
  <UDashboardGroup>
    <!-- ================================================================= -->
    <!-- Sidebar — workspace + projects, collapses to a slideover on mobile -->
    <!-- ================================================================= -->
    <UDashboardSidebar
      id="kanban-sidebar"
      v-model:open="sidebarOpen"
      collapsible
      :ui="{ footer: 'border-t border-default' }"
      class="bg-elevated/50"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2 min-w-0" :class="collapsed ? 'mx-auto' : ''">
          <div class="size-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-square-kanban" class="size-4 text-(--ui-text-inverted)" aria-hidden="true" />
          </div>
          <span v-if="!collapsed" class="font-bold text-(--ui-text-highlighted) truncate">Northwind</span>
        </div>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" />
        <UNavigationMenu :collapsed="collapsed" :items="mainNavItems" orientation="vertical" />
        <UNavigationMenu :collapsed="collapsed" :items="projectNavItems" orientation="vertical" />
        <UNavigationMenu :collapsed="collapsed" :items="footerNavItems" orientation="vertical" class="mt-auto" />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          :avatar="{ text: 'AC', alt: 'Ava Chen' }"
          :label="collapsed ? undefined : 'Ava Chen'"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="searchGroups" :color-mode="false" />

    <!-- ================================================================= -->
    <!-- Board panel                                                       -->
    <!-- ================================================================= -->
    <UDashboardPanel id="kanban-main" :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <UDashboardNavbar title="Website Redesign" :ui="{ title: 'text-base sm:text-lg' }">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #trailing>
            <UBadge label="Sprint 14" color="neutral" variant="outline" size="sm" class="hidden sm:inline-flex" />
          </template>

          <template #right>
            <UAvatarGroup size="sm" :max="4" class="hidden md:flex">
              <UAvatar v-for="member in members" :key="member.id" :text="member.initials" :alt="member.name" />
            </UAvatarGroup>
            <UButton icon="i-lucide-user-plus" label="Share" color="neutral" variant="outline" size="sm" class="hidden lg:inline-flex" />
            <UButton icon="i-lucide-plus" label="New task" size="sm" @click="addTask('todo')" />
          </template>
        </UDashboardNavbar>

        <UDashboardToolbar>
          <template #left>
            <UTabs v-model="view" :items="viewItems" :content="false" size="xs" color="neutral" class="w-auto" />
          </template>
          <template #right>
            <UInput
              v-model="search"
              icon="i-lucide-search"
              placeholder="Search tasks…"
              size="sm"
              aria-label="Search tasks"
              class="hidden sm:block w-56"
            />
            <USelectMenu
              v-model="labelFilter"
              :items="labelFilterItems"
              value-key="value"
              multiple
              :search-input="false"
              icon="i-lucide-list-filter"
              size="sm"
              aria-label="Filter by label"
              class="w-32 sm:w-40"
            >
              <span class="truncate text-(--ui-text)">
                {{ labelFilter.length ? `${labelFilter.length} selected` : "All labels" }}
              </span>
            </USelectMenu>
          </template>
        </UDashboardToolbar>
      </template>

      <template #body>
        <!-- Board view ----------------------------------------------------- -->
        <div v-if="view === 'board'" class="flex gap-4 h-full overflow-x-auto snap-x p-4 sm:p-6">
          <section
            v-for="column in columns"
            :key="column.id"
            :aria-labelledby="`column-${column.id}`"
            class="flex flex-col w-72 shrink-0 snap-start scroll-ms-4 xl:w-auto xl:flex-1 xl:min-w-64 rounded-lg bg-(--ui-bg-muted) border transition-colors"
            :class="dropColumn === column.id ? 'border-primary ring-1 ring-primary' : 'border-(--ui-border)'"
            @dragover="onColumnDragOver($event, column.id)"
            @drop="onDrop($event, column.id)"
          >
            <header class="flex items-center gap-2 px-3 pt-3 pb-2">
              <UIcon :name="column.icon" class="size-4 shrink-0" :class="column.iconClass" aria-hidden="true" />
              <h2 :id="`column-${column.id}`" class="text-sm font-semibold text-(--ui-text-highlighted)">
                {{ column.label }}
              </h2>
              <UBadge :label="String(tasksIn(column.id).length)" color="neutral" variant="subtle" size="sm" />
              <UButton
                icon="i-lucide-plus"
                color="neutral"
                variant="ghost"
                size="xs"
                class="ms-auto"
                :aria-label="`Add task to ${column.label}`"
                @click="addTask(column.id)"
              />
            </header>

            <ul class="flex-1 flex flex-col gap-2 px-2 pb-2 overflow-y-auto min-h-24" role="list">
              <li
                v-for="task in tasksIn(column.id)"
                :key="task.id"
                draggable="true"
                class="group relative rounded-md border bg-(--ui-bg) p-3 shadow-xs cursor-grab active:cursor-grabbing transition hover:border-(--ui-border-accented) focus-within:ring-2 focus-within:ring-primary"
                :class="[
                  draggingId === task.id ? 'opacity-40' : '',
                  dropBeforeId === task.id ? 'border-primary border-t-2' : 'border-(--ui-border)',
                ]"
                @dragstart="onDragStart($event, task)"
                @dragend="onDragEnd"
                @dragover="onCardDragOver(task)"
              >
                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium text-(--ui-text-muted)">{{ task.id }}</span>
                  <UIcon
                    :name="priorityConfig[task.priority].icon"
                    class="size-4"
                    :class="priorityConfig[task.priority].class"
                    aria-hidden="true"
                  />
                  <span class="sr-only">Priority: {{ priorityConfig[task.priority].label }}</span>
                  <UDropdownMenu :items="cardMenu(task)" :content="{ align: 'end' }">
                    <UButton
                      icon="i-lucide-ellipsis"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      class="relative z-10 ms-auto -my-1 -me-1"
                      :aria-label="`Actions for ${task.id}`"
                    />
                  </UDropdownMenu>
                </div>

                <!-- Stretched button opens the detail slideover -->
                <button
                  type="button"
                  class="mt-1 block text-start text-sm font-medium text-(--ui-text-highlighted) focus:outline-none after:absolute after:inset-0 after:content-['']"
                  @click="openTask(task.id)"
                >
                  {{ task.title }}
                </button>

                <div v-if="task.labels.length" class="mt-2 flex flex-wrap gap-1">
                  <UBadge
                    v-for="label in task.labels"
                    :key="label"
                    :label="labelConfig[label].label"
                    :color="labelConfig[label].color"
                    :class="labelConfig[label].class"
                    variant="subtle"
                    size="sm"
                  />
                </div>

                <div v-if="task.subtasks.length" class="mt-3 flex items-center gap-2">
                  <UProgress
                    :model-value="progressOf(task)"
                    :max="task.subtasks.length"
                    size="xs"
                    :color="progressOf(task) === task.subtasks.length ? 'success' : 'primary'"
                    :aria-label="`${progressOf(task)} of ${task.subtasks.length} subtasks done`"
                    class="flex-1"
                  />
                  <span class="text-xs tabular-nums text-(--ui-text-muted)">
                    {{ progressOf(task) }}/{{ task.subtasks.length }}
                  </span>
                </div>

                <div class="mt-3 flex items-center gap-3 text-xs text-(--ui-text-muted)">
                  <span class="flex items-center gap-1">
                    <UIcon name="i-lucide-calendar" class="size-3.5" aria-hidden="true" />
                    <span class="sr-only">Due</span>{{ task.due }}
                  </span>
                  <span v-if="task.comments" class="flex items-center gap-1">
                    <UIcon name="i-lucide-message-square" class="size-3.5" aria-hidden="true" />
                    {{ task.comments }}<span class="sr-only">comments</span>
                  </span>
                  <span v-if="task.attachments" class="flex items-center gap-1">
                    <UIcon name="i-lucide-paperclip" class="size-3.5" aria-hidden="true" />
                    {{ task.attachments }}<span class="sr-only">attachments</span>
                  </span>
                  <UAvatarGroup size="xs" class="ms-auto">
                    <UAvatar
                      v-for="id in task.assignees"
                      :key="id"
                      :text="memberById(id).initials"
                      :alt="memberById(id).name"
                    />
                  </UAvatarGroup>
                </div>
              </li>

              <li
                v-if="!tasksIn(column.id).length"
                class="flex-1 flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-(--ui-border-accented) p-6 text-center text-sm text-(--ui-text-muted)"
              >
                <UIcon name="i-lucide-inbox" class="size-5" aria-hidden="true" />
                Drop tasks here
              </li>
            </ul>
          </section>
        </div>

        <!-- List view ------------------------------------------------------ -->
        <div v-else class="p-4 sm:p-6 space-y-6">
          <section v-for="column in columns" :key="column.id" :aria-labelledby="`list-${column.id}`">
            <div class="flex items-center gap-2 mb-2">
              <UIcon :name="column.icon" class="size-4" :class="column.iconClass" aria-hidden="true" />
              <h2 :id="`list-${column.id}`" class="text-sm font-semibold text-(--ui-text-highlighted)">
                {{ column.label }}
              </h2>
              <UBadge :label="String(tasksIn(column.id).length)" color="neutral" variant="subtle" size="sm" />
            </div>
            <ul class="divide-y divide-(--ui-border) rounded-lg border border-(--ui-border)">
              <li v-for="task in tasksIn(column.id)" :key="task.id">
                <button
                  type="button"
                  class="w-full flex items-center gap-3 px-3 py-2.5 text-start hover:bg-(--ui-bg-muted) focus-visible:outline-2 focus-visible:outline-primary"
                  @click="openTask(task.id)"
                >
                  <UIcon
                    :name="priorityConfig[task.priority].icon"
                    class="size-4 shrink-0"
                    :class="priorityConfig[task.priority].class"
                    aria-hidden="true"
                  />
                  <span class="text-xs font-medium text-(--ui-text-muted) w-16 shrink-0">{{ task.id }}</span>
                  <span class="flex-1 min-w-0 truncate text-sm text-(--ui-text-highlighted)">{{ task.title }}</span>
                  <span class="hidden md:flex gap-1">
                    <UBadge
                      v-for="label in task.labels"
                      :key="label"
                      :label="labelConfig[label].label"
                      :color="labelConfig[label].color"
                      :class="labelConfig[label].class"
                      variant="subtle"
                      size="sm"
                    />
                  </span>
                  <span class="hidden sm:block text-xs text-(--ui-text-muted) w-12 text-end">{{ task.due }}</span>
                  <UAvatarGroup size="xs">
                    <UAvatar v-for="id in task.assignees" :key="id" :text="memberById(id).initials" :alt="memberById(id).name" />
                  </UAvatarGroup>
                </button>
              </li>
              <li v-if="!tasksIn(column.id).length" class="px-3 py-2.5 text-sm text-(--ui-text-muted)">
                No tasks
              </li>
            </ul>
          </section>
        </div>
      </template>
    </UDashboardPanel>

    <!-- ================================================================= -->
    <!-- Task detail                                                       -->
    <!-- ================================================================= -->
    <USlideover
      v-model:open="detailOpen"
      :title="selectedTask?.title"
      :description="selectedTask ? `${selectedTask.id} · Website Redesign` : undefined"
      :ui="{ content: 'max-w-lg' }"
    >
      <template v-if="selectedTask" #body>
        <div class="space-y-6">
          <p class="text-sm text-(--ui-text)">
            {{ selectedTask.description || "No description yet." }}
          </p>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Status">
              <USelect
                :model-value="selectedTask.status"
                :items="statusItems"
                value-key="value"
                class="w-full"
                @update:model-value="setStatus($event as Status)"
              />
            </UFormField>
            <UFormField label="Priority">
              <USelect v-model="selectedTask.priority" :items="priorityItems" value-key="value" class="w-full" />
            </UFormField>
            <UFormField label="Due date">
              <UInput :model-value="selectedTask.due" icon="i-lucide-calendar" readonly class="w-full" />
            </UFormField>
            <div>
              <p class="text-sm font-medium text-(--ui-text) mb-1.5">Labels</p>
              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="label in selectedTask.labels"
                  :key="label"
                  :label="labelConfig[label].label"
                  :color="labelConfig[label].color"
                    :class="labelConfig[label].class"
                  variant="subtle"
                />
                <span v-if="!selectedTask.labels.length" class="text-sm text-(--ui-text-muted)">None</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-medium text-(--ui-text) mb-2">Assignees</h3>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="id in selectedTask.assignees"
                :key="id"
                class="flex items-center gap-2 rounded-full border border-(--ui-border) py-1 ps-1 pe-3"
              >
                <UAvatar :text="memberById(id).initials" :alt="memberById(id).name" size="xs" />
                <span class="text-sm text-(--ui-text-highlighted)">{{ memberById(id).name }}</span>
              </li>
            </ul>
          </div>

          <div v-if="selectedTask.subtasks.length">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-(--ui-text)">Checklist</h3>
              <span class="text-xs tabular-nums text-(--ui-text-muted)">
                {{ progressOf(selectedTask) }} of {{ selectedTask.subtasks.length }} done
              </span>
            </div>
            <UProgress
              :model-value="progressOf(selectedTask)"
              :max="selectedTask.subtasks.length"
              size="sm"
              :aria-label="`Checklist progress for ${selectedTask.id}`"
              class="mb-3"
            />
            <div class="space-y-2">
              <UCheckbox
                v-for="(subtask, i) in selectedTask.subtasks"
                :key="i"
                v-model="subtask.done"
                :label="subtask.label"
              />
            </div>
          </div>

          <div>
            <h3 class="text-sm font-medium text-(--ui-text) mb-3">Activity</h3>
            <ol class="space-y-3">
              <li v-for="(entry, i) in selectedTask.activity" :key="i" class="flex gap-3 text-sm">
                <UAvatar :text="memberById(entry.member).initials" :alt="memberById(entry.member).name" size="xs" />
                <p class="text-(--ui-text-muted)">
                  <span class="font-medium text-(--ui-text-highlighted)">{{ memberById(entry.member).name }}</span>
                  {{ entry.text }} · {{ entry.time }}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </template>

      <template #footer="{ close }">
        <div class="flex w-full justify-end gap-2">
          <UButton label="Close" color="neutral" variant="outline" @click="close" />
          <UButton
            label="Save changes"
            @click="saveTask(close)"
          />
        </div>
      </template>
    </USlideover>
  </UDashboardGroup>
</template>
