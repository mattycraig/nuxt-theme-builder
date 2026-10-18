<script setup lang="ts">
import * as z from "zod";
import type {
  RadioGroupItem,
  SelectItem,
  StepperItem,
} from "@nuxt/ui";

const toast = useToast();

// ---------- Steps ----------
const steps = [
  {
    value: 0,
    title: "Account",
    description: "Your details",
    icon: "i-lucide-user-round",
    heading: "Create your account",
    intro: "Start your 14-day free trial. No credit card required.",
  },
  {
    value: 1,
    title: "Verify",
    description: "Confirm email",
    icon: "i-lucide-mail-check",
    heading: "Check your inbox",
    intro: "We sent a 6-digit verification code to your email.",
  },
  {
    value: 2,
    title: "Workspace",
    description: "Name and size",
    icon: "i-lucide-building-2",
    heading: "Set up your workspace",
    intro: "This is where your team will plan, ship, and track work.",
  },
  {
    value: 3,
    title: "Plan",
    description: "Pick a plan",
    icon: "i-lucide-credit-card",
    heading: "Choose a plan",
    intro: "Every plan starts with a free trial. Change it any time.",
  },
  {
    value: 4,
    title: "Invite",
    description: "Add your team",
    icon: "i-lucide-users-round",
    heading: "Invite your team",
    intro: "Acme works best with your teammates. You can do this later.",
  },
] satisfies StepperItem[];

const currentStep = ref(0);
const furthestStep = ref(0);
const isComplete = ref(false);

const stepperItems = computed<StepperItem[]>(() =>
  steps.map((step, index) => ({
    ...step,
    disabled: isComplete.value || index > furthestStep.value,
  })),
);

// ---------- Form state ----------
const DEMO_CODE = "428913";

const initialState = () => ({
  name: "",
  email: "",
  password: "",
  terms: false,
  code: [] as (number | undefined)[],
  workspace: "",
  slug: "",
  teamSize: undefined as string | undefined,
  role: undefined as string | undefined,
  plan: "pro",
  yearly: true,
  invites: [] as string[],
  inviteRole: "member",
});

const state = reactive(initialState());

// ---------- Schemas (one per step) ----------
const accountSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string("Email is required").email("Please enter a valid email"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters"),
  terms: z
    .boolean()
    .refine((value) => value, "Please accept the terms to continue"),
});

const verifySchema = z.object({
  code: z
    .array(z.number().optional())
    .refine((code) => code.join("").length === 6, "Enter all 6 digits")
    .refine(
      (code) => code.join("") === DEMO_CODE,
      `That code doesn't match. Try the demo code ${DEMO_CODE}.`,
    ),
});

const workspaceSchema = z.object({
  workspace: z
    .string("Workspace name is required")
    .min(2, "Workspace name must be at least 2 characters"),
  slug: z
    .string("URL is required")
    .min(3, "URL must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes"),
  teamSize: z.string("Select your team size"),
  role: z.string("Select your role"),
});

const planSchema = z.object({
  plan: z.enum(["starter", "pro", "business"], "Select a plan"),
});

const inviteSchema = z.object({
  invites: z.array(
    z.string().email("One or more email addresses are invalid"),
  ),
});

const schemas = [
  accountSchema,
  verifySchema,
  workspaceSchema,
  planSchema,
  inviteSchema,
];

const currentSchema = computed(() => schemas[currentStep.value]);

// ---------- Workspace options ----------
const slugEdited = ref(false);

watch(
  () => state.workspace,
  (name) => {
    if (slugEdited.value) return;
    state.slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },
);

const teamSizes = [
  { label: "Just me", value: "1", icon: "i-lucide-user-round" },
  { label: "2–10", value: "2-10", icon: "i-lucide-users-round" },
  { label: "11–50", value: "11-50", icon: "i-lucide-users" },
  { label: "51–200", value: "51-200", icon: "i-lucide-building" },
  { label: "200+", value: "200+", icon: "i-lucide-building-2" },
] satisfies RadioGroupItem[];

const roles: SelectItem[] = [
  { label: "Founder or executive", value: "founder" },
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Product management", value: "product" },
  { label: "Marketing", value: "marketing" },
  { label: "Operations", value: "operations" },
  { label: "Something else", value: "other" },
];

// ---------- Plans ----------
const plans = [
  {
    value: "starter",
    label: "Starter",
    description: "For individuals and tiny teams.",
    monthly: 0,
    yearly: 0,
    features: ["Up to 3 members", "5 projects", "Community support"],
  },
  {
    value: "pro",
    label: "Pro",
    description: "For growing teams shipping weekly.",
    monthly: 12,
    yearly: 10,
    badge: "Popular",
    features: [
      "Unlimited members",
      "Unlimited projects",
      "Roadmaps and insights",
      "Priority support",
    ],
  },
  {
    value: "business",
    label: "Business",
    description: "For companies with advanced needs.",
    monthly: 24,
    yearly: 20,
    features: [
      "Everything in Pro",
      "SAML SSO and SCIM",
      "Audit log",
      "Dedicated success manager",
    ],
  },
];

const selectedPlan = computed(
  () => plans.find((plan) => plan.value === state.plan) ?? plans[0]!,
);

function planPrice(plan: (typeof plans)[number]) {
  return state.yearly ? plan.yearly : plan.monthly;
}

// ---------- Invites ----------
const inviteRoles: SelectItem[] = [
  { label: "Member", value: "member" },
  { label: "Admin", value: "admin" },
  { label: "Guest", value: "guest" },
];

const inviteLink = computed(
  () => `https://acme.app/join/${state.slug || "your-workspace"}`,
);

function copyInviteLink() {
  toast.add({
    title: "Invite link copied",
    description: "Share it with anyone you'd like to join.",
    icon: "i-lucide-link",
    color: "success",
  });
}

// ---------- Verification ----------
const resendCooldown = ref(0);
let resendTimer: ReturnType<typeof setInterval> | undefined;

function resendCode() {
  resendCooldown.value = 30;
  toast.add({
    title: "Code sent",
    description: `We sent a new code to ${state.email || "your email"}.`,
    icon: "i-lucide-mail",
  });
  clearInterval(resendTimer);
  resendTimer = setInterval(() => {
    resendCooldown.value -= 1;
    if (resendCooldown.value <= 0) clearInterval(resendTimer);
  }, 1000);
}

function fillDemoCode() {
  state.code = DEMO_CODE.split("").map(Number);
}

onBeforeUnmount(() => clearInterval(resendTimer));

// ---------- Navigation ----------
const nextLabel = computed(
  () =>
    [
      "Create account",
      "Verify email",
      "Continue",
      "Continue",
      state.invites.length ? "Send invites" : "Finish setup",
    ][currentStep.value],
);

function goTo(step: string | number | undefined) {
  if (typeof step !== "number" || step > furthestStep.value) return;
  currentStep.value = step;
}

function onNext() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1;
    furthestStep.value = Math.max(furthestStep.value, currentStep.value);
    return;
  }
  isComplete.value = true;
}

function onBack() {
  if (currentStep.value > 0) currentStep.value -= 1;
}

function skipInvites() {
  state.invites = [];
  isComplete.value = true;
}

function restart() {
  Object.assign(state, initialState());
  slugEdited.value = false;
  currentStep.value = 0;
  furthestStep.value = 0;
  isComplete.value = false;
}

function goToDashboard() {
  toast.add({
    title: `Welcome to ${state.workspace}`,
    description: "Your dashboard is ready.",
    icon: "i-lucide-layout-dashboard",
    color: "success",
  });
}

// ---------- Summary ----------
const firstName = computed(() => state.name.trim().split(" ")[0] || "there");

const summary = computed(() => [
  { label: "Account", value: state.email, icon: "i-lucide-mail" },
  {
    label: "Workspace",
    value: `${state.workspace} · acme.app/${state.slug}`,
    icon: "i-lucide-building-2",
  },
  {
    label: "Team size",
    value:
      state.teamSize === "1"
        ? "Just me"
        : `${teamSizes.find((size) => size.value === state.teamSize)?.label} people`,
    icon: "i-lucide-users-round",
  },
  {
    label: "Plan",
    value: `${selectedPlan.value.label} · ${state.yearly ? "Billed yearly" : "Billed monthly"}`,
    icon: "i-lucide-credit-card",
  },
  {
    label: "Invites",
    value: state.invites.length
      ? `${state.invites.length} ${state.invites.length === 1 ? "invite" : "invites"} sent`
      : "None yet",
    icon: "i-lucide-send",
  },
]);

// ---------- Side panel ----------
const highlights = [
  { icon: "i-lucide-zap", text: "Plan sprints and ship faster" },
  { icon: "i-lucide-chart-no-axes-column", text: "Live insights for every project" },
  { icon: "i-lucide-shield-check", text: "SOC 2 Type II and GDPR ready" },
];
</script>

<template>
  <div class="min-h-screen lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
    <!-- Brand panel -->
    <aside
      class="hidden lg:flex flex-col justify-between gap-10 bg-(--ui-bg-elevated) border-r border-(--ui-border) p-10 xl:p-12"
    >
      <div class="flex items-center gap-2">
        <div
          class="flex size-9 items-center justify-center rounded-(--ui-radius) bg-primary text-(--ui-bg)"
        >
          <UIcon name="i-lucide-hexagon" class="size-5" aria-hidden="true" />
        </div>
        <span class="text-lg font-semibold text-(--ui-text-highlighted)"
          >Acme</span
        >
      </div>

      <div class="space-y-8">
        <div class="space-y-3">
          <p
            class="text-3xl font-semibold tracking-tight text-(--ui-text-highlighted) text-balance"
          >
            Everything your team needs to ship, in one place.
          </p>
          <p class="text-(--ui-text-muted)">
            Join 12,000+ teams who plan, build, and launch with Acme.
          </p>
        </div>

        <ul class="space-y-3">
          <li
            v-for="item in highlights"
            :key="item.text"
            class="flex items-center gap-3 text-sm text-(--ui-text-toned)"
          >
            <span
              class="flex size-8 shrink-0 items-center justify-center rounded-(--ui-radius) bg-primary/10 text-primary"
            >
              <UIcon :name="item.icon" class="size-4" aria-hidden="true" />
            </span>
            {{ item.text }}
          </li>
        </ul>

        <!-- Step progress -->
        <div>
          <h2
            class="mb-3 text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted)"
          >
            Your setup
          </h2>
          <ol class="space-y-1">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              class="flex items-center gap-3 rounded-(--ui-radius) px-3 py-2 text-sm"
              :class="
                !isComplete && index === currentStep
                  ? 'bg-(--ui-bg) ring ring-(--ui-border) text-(--ui-text-highlighted) font-medium'
                  : 'text-(--ui-text-muted)'
              "
              :aria-current="
                !isComplete && index === currentStep ? 'step' : undefined
              "
            >
              <UIcon
                v-if="isComplete || index < currentStep"
                name="i-lucide-circle-check"
                class="size-5 text-success"
                aria-hidden="true"
              />
              <UIcon
                v-else
                :name="step.icon"
                class="size-5"
                :class="index === currentStep ? 'text-primary' : ''"
                aria-hidden="true"
              />
              <span class="flex-1">{{ step.title }}</span>
              <span
                v-if="isComplete || index < currentStep"
                class="text-xs text-(--ui-text-muted)"
                >Done</span
              >
            </li>
          </ol>
        </div>
      </div>

      <!-- Testimonial -->
      <figure
        class="rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg) p-5"
      >
        <UIcon
          name="i-lucide-quote"
          class="mb-3 size-6 text-primary"
          aria-hidden="true"
        />
        <blockquote class="text-sm text-(--ui-text-toned)">
          “We moved our whole product org to Acme in a weekend. Onboarding took
          five minutes and the team was planning sprints by Monday.”
        </blockquote>
        <figcaption class="mt-4 flex items-center gap-3">
          <UAvatar alt="Maya Okafor" size="sm" />
          <div class="text-sm">
            <p class="font-medium text-(--ui-text-highlighted)">Maya Okafor</p>
            <p class="text-(--ui-text-muted)">VP Engineering, Northwind</p>
          </div>
        </figcaption>
      </figure>
    </aside>

    <!-- Form area -->
    <main class="flex min-h-screen flex-col">
      <header
        class="flex items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-12"
      >
        <div class="flex items-center gap-2 lg:invisible">
          <div
            class="flex size-8 items-center justify-center rounded-(--ui-radius) bg-primary text-(--ui-bg)"
          >
            <UIcon name="i-lucide-hexagon" class="size-4" aria-hidden="true" />
          </div>
          <span class="font-semibold text-(--ui-text-highlighted)">Acme</span>
        </div>
        <p class="text-sm text-(--ui-text-muted)">
          Already have an account?
          <ULink to="#" class="font-medium text-primary">Sign in</ULink>
        </p>
      </header>

      <div
        class="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-10 sm:px-8"
      >
        <UStepper
          :model-value="currentStep"
          :items="stepperItems"
          size="sm"
          class="mt-2 mb-10 sm:mt-6"
          :ui="{ description: 'hidden xl:block', title: 'hidden sm:block' }"
          @update:model-value="goTo"
        >
          <template #indicator="{ item }">
            <UIcon
              v-if="isComplete || (item.value as number) < currentStep"
              name="i-lucide-check"
              class="size-4"
              aria-hidden="true"
            />
            <UIcon
              v-else
              :name="item.icon!"
              class="size-4"
              aria-hidden="true"
            />
          </template>
        </UStepper>

        <!-- Done state -->
        <div
          v-if="isComplete"
          class="flex flex-1 flex-col items-center text-center"
          aria-live="polite"
        >
          <div
            class="mb-6 flex size-16 items-center justify-center rounded-full bg-success/10 ring-8 ring-success/5"
          >
            <UIcon
              name="i-lucide-party-popper"
              class="size-8 text-success"
              aria-hidden="true"
            />
          </div>
          <h1
            class="text-2xl font-semibold tracking-tight text-(--ui-text-highlighted)"
          >
            You're all set, {{ firstName }}!
          </h1>
          <p class="mt-2 max-w-md text-(--ui-text-muted)">
            Your workspace is ready and your 14-day trial has started. Here's a
            quick summary of your setup.
          </p>

          <dl
            class="mt-8 w-full divide-y divide-(--ui-border) rounded-(--ui-radius) border border-(--ui-border) text-left"
          >
            <div
              v-for="row in summary"
              :key="row.label"
              class="flex items-center gap-3 px-4 py-3 text-sm"
            >
              <UIcon
                :name="row.icon"
                class="size-4 shrink-0 text-(--ui-text-muted)"
                aria-hidden="true"
              />
              <dt class="w-24 shrink-0 text-(--ui-text-muted)">
                {{ row.label }}
              </dt>
              <dd
                class="min-w-0 flex-1 font-medium break-words text-(--ui-text-highlighted)"
              >
                {{ row.value }}
              </dd>
            </div>
          </dl>

          <div
            class="mt-8 flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row"
          >
            <UButton
              label="Start over"
              color="neutral"
              variant="ghost"
              icon="i-lucide-rotate-ccw"
              block
              @click="restart"
            />
            <UButton
              label="Go to dashboard"
              trailing-icon="i-lucide-arrow-right"
              size="lg"
              block
              class="justify-center"
              @click="goToDashboard"
            />
          </div>
        </div>

        <!-- Steps -->
        <UForm
          v-else
          :key="currentStep"
          :schema="currentSchema"
          :state="state"
          class="flex flex-1 flex-col"
          @submit="onNext"
        >
          <div class="mb-8">
            <p class="mb-1 text-sm font-medium text-primary">
              Step {{ currentStep + 1 }} of {{ steps.length }}
            </p>
            <h1
              class="text-2xl font-semibold tracking-tight text-(--ui-text-highlighted)"
            >
              {{ steps[currentStep]!.heading }}
            </h1>
            <p class="mt-1 text-(--ui-text-muted)">
              <template v-if="currentStep === 1">
                We sent a 6-digit code to
                <span class="font-medium text-(--ui-text-highlighted)">{{
                  state.email
                }}</span
                >. It expires in 10 minutes.
              </template>
              <template v-else>{{ steps[currentStep]!.intro }}</template>
            </p>
          </div>

          <!-- 1. Account -->
          <div v-if="currentStep === 0" class="space-y-5">
            <div class="grid gap-3 sm:grid-cols-2">
              <UButton
                label="Sign up with GitHub"
                icon="i-simple-icons-github"
                color="neutral"
                variant="outline"
                block
                @click="toast.add({ title: 'GitHub', description: 'Continue with GitHub' })"
              />
              <UButton
                label="Sign up with Google"
                icon="i-simple-icons-google"
                color="neutral"
                variant="outline"
                block
                @click="toast.add({ title: 'Google', description: 'Continue with Google' })"
              />
            </div>
            <USeparator label="or with email" />
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField label="Full name" name="name" required>
                <UInput
                  v-model="state.name"
                  placeholder="Jane Cooper"
                  autocomplete="name"
                  class="w-full"
                />
              </UFormField>
              <UFormField label="Work email" name="email" required>
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="jane@company.com"
                  autocomplete="email"
                  class="w-full"
                />
              </UFormField>
            </div>
            <UFormField
              label="Password"
              name="password"
              help="Use 8 or more characters with a mix of letters and numbers."
              required
            >
              <UInput
                v-model="state.password"
                type="password"
                placeholder="Create a password"
                autocomplete="new-password"
                class="w-full"
              />
            </UFormField>
            <UFormField name="terms">
              <UCheckbox v-model="state.terms">
                <template #label>
                  I agree to the
                  <ULink to="#" class="font-medium text-primary"
                    >Terms of Service</ULink
                  >
                  and
                  <ULink to="#" class="font-medium text-primary"
                    >Privacy Policy</ULink
                  >
                </template>
              </UCheckbox>
            </UFormField>
          </div>

          <!-- 2. Verify email -->
          <div v-else-if="currentStep === 1" class="space-y-6">
            <UFormField label="Verification code" name="code">
              <UPinInput
                v-model="state.code"
                :length="6"
                :separator="3"
                type="number"
                otp
                size="xl"
                placeholder="○"
                autofocus
              />
            </UFormField>
            <UAlert
              color="info"
              variant="subtle"
              icon="i-lucide-info"
              title="Demo mode"
              :description="`No email is sent here. Use the code ${DEMO_CODE} to continue.`"
              :actions="[
                {
                  label: 'Fill code',
                  color: 'info',
                  variant: 'outline',
                  onClick: fillDemoCode,
                },
              ]"
            />
            <p class="text-sm text-(--ui-text-muted)">
              Didn't get a code? Check your spam folder or
              <UButton
                variant="link"
                class="p-0 font-medium"
                :disabled="resendCooldown > 0"
                @click="resendCode"
              >
                {{
                  resendCooldown > 0
                    ? `resend in ${resendCooldown}s`
                    : "resend the code"
                }}
              </UButton>
            </p>
          </div>

          <!-- 3. Workspace -->
          <div v-else-if="currentStep === 2" class="space-y-6">
            <div class="grid gap-5 sm:grid-cols-2">
              <UFormField label="Workspace name" name="workspace" required>
                <UInput
                  v-model="state.workspace"
                  placeholder="Northwind Labs"
                  icon="i-lucide-building-2"
                  class="w-full"
                />
              </UFormField>
              <UFormField label="Workspace URL" name="slug" required>
                <UFieldGroup class="w-full">
                  <UBadge
                    label="acme.app/"
                    color="neutral"
                    variant="outline"
                    size="lg"
                  />
                  <UInput
                    v-model="state.slug"
                    placeholder="northwind"
                    aria-label="Workspace URL"
                    class="w-full"
                    @update:model-value="slugEdited = true"
                  />
                </UFieldGroup>
              </UFormField>
            </div>
            <UFormField label="How big is your team?" name="teamSize" required>
              <URadioGroup
                v-model="state.teamSize"
                :items="teamSizes"
                variant="card"
                indicator="hidden"
                orientation="horizontal"
                :ui="{
                  fieldset: 'grid grid-cols-3 sm:grid-cols-5 gap-2',
                  item: 'justify-center text-center',
                  icon: 'size-5 mx-auto mb-1.5',
                }"
              />
            </UFormField>
            <UFormField
              label="What's your role?"
              name="role"
              help="We'll tailor templates and tips to how you work."
              required
            >
              <USelect
                v-model="state.role"
                :items="roles"
                placeholder="Select a role"
                class="w-full"
              />
            </UFormField>
          </div>

          <!-- 4. Plan -->
          <div v-else-if="currentStep === 3" class="space-y-6">
            <div
              class="flex flex-wrap items-center justify-between gap-3 rounded-(--ui-radius) bg-(--ui-bg-elevated) px-4 py-3"
            >
              <USwitch v-model="state.yearly" label="Bill yearly" />
              <p
                class="flex items-center gap-1.5 text-sm font-medium text-(--ui-text-highlighted)"
              >
                <UIcon
                  name="i-lucide-tag"
                  class="size-4 text-success"
                  aria-hidden="true"
                />
                Save up to 17% with yearly billing
              </p>
            </div>
            <UFormField name="plan">
              <URadioGroup
                v-model="state.plan"
                :items="plans"
                variant="card"
                indicator="end"
                legend="Plan"
                :ui="{
                  legend: 'sr-only',
                  fieldset: 'grid gap-3 sm:grid-cols-3',
                  item: 'p-4',
                }"
              >
                <template #label="{ item }">
                  <span class="flex items-center gap-2">
                    {{ (item as (typeof plans)[number]).label }}
                    <UBadge
                      v-if="(item as (typeof plans)[number]).badge"
                      :label="(item as (typeof plans)[number]).badge"
                      size="sm"
                    />
                  </span>
                </template>
                <template #description="{ item }">
                  <span class="mt-3 block">
                    <span
                      class="text-2xl font-semibold text-(--ui-text-highlighted)"
                      >${{ planPrice(item as (typeof plans)[number]) }}</span
                    >
                    <span class="text-(--ui-text-muted)"> / user / mo</span>
                  </span>
                  <span class="mt-1 block text-(--ui-text-muted)">{{
                    (item as (typeof plans)[number]).description
                  }}</span>
                </template>
              </URadioGroup>
            </UFormField>
            <div
              class="rounded-(--ui-radius) border border-(--ui-border) p-4"
              aria-live="polite"
            >
              <h2
                class="mb-3 text-sm font-medium text-(--ui-text-highlighted)"
              >
                Included in {{ selectedPlan.label }}
              </h2>
              <ul class="grid gap-2 text-sm sm:grid-cols-2">
                <li
                  v-for="feature in selectedPlan.features"
                  :key="feature"
                  class="flex items-center gap-2 text-(--ui-text-toned)"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>

          <!-- 5. Invite -->
          <div v-else class="space-y-6">
            <UFormField
              label="Email addresses"
              name="invites"
              help="Press Enter or comma after each address."
            >
              <UInputTags
                v-model="state.invites"
                placeholder="name@company.com"
                icon="i-lucide-mail"
                :delimiter="','"
                add-on-blur
                add-on-paste
                class="w-full"
              />
            </UFormField>
            <UFormField label="Invite as" name="inviteRole">
              <USelect
                v-model="state.inviteRole"
                :items="inviteRoles"
                class="w-full sm:w-48"
              />
            </UFormField>
            <USeparator label="or share a link" />
            <UFormField label="Invite link" name="inviteLink">
              <UFieldGroup class="w-full">
                <UInput
                  :model-value="inviteLink"
                  readonly
                  icon="i-lucide-link"
                  class="w-full"
                />
                <UButton
                  label="Copy"
                  icon="i-lucide-copy"
                  color="neutral"
                  variant="outline"
                  @click="copyInviteLink"
                />
              </UFieldGroup>
            </UFormField>
          </div>

          <!-- Footer -->
          <div
            class="mt-10 flex items-center justify-between gap-3 border-t border-(--ui-border) pt-6"
          >
            <UButton
              label="Back"
              icon="i-lucide-arrow-left"
              color="neutral"
              variant="ghost"
              :disabled="currentStep === 0"
              @click="onBack"
            />
            <div class="flex items-center gap-2">
              <UButton
                v-if="currentStep === steps.length - 1"
                label="Skip for now"
                color="neutral"
                variant="outline"
                @click="skipInvites"
              />
              <UButton
                type="submit"
                :label="nextLabel"
                trailing-icon="i-lucide-arrow-right"
              />
            </div>
          </div>
        </UForm>
      </div>
    </main>
  </div>
</template>
