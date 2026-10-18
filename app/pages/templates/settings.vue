<script setup lang="ts">
import { h, resolveComponent } from "vue";
import * as z from "zod";
import type {
  FormSubmitEvent,
  NavigationMenuItem,
  RadioGroupItem,
  TableColumn,
} from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const toast = useToast();

type Section = "general" | "notifications" | "security" | "billing";

type Invoice = {
  id: string;
  date: string;
  plan: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded" | "Failed";
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

const activeSection = ref<Section>("general");

const sideNavItems: NavigationMenuItem[][] = [
  [
    { label: "Home", icon: "i-lucide-house" },
    { label: "Inbox", icon: "i-lucide-inbox", badge: "4" },
    { label: "Projects", icon: "i-lucide-folder-kanban" },
    { label: "Team", icon: "i-lucide-users" },
    { label: "Settings", icon: "i-lucide-settings", active: true },
  ],
  [
    { label: "Help & Support", icon: "i-lucide-life-buoy" },
    { label: "Changelog", icon: "i-lucide-megaphone" },
  ],
];

const sections: { label: string; icon: string; value: Section }[] = [
  { label: "General", icon: "i-lucide-user", value: "general" },
  { label: "Notifications", icon: "i-lucide-bell", value: "notifications" },
  { label: "Security", icon: "i-lucide-shield", value: "security" },
  { label: "Billing", icon: "i-lucide-credit-card", value: "billing" },
];

const sectionNavItems = computed<NavigationMenuItem[]>(() =>
  sections.map((section) => ({
    label: section.label,
    icon: section.icon,
    active: activeSection.value === section.value,
    onSelect: () => {
      activeSection.value = section.value;
    },
  })),
);

// Two-column form row: label + description on the left, control on the right
const fieldUi = {
  root: "grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] sm:gap-8",
  container: "mt-0",
};

// ---------------------------------------------------------------------------
// General — profile form
// ---------------------------------------------------------------------------

const profileSchema = z.object({
  name: z.string("Name is required").min(2, "Name is too short"),
  email: z.string("Email is required").email("Please enter a valid email"),
  username: z
    .string("Username is required")
    .min(3, "At least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and dashes only"),
  bio: z.string().max(240, "Keep it under 240 characters").optional(),
  timezone: z.string("Pick a timezone"),
});
type ProfileSchema = z.output<typeof profileSchema>;

const profile = reactive<Partial<ProfileSchema>>({
  name: "Olivia Martin",
  email: "olivia@acme.app",
  username: "olivia",
  bio: "Product designer working on design systems and developer tooling.",
  timezone: "europe-london",
});

const avatarFile = ref<File | null>(null);

const timezones = [
  { label: "Pacific Time (UTC−08:00)", value: "america-los-angeles" },
  { label: "Eastern Time (UTC−05:00)", value: "america-new-york" },
  { label: "London (UTC+00:00)", value: "europe-london" },
  { label: "Paris (UTC+01:00)", value: "europe-paris" },
  { label: "Dubai (UTC+04:00)", value: "asia-dubai" },
  { label: "Tokyo (UTC+09:00)", value: "asia-tokyo" },
  { label: "Sydney (UTC+10:00)", value: "australia-sydney" },
];

const savingProfile = ref(false);

async function onProfileSubmit(event: FormSubmitEvent<ProfileSchema>) {
  savingProfile.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  savingProfile.value = false;
  toast.add({
    title: "Profile updated",
    description: `Changes to ${event.data.name}'s profile were saved.`,
    icon: "i-lucide-check-circle",
    color: "success",
  });
}

function createObjectUrl(file: File) {
  return URL.createObjectURL(file);
}

// Danger zone
const deleteOpen = ref(false);
const deleteConfirm = ref("");

function onDeleteAccount() {
  deleteOpen.value = false;
  deleteConfirm.value = "";
  toast.add({
    title: "Account scheduled for deletion",
    description: "We've emailed you a link to cancel within 14 days.",
    icon: "i-lucide-trash-2",
    color: "error",
  });
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

const notificationGroups = reactive([
  {
    title: "Email",
    description: "Where we reach you when you're away from the app.",
    items: [
      {
        key: "mentions",
        label: "Mentions & replies",
        description: "When someone @mentions you or replies to your comment.",
        enabled: true,
      },
      {
        key: "assignments",
        label: "Task assignments",
        description: "When a task is assigned to you or its due date changes.",
        enabled: true,
      },
      {
        key: "product",
        label: "Product updates",
        description: "New features, improvements, and occasional tips.",
        enabled: false,
      },
    ],
  },
  {
    title: "Push & desktop",
    description: "Real-time alerts on your devices.",
    items: [
      {
        key: "direct",
        label: "Direct messages",
        description: "Show a notification for every new direct message.",
        enabled: true,
      },
      {
        key: "deploys",
        label: "Deploy status",
        description: "When a deployment you started succeeds or fails.",
        enabled: true,
      },
      {
        key: "sound",
        label: "Play a sound",
        description: "Use a short chime for incoming notifications.",
        enabled: false,
      },
    ],
  },
]);

const digestOptions: RadioGroupItem[] = [
  {
    label: "Daily",
    description: "A summary every morning at 9:00.",
    value: "daily",
  },
  {
    label: "Weekly",
    description: "One roundup every Monday.",
    value: "weekly",
  },
  {
    label: "Never",
    description: "Only send the alerts above.",
    value: "never",
  },
];
const digestFrequency = ref("weekly");

const digestTopics = reactive([
  { key: "activity", label: "Project activity", checked: true },
  { key: "comments", label: "Unread comments", checked: true },
  { key: "team", label: "New team members", checked: false },
  { key: "usage", label: "Usage & limits", checked: true },
]);

function onSaveNotifications() {
  toast.add({
    title: "Preferences saved",
    description: "Your notification settings are up to date.",
    icon: "i-lucide-bell",
    color: "success",
  });
}

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

const passwordSchema = z
  .object({
    current: z.string("Enter your current password").min(1),
    password: z
      .string("Enter a new password")
      .min(8, "Must be at least 8 characters"),
    confirm: z.string("Confirm your new password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
type PasswordSchema = z.output<typeof passwordSchema>;

const passwordState = reactive<Partial<PasswordSchema>>({
  current: undefined,
  password: undefined,
  confirm: undefined,
});

function onPasswordSubmit() {
  passwordState.current = undefined;
  passwordState.password = undefined;
  passwordState.confirm = undefined;
  toast.add({
    title: "Password changed",
    description: "Other sessions will be asked to sign in again.",
    icon: "i-lucide-key-round",
    color: "success",
  });
}

const twoFactor = ref(true);
const loginAlerts = ref(true);

const sessions = ref([
  {
    id: "s1",
    device: "MacBook Pro · Chrome",
    icon: "i-lucide-laptop",
    location: "London, United Kingdom",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "s2",
    device: "iPhone 16 · Safari",
    icon: "i-lucide-smartphone",
    location: "London, United Kingdom",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "s3",
    device: "Windows PC · Firefox",
    icon: "i-lucide-monitor",
    location: "Berlin, Germany",
    lastActive: "3 days ago",
    current: false,
  },
  {
    id: "s4",
    device: "iPad Air · Acme app",
    icon: "i-lucide-tablet",
    location: "Lisbon, Portugal",
    lastActive: "2 weeks ago",
    current: false,
  },
]);

function revokeSession(id: string) {
  const session = sessions.value.find((s) => s.id === id);
  sessions.value = sessions.value.filter((s) => s.id !== id);
  toast.add({
    title: "Session revoked",
    description: `${session?.device} has been signed out.`,
    icon: "i-lucide-log-out",
  });
}

function revokeAllSessions() {
  sessions.value = sessions.value.filter((s) => s.current);
  toast.add({
    title: "Signed out everywhere else",
    description: "Only this device remains signed in.",
    icon: "i-lucide-log-out",
  });
}

// ---------------------------------------------------------------------------
// Billing
// ---------------------------------------------------------------------------

const usageMeters = [
  { label: "Projects", used: 8, limit: 10, unit: "" },
  { label: "Storage", used: 32, limit: 100, unit: " GB" },
  { label: "Team seats", used: 5, limit: 5, unit: "" },
];

function meterColor(used: number, limit: number) {
  const pct = used / limit;
  if (pct >= 1) return "error";
  if (pct >= 0.75) return "warning";
  return "primary";
}

const invoices: Invoice[] = [
  {
    id: "INV-2026-010",
    date: "Oct 1, 2026",
    plan: "Pro · Monthly",
    amount: "$29.00",
    status: "Pending",
  },
  {
    id: "INV-2026-009",
    date: "Sep 1, 2026",
    plan: "Pro · Monthly",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-2026-008",
    date: "Aug 1, 2026",
    plan: "Pro · Monthly",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-2026-007",
    date: "Jul 1, 2026",
    plan: "Team seat add-on",
    amount: "$12.00",
    status: "Refunded",
  },
  {
    id: "INV-2026-006",
    date: "Jun 1, 2026",
    plan: "Pro · Monthly",
    amount: "$29.00",
    status: "Failed",
  },
];

// Neutral badges keep text readable; the colored icon carries the status hue
const invoiceStatus = {
  Paid: { icon: "i-lucide-circle-check", iconClass: "text-(--ui-success)" },
  Pending: { icon: "i-lucide-clock", iconClass: "text-(--ui-warning)" },
  Refunded: { icon: "i-lucide-undo-2", iconClass: "text-(--ui-text-muted)" },
  Failed: { icon: "i-lucide-circle-x", iconClass: "text-(--ui-error)" },
};

const invoiceColumns: TableColumn<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice",
    cell: ({ row }) =>
      h(
        "span",
        { class: "font-medium text-(--ui-text-highlighted)" },
        row.original.id,
      ),
  },
  {
    accessorKey: "date",
    header: "Date",
    meta: { class: { th: "max-sm:hidden", td: "max-sm:hidden" } },
  },
  {
    accessorKey: "plan",
    header: "Description",
    meta: { class: { th: "max-lg:hidden", td: "max-lg:hidden" } },
  },
  { accessorKey: "amount", header: "Amount" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      h(UBadge, {
        label: row.original.status,
        icon: invoiceStatus[row.original.status].icon,
        color: "neutral",
        variant: "outline",
        ui: { leadingIcon: invoiceStatus[row.original.status].iconClass },
      }),
  },
  {
    id: "actions",
    header: () => h("span", { class: "sr-only" }, "Actions"),
    cell: ({ row }) =>
      h("div", { class: "text-right" }, [
        h(UButton, {
          icon: "i-lucide-download",
          color: "neutral",
          variant: "ghost",
          size: "sm",
          "aria-label": `Download ${row.original.id}`,
          onClick: () =>
            toast.add({
              title: "Download started",
              description: `${row.original.id}.pdf`,
              icon: "i-lucide-file-down",
            }),
        }),
      ]),
  },
];
</script>

<template>
  <UDashboardGroup>
    <!-- ================================================================= -->
    <!-- Sidebar                                                           -->
    <!-- ================================================================= -->
    <UDashboardSidebar
      id="settings-sidebar"
      collapsible
      :ui="{ footer: 'border-t border-(--ui-border)' }"
      class="bg-(--ui-bg-elevated)/50"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2 min-w-0">
          <div
            class="size-7 rounded-(--ui-radius) bg-(--ui-primary) flex items-center justify-center shrink-0"
            :class="collapsed ? 'mx-auto' : ''"
          >
            <UIcon
              name="i-lucide-hexagon"
              class="size-4 text-(--ui-bg)"
              aria-hidden="true"
            />
          </div>
          <span
            v-if="!collapsed"
            class="font-bold text-(--ui-text-highlighted) truncate"
          >
            Acme
          </span>
        </div>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="sideNavItems[0]"
          orientation="vertical"
        />
        <UNavigationMenu
          :collapsed="collapsed"
          :items="sideNavItems[1]"
          orientation="vertical"
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          :avatar="{ alt: 'Olivia Martin' }"
          :label="collapsed ? undefined : 'Olivia Martin'"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
        />
      </template>
    </UDashboardSidebar>

    <!-- ================================================================= -->
    <!-- Main panel                                                        -->
    <!-- ================================================================= -->
    <UDashboardPanel id="settings-main">
      <template #header>
        <UDashboardNavbar title="Settings" icon="i-lucide-settings">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
          <template #right>
            <UButton
              label="Docs"
              icon="i-lucide-book-open"
              color="neutral"
              variant="ghost"
              size="sm"
              class="hidden sm:inline-flex"
            />
          </template>
        </UDashboardNavbar>

        <UDashboardToolbar>
          <UNavigationMenu
            :items="sectionNavItems"
            highlight
            class="-mx-1 flex-1 overflow-x-auto"
            :ui="{
              item: 'shrink-0',
              linkLabel: 'overflow-visible',
              linkLeadingIcon: 'max-sm:hidden',
            }"
            aria-label="Settings sections"
          />
        </UDashboardToolbar>
      </template>

      <template #body>
        <div class="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-8">
          <!-- ============================================================ -->
          <!-- General                                                      -->
          <!-- ============================================================ -->
          <template v-if="activeSection === 'general'">
            <UForm
              :schema="profileSchema"
              :state="profile"
              class="flex flex-col gap-4"
              @submit="onProfileSubmit"
            >
              <div class="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2
                    class="text-lg font-semibold text-(--ui-text-highlighted)"
                  >
                    Profile
                  </h2>
                  <p class="text-sm text-(--ui-text-muted)">
                    This information is shown publicly on your profile page.
                  </p>
                </div>
                <UButton
                  type="submit"
                  label="Save changes"
                  icon="i-lucide-save"
                  :loading="savingProfile"
                />
              </div>

              <UPageCard variant="subtle">
                <UFormField
                  name="name"
                  label="Full name"
                  description="Your name as it appears to teammates."
                  required
                  :ui="fieldUi"
                >
                  <UInput v-model="profile.name" class="w-full" />
                </UFormField>
                <USeparator />
                <UFormField
                  name="email"
                  label="Email"
                  description="Used for sign-in and notifications."
                  required
                  :ui="fieldUi"
                >
                  <UInput
                    v-model="profile.email"
                    type="email"
                    icon="i-lucide-mail"
                    class="w-full"
                  />
                </UFormField>
                <USeparator />
                <UFormField
                  name="username"
                  label="Username"
                  description="Your unique profile URL."
                  required
                  :ui="fieldUi"
                >
                  <UInput
                    v-model="profile.username"
                    class="w-full"
                    :ui="{ base: 'ps-[5.25rem]', leading: 'pointer-events-none' }"
                  >
                    <template #leading>
                      <span class="text-sm text-(--ui-text-muted)">
                        acme.app/
                      </span>
                    </template>
                  </UInput>
                </UFormField>
                <USeparator />
                <UFormField
                  name="avatar"
                  label="Avatar"
                  description="JPG, PNG or GIF. 1 MB max."
                  :ui="fieldUi"
                >
                  <UFileUpload
                    v-slot="{ open, removeFile }"
                    v-model="avatarFile"
                    accept="image/*"
                  >
                    <div class="flex flex-wrap items-center gap-3">
                      <UAvatar
                        size="xl"
                        alt="Olivia Martin"
                        :src="avatarFile ? createObjectUrl(avatarFile) : undefined"
                      />
                      <UButton
                        :label="avatarFile ? 'Change' : 'Upload'"
                        icon="i-lucide-upload"
                        color="neutral"
                        variant="outline"
                        size="sm"
                        @click="open()"
                      />
                      <UButton
                        v-if="avatarFile"
                        label="Remove"
                        color="error"
                        variant="ghost"
                        size="sm"
                        @click="removeFile()"
                      />
                    </div>
                  </UFileUpload>
                </UFormField>
                <USeparator />
                <UFormField
                  name="timezone"
                  label="Timezone"
                  description="Used for due dates and digest emails."
                  :ui="fieldUi"
                >
                  <USelectMenu
                    v-model="profile.timezone"
                    :items="timezones"
                    value-key="value"
                    icon="i-lucide-globe"
                    class="w-full"
                  />
                </UFormField>
                <USeparator />
                <UFormField
                  name="bio"
                  label="Bio"
                  description="A few words about you. Markdown is supported."
                  :hint="`${profile.bio?.length ?? 0}/240`"
                  :ui="fieldUi"
                >
                  <UTextarea
                    v-model="profile.bio"
                    :rows="4"
                    autoresize
                    class="w-full"
                  />
                </UFormField>
              </UPageCard>
            </UForm>

            <!-- Danger zone -->
            <UPageCard
              title="Danger zone"
              description="Permanently delete your account and all of its projects, files, and invoices. This cannot be undone."
              variant="subtle"
              highlight
              highlight-color="error"
              orientation="horizontal"
              :ui="{ container: 'lg:grid-cols-[1fr_auto]' }"
            >
              <UButton
                label="Delete account"
                icon="i-lucide-trash-2"
                color="error"
                class="justify-self-start lg:justify-self-end"
                @click="deleteOpen = true"
              />
            </UPageCard>

            <UModal
              v-model:open="deleteOpen"
              title="Delete your account?"
              description="All projects, files, and billing history will be permanently removed."
            >
              <template #body>
                <UAlert
                  color="neutral"
                  variant="subtle"
                  icon="i-lucide-triangle-alert"
                  :ui="{ icon: 'text-(--ui-error)' }"
                  title="This action is irreversible"
                  description="Your team will lose access to shared projects owned by you."
                  class="mb-4"
                />
                <UFormField
                  label="Type DELETE to confirm"
                  name="confirm-delete"
                >
                  <UInput
                    v-model="deleteConfirm"
                    placeholder="DELETE"
                    class="w-full"
                  />
                </UFormField>
              </template>
              <template #footer="{ close }">
                <div class="flex w-full justify-end gap-2">
                  <UButton
                    label="Cancel"
                    color="neutral"
                    variant="outline"
                    @click="close"
                  />
                  <UButton
                    label="Delete account"
                    color="error"
                    :disabled="deleteConfirm !== 'DELETE'"
                    @click="onDeleteAccount"
                  />
                </div>
              </template>
            </UModal>
          </template>

          <!-- ============================================================ -->
          <!-- Notifications                                                -->
          <!-- ============================================================ -->
          <template v-else-if="activeSection === 'notifications'">
            <div class="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
                  Notifications
                </h2>
                <p class="text-sm text-(--ui-text-muted)">
                  Choose what you hear about and how often.
                </p>
              </div>
              <UButton
                label="Save preferences"
                icon="i-lucide-save"
                @click="onSaveNotifications"
              />
            </div>

            <UPageCard
              v-for="group in notificationGroups"
              :key="group.title"
              :title="group.title"
              :description="group.description"
              variant="subtle"
            >
              <div class="divide-y divide-(--ui-border)">
                <UFormField
                  v-for="item in group.items"
                  :key="item.key"
                  :name="item.key"
                  :label="item.label"
                  :description="item.description"
                  class="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <USwitch v-model="item.enabled" :aria-label="item.label" />
                </UFormField>
              </div>
            </UPageCard>

            <UPageCard
              title="Email digest"
              description="A periodic summary of what happened while you were away."
              variant="subtle"
            >
              <URadioGroup
                v-model="digestFrequency"
                :items="digestOptions"
                legend="Digest frequency"
                variant="card"
                orientation="horizontal"
                :ui="{ fieldset: 'grid sm:grid-cols-3 gap-3', item: 'w-full' }"
              />
              <USeparator />
              <fieldset :disabled="digestFrequency === 'never'">
                <legend
                  class="text-sm font-medium text-(--ui-text-highlighted) mb-3"
                >
                  Include in digest
                </legend>
                <div class="grid sm:grid-cols-2 gap-3">
                  <UCheckbox
                    v-for="topic in digestTopics"
                    :key="topic.key"
                    v-model="topic.checked"
                    :label="topic.label"
                    :disabled="digestFrequency === 'never'"
                  />
                </div>
              </fieldset>
            </UPageCard>
          </template>

          <!-- ============================================================ -->
          <!-- Security                                                     -->
          <!-- ============================================================ -->
          <template v-else-if="activeSection === 'security'">
            <div>
              <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
                Security
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                Keep your account safe with a strong password and 2FA.
              </p>
            </div>

            <UPageCard
              title="Change password"
              description="Use at least 8 characters, including a number or symbol."
              variant="subtle"
            >
              <UForm
                :schema="passwordSchema"
                :state="passwordState"
                class="grid gap-4 sm:grid-cols-2"
                @submit="onPasswordSubmit"
              >
                <UFormField
                  name="current"
                  label="Current password"
                  class="sm:col-span-2"
                >
                  <UInput
                    v-model="passwordState.current"
                    type="password"
                    autocomplete="current-password"
                    class="w-full sm:max-w-sm"
                  />
                </UFormField>
                <UFormField name="password" label="New password">
                  <UInput
                    v-model="passwordState.password"
                    type="password"
                    autocomplete="new-password"
                    class="w-full"
                  />
                </UFormField>
                <UFormField name="confirm" label="Confirm new password">
                  <UInput
                    v-model="passwordState.confirm"
                    type="password"
                    autocomplete="new-password"
                    class="w-full"
                  />
                </UFormField>
                <div class="sm:col-span-2">
                  <UButton type="submit" label="Update password" />
                </div>
              </UForm>
            </UPageCard>

            <UPageCard
              title="Sign-in protection"
              description="Extra checks when someone signs in to your account."
              variant="subtle"
            >
              <div class="divide-y divide-(--ui-border)">
                <UFormField
                  name="two-factor"
                  label="Two-factor authentication"
                  description="Require a code from your authenticator app at sign-in."
                  class="flex items-center justify-between gap-4 pb-3"
                >
                  <div class="flex items-center gap-3">
                    <UBadge
                      :label="twoFactor ? 'Enabled' : 'Off'"
                      :icon="twoFactor ? 'i-lucide-shield-check' : 'i-lucide-shield-off'"
                      color="neutral"
                      variant="outline"
                      :ui="{
                        leadingIcon: twoFactor
                          ? 'text-(--ui-success)'
                          : 'text-(--ui-text-muted)',
                      }"
                      class="hidden sm:inline-flex"
                    />
                    <USwitch
                      v-model="twoFactor"
                      aria-label="Two-factor authentication"
                    />
                  </div>
                </UFormField>
                <UFormField
                  name="login-alerts"
                  label="New sign-in alerts"
                  description="Email me when my account is accessed from a new device."
                  class="flex items-center justify-between gap-4 pt-3"
                >
                  <USwitch v-model="loginAlerts" aria-label="New sign-in alerts" />
                </UFormField>
              </div>
            </UPageCard>

            <UPageCard variant="subtle" :ui="{ container: 'min-w-0' }">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="font-semibold text-(--ui-text-highlighted)">
                    Active sessions
                  </h3>
                  <p class="text-sm text-(--ui-text-muted)">
                    Devices currently signed in to your account.
                  </p>
                </div>
                <UButton
                  label="Sign out all others"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  :disabled="sessions.length <= 1"
                  @click="revokeAllSessions"
                />
              </div>
              <ul class="divide-y divide-(--ui-border)">
                <li
                  v-for="session in sessions"
                  :key="session.id"
                  class="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div
                    class="size-10 rounded-(--ui-radius) bg-(--ui-bg-accented) flex items-center justify-center shrink-0"
                  >
                    <UIcon
                      :name="session.icon"
                      class="size-5 text-(--ui-text-muted)"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p
                      class="text-sm font-medium text-(--ui-text-highlighted) truncate"
                    >
                      {{ session.device }}
                      <UBadge
                        v-if="session.current"
                        label="This device"
                        color="primary"
                        variant="subtle"
                        size="sm"
                        class="ms-1 align-middle"
                      />
                    </p>
                    <p class="text-xs text-(--ui-text-muted) truncate">
                      {{ session.location }} · {{ session.lastActive }}
                    </p>
                  </div>
                  <UButton
                    v-if="!session.current"
                    label="Revoke"
                    icon="i-lucide-log-out"
                    color="neutral"
                    variant="outline"
                    size="sm"
                    :aria-label="`Revoke ${session.device}`"
                    @click="revokeSession(session.id)"
                  />
                </li>
              </ul>
            </UPageCard>
          </template>

          <!-- ============================================================ -->
          <!-- Billing                                                      -->
          <!-- ============================================================ -->
          <template v-else>
            <div>
              <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
                Billing
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                Manage your plan, payment method, and invoices.
              </p>
            </div>

            <div class="grid gap-4 lg:grid-cols-3">
              <!-- Current plan -->
              <UPageCard
                variant="subtle"
                highlight
                class="lg:col-span-2"
                :ui="{ container: 'gap-y-5' }"
              >
                <div class="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <h3
                        class="text-lg font-semibold text-(--ui-text-highlighted)"
                      >
                        Pro plan
                      </h3>
                      <UBadge label="Current" color="primary" variant="subtle" />
                    </div>
                    <p class="text-sm text-(--ui-text-muted)">
                      Renews on November 1, 2026
                    </p>
                  </div>
                  <p class="text-(--ui-text-muted)">
                    <span
                      class="text-3xl font-bold text-(--ui-text-highlighted)"
                    >
                      $29
                    </span>
                    / month
                  </p>
                </div>

                <div class="grid gap-x-6 gap-y-4 sm:grid-cols-3">
                  <div
                    v-for="meter in usageMeters"
                    :key="meter.label"
                    class="space-y-2"
                  >
                    <div class="flex items-baseline justify-between text-sm">
                      <span class="text-(--ui-text)">{{ meter.label }}</span>
                      <span class="text-(--ui-text-muted)">
                        {{ meter.used }}{{ meter.unit }} / {{ meter.limit
                        }}{{ meter.unit }}
                      </span>
                    </div>
                    <UProgress
                      :model-value="(meter.used / meter.limit) * 100"
                      :color="meterColor(meter.used, meter.limit)"
                      size="sm"
                      :aria-label="`${meter.label} usage`"
                    />
                  </div>
                </div>

                <div class="flex flex-wrap gap-2">
                  <UButton label="Upgrade to Team" icon="i-lucide-sparkles" />
                  <UButton
                    label="Cancel plan"
                    color="neutral"
                    variant="ghost"
                  />
                </div>
              </UPageCard>

              <!-- Payment method -->
              <UPageCard
                title="Payment method"
                description="Charged automatically each month."
                variant="subtle"
              >
                <div
                  class="flex items-center gap-3 rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg) p-3"
                >
                  <div
                    class="h-8 w-12 rounded-sm bg-(--ui-bg-accented) flex items-center justify-center shrink-0"
                  >
                    <UIcon
                      name="i-simple-icons-visa"
                      class="size-6 text-(--ui-text-highlighted)"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-(--ui-text-highlighted)">
                      Visa ending 4242
                    </p>
                    <p class="text-xs text-(--ui-text-muted)">Expires 08/28</p>
                  </div>
                </div>
                <UButton
                  label="Update card"
                  icon="i-lucide-pencil"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  class="self-start"
                />
              </UPageCard>
            </div>

            <!-- Invoices -->
            <UCard :ui="{ body: 'p-0 sm:p-0' }">
              <template #header>
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <h3 class="font-semibold text-(--ui-text-highlighted)">
                      Invoices
                    </h3>
                    <p class="text-sm text-(--ui-text-muted)">
                      Download receipts for your records.
                    </p>
                  </div>
                  <UButton
                    label="Export all"
                    icon="i-lucide-download"
                    color="neutral"
                    variant="outline"
                    size="sm"
                  />
                </div>
              </template>
              <UTable :data="invoices" :columns="invoiceColumns" />
            </UCard>
          </template>
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
