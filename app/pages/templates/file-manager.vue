<script setup lang="ts">
import * as z from "zod";
import type {
  BreadcrumbItem,
  ContextMenuItem,
  DropdownMenuItem,
  FormSubmitEvent,
  NavigationMenuItem,
  SelectItem,
  TableColumn,
  TableRow,
  TreeItem,
} from "@nuxt/ui";

type FileKind = "folder" | "pdf" | "image" | "doc" | "sheet" | "video" | "zip";
type Section = "my-files" | "recent" | "starred" | "shared" | "trash";

interface DriveItem {
  id: string;
  name: string;
  kind: FileKind;
  parentId: string;
  owner: string;
  modified: string;
  /** Lower is more recent; used to sort by "Last modified". */
  modifiedRank: number;
  created: string;
  /** Size in bytes (0 for folders). */
  size: number;
  sharedWith: string[];
  starred?: boolean;
  trashed?: boolean;
}

const toast = useToast();

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ME = "Alex Morgan";
const ROOT = "root";
const KB = 1024;
const MB = KB * 1024;

const kindMeta: Record<FileKind, { label: string; icon: string; tile: string }> = {
  folder: { label: "Folder", icon: "i-lucide-folder", tile: "bg-primary/10 text-primary" },
  pdf: { label: "PDF", icon: "i-lucide-file-text", tile: "bg-error/10 text-error" },
  image: { label: "Image", icon: "i-lucide-image", tile: "bg-secondary/10 text-secondary" },
  doc: { label: "Document", icon: "i-lucide-file-type", tile: "bg-info/10 text-info" },
  sheet: { label: "Spreadsheet", icon: "i-lucide-file-spreadsheet", tile: "bg-success/10 text-success" },
  video: { label: "Video", icon: "i-lucide-file-video-camera", tile: "bg-warning/10 text-warning" },
  zip: { label: "Archive", icon: "i-lucide-file-archive", tile: "bg-(--ui-bg-accented) text-(--ui-text-muted)" },
};

const items = ref<DriveItem[]>([
  // Folders
  { id: "f-design", name: "Design", kind: "folder", parentId: ROOT, owner: ME, modified: "Today, 11:02", modifiedRank: 2, created: "Mar 4, 2025", size: 0, sharedWith: ["Priya Shah", "Marcus Chen"], starred: true },
  { id: "f-brand", name: "Brand assets", kind: "folder", parentId: "f-design", owner: "Priya Shah", modified: "Yesterday", modifiedRank: 20, created: "Mar 4, 2025", size: 0, sharedWith: [ME] },
  { id: "f-mockups", name: "Mockups", kind: "folder", parentId: "f-design", owner: ME, modified: "Oct 15", modifiedRank: 40, created: "Apr 18, 2025", size: 0, sharedWith: [] },
  { id: "f-marketing", name: "Marketing", kind: "folder", parentId: ROOT, owner: "Sofia Alvarez", modified: "Oct 16", modifiedRank: 30, created: "Jan 9, 2025", size: 0, sharedWith: [ME, "Liam O'Connor"] },
  { id: "f-campaigns", name: "Q4 campaigns", kind: "folder", parentId: "f-marketing", owner: "Sofia Alvarez", modified: "Oct 16", modifiedRank: 31, created: "Sep 1, 2025", size: 0, sharedWith: [ME] },
  { id: "f-finance", name: "Finance", kind: "folder", parentId: ROOT, owner: ME, modified: "Oct 11", modifiedRank: 60, created: "Jan 2, 2025", size: 0, sharedWith: ["Marcus Chen"] },
  { id: "f-projects", name: "Projects", kind: "folder", parentId: ROOT, owner: ME, modified: "Oct 8", modifiedRank: 70, created: "Feb 12, 2025", size: 0, sharedWith: [] },
  { id: "f-website", name: "Website redesign", kind: "folder", parentId: "f-projects", owner: ME, modified: "Oct 8", modifiedRank: 71, created: "Jul 22, 2025", size: 0, sharedWith: ["Hannah Kim", "Priya Shah"] },
  { id: "f-photos", name: "Photos", kind: "folder", parentId: ROOT, owner: ME, modified: "Sep 28", modifiedRank: 90, created: "Jan 2, 2025", size: 0, sharedWith: [] },

  // My files
  { id: "brand-guidelines", name: "Brand guidelines.pdf", kind: "pdf", parentId: ROOT, owner: "Priya Shah", modified: "Today, 10:24", modifiedRank: 3, created: "Aug 30, 2025", size: 4.2 * MB, sharedWith: [ME, "Marcus Chen", "Sofia Alvarez", "Hannah Kim"], starred: true },
  { id: "q3-review", name: "Q3 business review.docx", kind: "doc", parentId: ROOT, owner: ME, modified: "Today, 09:12", modifiedRank: 4, created: "Oct 1, 2025", size: 1.1 * MB, sharedWith: ["Marcus Chen"] },
  { id: "budget-2026", name: "Budget 2026.xlsx", kind: "sheet", parentId: ROOT, owner: "Marcus Chen", modified: "Yesterday", modifiedRank: 10, created: "Sep 15, 2025", size: 860 * KB, sharedWith: [ME, "Sofia Alvarez"], starred: true },
  { id: "launch-teaser", name: "Product launch teaser.mp4", kind: "video", parentId: ROOT, owner: "Sofia Alvarez", modified: "Oct 14", modifiedRank: 45, created: "Oct 14, 2025", size: 248 * MB, sharedWith: [ME] },
  { id: "team-offsite", name: "Team offsite.jpg", kind: "image", parentId: ROOT, owner: ME, modified: "Oct 12", modifiedRank: 50, created: "Oct 12, 2025", size: 6.8 * MB, sharedWith: [] },
  { id: "press-kit", name: "Press kit.zip", kind: "zip", parentId: ROOT, owner: "Liam O'Connor", modified: "Oct 9", modifiedRank: 65, created: "Oct 9, 2025", size: 52.4 * MB, sharedWith: [ME] },
  { id: "interviews", name: "Customer interviews.docx", kind: "doc", parentId: ROOT, owner: "Hannah Kim", modified: "Oct 7", modifiedRank: 75, created: "Sep 22, 2025", size: 640 * KB, sharedWith: [ME, "Priya Shah"] },
  { id: "hiring-plan", name: "Hiring plan.xlsx", kind: "sheet", parentId: ROOT, owner: ME, modified: "Sep 30", modifiedRank: 85, created: "Aug 4, 2025", size: 312 * KB, sharedWith: [] },

  // Inside folders
  { id: "logo-pack", name: "Logo pack.zip", kind: "zip", parentId: "f-design", owner: "Priya Shah", modified: "Today, 11:02", modifiedRank: 1, created: "Oct 18, 2025", size: 18.3 * MB, sharedWith: [ME] },
  { id: "design-system", name: "Design system v3.pdf", kind: "pdf", parentId: "f-design", owner: ME, modified: "Oct 13", modifiedRank: 48, created: "Jun 2, 2025", size: 9.6 * MB, sharedWith: ["Priya Shah"] },
  { id: "hero-illustration", name: "Hero illustration.png", kind: "image", parentId: "f-design", owner: "Priya Shah", modified: "Oct 10", modifiedRank: 55, created: "Oct 10, 2025", size: 3.4 * MB, sharedWith: [ME] },
  { id: "logo-primary", name: "Logo primary.svg", kind: "image", parentId: "f-brand", owner: "Priya Shah", modified: "Yesterday", modifiedRank: 21, created: "Mar 4, 2025", size: 24 * KB, sharedWith: [ME] },
  { id: "color-palette", name: "Color palette.pdf", kind: "pdf", parentId: "f-brand", owner: "Priya Shah", modified: "Sep 19", modifiedRank: 95, created: "Mar 6, 2025", size: 1.8 * MB, sharedWith: [ME] },
  { id: "dashboard-mockup", name: "Dashboard mockup.png", kind: "image", parentId: "f-mockups", owner: ME, modified: "Oct 15", modifiedRank: 41, created: "Oct 15, 2025", size: 2.1 * MB, sharedWith: [] },
  { id: "campaign-brief", name: "Campaign brief.docx", kind: "doc", parentId: "f-marketing", owner: "Sofia Alvarez", modified: "Oct 16", modifiedRank: 32, created: "Sep 3, 2025", size: 420 * KB, sharedWith: [ME] },
  { id: "social-calendar", name: "Social calendar.xlsx", kind: "sheet", parentId: "f-marketing", owner: "Liam O'Connor", modified: "Oct 6", modifiedRank: 78, created: "Aug 28, 2025", size: 196 * KB, sharedWith: [ME] },
  { id: "holiday-ad", name: "Holiday ad 30s.mp4", kind: "video", parentId: "f-campaigns", owner: "Sofia Alvarez", modified: "Oct 16", modifiedRank: 33, created: "Oct 16, 2025", size: 112 * MB, sharedWith: [ME] },
  { id: "invoices-q3", name: "Invoices Q3.zip", kind: "zip", parentId: "f-finance", owner: ME, modified: "Oct 11", modifiedRank: 61, created: "Oct 11, 2025", size: 7.7 * MB, sharedWith: [] },
  { id: "expenses", name: "Expense report.xlsx", kind: "sheet", parentId: "f-finance", owner: "Marcus Chen", modified: "Oct 3", modifiedRank: 80, created: "Oct 3, 2025", size: 148 * KB, sharedWith: [ME] },
  { id: "timeline", name: "Project timeline.xlsx", kind: "sheet", parentId: "f-projects", owner: ME, modified: "Oct 8", modifiedRank: 72, created: "Feb 12, 2025", size: 88 * KB, sharedWith: [] },
  { id: "sitemap", name: "Sitemap.pdf", kind: "pdf", parentId: "f-website", owner: "Hannah Kim", modified: "Oct 2", modifiedRank: 82, created: "Jul 22, 2025", size: 540 * KB, sharedWith: [ME] },
  { id: "product-shoot", name: "Product shoot.jpg", kind: "image", parentId: "f-photos", owner: ME, modified: "Sep 28", modifiedRank: 91, created: "Sep 28, 2025", size: 8.2 * MB, sharedWith: [] },
  { id: "booth", name: "Conference booth.jpg", kind: "image", parentId: "f-photos", owner: ME, modified: "Sep 12", modifiedRank: 98, created: "Sep 12, 2025", size: 5.9 * MB, sharedWith: [] },

  // Trash
  { id: "old-logo", name: "Old logo.png", kind: "image", parentId: "f-brand", owner: ME, modified: "Sep 3", modifiedRank: 99, created: "Jan 9, 2024", size: 410 * KB, sharedWith: [], trashed: true },
  { id: "draft-notes", name: "Draft notes.docx", kind: "doc", parentId: ROOT, owner: ME, modified: "Aug 21", modifiedRank: 120, created: "Aug 20, 2025", size: 36 * KB, sharedWith: [], trashed: true },
]);

const sections: Record<Section, { label: string; icon: string }> = {
  "my-files": { label: "My files", icon: "i-lucide-hard-drive" },
  "recent": { label: "Recent", icon: "i-lucide-clock" },
  "starred": { label: "Starred", icon: "i-lucide-star" },
  "shared": { label: "Shared with me", icon: "i-lucide-users" },
  "trash": { label: "Trash", icon: "i-lucide-trash-2" },
};

const sortOptions: SelectItem[] = [
  { label: "Name", value: "name" },
  { label: "Last modified", value: "modified" },
  { label: "File size", value: "size" },
];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const section = ref<Section>("my-files");
const currentFolderId = ref(ROOT);
const selectedId = ref<string | null>("brand-guidelines");
const view = ref<"grid" | "list">("grid");
const sortBy = ref<"name" | "modified" | "size">("name");
const query = ref("");
const expandedFolders = ref<string[]>(["f-design"]);
const detailsOpen = ref(false);
const isWide = useMediaQuery("(min-width: 1280px)");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function byId(id: string) {
  return items.value.find((item) => item.id === id);
}

function formatSize(bytes: number) {
  if (!bytes) return "—";
  const fixed = (value: number) => value.toFixed(1).replace(/\.0$/, "");
  if (bytes >= 1024 * MB) return `${fixed(bytes / (1024 * MB))} GB`;
  if (bytes >= MB) return `${fixed(bytes / MB)} MB`;
  return `${Math.max(1, Math.round(bytes / KB))} KB`;
}

function ownerLabel(owner: string) {
  return owner === ME ? "me" : owner;
}

function childCount(folderId: string) {
  return items.value.filter((item) => item.parentId === folderId && !item.trashed).length;
}

function pathTo(folderId: string) {
  const path: DriveItem[] = [];
  let folder = byId(folderId);
  while (folder) {
    path.unshift(folder);
    folder = byId(folder.parentId);
  }
  return path;
}

function kindFromName(name: string): FileKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) return "image";
  if (["xls", "xlsx", "csv", "numbers"].includes(ext)) return "sheet";
  if (["mp4", "mov", "webm", "avi"].includes(ext)) return "video";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "zip";
  return "doc";
}

// ---------------------------------------------------------------------------
// Listing
// ---------------------------------------------------------------------------

const visibleItems = computed(() => {
  const live = items.value.filter((item) => !item.trashed);
  if (query.value.trim()) {
    const q = query.value.trim().toLowerCase();
    return live.filter((item) => item.name.toLowerCase().includes(q));
  }
  switch (section.value) {
    case "recent":
      return live.filter((item) => item.kind !== "folder" && item.modifiedRank < 50);
    case "starred":
      return live.filter((item) => item.starred);
    case "shared":
      return live.filter((item) => item.owner !== ME);
    case "trash":
      return items.value.filter((item) => item.trashed);
    default:
      return live.filter((item) => item.parentId === currentFolderId.value);
  }
});

const sortedItems = computed(() =>
  [...visibleItems.value].sort((a, b) => {
    if ((a.kind === "folder") !== (b.kind === "folder")) return a.kind === "folder" ? -1 : 1;
    if (sortBy.value === "modified") return a.modifiedRank - b.modifiedRank;
    if (sortBy.value === "size") return b.size - a.size || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  }),
);

const folders = computed(() => sortedItems.value.filter((item) => item.kind === "folder"));
const files = computed(() => sortedItems.value.filter((item) => item.kind !== "folder"));

const showQuickAccess = computed(
  () => section.value === "my-files" && currentFolderId.value === ROOT && !query.value.trim(),
);

const quickAccess = computed(() =>
  items.value
    .filter((item) => item.kind !== "folder" && !item.trashed)
    .sort((a, b) => a.modifiedRank - b.modifiedRank)
    .slice(0, 4),
);

const pageTitle = computed(() => {
  if (query.value.trim()) return "Search results";
  if (section.value !== "my-files") return sections[section.value].label;
  return byId(currentFolderId.value)?.name ?? "My files";
});

const listingSummary = computed(() => {
  const f = folders.value.length;
  const n = files.value.length;
  return [f && `${f} ${f === 1 ? "folder" : "folders"}`, n && `${n} ${n === 1 ? "file" : "files"}`]
    .filter(Boolean)
    .join(" · ") || "No items";
});

const emptyState = computed(() => {
  if (query.value.trim()) return { icon: "i-lucide-search-x", title: "No results", description: `Nothing in your drive matches “${query.value.trim()}”.` };
  if (section.value === "trash") return { icon: "i-lucide-trash-2", title: "Trash is empty", description: "Items you delete will appear here for 30 days." };
  if (section.value === "starred") return { icon: "i-lucide-star", title: "No starred items", description: "Star files and folders to find them quickly." };
  return { icon: "i-lucide-folder-open", title: "This folder is empty", description: "Drop files here or use the Upload button to add some." };
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

function openFolder(id: string) {
  section.value = "my-files";
  query.value = "";
  currentFolderId.value = id;
  const ancestors = pathTo(id).map((folder) => folder.id);
  expandedFolders.value = [...new Set([...expandedFolders.value, ...ancestors])];
}

function selectSection(next: Section) {
  section.value = next;
  query.value = "";
  if (next === "my-files") currentFolderId.value = ROOT;
}

const navItems = computed<NavigationMenuItem[]>(() =>
  (Object.keys(sections) as Section[]).map((key) => ({
    label: sections[key].label,
    icon: sections[key].icon,
    active: section.value === key && !query.value.trim(),
    badge: key === "trash" ? String(items.value.filter((item) => item.trashed).length) : undefined,
    onSelect: () => selectSection(key),
  })),
);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  if (query.value.trim()) return [{ label: "Search results", icon: "i-lucide-search" }];
  if (section.value !== "my-files") {
    return [{ label: sections[section.value].label, icon: sections[section.value].icon }];
  }
  return [
    { label: "My files", icon: "i-lucide-hard-drive", folderId: ROOT },
    ...pathTo(currentFolderId.value).map((folder) => ({ label: folder.name, folderId: folder.id })),
  ];
});

function toTree(parentId: string): TreeItem[] {
  return items.value
    .filter((item) => item.kind === "folder" && item.parentId === parentId && !item.trashed)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((folder) => {
      const children = toTree(folder.id);
      return {
        id: folder.id,
        label: folder.name,
        icon: expandedFolders.value.includes(folder.id) && children.length ? "i-lucide-folder-open" : "i-lucide-folder",
        children: children.length ? children : undefined,
      };
    });
}

const folderTree = computed(() => toTree(ROOT));

const selectedTreeItem = computed(() => {
  if (section.value !== "my-files" || query.value.trim()) return undefined;
  const find = (nodes: TreeItem[]): TreeItem | undefined => {
    for (const node of nodes) {
      if (node.id === currentFolderId.value) return node;
      const match = node.children && find(node.children);
      if (match) return match;
    }
  };
  return find(folderTree.value);
});

function onTreeSelect(item: TreeItem | undefined) {
  if (item?.id) openFolder(item.id);
}

// ---------------------------------------------------------------------------
// Selection & details
// ---------------------------------------------------------------------------

const selectedItem = computed(() => {
  const item = selectedId.value ? byId(selectedId.value) : undefined;
  return item && item.kind !== "folder" ? item : undefined;
});

const selectedLocation = computed(() =>
  selectedItem.value ? ["My files", ...pathTo(selectedItem.value.parentId).map((f) => f.name)].join(" / ") : "",
);

const selectedActivity = computed(() => {
  const item = selectedItem.value;
  if (!item) return [];
  const people = item.sharedWith.filter((name) => name !== item.owner);
  return [
    { who: item.owner, text: "edited this file", when: item.modified, icon: "i-lucide-pencil" },
    ...(people.length ? [{ who: item.owner, text: `shared it with ${people.length} ${people.length === 1 ? "person" : "people"}`, when: item.created, icon: "i-lucide-share-2" }] : []),
    { who: item.owner, text: "uploaded this file", when: item.created, icon: "i-lucide-upload" },
  ];
});

function onActivate(item: DriveItem) {
  if (item.kind === "folder") {
    if (!item.trashed) openFolder(item.id);
    return;
  }
  selectedId.value = item.id;
  if (!isWide.value) detailsOpen.value = true;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

let createdCount = 0;

function openItem(item: DriveItem) {
  if (item.kind === "folder") return openFolder(item.id);
  toast.add({ title: `Opening ${item.name}`, icon: kindMeta[item.kind].icon });
}

function shareItem(item: DriveItem) {
  toast.add({ title: "Link ready to share", description: `Anyone at Acme with the link can view “${item.name}”.`, icon: "i-lucide-link", color: "success" });
}

function toggleStar(item: DriveItem) {
  item.starred = !item.starred;
  toast.add({ title: item.starred ? "Added to Starred" : "Removed from Starred", icon: "i-lucide-star" });
}

function moveItem(item: DriveItem, folderId: string) {
  item.parentId = folderId;
  toast.add({ title: `Moved to ${byId(folderId)?.name ?? "My files"}`, description: item.name, icon: "i-lucide-folder-input" });
}

function trashItem(item: DriveItem) {
  item.trashed = true;
  if (selectedId.value === item.id) selectedId.value = null;
  toast.add({
    title: "Moved to trash",
    description: item.name,
    icon: "i-lucide-trash-2",
    actions: [{ label: "Undo", color: "neutral", variant: "outline", onClick: () => { item.trashed = false; } }],
  });
}

function deleteForever(item: DriveItem) {
  items.value = items.value.filter((entry) => entry.id !== item.id);
  toast.add({ title: "Deleted forever", description: item.name, icon: "i-lucide-trash-2", color: "error" });
}

function createItem(kind: FileKind) {
  const names: Partial<Record<FileKind, string>> = { folder: "Untitled folder", doc: "Untitled document.docx", sheet: "Untitled spreadsheet.xlsx" };
  const item: DriveItem = {
    id: `new-${++createdCount}`,
    name: names[kind] ?? "Untitled",
    kind,
    parentId: section.value === "my-files" ? currentFolderId.value : ROOT,
    owner: ME,
    modified: "Just now",
    modifiedRank: 0,
    created: "Today",
    size: kind === "folder" ? 0 : 12 * KB,
    sharedWith: [],
  };
  items.value.push(item);
  startRename(item);
}

/** Folders an item can be moved into: not itself, not its own descendants. */
function moveTargets(item: DriveItem): DropdownMenuItem[] {
  const all = items.value.filter((f) => f.kind === "folder" && !f.trashed && f.id !== item.id && !pathTo(f.id).some((p) => p.id === item.id));
  return [
    { label: "My files", icon: "i-lucide-hard-drive", disabled: item.parentId === ROOT, onSelect: () => moveItem(item, ROOT) },
    ...all.map((folder) => ({ label: folder.name, icon: "i-lucide-folder", disabled: item.parentId === folder.id, onSelect: () => moveItem(item, folder.id) })),
  ];
}

function actionsFor(item: DriveItem): DropdownMenuItem[][] {
  if (item.trashed) {
    return [
      [{ label: "Restore", icon: "i-lucide-rotate-ccw", onSelect: () => { item.trashed = false; } }],
      [{ label: "Delete forever", icon: "i-lucide-trash-2", color: "error", onSelect: () => deleteForever(item) }],
    ];
  }
  return [
    [
      { label: "Open", icon: "i-lucide-external-link", onSelect: () => openItem(item) },
      { label: "Share", icon: "i-lucide-share-2", onSelect: () => shareItem(item) },
    ],
    [
      { label: "Rename", icon: "i-lucide-pencil", onSelect: () => startRename(item) },
      { label: "Move to", icon: "i-lucide-folder-input", children: moveTargets(item) },
      { label: item.starred ? "Remove from Starred" : "Add to Starred", icon: item.starred ? "i-lucide-star-off" : "i-lucide-star", onSelect: () => toggleStar(item) },
    ],
    [{ label: "Move to trash", icon: "i-lucide-trash-2", color: "error", onSelect: () => trashItem(item) }],
  ];
}

const newMenuItems: DropdownMenuItem[][] = [
  [{ label: "New folder", icon: "i-lucide-folder-plus", onSelect: () => createItem("folder") }],
  [
    { label: "Upload files", icon: "i-lucide-file-up", onSelect: () => { uploadOpen.value = true; } },
    { label: "Upload folder", icon: "i-lucide-folder-up", onSelect: () => { uploadOpen.value = true; } },
  ],
  [
    { label: "Document", icon: kindMeta.doc.icon, onSelect: () => createItem("doc") },
    { label: "Spreadsheet", icon: kindMeta.sheet.icon, onSelect: () => createItem("sheet") },
  ],
];

// Right-click: the tile under the pointer sets the target; empty space clears it.
const contextTarget = ref<DriveItem | null>(null);
const contextItems = computed<ContextMenuItem[][]>(() =>
  contextTarget.value ? actionsFor(contextTarget.value) : newMenuItems,
);

function onItemContextMenu(item: DriveItem) {
  contextTarget.value = item;
  if (item.kind !== "folder") selectedId.value = item.id;
}

// ---------------------------------------------------------------------------
// List view
// ---------------------------------------------------------------------------

const columns: TableColumn<DriveItem>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "owner", header: "Owner", meta: { class: { th: "hidden md:table-cell", td: "hidden md:table-cell" } } },
  { accessorKey: "modified", header: "Last modified", meta: { class: { th: "hidden sm:table-cell", td: "hidden sm:table-cell" } } },
  { accessorKey: "size", header: "Size", meta: { class: { th: "hidden lg:table-cell", td: "hidden lg:table-cell" } } },
  { id: "actions", meta: { class: { th: "w-12", td: "text-right" } } },
];

const tableMeta = {
  class: {
    tr: (row: TableRow<DriveItem>) =>
      `cursor-pointer ${row.original.id === selectedId.value ? "bg-(--ui-bg-elevated)" : ""}`,
  },
};

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

const uploadOpen = ref(false);
const uploadFiles = ref<File[] | null>(null);

function confirmUpload() {
  const added = uploadFiles.value ?? [];
  for (const file of added) {
    items.value.push({
      id: `upload-${++createdCount}`,
      name: file.name,
      kind: kindFromName(file.name),
      parentId: section.value === "my-files" ? currentFolderId.value : ROOT,
      owner: ME,
      modified: "Just now",
      modifiedRank: 0,
      created: "Today",
      size: file.size,
      sharedWith: [],
    });
  }
  toast.add({ title: `Uploaded ${added.length} ${added.length === 1 ? "file" : "files"}`, description: `to ${pageTitle.value}`, icon: "i-lucide-circle-check", color: "success" });
  uploadFiles.value = null;
  uploadOpen.value = false;
}

// ---------------------------------------------------------------------------
// Rename
// ---------------------------------------------------------------------------

const renameSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Keep it under 80 characters"),
});
type RenameSchema = z.output<typeof renameSchema>;

const renameOpen = ref(false);
const renameTargetId = ref<string | null>(null);
const renameState = reactive({ name: "" });

function startRename(item: DriveItem) {
  renameTargetId.value = item.id;
  renameState.name = item.name;
  renameOpen.value = true;
}

function onRename(event: FormSubmitEvent<RenameSchema>) {
  const item = renameTargetId.value ? byId(renameTargetId.value) : undefined;
  if (item) item.name = event.data.name;
  renameOpen.value = false;
  toast.add({ title: "Renamed", description: event.data.name, icon: "i-lucide-pencil", color: "success" });
}

const [DefineDetails, ReuseDetails] = createReusableTemplate();
</script>

<template>
  <UDashboardGroup>
    <!-- ================================================================= -->
    <!-- Sidebar: new menu, sections, folder tree, storage                 -->
    <!-- ================================================================= -->
    <UDashboardSidebar
      id="drive-sidebar"
      resizable
      :min-size="16"
      :default-size="19"
      :max-size="26"
      :ui="{ footer: 'border-t border-(--ui-border)' }"
      class="bg-(--ui-bg-elevated)/40"
    >
      <template #header>
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="size-8 rounded-(--ui-radius) bg-primary flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-cloud" class="size-5 text-(--ui-bg)" aria-hidden="true" />
          </span>
          <span class="font-semibold text-(--ui-text-highlighted) truncate">Nimbus Drive</span>
        </div>
      </template>

      <template #default>
        <UDropdownMenu :items="newMenuItems" :content="{ align: 'start' }" :ui="{ content: 'w-56' }">
          <UButton label="New" icon="i-lucide-plus" size="lg" class="w-fit px-5 shadow-sm" />
        </UDropdownMenu>

        <UNavigationMenu :items="navItems" orientation="vertical" />

        <div class="space-y-1">
          <p class="px-2.5 text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted)">
            Folders
          </p>
          <UTree
            v-model:expanded="expandedFolders"
            :items="folderTree"
            :model-value="selectedTreeItem"
            :get-key="(item) => item.id"
            size="sm"
            @update:model-value="onTreeSelect"
          />
        </div>

        <!-- Storage usage -->
        <div class="mt-auto mb-2 rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg) p-4 space-y-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-hard-drive" class="size-4 text-(--ui-text-muted)" aria-hidden="true" />
            <p class="text-sm font-medium text-(--ui-text-highlighted)">Storage</p>
            <span class="ms-auto text-xs font-medium text-(--ui-text-muted)">68%</span>
          </div>
          <UProgress :model-value="68" size="sm" aria-label="Storage used" />
          <p class="text-xs text-(--ui-text-muted)">13.6 GB of 20 GB used</p>
          <UButton label="Get more storage" color="neutral" variant="outline" size="sm" block />
        </div>
      </template>

      <template #footer>
        <UButton
          :avatar="{ alt: ME }"
          :label="ME"
          trailing-icon="i-lucide-chevrons-up-down"
          color="neutral"
          variant="ghost"
          class="w-full"
          :ui="{ trailingIcon: 'ms-auto text-(--ui-text-muted)' }"
        />
      </template>
    </UDashboardSidebar>

    <!-- ================================================================= -->
    <!-- Main panel: breadcrumb, toolbar, quick access, files              -->
    <!-- ================================================================= -->
    <UDashboardPanel id="drive-main">
      <template #header>
        <UDashboardNavbar :title="pageTitle" :ui="{ title: 'sr-only', left: 'flex-1' }">
          <template #trailing>
            <UBreadcrumb :items="breadcrumbItems" class="min-w-0">
              <template #item="{ item, active }">
                <button
                  v-if="!active && item.folderId"
                  type="button"
                  class="flex items-center gap-1.5 min-w-0 cursor-pointer hover:text-(--ui-text-highlighted) focus-visible:outline-2 focus-visible:outline-primary rounded-sm"
                  @click="openFolder(item.folderId)"
                >
                  <UIcon v-if="item.icon" :name="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                  <span class="truncate">{{ item.label }}</span>
                </button>
                <span v-else class="flex items-center gap-1.5 min-w-0 text-(--ui-text-highlighted)">
                  <UIcon v-if="item.icon" :name="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                  <span class="truncate">{{ item.label }}</span>
                </span>
              </template>
            </UBreadcrumb>
          </template>

          <template #right>
            <UInput
              v-model="query"
              icon="i-lucide-search"
              placeholder="Search in Drive"
              aria-label="Search in Drive"
              class="hidden md:block w-56 lg:w-72"
            />
            <UButton
              icon="i-lucide-upload"
              label="Upload"
              class="hidden sm:inline-flex"
              @click="uploadOpen = true"
            />
            <UButton
              icon="i-lucide-upload"
              aria-label="Upload files"
              class="sm:hidden"
              @click="uploadOpen = true"
            />
          </template>
        </UDashboardNavbar>

        <UDashboardToolbar>
          <template #left>
            <UInput
              v-model="query"
              icon="i-lucide-search"
              placeholder="Search"
              aria-label="Search in Drive"
              size="sm"
              class="md:hidden w-full min-w-28"
            />
            <p class="hidden md:block text-sm text-(--ui-text-muted)" aria-live="polite">
              {{ listingSummary }}
            </p>
          </template>

          <template #right>
            <USelect
              v-model="sortBy"
              :items="sortOptions"
              icon="i-lucide-arrow-up-down"
              size="sm"
              aria-label="Sort by"
              class="w-36 sm:w-40"
            />
            <UFieldGroup size="sm">
              <UButton
                icon="i-lucide-layout-grid"
                color="neutral"
                :variant="view === 'grid' ? 'subtle' : 'outline'"
                aria-label="Grid view"
                :aria-pressed="view === 'grid'"
                @click="view = 'grid'"
              />
              <UButton
                icon="i-lucide-list"
                color="neutral"
                :variant="view === 'list' ? 'subtle' : 'outline'"
                aria-label="List view"
                :aria-pressed="view === 'list'"
                @click="view = 'list'"
              />
            </UFieldGroup>
          </template>
        </UDashboardToolbar>
      </template>

      <template #body>
        <UContextMenu :items="contextItems" :ui="{ content: 'w-56' }">
          <div class="flex-1 flex flex-col gap-6" @contextmenu.capture="contextTarget = null">
            <!-- Quick access -->
            <section v-if="showQuickAccess" aria-labelledby="quick-access-heading" class="space-y-3">
              <h2 id="quick-access-heading" class="text-sm font-semibold text-(--ui-text-highlighted)">
                Quick access
              </h2>
              <div class="flex gap-3 overflow-x-auto pb-1 -mb-1 sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:overflow-visible">
                <button
                  v-for="file in quickAccess"
                  :key="file.id"
                  type="button"
                  class="min-w-60 sm:min-w-0 flex items-center gap-3 rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg) p-3 text-left hover:bg-(--ui-bg-elevated) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                  @click="onActivate(file)"
                  @dblclick="openItem(file)"
                  @contextmenu="onItemContextMenu(file)"
                >
                  <span class="size-10 rounded-(--ui-radius) flex items-center justify-center shrink-0" :class="kindMeta[file.kind].tile">
                    <UIcon :name="kindMeta[file.kind].icon" class="size-5" aria-hidden="true" />
                  </span>
                  <span class="min-w-0">
                    <span class="block text-sm font-medium text-(--ui-text-highlighted) truncate">{{ file.name }}</span>
                    <span class="block text-xs text-(--ui-text-muted) truncate">
                      {{ file.owner === ME ? "You" : file.owner.split(" ")[0] }} · {{ file.modified }}
                    </span>
                  </span>
                </button>
              </div>
            </section>

            <UEmpty
              v-if="!sortedItems.length"
              :icon="emptyState.icon"
              :title="emptyState.title"
              :description="emptyState.description"
              :actions="section === 'my-files' && !query ? [{ label: 'Upload files', icon: 'i-lucide-upload', onClick: () => { uploadOpen = true; } }] : []"
              variant="naked"
              class="flex-1"
            />

            <!-- Grid view -->
            <template v-else-if="view === 'grid'">
              <section v-if="folders.length" aria-labelledby="folders-heading" class="space-y-3">
                <h2 id="folders-heading" class="text-sm font-semibold text-(--ui-text-highlighted)">Folders</h2>
                <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-3">
                  <div
                    v-for="folder in folders"
                    :key="folder.id"
                    class="relative"
                    @contextmenu="onItemContextMenu(folder)"
                  >
                    <button
                      type="button"
                      class="w-full flex items-center gap-3 rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg) py-2.5 ps-3 pe-11 text-left hover:bg-(--ui-bg-elevated) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                      @click="onActivate(folder)"
                    >
                      <span class="size-9 rounded-(--ui-radius) flex items-center justify-center shrink-0" :class="kindMeta.folder.tile">
                        <UIcon :name="folder.trashed ? 'i-lucide-folder-x' : 'i-lucide-folder'" class="size-5" aria-hidden="true" />
                      </span>
                      <span class="min-w-0">
                        <span class="flex items-center gap-1.5 text-sm font-medium text-(--ui-text-highlighted)">
                          <span class="truncate">{{ folder.name }}</span>
                          <UIcon v-if="folder.sharedWith.length" name="i-lucide-users" class="size-3.5 shrink-0 text-(--ui-text-muted)" aria-label="Shared" />
                        </span>
                        <span class="block text-xs text-(--ui-text-muted)">{{ childCount(folder.id) }} items</span>
                      </span>
                    </button>
                    <UDropdownMenu :items="actionsFor(folder)" :content="{ align: 'end' }" :ui="{ content: 'w-56' }">
                      <UButton
                        icon="i-lucide-ellipsis-vertical"
                        color="neutral"
                        variant="ghost"
                        size="sm"
                        class="absolute end-1.5 top-1/2 -translate-y-1/2"
                        :aria-label="`More actions for ${folder.name}`"
                      />
                    </UDropdownMenu>
                  </div>
                </div>
              </section>

              <section v-if="files.length" aria-labelledby="files-heading" class="space-y-3">
                <h2 id="files-heading" class="text-sm font-semibold text-(--ui-text-highlighted)">Files</h2>
                <div class="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] gap-3">
                  <div
                    v-for="file in files"
                    :key="file.id"
                    class="relative"
                    @contextmenu="onItemContextMenu(file)"
                  >
                    <button
                      type="button"
                      class="w-full rounded-(--ui-radius) border bg-(--ui-bg) p-2 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                      :class="selectedId === file.id ? 'border-primary ring-1 ring-primary bg-(--ui-bg-elevated)' : 'border-(--ui-border) hover:bg-(--ui-bg-elevated)'"
                      :aria-pressed="selectedId === file.id"
                      @click="onActivate(file)"
                      @dblclick="openItem(file)"
                    >
                      <span class="aspect-[4/3] rounded-[calc(var(--ui-radius)*0.75)] flex items-center justify-center" :class="kindMeta[file.kind].tile">
                        <UIcon :name="kindMeta[file.kind].icon" class="size-10" aria-hidden="true" />
                      </span>
                      <span class="block pt-2.5 pb-0.5 ps-1 pe-8">
                        <span class="block text-sm font-medium text-(--ui-text-highlighted) truncate">{{ file.name }}</span>
                        <span class="flex items-center gap-1 text-xs text-(--ui-text-muted)">
                          <UIcon v-if="file.starred" name="i-lucide-star" class="size-3 shrink-0 text-warning" aria-label="Starred" />
                          <span class="truncate">{{ file.modified }} · {{ formatSize(file.size) }}</span>
                        </span>
                      </span>
                    </button>
                    <UDropdownMenu :items="actionsFor(file)" :content="{ align: 'end' }" :ui="{ content: 'w-56' }">
                      <UButton
                        icon="i-lucide-ellipsis-vertical"
                        color="neutral"
                        variant="ghost"
                        size="sm"
                        class="absolute end-1 bottom-2.5"
                        :aria-label="`More actions for ${file.name}`"
                      />
                    </UDropdownMenu>
                  </div>
                </div>
              </section>
            </template>

            <!-- List view -->
            <UTable
              v-else
              :data="sortedItems"
              :columns="columns"
              :meta="tableMeta"
              class="rounded-(--ui-radius) border border-(--ui-border)"
              @select="(_e: Event, row: TableRow<DriveItem>) => onActivate(row.original)"
              @contextmenu="(_e: Event, row: TableRow<DriveItem>) => onItemContextMenu(row.original)"
            >
              <template #name-cell="{ row }">
                <div class="flex items-center gap-3 min-w-0">
                  <span class="size-8 rounded-(--ui-radius) flex items-center justify-center shrink-0" :class="kindMeta[row.original.kind].tile">
                    <UIcon :name="kindMeta[row.original.kind].icon" class="size-4" aria-hidden="true" />
                  </span>
                  <span class="font-medium text-(--ui-text-highlighted) truncate">{{ row.original.name }}</span>
                  <UIcon v-if="row.original.starred" name="i-lucide-star" class="size-3.5 shrink-0 text-warning" aria-label="Starred" />
                </div>
              </template>
              <template #owner-cell="{ row }">
                <div class="flex items-center gap-2">
                  <UAvatar :alt="row.original.owner" size="2xs" />
                  <span>{{ ownerLabel(row.original.owner) }}</span>
                </div>
              </template>
              <template #size-cell="{ row }">
                {{ formatSize(row.original.size) }}
              </template>
              <template #actions-header>
                <span class="sr-only">Actions</span>
              </template>
              <template #actions-cell="{ row }">
                <div @click.stop>
                  <UDropdownMenu :items="actionsFor(row.original)" :content="{ align: 'end' }" :ui="{ content: 'w-56' }">
                    <UButton
                      icon="i-lucide-ellipsis-vertical"
                      color="neutral"
                      variant="ghost"
                      size="sm"
                      :aria-label="`More actions for ${row.original.name}`"
                    />
                  </UDropdownMenu>
                </div>
              </template>
            </UTable>
          </div>
        </UContextMenu>
      </template>
    </UDashboardPanel>

    <!-- ================================================================= -->
    <!-- Details: side panel on wide screens, slideover below xl           -->
    <!-- ================================================================= -->
    <DefineDetails>
      <div v-if="selectedItem" class="space-y-6">
        <div class="aspect-[4/3] rounded-(--ui-radius) flex items-center justify-center" :class="kindMeta[selectedItem.kind].tile">
          <UIcon :name="kindMeta[selectedItem.kind].icon" class="size-16" aria-hidden="true" />
        </div>

        <div class="space-y-3">
          <div>
            <p class="font-semibold text-(--ui-text-highlighted) break-words">{{ selectedItem.name }}</p>
            <p class="text-sm text-(--ui-text-muted)">
              {{ kindMeta[selectedItem.kind].label }} · {{ formatSize(selectedItem.size) }}
            </p>
          </div>
          <div class="flex gap-2">
            <UButton label="Open" icon="i-lucide-external-link" size="sm" class="flex-1 justify-center" @click="openItem(selectedItem)" />
            <UButton label="Share" icon="i-lucide-share-2" color="neutral" variant="outline" size="sm" class="flex-1 justify-center" @click="shareItem(selectedItem)" />
            <UButton
              :icon="selectedItem.starred ? 'i-lucide-star-off' : 'i-lucide-star'"
              color="neutral"
              variant="outline"
              size="sm"
              :aria-label="selectedItem.starred ? 'Remove from Starred' : 'Add to Starred'"
              @click="toggleStar(selectedItem)"
            />
          </div>
        </div>

        <section class="space-y-3">
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">File details</h3>
          <dl class="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2.5 text-sm">
            <dt class="text-(--ui-text-muted)">Type</dt>
            <dd class="text-(--ui-text-highlighted)">{{ kindMeta[selectedItem.kind].label }}</dd>
            <dt class="text-(--ui-text-muted)">Size</dt>
            <dd class="text-(--ui-text-highlighted)">{{ formatSize(selectedItem.size) }}</dd>
            <dt class="text-(--ui-text-muted)">Location</dt>
            <dd class="text-(--ui-text-highlighted) break-words">{{ selectedLocation }}</dd>
            <dt class="text-(--ui-text-muted)">Owner</dt>
            <dd class="flex items-center gap-2 text-(--ui-text-highlighted) min-w-0">
              <UAvatar :alt="selectedItem.owner" size="3xs" />
              <span class="truncate">{{ ownerLabel(selectedItem.owner) }}</span>
            </dd>
            <dt class="text-(--ui-text-muted)">Modified</dt>
            <dd class="text-(--ui-text-highlighted)">{{ selectedItem.modified }}</dd>
            <dt class="text-(--ui-text-muted)">Created</dt>
            <dd class="text-(--ui-text-highlighted)">{{ selectedItem.created }}</dd>
          </dl>
        </section>

        <USeparator />

        <section class="space-y-3">
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">Who has access</h3>
          <div class="flex items-center gap-3">
            <UAvatarGroup size="md" :max="4">
              <UAvatar :alt="selectedItem.owner" />
              <UAvatar v-for="person in selectedItem.sharedWith.filter((p) => p !== selectedItem?.owner)" :key="person" :alt="person" />
            </UAvatarGroup>
            <p class="text-sm text-(--ui-text-muted)">
              {{ selectedItem.sharedWith.length ? `Shared with ${selectedItem.sharedWith.length}` : "Only you" }}
            </p>
          </div>
          <UButton label="Manage access" icon="i-lucide-user-plus" color="neutral" variant="outline" size="sm" block @click="shareItem(selectedItem)" />
        </section>

        <USeparator />

        <section class="space-y-3">
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">Activity</h3>
          <ol class="space-y-3">
            <li v-for="entry in selectedActivity" :key="entry.text" class="flex gap-3">
              <UAvatar :alt="entry.who" size="xs" class="shrink-0" />
              <div class="min-w-0 text-sm">
                <p class="text-(--ui-text)">
                  <span class="font-medium text-(--ui-text-highlighted)">{{ entry.who === ME ? "You" : entry.who }}</span>
                  {{ entry.text }}
                </p>
                <p class="flex items-center gap-1 text-xs text-(--ui-text-muted)">
                  <UIcon :name="entry.icon" class="size-3" aria-hidden="true" />
                  {{ entry.when }}
                </p>
              </div>
            </li>
          </ol>
        </section>
      </div>

      <UEmpty
        v-else
        icon="i-lucide-mouse-pointer-click"
        title="No file selected"
        description="Select a file to see its details, who has access, and recent activity."
        variant="naked"
        class="h-full"
      />
    </DefineDetails>

    <UDashboardPanel
      id="drive-details"
      :ui="{ root: 'hidden xl:flex w-80 flex-none', body: 'p-4 sm:p-5' }"
    >
      <template #header>
        <div class="h-(--ui-header-height) shrink-0 flex items-center justify-between gap-2 border-b border-(--ui-border) px-5">
          <h2 class="font-semibold text-(--ui-text-highlighted)">Details</h2>
          <UButton
            v-if="selectedItem"
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Clear selection"
            @click="selectedId = null"
          />
        </div>
      </template>
      <template #body>
        <ReuseDetails />
      </template>
    </UDashboardPanel>

    <USlideover v-model:open="detailsOpen" title="Details" description="File details, sharing, and activity">
      <template #body>
        <ReuseDetails />
      </template>
    </USlideover>

    <!-- ================================================================= -->
    <!-- Modals                                                            -->
    <!-- ================================================================= -->
    <UModal
      v-model:open="uploadOpen"
      title="Upload files"
      :description="`Files will be added to ${section === 'my-files' ? pageTitle : 'My files'}.`"
    >
      <template #body>
        <UFileUpload
          v-model="uploadFiles"
          multiple
          layout="list"
          icon="i-lucide-cloud-upload"
          label="Drop files here or click to browse"
          description="PDF, images, documents, spreadsheets, video, or ZIP · up to 2 GB each"
          class="w-full min-h-48"
        />
      </template>
      <template #footer="{ close }">
        <div class="flex w-full justify-end gap-2">
          <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
          <UButton
            :label="uploadFiles?.length ? `Upload ${uploadFiles.length} ${uploadFiles.length === 1 ? 'file' : 'files'}` : 'Upload'"
            icon="i-lucide-upload"
            :disabled="!uploadFiles?.length"
            @click="confirmUpload"
          />
        </div>
      </template>
    </UModal>

    <UModal v-model:open="renameOpen" title="Rename" description="Give this item a clear, searchable name.">
      <template #body>
        <UForm id="rename-form" :schema="renameSchema" :state="renameState" @submit="onRename">
          <UFormField label="Name" name="name">
            <UInput v-model="renameState.name" autofocus class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer="{ close }">
        <div class="flex w-full justify-end gap-2">
          <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
          <UButton type="submit" form="rename-form" label="Save" />
        </div>
      </template>
    </UModal>
  </UDashboardGroup>
</template>
