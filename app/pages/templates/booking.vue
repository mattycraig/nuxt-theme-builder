<script setup lang="ts">
import * as z from "zod";
import {
  CalendarDate,
  DateFormatter,
  isSameDay,
  isSameMonth,
  isWeekend,
  type DateValue,
} from "@internationalized/date";
import type { FormSubmitEvent, SelectMenuItem } from "@nuxt/ui";

const toast = useToast();

// ---------- Host & event ----------
const host = {
  name: "Maya Patel",
  role: "Product Designer",
  timezone: "America/New_York",
};

const event = {
  title: "30 min intro call",
  duration: 30,
  location: "Google Meet",
  locationIcon: "i-simple-icons-googlemeet",
  description:
    "A relaxed first conversation to talk through your project, goals, and timeline, and to see whether we're a good fit. No prep needed, just bring your questions.",
};

// ---------- Dates ----------
// A fixed "today" keeps the demo deterministic (SSR and client render the same month).
const TODAY = new CalendarDate(2026, 11, 9);
const LAST_BOOKABLE = TODAY.add({ weeks: 8 });
const FULLY_BOOKED = [
  new CalendarDate(2026, 11, 13),
  new CalendarDate(2026, 11, 26),
  new CalendarDate(2026, 11, 27),
  new CalendarDate(2026, 12, 24),
  new CalendarDate(2026, 12, 25),
];

const LOCALE = "en-US";


function isDateUnavailable(date: DateValue) {
  return FULLY_BOOKED.some((booked) => isSameDay(booked, date));
}

const longDate = new DateFormatter(LOCALE, {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const shortWeekday = new DateFormatter(LOCALE, {
  weekday: "short",
  timeZone: "UTC",
});

function formatLongDate(date: DateValue) {
  return longDate.format(date.toDate("UTC"));
}

const selectedDate = shallowRef<DateValue | undefined>(
  new CalendarDate(2026, 11, 11),
);
const calendarMonth = shallowRef<DateValue>(TODAY);

function isClosed(date: DateValue) {
  return date.compare(TODAY) < 0 || isWeekend(date, LOCALE);
}

// Days spilling over from the adjacent months are shown but not selectable.
function isDateDisabled(date: DateValue) {
  return isClosed(date) || !isSameMonth(date, calendarMonth.value);
}

// ---------- Time zones ----------
const timezones = [
  { label: "Eastern Time (New York)", value: "America/New_York", offset: 0 },
  { label: "Central Time (Chicago)", value: "America/Chicago", offset: -1 },
  { label: "Mountain Time (Denver)", value: "America/Denver", offset: -2 },
  { label: "Pacific Time (Los Angeles)", value: "America/Los_Angeles", offset: -3 },
  { label: "Greenwich Mean Time (London)", value: "Europe/London", offset: 5 },
  { label: "Central European Time (Berlin)", value: "Europe/Berlin", offset: 6 },
] satisfies SelectMenuItem[];

const timezone = ref(host.timezone);
const activeTimezone = computed(
  () => timezones.find((tz) => tz.value === timezone.value) ?? timezones[0]!,
);

// ---------- Time slots ----------
const timeFormat = ref<"12h" | "24h">("12h");

// Host working hours: 9:00–17:00 in 30-minute increments (minutes after midnight).
const HOST_SLOTS = Array.from({ length: 16 }, (_, i) => 9 * 60 + i * 30);

function formatTime(minutes: number) {
  const total = (minutes + activeTimezone.value.offset * 60 + 24 * 60) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = String(total % 60).padStart(2, "0");
  if (timeFormat.value === "24h") return `${String(h).padStart(2, "0")}:${m}`;
  return `${h % 12 || 12}:${m}${h < 12 ? "am" : "pm"}`;
}

const slots = computed(() => {
  const date = selectedDate.value;
  if (!date || isClosed(date) || isDateUnavailable(date)) return [];
  // Deterministically mark some slots as already booked.
  return HOST_SLOTS.filter((_, i) => (date.day * 7 + i * 3) % 5 !== 0);
});

const selectedSlot = ref<number | null>(null);

watch(selectedDate, () => {
  selectedSlot.value = null;
});

const selectedDateLabel = computed(() =>
  selectedDate.value ? formatLongDate(selectedDate.value) : "",
);
const selectedDayHeading = computed(() => {
  const date = selectedDate.value;
  if (!date) return "";
  return `${shortWeekday.format(date.toDate("UTC"))} ${date.day}`;
});
const selectedTimeRange = computed(() =>
  selectedSlot.value === null
    ? ""
    : `${formatTime(selectedSlot.value)} – ${formatTime(selectedSlot.value + event.duration)}`,
);

// ---------- Steps ----------
type Step = "select" | "details" | "confirmed";
const step = ref<Step>("select");

function goToDetails() {
  if (selectedSlot.value !== null) step.value = "details";
}

// ---------- Details form ----------
const schema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string("Email is required").email("Please enter a valid email"),
  notes: z.string().max(500, "Keep notes under 500 characters").optional(),
  guests: z
    .array(z.string())
    .max(5, "You can invite up to 5 guests")
    .refine(
      (emails) => emails.every((e) => z.string().email().safeParse(e).success),
      "Each guest must be a valid email address",
    ),
});
type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  notes: "",
  guests: [],
});

const booking = ref<Schema | null>(null);

function onSubmit(payload: FormSubmitEvent<Schema>) {
  booking.value = payload.data;
  step.value = "confirmed";
}

// ---------- Confirmation ----------
const calendarProviders = [
  { label: "Google", icon: "i-simple-icons-googlecalendar" },
  { label: "Outlook", icon: "i-simple-icons-microsoftoutlook" },
  { label: "Apple", icon: "i-simple-icons-apple" },
  { label: "iCal", icon: "i-lucide-download" },
];

function addToCalendar(provider: string) {
  toast.add({
    title: "Added to calendar",
    description: `${event.title} was added via ${provider}.`,
    color: "success",
    icon: "i-lucide-calendar-check",
  });
}

function reschedule() {
  selectedSlot.value = null;
  step.value = "select";
}

function cancelBooking() {
  toast.add({
    title: "Booking cancelled",
    description: `${host.name} has been notified.`,
    icon: "i-lucide-calendar-x",
  });
  booking.value = null;
  Object.assign(state, { name: undefined, email: undefined, notes: "", guests: [] });
  reschedule();
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-(--ui-bg-muted)">
    <!-- Brand header -->
    <header class="px-4 py-5 sm:px-6">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span
            class="flex size-8 items-center justify-center rounded-lg bg-primary text-(--ui-text-inverted)"
          >
            <UIcon name="i-lucide-pen-tool" class="size-4" aria-hidden="true" />
          </span>
          <span class="font-semibold text-(--ui-text-highlighted)">
            Acme Studio
          </span>
        </div>
        <UButton
          label="All event types"
          icon="i-lucide-layout-grid"
          color="neutral"
          variant="ghost"
          size="sm"
        />
      </div>
    </header>

    <main class="flex flex-1 items-start justify-center px-4 pb-10 sm:px-6 lg:items-center">
      <!-- Step 1 & 2: booking card -->
      <div
        v-if="step !== 'confirmed'"
        class="grid w-full overflow-hidden rounded-xl border border-(--ui-border) bg-(--ui-bg) shadow-sm divide-y divide-(--ui-border)"
        :class="
          step === 'select'
            ? 'max-w-5xl lg:grid-cols-[17rem_minmax(0,1fr)_15rem] lg:divide-y-0 lg:divide-x'
            : 'max-w-4xl md:grid-cols-[17rem_minmax(0,1fr)] md:divide-y-0 md:divide-x'
        "
      >
        <!-- Host & event info -->
        <aside class="flex flex-col gap-5 p-6">
          <UButton
            v-if="step === 'details'"
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="outline"
            size="sm"
            square
            aria-label="Back to date and time"
            class="self-start"
            @click="step = 'select'"
          />

          <div class="flex items-center gap-3">
            <UAvatar :alt="host.name" size="lg" />
            <div class="min-w-0">
              <p class="text-sm font-medium text-(--ui-text-highlighted)">
                {{ host.name }}
              </p>
              <p class="text-xs text-(--ui-text-muted)">
                {{ host.role }}
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <h1 class="text-2xl font-semibold text-(--ui-text-highlighted)">
              {{ event.title }}
            </h1>
            <p class="text-sm leading-relaxed text-(--ui-text-muted)">
              {{ event.description }}
            </p>
          </div>

          <ul class="space-y-3 text-sm text-(--ui-text-toned)">
            <li v-if="step === 'details'" class="flex items-start gap-2.5">
              <UIcon
                name="i-lucide-calendar"
                class="mt-0.5 size-4 shrink-0 text-(--ui-text-muted)"
                aria-hidden="true"
              />
              <span>
                <span class="block font-medium text-(--ui-text-highlighted)">
                  {{ selectedDateLabel }}
                </span>
                {{ selectedTimeRange }}
              </span>
            </li>
            <li class="flex items-center gap-2.5">
              <UIcon
                name="i-lucide-clock"
                class="size-4 shrink-0 text-(--ui-text-muted)"
                aria-hidden="true"
              />
              {{ event.duration }} min
            </li>
            <li class="flex items-center gap-2.5">
              <UIcon
                :name="event.locationIcon"
                class="size-4 shrink-0 text-(--ui-text-muted)"
                aria-hidden="true"
              />
              {{ event.location }}
              <UBadge label="Video" color="neutral" variant="subtle" size="sm" />
            </li>
            <li v-if="step === 'details'" class="flex items-center gap-2.5">
              <UIcon
                name="i-lucide-globe"
                class="size-4 shrink-0 text-(--ui-text-muted)"
                aria-hidden="true"
              />
              {{ activeTimezone.label }}
            </li>
          </ul>

          <UFormField
            v-if="step === 'select'"
            label="Time zone"
            size="sm"
            class="mt-auto"
          >
            <USelectMenu
              v-model="timezone"
              :items="timezones"
              value-key="value"
              icon="i-lucide-globe"
              :search-input="{ placeholder: 'Search time zones' }"
              class="w-full"
            />
          </UFormField>
        </aside>

        <!-- Step 1: date picker -->
        <template v-if="step === 'select'">
          <section class="p-6" aria-labelledby="pick-date-heading">
            <h2
              id="pick-date-heading"
              class="mb-4 text-base font-semibold text-(--ui-text-highlighted)"
            >
              Select a date
            </h2>
            <UCalendar
              v-model="selectedDate"
              v-model:placeholder="calendarMonth"
              :min-value="TODAY"
              :max-value="LAST_BOOKABLE"
              :is-date-disabled="isDateDisabled"
              :is-date-unavailable="isDateUnavailable"
              :year-controls="false"
              :view-control="false"
              :locale="LOCALE"
              size="lg"
              class="w-full"
              :ui="{
                cellTrigger:
                  'mx-auto font-medium not-data-disabled:not-data-unavailable:not-data-selected:bg-primary/10',
              }"
            />
            <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-(--ui-text-muted)">
              <span class="flex items-center gap-1.5">
                <span class="size-2.5 rounded-full bg-primary/30" aria-hidden="true" />
                Available
              </span>
              <span class="flex items-center gap-1.5">
                <span class="h-px w-3 bg-(--ui-text-muted)" aria-hidden="true" />
                Fully booked
              </span>
            </div>
          </section>

          <!-- Step 1: time slots -->
          <section class="flex flex-col p-6" aria-labelledby="pick-time-heading">
            <div class="mb-4 flex items-center justify-between gap-2">
              <h2
                id="pick-time-heading"
                class="text-base font-semibold text-(--ui-text-highlighted)"
              >
                {{ selectedDayHeading || "Pick a time" }}
              </h2>
              <UFieldGroup size="xs">
                <UButton
                  label="12h"
                  color="neutral"
                  :variant="timeFormat === '12h' ? 'solid' : 'outline'"
                  :aria-pressed="timeFormat === '12h'"
                  @click="timeFormat = '12h'"
                />
                <UButton
                  label="24h"
                  color="neutral"
                  :variant="timeFormat === '24h' ? 'solid' : 'outline'"
                  :aria-pressed="timeFormat === '24h'"
                  @click="timeFormat = '24h'"
                />
              </UFieldGroup>
            </div>

            <ul
              v-if="slots.length"
              class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:max-h-[25rem] lg:grid-cols-1 lg:overflow-y-auto lg:pr-1 lg:pb-6 lg:mask-b-from-[calc(100%-2rem)]"
              aria-label="Available times"
            >
              <li
                v-for="slot in slots"
                :key="slot"
                :class="{ 'col-span-2 sm:col-span-3 lg:col-span-1': selectedSlot === slot }"
              >
                <div v-if="selectedSlot === slot" class="flex gap-2">
                  <UButton
                    :label="formatTime(slot)"
                    color="neutral"
                    variant="solid"
                    aria-pressed="true"
                    class="flex-1 justify-center"
                    @click="selectedSlot = null"
                  />
                  <UButton
                    label="Next"
                    trailing-icon="i-lucide-arrow-right"
                    class="flex-1 justify-center"
                    @click="goToDetails"
                  />
                </div>
                <UButton
                  v-else
                  :label="formatTime(slot)"
                  color="neutral"
                  variant="outline"
                  aria-pressed="false"
                  block
                  @click="selectedSlot = slot"
                />
              </li>
            </ul>

            <div
              v-else
              class="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-(--ui-border-accented) p-6 text-center"
            >
              <UIcon
                name="i-lucide-calendar-x"
                class="size-6 text-(--ui-text-muted)"
                aria-hidden="true"
              />
              <p class="text-sm text-(--ui-text-muted)">
                No times available. Pick another date.
              </p>
            </div>
          </section>
        </template>

        <!-- Step 2: details form -->
        <section v-else class="p-6 sm:p-8" aria-labelledby="details-heading">
          <h2
            id="details-heading"
            class="text-lg font-semibold text-(--ui-text-highlighted)"
          >
            Enter your details
          </h2>
          <p class="mt-1 text-sm text-(--ui-text-muted)">
            We'll send the meeting link and a calendar invite to your email.
          </p>

          <UForm
            :schema="schema"
            :state="state"
            class="mt-6 space-y-5"
            @submit="onSubmit"
          >
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField label="Your name" name="name" required>
                <UInput
                  v-model="state.name"
                  placeholder="Jordan Lee"
                  autocomplete="name"
                  class="w-full"
                />
              </UFormField>
              <UFormField label="Email address" name="email" required>
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="jordan@example.com"
                  autocomplete="email"
                  class="w-full"
                />
              </UFormField>
            </div>

            <UFormField
              label="Anything we should know?"
              name="notes"
              hint="Optional"
            >
              <UTextarea
                v-model="state.notes"
                :rows="4"
                autoresize
                placeholder="Share a bit about your project, goals, or questions."
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Add guests"
              name="guests"
              help="Press Enter after each email address."
            >
              <UInputTags
                v-model="state.guests"
                placeholder="guest@example.com"
                icon="i-lucide-user-plus"
                add-on-blur
                class="w-full"
              />
            </UFormField>

            <USeparator />

            <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs text-(--ui-text-muted)">
                By booking, you agree to Acme Studio's
                <ULink class="font-medium text-(--ui-text-highlighted) underline">
                  terms
                </ULink>
                and
                <ULink class="font-medium text-(--ui-text-highlighted) underline">
                  privacy policy</ULink>.
              </p>
              <div class="flex shrink-0 gap-2">
                <UButton
                  label="Back"
                  color="neutral"
                  variant="ghost"
                  @click="step = 'select'"
                />
                <UButton
                  type="submit"
                  label="Confirm booking"
                  icon="i-lucide-check"
                  class="flex-1 justify-center sm:flex-none"
                />
              </div>
            </div>
          </UForm>
        </section>
      </div>

      <!-- Step 3: confirmation -->
      <div
        v-else
        class="w-full max-w-xl rounded-xl border border-(--ui-border) bg-(--ui-bg) p-6 shadow-sm sm:p-10"
      >
        <div class="flex flex-col items-center text-center">
          <span
            class="flex size-14 items-center justify-center rounded-full bg-success/10 text-success"
          >
            <UIcon name="i-lucide-circle-check" class="size-7" aria-hidden="true" />
          </span>
          <h1 class="mt-5 text-2xl font-semibold text-(--ui-text-highlighted)">
            This meeting is scheduled
          </h1>
          <p class="mt-2 text-sm text-(--ui-text-muted)" aria-live="polite">
            A calendar invitation is on its way to
            <span class="font-medium text-(--ui-text-highlighted)">{{ booking?.email }}</span>.
          </p>
        </div>

        <USeparator class="my-6" />

        <dl class="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 gap-y-4 text-sm">
          <dt class="font-medium text-(--ui-text-highlighted)">What</dt>
          <dd class="text-(--ui-text-toned)">
            {{ event.title }} between {{ host.name }} and {{ booking?.name }}
          </dd>

          <dt class="font-medium text-(--ui-text-highlighted)">When</dt>
          <dd class="text-(--ui-text-toned)">
            {{ selectedDateLabel }}<br>
            {{ selectedTimeRange }}
            <span class="block text-(--ui-text-muted)">{{ activeTimezone.label }}</span>
          </dd>

          <dt class="font-medium text-(--ui-text-highlighted)">Who</dt>
          <dd class="space-y-2 text-(--ui-text-toned)">
            <div class="flex flex-wrap items-center gap-2">
              {{ host.name }}
              <UBadge label="Host" color="neutral" variant="subtle" size="sm" />
            </div>
            <div>{{ booking?.name }}</div>
            <div v-for="guest in booking?.guests" :key="guest">
              {{ guest }}
            </div>
          </dd>

          <dt class="font-medium text-(--ui-text-highlighted)">Where</dt>
          <dd class="flex items-center gap-2 text-(--ui-text-toned)">
            <UIcon :name="event.locationIcon" class="size-4" aria-hidden="true" />
            {{ event.location }}
          </dd>

          <template v-if="booking?.notes">
            <dt class="font-medium text-(--ui-text-highlighted)">Notes</dt>
            <dd class="whitespace-pre-line text-(--ui-text-toned)">
              {{ booking.notes }}
            </dd>
          </template>
        </dl>

        <USeparator class="my-6" />

        <div class="space-y-3">
          <p class="text-center text-sm font-medium text-(--ui-text-highlighted)">
            Add to calendar
          </p>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <UButton
              v-for="provider in calendarProviders"
              :key="provider.label"
              :label="provider.label"
              :icon="provider.icon"
              color="neutral"
              variant="outline"
              size="sm"
              class="justify-center"
              @click="addToCalendar(provider.label)"
            />
          </div>
        </div>

        <p
          class="mt-6 flex flex-wrap items-center justify-center gap-x-1 text-sm text-(--ui-text-muted)"
        >
          Need to make a change?
          <UButton
            label="Reschedule"
            color="neutral"
            variant="link"
            class="px-1 font-medium text-(--ui-text-highlighted) underline"
            @click="reschedule"
          />
          or
          <UButton
            label="Cancel"
            color="neutral"
            variant="link"
            class="px-1 font-medium text-(--ui-text-highlighted) underline"
            @click="cancelBooking"
          />
        </p>
      </div>
    </main>

    <footer class="pb-6 text-center text-xs text-(--ui-text-muted)">
      Powered by Acme Scheduling
    </footer>
  </div>
</template>
