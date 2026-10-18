<script setup lang="ts">
import * as z from "zod";
import type {
  DropdownMenuItem,
  FormSubmitEvent,
  NavigationMenuItem,
  TabsItem,
} from "@nuxt/ui";

type Folder = "inbox" | "starred" | "sent" | "drafts" | "archive" | "trash";
type LabelColor = "primary" | "secondary" | "success" | "info" | "warning" | "error";

interface Mail {
  id: string;
  folder: Exclude<Folder, "starred">;
  from: { name: string; email: string };
  to: string[];
  cc?: string[];
  subject: string;
  body: string[];
  time: string;
  date: string;
  unread: boolean;
  starred: boolean;
  labels: string[];
  attachment?: { name: string; size: string; icon: string };
}

const toast = useToast();

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

const labels: { name: string; color: LabelColor }[] = [
  { name: "Work", color: "primary" },
  { name: "Design", color: "secondary" },
  { name: "Finance", color: "warning" },
  { name: "Personal", color: "success" },
  { name: "Urgent", color: "error" },
];

// Static class strings so Tailwind can see them.
const labelDotClass: Record<LabelColor, string> = {
  primary: "bg-(--ui-primary)",
  secondary: "bg-(--ui-secondary)",
  success: "bg-(--ui-success)",
  info: "bg-(--ui-info)",
  warning: "bg-(--ui-warning)",
  error: "bg-(--ui-error)",
};

function labelColor(name: string): LabelColor {
  return labels.find((l) => l.name === name)?.color ?? "primary";
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

const me = { name: "Jordan Lee", email: "jordan@example.com" };

const mails = ref<Mail[]>([
  {
    id: "m1",
    folder: "inbox",
    from: { name: "Sofia Martinez", email: "sofia@example.com" },
    to: ["Jordan Lee"],
    cc: ["Liam Chen", "Priya Shah"],
    subject: "Q4 launch plan: final review before Friday",
    body: [
      "Hi Jordan,",
      "I've pulled together the final version of the Q4 launch plan. The timeline now reflects the extra week we agreed on for QA, and marketing has signed off on the announcement copy.",
      "Could you take a look at the rollout section before Friday? I'd especially like your eyes on the staged release percentages and the rollback criteria. If everything looks good, I'll share it with leadership on Monday.",
      "Thanks so much,\nSofia",
    ],
    time: "9:42 AM",
    date: "Oct 18, 2026, 9:42 AM",
    unread: true,
    starred: true,
    labels: ["Work", "Urgent"],
    attachment: { name: "Q4-launch-plan.pdf", size: "2.4 MB", icon: "i-lucide-file-text" },
  },
  {
    id: "m2",
    folder: "inbox",
    from: { name: "Liam Chen", email: "liam@example.com" },
    to: ["Jordan Lee"],
    subject: "New onboarding flow mockups are ready",
    body: [
      "Hey Jordan,",
      "The new onboarding mockups are up in the design file. I simplified the first three steps into a single screen and moved workspace setup to after the first project is created.",
      "Let me know what you think. Happy to walk through it on a call this afternoon.",
      "Liam",
    ],
    time: "8:15 AM",
    date: "Oct 18, 2026, 8:15 AM",
    unread: true,
    starred: false,
    labels: ["Design"],
    attachment: { name: "onboarding-v3.fig", size: "18.2 MB", icon: "i-lucide-pen-tool" },
  },
  {
    id: "m3",
    folder: "inbox",
    from: { name: "Priya Shah", email: "priya@example.com" },
    to: ["Jordan Lee", "Sofia Martinez"],
    subject: "Invoice #2026-0418 for October",
    body: [
      "Hello Jordan,",
      "Please find attached the invoice for October's infrastructure costs. The total is slightly lower than last month thanks to the reserved instances we switched to.",
      "Payment is due by November 1st. Let me know if anything looks off.",
      "Best,\nPriya",
    ],
    time: "Yesterday",
    date: "Oct 17, 2026, 4:30 PM",
    unread: true,
    starred: false,
    labels: ["Finance"],
    attachment: { name: "invoice-2026-0418.pdf", size: "184 KB", icon: "i-lucide-receipt" },
  },
  {
    id: "m4",
    folder: "inbox",
    from: { name: "Marcus Webb", email: "marcus@example.com" },
    to: ["Jordan Lee"],
    subject: "Re: API rate limits for the partner integration",
    body: [
      "Jordan,",
      "We bumped the partner tier to 600 requests per minute and added a burst allowance. The change is live in staging now and will roll to production with Tuesday's deploy.",
      "I also added a dashboard panel so we can watch how close they get to the limit during the first week.",
      "Marcus",
    ],
    time: "Yesterday",
    date: "Oct 17, 2026, 11:08 AM",
    unread: false,
    starred: true,
    labels: ["Work"],
  },
  {
    id: "m5",
    folder: "inbox",
    from: { name: "Emma Novak", email: "emma@example.com" },
    to: ["Jordan Lee"],
    subject: "Dinner on Saturday?",
    body: [
      "Hi Jordan!",
      "A few of us are getting together on Saturday at that new place on Elm Street. Reservation is at 7:30. Would love for you to join.",
      "Emma",
    ],
    time: "Thu",
    date: "Oct 15, 2026, 6:12 PM",
    unread: false,
    starred: false,
    labels: ["Personal"],
  },
  {
    id: "m6",
    folder: "inbox",
    from: { name: "Noah Kim", email: "noah@example.com" },
    to: ["Jordan Lee"],
    cc: ["Sofia Martinez"],
    subject: "Accessibility audit results",
    body: [
      "Hi Jordan,",
      "The external accessibility audit came back. Overall we scored well, with a handful of issues around focus order in the settings modal and a couple of low-contrast labels.",
      "I've created tickets for each finding and tagged them for the next sprint.",
      "Noah",
    ],
    time: "Wed",
    date: "Oct 14, 2026, 2:47 PM",
    unread: false,
    starred: false,
    labels: ["Work", "Design"],
    attachment: { name: "a11y-audit-2026.xlsx", size: "96 KB", icon: "i-lucide-file-spreadsheet" },
  },
  {
    id: "m7",
    folder: "inbox",
    from: { name: "Ava Thompson", email: "ava@example.com" },
    to: ["Jordan Lee"],
    subject: "Your expense report was approved",
    body: [
      "Hi Jordan,",
      "Your expense report for the September offsite has been approved. The reimbursement will be included in your next paycheck.",
      "Ava, Finance team",
    ],
    time: "Tue",
    date: "Oct 13, 2026, 10:20 AM",
    unread: false,
    starred: false,
    labels: ["Finance"],
  },
  {
    id: "m8",
    folder: "inbox",
    from: { name: "Daniel Osei", email: "daniel@example.com" },
    to: ["Jordan Lee"],
    subject: "Interview loop for the senior designer role",
    body: [
      "Hey Jordan,",
      "We have three candidates in the final round next week. I've put you on the portfolio review panel for Wednesday and Thursday mornings.",
      "The scorecards are in the hiring tracker. Thanks for helping out!",
      "Daniel",
    ],
    time: "Oct 12",
    date: "Oct 12, 2026, 3:55 PM",
    unread: false,
    starred: false,
    labels: ["Work"],
  },
  {
    id: "m9",
    folder: "inbox",
    from: { name: "Grace Liu", email: "grace@example.com" },
    to: ["Jordan Lee"],
    subject: "Photos from the team offsite",
    body: [
      "Hi everyone,",
      "I finally sorted through all the photos from the offsite. The shared album has about 200 shots, including the group photo from the hike.",
      "Grace",
    ],
    time: "Oct 10",
    date: "Oct 10, 2026, 9:01 AM",
    unread: false,
    starred: true,
    labels: ["Personal"],
  },
  {
    id: "m10",
    folder: "inbox",
    from: { name: "Oliver Brandt", email: "oliver@example.com" },
    to: ["Jordan Lee"],
    subject: "Security review sign-off needed",
    body: [
      "Jordan,",
      "The security review for the SSO rollout is complete. We need your sign-off as the feature owner before we can enable it for enterprise customers.",
      "Oliver",
    ],
    time: "Oct 9",
    date: "Oct 9, 2026, 1:34 PM",
    unread: false,
    starred: false,
    labels: ["Work", "Urgent"],
  },
  {
    id: "m11",
    folder: "sent",
    from: me,
    to: ["Marcus Webb"],
    subject: "API rate limits for the partner integration",
    body: [
      "Hi Marcus,",
      "Our partner is hitting the 300 requests per minute ceiling during their nightly sync. Could we raise their tier?",
      "Jordan",
    ],
    time: "Mon",
    date: "Oct 12, 2026, 9:15 AM",
    unread: false,
    starred: false,
    labels: ["Work"],
  },
  {
    id: "m12",
    folder: "drafts",
    from: me,
    to: ["Daniel Osei"],
    subject: "Re: Interview loop for the senior designer role",
    body: ["Hi Daniel,", "Wednesday works for me. For Thursday, could we"],
    time: "Oct 12",
    date: "Oct 12, 2026, 4:10 PM",
    unread: false,
    starred: false,
    labels: [],
  },
  {
    id: "m13",
    folder: "archive",
    from: { name: "Sofia Martinez", email: "sofia@example.com" },
    to: ["Jordan Lee"],
    subject: "Retro notes from sprint 41",
    body: [
      "Hi team,",
      "Here are the notes from Tuesday's retro, along with the three action items we agreed on.",
      "Sofia",
    ],
    time: "Oct 2",
    date: "Oct 2, 2026, 5:45 PM",
    unread: false,
    starred: false,
    labels: ["Work"],
  },
]);

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

const activeFolder = ref<Folder>("inbox");
const activeLabel = ref<string | null>(null);
const readFilter = ref<"all" | "unread">("all");
const search = ref("");

const tabItems: TabsItem[] = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
];

const folderTitles: Record<Folder, string> = {
  inbox: "Inbox",
  starred: "Starred",
  sent: "Sent",
  drafts: "Drafts",
  archive: "Archive",
  trash: "Trash",
};

const listTitle = computed(() => activeLabel.value ?? folderTitles[activeFolder.value]);

const inFolder = (mail: Mail, folder: Folder) =>
  folder === "starred" ? mail.starred && mail.folder !== "trash" : mail.folder === folder;

const visibleMails = computed(() => {
  const q = search.value.trim().toLowerCase();
  return mails.value.filter((mail) => {
    if (activeLabel.value) {
      if (!mail.labels.includes(activeLabel.value) || mail.folder === "trash") return false;
    } else if (!inFolder(mail, activeFolder.value)) {
      return false;
    }
    if (readFilter.value === "unread" && !mail.unread) return false;
    if (!q) return true;
    return [mail.from.name, mail.subject, mail.body.join(" ")].some((s) =>
      s.toLowerCase().includes(q),
    );
  });
});

const unreadCount = computed(
  () => mails.value.filter((m) => m.folder === "inbox" && m.unread).length,
);

function count(folder: Folder) {
  return mails.value.filter((m) => inFolder(m, folder)).length;
}

function selectFolder(folder: Folder) {
  activeFolder.value = folder;
  activeLabel.value = null;
  selectedId.value = visibleMails.value[0]?.id ?? null;
  mobileReading.value = false;
}

function selectLabel(name: string) {
  activeLabel.value = activeLabel.value === name ? null : name;
  selectedId.value = visibleMails.value[0]?.id ?? null;
  mobileReading.value = false;
}

// ---------------------------------------------------------------------------
// Sidebar navigation
// ---------------------------------------------------------------------------

const folderIcons: Record<Folder, string> = {
  inbox: "i-lucide-inbox",
  starred: "i-lucide-star",
  sent: "i-lucide-send",
  drafts: "i-lucide-file-pen-line",
  archive: "i-lucide-archive",
  trash: "i-lucide-trash-2",
};

const folderItems = computed<NavigationMenuItem[]>(() =>
  (Object.keys(folderTitles) as Folder[]).map((folder) => {
    const badgeCount =
      folder === "inbox" ? unreadCount.value : folder === "drafts" ? count("drafts") : 0;
    return {
      label: folderTitles[folder],
      icon: folderIcons[folder],
      active: !activeLabel.value && activeFolder.value === folder,
      badge: badgeCount
        ? {
            label: String(badgeCount),
            color: folder === "inbox" ? ("primary" as const) : ("neutral" as const),
            variant: "subtle" as const,
          }
        : undefined,
      onSelect: () => selectFolder(folder),
    };
  }),
);

// Custom-slot items are typed as `never` in the slot scope, so read the color here.
function labelDot(item: { color?: unknown }) {
  return labelDotClass[item.color as LabelColor];
}

const labelItems = computed<NavigationMenuItem[]>(() => [
  { type: "label", label: "Labels" },
  ...labels.map((l) => ({
    label: l.name,
    slot: "tag",
    color: l.color,
    active: activeLabel.value === l.name,
    onSelect: () => selectLabel(l.name),
  })),
]);

// ---------------------------------------------------------------------------
// Selection
// ---------------------------------------------------------------------------

const selectedId = ref<string | null>("m1");
const mobileReading = ref(false);

const selected = computed(() => mails.value.find((m) => m.id === selectedId.value) ?? null);

function openMail(mail: Mail) {
  selectedId.value = mail.id;
  mail.unread = false;
  mobileReading.value = true;
}

function toggleStar(mail: Mail) {
  mail.starred = !mail.starred;
}

function displayName(mail: Mail) {
  return mail.folder === "sent" || mail.folder === "drafts"
    ? `To: ${mail.to.join(", ")}`
    : mail.from.name;
}

function preview(mail: Mail) {
  return mail.body.slice(1).join(" ").replace(/\n/g, " ");
}

function formatRecipients(names: string[]) {
  return names.map((n) => (n === me.name ? "me" : n)).join(", ");
}

// ---------------------------------------------------------------------------
// Message actions
// ---------------------------------------------------------------------------

function moveSelected(folder: "archive" | "trash") {
  const mail = selected.value;
  if (!mail) return;
  const index = visibleMails.value.findIndex((m) => m.id === mail.id);
  const remaining = visibleMails.value.filter((m) => m.id !== mail.id);
  mail.folder = folder;
  const next = remaining[index] ?? remaining[index - 1] ?? null;
  selectedId.value = next?.id ?? null;
  if (!next) mobileReading.value = false;
  toast.add({
    title: folder === "archive" ? "Conversation archived" : "Moved to Trash",
    description: mail.subject,
    icon: folder === "archive" ? "i-lucide-archive" : "i-lucide-trash-2",
    color: "neutral",
  });
}

function toggleUnread() {
  if (!selected.value) return;
  selected.value.unread = !selected.value.unread;
  toast.add({
    title: selected.value.unread ? "Marked as unread" : "Marked as read",
    icon: "i-lucide-mail",
    color: "neutral",
  });
}

const moreItems = computed<DropdownMenuItem[][]>(() => [
  [
    { label: "Reply all", icon: "i-lucide-reply-all" },
    { label: "Forward", icon: "i-lucide-forward" },
  ],
  [
    {
      label: selected.value?.starred ? "Remove star" : "Add star",
      icon: "i-lucide-star",
      onSelect: () => selected.value && toggleStar(selected.value),
    },
    { label: "Mute thread", icon: "i-lucide-bell-off" },
    { label: "Print", icon: "i-lucide-printer" },
  ],
  [
    {
      label: "Report spam",
      icon: "i-lucide-shield-alert",
      color: "error",
      onSelect: () =>
        toast.add({ title: "Reported as spam", icon: "i-lucide-shield-alert", color: "error" }),
    },
  ],
]);

// ---------------------------------------------------------------------------
// Reply
// ---------------------------------------------------------------------------

const replySchema = z.object({
  body: z.string().trim().min(1, "Write a message before sending"),
});
type ReplySchema = z.output<typeof replySchema>;

const replyState = reactive<Partial<ReplySchema>>({ body: "" });
const replyForm = useTemplateRef("replyForm");

// A draft belongs to one conversation: start fresh whenever the selection changes.
watch(selectedId, () => {
  replyState.body = "";
  replyForm.value?.clear();
});

function onReply(event: FormSubmitEvent<ReplySchema>) {
  const mail = selected.value;
  if (!mail) return;
  mails.value.push({
    id: `reply-${mails.value.length + 1}`,
    folder: "sent",
    from: me,
    to: [mail.from.name],
    subject: mail.subject.startsWith("Re:") ? mail.subject : `Re: ${mail.subject}`,
    body: [`Hi ${mail.from.name.split(" ")[0]},`, event.data.body],
    time: "Just now",
    date: "Just now",
    unread: false,
    starred: false,
    labels: [],
  });
  replyState.body = "";
  toast.add({
    title: "Reply sent",
    description: `Your reply to ${mail.from.name} is on its way.`,
    icon: "i-lucide-send",
    color: "success",
  });
}

// ---------------------------------------------------------------------------
// Compose
// ---------------------------------------------------------------------------

const composeOpen = ref(false);

const composeSchema = z.object({
  to: z.email("Enter a valid email address"),
  subject: z.string().trim().min(1, "Add a subject"),
  body: z.string().trim().min(1, "Write a message"),
});
type ComposeSchema = z.output<typeof composeSchema>;

const composeState = reactive<Partial<ComposeSchema>>({ to: "", subject: "", body: "" });

// Sending, Discard, the close button and Esc all close the modal; each starts the next message empty.
watch(composeOpen, (open) => {
  if (!open) Object.assign(composeState, { to: "", subject: "", body: "" });
});

function onCompose(event: FormSubmitEvent<ComposeSchema>) {
  composeOpen.value = false;
  toast.add({
    title: "Message sent",
    description: `“${event.data.subject}” was sent to ${event.data.to}.`,
    icon: "i-lucide-send",
    color: "success",
  });
}
</script>

<template>
  <UDashboardGroup>
    <!-- ================================================================= -->
    <!-- Sidebar: compose, folders, labels                                 -->
    <!-- ================================================================= -->
    <UDashboardSidebar
      id="inbox-sidebar"
      collapsible
      :ui="{ footer: 'border-t border-default' }"
      class="bg-elevated/50"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2 min-w-0" :class="{ 'mx-auto': collapsed }">
          <div class="size-7 rounded-(--ui-radius) bg-primary flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-mail" class="size-4 text-inverted" aria-hidden="true" />
          </div>
          <span v-if="!collapsed" class="font-bold text-(--ui-text-highlighted) truncate">
            Mailbox
          </span>
        </div>
      </template>

      <template #default="{ collapsed }">
        <UButton
          icon="i-lucide-pen-square"
          :label="collapsed ? undefined : 'Compose'"
          :square="collapsed"
          block
          aria-label="Compose new message"
          @click="composeOpen = true"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="folderItems"
          orientation="vertical"
          tooltip
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="labelItems"
          orientation="vertical"
          tooltip
        >
          <template #tag-leading="{ item }">
            <span class="size-5 flex items-center justify-center shrink-0" aria-hidden="true">
              <span class="size-2.5 rounded-full" :class="labelDot(item)" />
            </span>
          </template>
        </UNavigationMenu>

        <div
          v-if="!collapsed"
          class="mt-auto rounded-(--ui-radius) border border-default p-3 space-y-2"
        >
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-(--ui-text-highlighted)">Storage</span>
            <span class="text-(--ui-text-muted)">6.2 of 15 GB</span>
          </div>
          <UProgress :model-value="41" size="sm" aria-label="Storage used: 41%" />
        </div>
      </template>

      <template #footer="{ collapsed }">
        <UButton
          :avatar="{ alt: me.name }"
          :label="collapsed ? undefined : me.name"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
          :aria-label="collapsed ? me.name : undefined"
        />
      </template>
    </UDashboardSidebar>

    <!-- ================================================================= -->
    <!-- Mail list                                                         -->
    <!-- ================================================================= -->
    <UDashboardPanel
      id="inbox-list"
      :default-size="30"
      :min-size="24"
      :max-size="40"
      resizable
      :class="mobileReading ? 'hidden lg:flex' : ''"
      :ui="{ body: 'p-0 sm:p-0 gap-0 sm:gap-0' }"
    >
      <template #header>
        <UDashboardNavbar :title="listTitle">
          <template #trailing>
            <UBadge
              v-if="activeFolder === 'inbox' && !activeLabel && unreadCount"
              :label="`${unreadCount} new`"
              variant="subtle"
              size="sm"
            />
          </template>
          <template #right>
            <UTabs
              v-model="readFilter"
              :items="tabItems"
              :content="false"
              size="xs"
              aria-label="Filter messages"
            />
          </template>
        </UDashboardNavbar>

        <div class="px-4 sm:px-6 py-3 border-b border-default">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="Search mail…"
            class="w-full"
            aria-label="Search mail"
          />
        </div>
      </template>

      <template #body>
        <ul v-if="visibleMails.length" class="divide-y divide-(--ui-border)" aria-label="Messages">
          <li
            v-for="mail in visibleMails"
            :key="mail.id"
            class="relative flex gap-3 px-4 sm:px-6 py-3.5 border-s-2 transition-colors"
            :class="
              mail.id === selectedId
                ? 'border-primary bg-(--ui-bg-elevated)/60'
                : 'border-transparent hover:bg-(--ui-bg-elevated)/50'
            "
          >
            <UAvatar :alt="mail.from.name" size="md" />

            <button
              type="button"
              class="flex-1 min-w-0 text-start focus-visible:outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-primary"
              :aria-current="mail.id === selectedId ? 'true' : undefined"
              @click="openMail(mail)"
            >
              <span class="flex items-center gap-2">
                <span
                  v-if="mail.unread"
                  class="size-2 rounded-full bg-primary shrink-0"
                  aria-hidden="true"
                />
                <span
                  class="flex-1 truncate text-sm text-(--ui-text-highlighted)"
                  :class="mail.unread ? 'font-semibold' : 'font-medium'"
                >
                  {{ displayName(mail) }}
                </span>
                <span
                  class="text-xs shrink-0 pe-8"
                  :class="mail.unread ? 'text-primary font-semibold' : 'text-(--ui-text-muted)'"
                >
                  {{ mail.time }}
                </span>
              </span>
              <span
                class="block truncate text-sm mt-0.5"
                :class="mail.unread ? 'font-semibold text-(--ui-text-highlighted)' : 'text-(--ui-text-toned)'"
              >
                {{ mail.subject }}
              </span>
              <span class="block truncate text-sm text-(--ui-text-muted) mt-0.5">
                {{ preview(mail) }}
              </span>
              <span v-if="mail.labels.length || mail.attachment" class="flex items-center gap-1.5 mt-2">
                <UBadge
                  v-for="label in mail.labels"
                  :key="label"
                  :label="label"
                  color="neutral"
                  variant="outline"
                  size="sm"
                >
                  <template #leading>
                    <span class="size-1.5 rounded-full" :class="labelDotClass[labelColor(label)]" />
                  </template>
                </UBadge>
                <UIcon
                  v-if="mail.attachment"
                  name="i-lucide-paperclip"
                  class="size-3.5 text-(--ui-text-muted)"
                  aria-label="Has attachment"
                />
              </span>
              <span v-if="mail.unread" class="sr-only">(unread)</span>
            </button>

            <UButton
              icon="i-lucide-star"
              :color="mail.starred ? 'warning' : 'neutral'"
              variant="ghost"
              size="xs"
              class="absolute top-2.5 end-3 sm:end-4 z-[1]"
              :aria-label="mail.starred ? `Unstar ${mail.subject}` : `Star ${mail.subject}`"
              :aria-pressed="mail.starred"
              @click="toggleStar(mail)"
            />
          </li>
        </ul>

        <UEmpty
          v-else
          icon="i-lucide-inbox"
          :title="search ? 'No matching messages' : `${listTitle} is empty`"
          :description="search ? 'Try a different search term.' : 'Messages you move here will show up in this list.'"
          variant="naked"
          class="flex-1"
        />
      </template>
    </UDashboardPanel>

    <!-- ================================================================= -->
    <!-- Reading pane                                                      -->
    <!-- ================================================================= -->
    <UDashboardPanel
      id="inbox-mail"
      :class="mobileReading ? '' : 'hidden lg:flex'"
      :ui="{ body: 'gap-0 sm:gap-0' }"
    >
      <template #header>
        <UDashboardNavbar :toggle="false">
          <template #left>
            <UButton
              icon="i-lucide-arrow-left"
              color="neutral"
              variant="ghost"
              class="lg:hidden"
              aria-label="Back to message list"
              @click="mobileReading = false"
            />
            <span v-if="selected" class="hidden sm:block text-sm text-(--ui-text-muted) truncate">
              {{ selected.folder === "inbox" ? "Inbox" : folderTitles[selected.folder] }}
            </span>
          </template>

          <template v-if="selected" #right>
            <UTooltip text="Archive">
              <UButton
                icon="i-lucide-archive"
                color="neutral"
                variant="ghost"
                aria-label="Archive conversation"
                @click="moveSelected('archive')"
              />
            </UTooltip>
            <UTooltip text="Move to Trash">
              <UButton
                icon="i-lucide-trash-2"
                color="neutral"
                variant="ghost"
                aria-label="Move to Trash"
                @click="moveSelected('trash')"
              />
            </UTooltip>
            <UTooltip :text="selected.unread ? 'Mark as read' : 'Mark as unread'">
              <UButton
                :icon="selected.unread ? 'i-lucide-mail-open' : 'i-lucide-mail'"
                color="neutral"
                variant="ghost"
                :aria-label="selected.unread ? 'Mark as read' : 'Mark as unread'"
                @click="toggleUnread"
              />
            </UTooltip>
            <USeparator orientation="vertical" class="h-5 mx-1" />
            <UDropdownMenu :items="moreItems" :content="{ align: 'end' }">
              <UTooltip text="More actions">
                <UButton
                  icon="i-lucide-ellipsis-vertical"
                  color="neutral"
                  variant="ghost"
                  aria-label="More actions"
                />
              </UTooltip>
            </UDropdownMenu>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <template v-if="selected">
          <article class="flex-1 flex flex-col gap-6 max-w-3xl w-full mx-auto">
            <header class="space-y-4">
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-bold text-(--ui-text-highlighted) text-pretty me-auto">
                  {{ selected.subject }}
                </h2>
                <UBadge
                  v-for="label in selected.labels"
                  :key="label"
                  :label="label"
                  color="neutral"
                  variant="outline"
                >
                  <template #leading>
                    <span class="size-2 rounded-full" :class="labelDotClass[labelColor(label)]" />
                  </template>
                </UBadge>
              </div>

              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0 space-y-1">
                  <UUser
                    :name="selected.from.name"
                    :description="selected.from.email"
                    :avatar="{ alt: selected.from.name }"
                    size="lg"
                  />
                  <dl class="ps-11.5 text-sm text-(--ui-text-muted) space-y-0.5">
                    <div class="flex gap-1.5">
                      <dt class="font-medium text-(--ui-text-toned)">To</dt>
                      <dd class="truncate">{{ formatRecipients(selected.to) }}</dd>
                    </div>
                    <div v-if="selected.cc?.length" class="flex gap-1.5">
                      <dt class="font-medium text-(--ui-text-toned)">Cc</dt>
                      <dd class="truncate">{{ formatRecipients(selected.cc) }}</dd>
                    </div>
                  </dl>
                </div>
                <p class="text-sm text-(--ui-text-muted) shrink-0 hidden sm:block">
                  {{ selected.date }}
                </p>
              </div>
            </header>

            <USeparator />

            <div class="space-y-4 text-(--ui-text-toned) leading-relaxed">
              <p v-for="(paragraph, i) in selected.body" :key="i" class="whitespace-pre-line">
                {{ paragraph }}
              </p>
            </div>

            <div v-if="selected.attachment" class="space-y-2">
              <h3 class="text-sm font-medium text-(--ui-text-highlighted)">1 attachment</h3>
              <div
                class="flex items-center gap-3 w-full sm:w-80 rounded-(--ui-radius) border border-default bg-(--ui-bg-elevated)/50 p-2.5"
              >
                <div class="size-10 rounded-(--ui-radius) bg-primary/10 flex items-center justify-center shrink-0">
                  <UIcon :name="selected.attachment.icon" class="size-5 text-primary" aria-hidden="true" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-(--ui-text-highlighted) truncate">
                    {{ selected.attachment.name }}
                  </p>
                  <p class="text-xs text-(--ui-text-muted)">{{ selected.attachment.size }}</p>
                </div>
                <UTooltip text="Download">
                  <UButton
                    icon="i-lucide-download"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    :aria-label="`Download ${selected.attachment.name}`"
                  />
                </UTooltip>
              </div>
            </div>
          </article>

          <!-- Reply box -->
          <UForm
            ref="replyForm"
            :schema="replySchema"
            :state="replyState"
            class="sticky bottom-0 max-w-3xl w-full mx-auto pt-6 bg-(--ui-bg)"
            @submit="onReply"
          >
            <div class="rounded-(--ui-radius) border border-default bg-(--ui-bg) shadow-sm">
              <UFormField
                name="body"
                :label="`Reply to ${selected.from.name}`"
                :ui="{ label: 'sr-only', error: 'px-3 pb-2' }"
              >
                <UTextarea
                  v-model="replyState.body"
                  :placeholder="`Reply to ${selected.from.name}…`"
                  :rows="3"
                  autoresize
                  :maxrows="8"
                  variant="none"
                  class="w-full"
                  :ui="{ base: 'px-3 pt-3' }"
                />
              </UFormField>
              <div class="flex items-center justify-between gap-2 px-2 pb-2">
                <div class="flex items-center gap-0.5">
                  <UTooltip text="Attach file">
                    <UButton icon="i-lucide-paperclip" color="neutral" variant="ghost" size="sm" aria-label="Attach file" />
                  </UTooltip>
                  <UTooltip text="Insert emoji">
                    <UButton icon="i-lucide-smile" color="neutral" variant="ghost" size="sm" aria-label="Insert emoji" />
                  </UTooltip>
                </div>
                <UButton type="submit" label="Send" trailing-icon="i-lucide-send" size="sm" />
              </div>
            </div>
          </UForm>
        </template>

        <UEmpty
          v-else
          icon="i-lucide-mail-open"
          title="No message selected"
          description="Choose a conversation from the list to read it here."
          variant="naked"
          class="flex-1"
        />
      </template>
    </UDashboardPanel>

    <!-- ================================================================= -->
    <!-- Compose modal                                                     -->
    <!-- ================================================================= -->
    <UModal v-model:open="composeOpen" title="New message" description="Send an email from jordan@example.com.">
      <template #body>
        <UForm
          id="compose-form"
          :schema="composeSchema"
          :state="composeState"
          class="space-y-4"
          @submit="onCompose"
        >
          <UFormField label="To" name="to" required>
            <UInput v-model="composeState.to" type="email" placeholder="name@example.com" class="w-full" />
          </UFormField>
          <UFormField label="Subject" name="subject" required>
            <UInput v-model="composeState.subject" class="w-full" />
          </UFormField>
          <UFormField label="Message" name="body" required>
            <UTextarea v-model="composeState.body" :rows="6" class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2 w-full">
          <UButton label="Discard" color="neutral" variant="ghost" @click="composeOpen = false" />
          <UButton type="submit" form="compose-form" label="Send" trailing-icon="i-lucide-send" />
        </div>
      </template>
    </UModal>
  </UDashboardGroup>
</template>
