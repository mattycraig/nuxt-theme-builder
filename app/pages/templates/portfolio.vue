<script setup lang="ts">
import * as z from "zod";
import type {
  ButtonProps,
  FormSubmitEvent,
  NavigationMenuItem,
  TimelineItem,
} from "@nuxt/ui";

const toast = useToast();

// ---------- Navigation ----------
const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const activeSection = ref("");
const mobileMenuOpen = ref(false);

function scrollToSection(id: string) {
  activeSection.value = id;
  mobileMenuOpen.value = false;
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const navItems = computed<NavigationMenuItem[]>(() =>
  sections.map((section) => ({
    label: section.label,
    active: activeSection.value === section.id,
    onSelect: () => scrollToSection(section.id),
  })),
);

const socials: (ButtonProps & { label: string })[] = [
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    to: "https://github.com",
    target: "_blank",
  },
  {
    label: "Dribbble",
    icon: "i-simple-icons-dribbble",
    to: "https://dribbble.com",
    target: "_blank",
  },
  {
    label: "LinkedIn",
    icon: "i-simple-icons-linkedin",
    to: "https://linkedin.com",
    target: "_blank",
  },
  {
    label: "Bluesky",
    icon: "i-simple-icons-bluesky",
    to: "https://bsky.app",
    target: "_blank",
  },
];

// ---------- Profile ----------
const stats = [
  { value: "9 yrs", label: "Experience" },
  { value: "40+", label: "Products shipped" },
  { value: "28", label: "Happy clients" },
];

const tools = [
  { label: "Figma", icon: "i-simple-icons-figma" },
  { label: "Vue", icon: "i-simple-icons-vuedotjs" },
  { label: "Nuxt", icon: "i-simple-icons-nuxt" },
  { label: "TypeScript", icon: "i-simple-icons-typescript" },
  { label: "Tailwind CSS", icon: "i-simple-icons-tailwindcss" },
  { label: "Framer", icon: "i-simple-icons-framer" },
  { label: "Vite", icon: "i-simple-icons-vite" },
  { label: "Storybook", icon: "i-simple-icons-storybook" },
  { label: "Three.js", icon: "i-simple-icons-threedotjs" },
  { label: "Supabase", icon: "i-simple-icons-supabase" },
  { label: "PostgreSQL", icon: "i-simple-icons-postgresql" },
  { label: "GSAP", icon: "i-simple-icons-gsap" },
];

// ---------- Selected work ----------
type Tone = "primary" | "secondary" | "info" | "success" | "warning" | "neutral";

const toneClasses: Record<Tone, { tile: string; icon: string }> = {
  primary: { tile: "bg-primary/10", icon: "text-primary" },
  secondary: { tile: "bg-secondary/10", icon: "text-secondary" },
  info: { tile: "bg-info/10", icon: "text-info" },
  success: { tile: "bg-success/10", icon: "text-success" },
  warning: { tile: "bg-warning/10", icon: "text-warning" },
  neutral: {
    tile: "bg-(--ui-bg-accented)",
    icon: "text-(--ui-text-highlighted)",
  },
};

const workFilters = [
  { label: "All", value: "all" },
  { label: "Product", value: "product" },
  { label: "Design systems", value: "systems" },
  { label: "Open source", value: "oss" },
];

const activeFilter = ref("all");

const projects = [
  {
    title: "Halcyon Health",
    description:
      "Rebuilt the care-team inbox from the ground up and cut average triage time by 38%.",
    role: "Lead design engineer",
    category: "product",
    year: "2026",
    tags: ["Vue", "Accessibility", "Research"],
    icon: "i-lucide-heart-pulse",
    tone: "primary" as Tone,
  },
  {
    title: "Tidepool Design System",
    description:
      "A token-driven component library that now powers 14 products across web and native.",
    role: "Design systems lead",
    category: "systems",
    year: "2025",
    tags: ["Tokens", "Storybook", "Docs"],
    icon: "i-lucide-layers",
    tone: "secondary" as Tone,
  },
  {
    title: "Ledgerline",
    description:
      "Real-time cash-flow forecasting for small businesses, from first sketch to general availability.",
    role: "Product designer",
    category: "product",
    year: "2025",
    tags: ["Dashboards", "Data viz"],
    icon: "i-lucide-chart-line",
    tone: "info" as Tone,
  },
  {
    title: "Kiln",
    description:
      "A browser-based SVG icon editor with 4.2k GitHub stars and a small, kind community.",
    role: "Creator & maintainer",
    category: "oss",
    year: "2024",
    tags: ["Open source", "Canvas"],
    icon: "i-lucide-pen-tool",
    tone: "neutral" as Tone,
  },
  {
    title: "Wayfarer",
    description:
      "Collaborative trip planning with offline maps, shared itineraries, and split costs.",
    role: "Founding designer",
    category: "product",
    year: "2024",
    tags: ["Mobile", "Prototyping"],
    icon: "i-lucide-map",
    tone: "success" as Tone,
  },
  {
    title: "Motion Kit",
    description:
      "Composable, reduced-motion-aware transitions for Vue and Nuxt apps, used by 900+ projects.",
    role: "Author",
    category: "oss",
    year: "2023",
    tags: ["Animation", "Nuxt module"],
    icon: "i-lucide-sparkles",
    tone: "warning" as Tone,
  },
];

const filteredProjects = computed(() =>
  activeFilter.value === "all"
    ? projects
    : projects.filter((project) => project.category === activeFilter.value),
);

// ---------- Experience ----------
const experience: TimelineItem[] = [
  {
    date: "2023 — Present",
    title: "Staff Design Engineer · Halcyon Health",
    description:
      "Own the patient and clinician design system, pair with research on every major launch, and mentor four designers who code.",
    icon: "i-lucide-heart-pulse",
  },
  {
    date: "2020 — 2023",
    title: "Senior Product Designer · Tidepool",
    description:
      "Led the move from three diverging UI kits to one shared, themeable component library adopted by every product team.",
    icon: "i-lucide-layers",
  },
  {
    date: "2018 — 2020",
    title: "Front-end Developer · Paper Crane Studio",
    description:
      "Built marketing sites and interactive campaigns for cultural institutions, festivals, and independent publishers.",
    icon: "i-lucide-code-xml",
  },
  {
    date: "2016 — 2018",
    title: "Junior Designer · Freelance",
    description:
      "Identity, web, and print work for small businesses in Lisbon, and a lot of learning in public.",
    icon: "i-lucide-pen-tool",
  },
];

const experienceLinks: ButtonProps[] = [
  {
    label: "Download CV",
    icon: "i-lucide-download",
    color: "neutral",
    variant: "outline",
  },
  {
    label: "LinkedIn",
    icon: "i-simple-icons-linkedin",
    color: "neutral",
    variant: "ghost",
    to: "https://linkedin.com",
    target: "_blank",
  },
];

// ---------- Services ----------
const services = [
  {
    title: "Product design",
    description:
      "From fuzzy problem to tested flows: research synthesis, wireframes, and high-fidelity UI.",
    icon: "i-lucide-layout-template",
  },
  {
    title: "Design systems",
    description:
      "Tokens, components, and documentation that keep teams consistent without slowing them down.",
    icon: "i-lucide-component",
  },
  {
    title: "Front-end engineering",
    description:
      "Production-ready Vue and Nuxt code with accessibility and performance built in, not bolted on.",
    icon: "i-lucide-code-xml",
  },
  {
    title: "Prototyping & motion",
    description:
      "Interactive prototypes and purposeful motion to validate ideas before anyone writes a spec.",
    icon: "i-lucide-mouse-pointer-click",
  },
];

// ---------- Testimonials ----------
const testimonials = [
  {
    quote:
      "Jane has a rare ability to hold the whole system in her head while sweating the smallest interaction. Our clinicians noticed the difference in week one.",
    name: "Jonas Reyes",
    role: "VP Product, Halcyon Health",
  },
  {
    quote:
      "She shipped a design system that engineers actually wanted to use. Adoption went from two teams to fourteen in under a year.",
    name: "Priya Natarajan",
    role: "Engineering Director, Tidepool",
  },
  {
    quote: "Clear thinking, clean code, and zero ego. I'd hire her again tomorrow.",
    name: "Tom Whitaker",
    role: "Founder, Ledgerline",
  },
  {
    quote:
      "Jane's prototypes answered questions we didn't know we had. We cut two months of back-and-forth by testing her clickable flows with real travellers.",
    name: "Lena Fischer",
    role: "CEO, Wayfarer",
  },
  {
    quote:
      "Kiln is one of the friendliest open-source projects I've contributed to, and that starts with how Jane reviews pull requests.",
    name: "Sam Adeyemi",
    role: "Open-source contributor",
  },
  {
    quote:
      "Every handoff came with states, edge cases, and motion specs. It felt like working with a designer and a senior engineer at once.",
    name: "Ana Ribeiro",
    role: "Tech Lead, Paper Crane Studio",
  },
];

// ---------- Writing ----------
const articles = [
  {
    title: "Design tokens are a contract, not a palette",
    excerpt:
      "Why naming tokens after intent instead of color made our themes survive three rebrands.",
    date: "Sep 12, 2026",
    readingTime: "7 min read",
    tag: "Design systems",
  },
  {
    title: "What I learned shipping a component library to 14 teams",
    excerpt:
      "Adoption is a product problem. Notes on docs, office hours, and saying no to props.",
    date: "Jul 30, 2026",
    readingTime: "11 min read",
    tag: "Process",
  },
  {
    title: "Reduced motion is a design constraint, not a fallback",
    excerpt:
      "Designing transitions that still communicate when the animation is turned off.",
    date: "May 4, 2026",
    readingTime: "5 min read",
    tag: "Accessibility",
  },
];

const writingLinks: ButtonProps[] = [
  {
    label: "All articles",
    icon: "i-lucide-arrow-right",
    trailing: true,
    color: "neutral",
    variant: "outline",
  },
  { label: "RSS", icon: "i-lucide-rss", color: "neutral", variant: "ghost" },
];

// ---------- Contact ----------
const contactMethods = [
  {
    label: "Email",
    value: "hello@janedoe.design",
    icon: "i-lucide-mail",
  },
  {
    label: "Intro call",
    value: "30 minutes, any weekday",
    icon: "i-lucide-calendar-days",
  },
  {
    label: "Based in",
    value: "Lisbon · working across EU & US time zones",
    icon: "i-lucide-map-pin",
  },
];

const contactSchema = z.object({
  name: z
    .string("Please tell me your name")
    .min(2, "Name must be at least 2 characters"),
  email: z.string("Email is required").email("Please enter a valid email"),
  message: z
    .string("A short message helps me reply properly")
    .min(20, "A couple of sentences helps me reply properly"),
});
type ContactSchema = z.output<typeof contactSchema>;

const contactState = reactive<Partial<ContactSchema>>({
  name: undefined,
  email: undefined,
  message: undefined,
});

function onContactSubmit(event: FormSubmitEvent<ContactSchema>) {
  toast.add({
    title: "Message sent",
    description: `Thanks, ${event.data.name}! I'll reply within two working days.`,
    icon: "i-lucide-circle-check",
    color: "success",
  });
  contactState.name = undefined;
  contactState.email = undefined;
  contactState.message = undefined;
}
</script>

<template>
  <div id="top">
    <!-- Header -->
    <UHeader v-model:open="mobileMenuOpen" mode="slideover">
      <template #left>
        <button
          type="button"
          class="flex items-center gap-2.5 rounded-(--ui-radius) focus-visible:outline-2 focus-visible:outline-primary"
          @click="scrollToSection('top')"
        >
          <UAvatar alt="Jane Doe" color="primary" size="sm" />
          <span class="font-semibold text-(--ui-text-highlighted)">
            Jane Doe
          </span>
        </button>
      </template>

      <UNavigationMenu :items="navItems" variant="link" />

      <template #right>
        <UButton
          label="Hire me"
          icon="i-lucide-send"
          size="sm"
          @click="scrollToSection('contact')"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <!-- Hero -->
    <UPageHero
      orientation="horizontal"
      :ui="{
        container: 'py-12 sm:py-16 lg:py-20 lg:grid-cols-[1.25fr_1fr]',
        title: 'text-4xl sm:text-5xl lg:text-6xl',
        description: 'text-pretty',
      }"
    >
      <template #headline>
        <UBadge color="neutral" variant="outline" size="lg" class="gap-2">
          <span class="relative flex size-2" aria-hidden="true">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          Available for new projects from November
        </UBadge>
      </template>

      <template #title>
        Designing interfaces that feel
        <span
          class="underline decoration-primary decoration-4 underline-offset-8"
          >quietly obvious</span
        >.
      </template>

      <template #description>
        I'm Jane, a design engineer in Lisbon. For nine years I've helped
        product teams turn tangled workflows into calm, accessible software,
        and I write the front-end code to ship it.
      </template>

      <template #links>
        <UButton
          label="View selected work"
          icon="i-lucide-arrow-down"
          trailing
          size="xl"
          @click="scrollToSection('work')"
        />
        <UButton
          label="Book an intro call"
          icon="i-lucide-calendar-days"
          color="neutral"
          variant="subtle"
          size="xl"
          @click="scrollToSection('contact')"
        />
        <div class="flex items-center gap-1 w-full">
          <UButton
            v-for="social in socials"
            :key="social.label"
            :icon="social.icon"
            :to="social.to"
            :target="social.target"
            :aria-label="social.label"
            color="neutral"
            variant="ghost"
          />
        </div>
      </template>

      <!-- Profile card -->
      <div class="relative">
        <div
          class="absolute -inset-4 rounded-[calc(var(--ui-radius)*6)] bg-primary/10 blur-2xl"
          aria-hidden="true"
        />
        <UPageCard variant="outline" class="relative bg-(--ui-bg)">
          <div class="flex items-center gap-4">
            <UAvatar
              alt="Jane Doe"
              color="primary"
              size="3xl"
              class="size-16 text-2xl ring-4 ring-primary/15"
            />
            <div class="min-w-0">
              <p class="text-lg font-semibold text-(--ui-text-highlighted)">
                Jane Doe
              </p>
              <p class="text-sm text-(--ui-text-muted)">
                Design engineer · Product & systems
              </p>
              <p
                class="mt-1 flex items-center gap-1.5 text-sm text-(--ui-text-muted)"
              >
                <UIcon
                  name="i-lucide-map-pin"
                  class="size-4"
                  aria-hidden="true"
                />
                Lisbon, Portugal
              </p>
            </div>
          </div>

          <dl
            class="mt-6 grid grid-cols-3 divide-x divide-(--ui-border) rounded-(--ui-radius) border border-(--ui-border)"
          >
            <div v-for="stat in stats" :key="stat.label" class="px-3 py-3">
              <dt class="text-xs text-(--ui-text-muted)">{{ stat.label }}</dt>
              <dd
                class="mt-1 text-xl font-semibold text-(--ui-text-highlighted)"
              >
                {{ stat.value }}
              </dd>
            </div>
          </dl>

          <div class="mt-6 space-y-3">
            <p
              class="text-xs font-medium uppercase tracking-wider text-(--ui-text-muted)"
            >
              Right now
            </p>
            <div class="flex items-start gap-3">
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-(--ui-radius) bg-primary/10"
              >
                <UIcon
                  name="i-lucide-briefcase"
                  class="size-4 text-primary"
                  aria-hidden="true"
                />
              </div>
              <div class="text-sm">
                <p class="font-medium text-(--ui-text-highlighted)">
                  Staff Design Engineer at Halcyon Health
                </p>
                <p class="text-(--ui-text-muted)">
                  Leading the clinician design system
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-(--ui-radius) bg-(--ui-bg-elevated)"
              >
                <UIcon
                  name="i-lucide-book-open"
                  class="size-4 text-(--ui-text-highlighted)"
                  aria-hidden="true"
                />
              </div>
              <div class="text-sm">
                <p class="font-medium text-(--ui-text-highlighted)">
                  Writing a field guide to design tokens
                </p>
                <p class="text-(--ui-text-muted)">Chapter 4 of 9</p>
              </div>
            </div>
          </div>
        </UPageCard>
      </div>
    </UPageHero>

    <!-- Tools marquee -->
    <section
      aria-label="Tools I work with"
      class="border-y border-(--ui-border) py-8"
    >
      <p class="mb-6 text-center text-sm text-(--ui-text-muted)">
        Tools and technologies I reach for every day
      </p>
      <UMarquee
        pause-on-hover
        overlay
        :ui="{ root: '[--gap:--spacing(12)] [--duration:40s]' }"
      >
        <div
          v-for="tool in tools"
          :key="tool.label"
          class="flex items-center gap-2.5 text-(--ui-text-muted)"
        >
          <UIcon :name="tool.icon" class="size-6" aria-hidden="true" />
          <span class="text-base font-medium">{{ tool.label }}</span>
        </div>
      </UMarquee>
    </section>

    <!-- Selected work -->
    <UPageSection
      id="work"
      headline="Selected work"
      title="Things I've shipped lately"
      description="A few projects I'm proud of, from regulated healthcare products to open-source tools."
      class="scroll-mt-16"
      :ui="{ container: 'py-16 sm:py-24 lg:py-24' }"
    >
      <div class="-mt-4 flex overflow-x-auto sm:-mt-8 sm:justify-center">
        <UTabs
          v-model="activeFilter"
          :items="workFilters"
          :content="false"
          variant="pill"
          color="neutral"
          :ui="{ trigger: 'flex-none' }"
        />
      </div>

      <UPageGrid>
        <UPageCard
          v-for="project in filteredProjects"
          :key="project.title"
          :title="project.title"
          :description="project.description"
          variant="outline"
          spotlight
          :ui="{ header: 'w-full' }"
        >
          <template #header>
            <div
              class="relative aspect-[16/10] w-full overflow-hidden rounded-(--ui-radius) p-5"
              :class="toneClasses[project.tone].tile"
              aria-hidden="true"
            >
              <UIcon
                :name="project.icon"
                class="size-8"
                :class="toneClasses[project.tone].icon"
              />
              <div
                class="absolute -bottom-3 -right-3 w-3/5 space-y-2 rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg) p-3 shadow-lg"
              >
                <div class="flex gap-1">
                  <span class="size-1.5 rounded-full bg-(--ui-bg-accented)" />
                  <span class="size-1.5 rounded-full bg-(--ui-bg-accented)" />
                  <span class="size-1.5 rounded-full bg-(--ui-bg-accented)" />
                </div>
                <div class="h-2 w-3/4 rounded-full bg-(--ui-bg-accented)" />
                <div class="h-2 w-1/2 rounded-full bg-(--ui-bg-elevated)" />
                <div class="grid grid-cols-3 gap-1.5 pt-1">
                  <div
                    class="h-6 rounded-[calc(var(--ui-radius)/2)]"
                    :class="toneClasses[project.tone].tile"
                  />
                  <div
                    class="h-6 rounded-[calc(var(--ui-radius)/2)] bg-(--ui-bg-elevated)"
                  />
                  <div
                    class="h-6 rounded-[calc(var(--ui-radius)/2)] bg-(--ui-bg-elevated)"
                  />
                </div>
              </div>
            </div>
          </template>

          <template #title>
            <span class="flex items-baseline justify-between gap-3">
              {{ project.title }}
              <span class="text-sm font-normal text-(--ui-text-muted)">
                {{ project.year }}
              </span>
            </span>
          </template>

          <template #footer>
            <p class="mb-3 text-sm font-medium text-(--ui-text-toned)">
              {{ project.role }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="subtle"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <!-- Experience -->
    <UPageSection
      id="experience"
      orientation="horizontal"
      headline="Experience"
      title="Nine years at the seam of design and code"
      description="I've worked inside product teams, alongside agencies, and on my own. The constant: designing in the browser and caring about what happens after launch."
      :links="experienceLinks"
      class="scroll-mt-16 border-t border-(--ui-border) bg-(--ui-bg-muted)/50"
      :ui="{ container: 'py-16 sm:py-24 lg:py-24 lg:items-start' }"
    >
      <UTimeline
        :items="experience"
        :default-value="experience.length - 1"
        reverse
        size="sm"
        :ui="{
          date: 'text-(--ui-text-muted)',
          title: 'text-base',
          description: 'mt-1 leading-relaxed',
          wrapper: 'pb-8',
        }"
      />
    </UPageSection>

    <!-- Services -->
    <UPageSection
      id="services"
      headline="Services"
      title="How I can help"
      description="I usually join teams for three to six months, either embedded in a squad or leading a focused initiative."
      class="scroll-mt-16 border-t border-(--ui-border)"
      :ui="{ container: 'py-16 sm:py-24 lg:py-24' }"
    >
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <UPageFeature
          v-for="service in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :icon="service.icon"
          orientation="vertical"
          :ui="{
            leading:
              'mb-4 size-11 rounded-(--ui-radius) bg-primary/10 ring ring-inset ring-primary/20',
          }"
        />
      </div>
    </UPageSection>

    <!-- Testimonials -->
    <UPageSection
      headline="Kind words"
      title="What collaborators say"
      class="border-t border-(--ui-border) bg-(--ui-bg-muted)/50"
      :ui="{ container: 'py-16 sm:py-24 lg:py-24' }"
    >
      <UPageColumns>
        <UPageCard
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          variant="outline"
          icon="i-lucide-quote"
          class="bg-(--ui-bg)"
          :ui="{ leadingIcon: 'size-6' }"
        >
          <template #body>
            <blockquote class="leading-relaxed text-(--ui-text)">
              “{{ testimonial.quote }}”
            </blockquote>
          </template>
          <template #footer>
            <UUser
              :name="testimonial.name"
              :description="testimonial.role"
              :avatar="{ alt: testimonial.name, color: 'primary' }"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <!-- Writing -->
    <UPageSection
      id="writing"
      orientation="horizontal"
      headline="Writing"
      title="Notes from the workbench"
      description="Occasional essays on design systems, accessibility, and the craft of building interfaces."
      :links="writingLinks"
      class="scroll-mt-16 border-t border-(--ui-border)"
      :ui="{ container: 'py-16 sm:py-24 lg:py-24 lg:items-start' }"
    >
      <ul class="divide-y divide-(--ui-border) border-y border-(--ui-border)">
        <li v-for="article in articles" :key="article.title">
          <article class="group py-6">
            <div
              class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-(--ui-text-muted)"
            >
              <time>{{ article.date }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ article.readingTime }}</span>
              <UBadge
                :label="article.tag"
                color="neutral"
                variant="outline"
                size="sm"
              />
            </div>
            <h3
              class="mt-2 text-lg font-semibold text-(--ui-text-highlighted) text-pretty"
            >
              {{ article.title }}
            </h3>
            <p class="mt-1 text-(--ui-text-muted) text-pretty">
              {{ article.excerpt }}
            </p>
            <UButton
              label="Read article"
              icon="i-lucide-arrow-right"
              trailing
              variant="link"
              class="mt-2 px-0"
            />
          </article>
        </li>
      </ul>
    </UPageSection>

    <!-- Contact -->
    <UPageSection
      id="contact"
      orientation="horizontal"
      headline="Contact"
      title="Have a project in mind?"
      description="Tell me a little about what you're building. I reply to every message within two working days."
      class="scroll-mt-16 border-t border-(--ui-border) bg-(--ui-bg-muted)/50"
      :ui="{ container: 'py-16 sm:py-24 lg:py-24 lg:items-start' }"
    >
      <template #body>
        <ul class="space-y-5">
          <li
            v-for="method in contactMethods"
            :key="method.label"
            class="flex items-start gap-4"
          >
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg)"
            >
              <UIcon
                :name="method.icon"
                class="size-5 text-primary"
                aria-hidden="true"
              />
            </div>
            <div>
              <p class="text-sm text-(--ui-text-muted)">{{ method.label }}</p>
              <p class="font-medium text-(--ui-text-highlighted)">
                {{ method.value }}
              </p>
            </div>
          </li>
        </ul>
      </template>

      <UPageCard variant="outline" class="bg-(--ui-bg)">
        <UForm
          :schema="contactSchema"
          :state="contactState"
          class="space-y-5"
          @submit="onContactSubmit"
        >
          <div class="grid gap-5 sm:grid-cols-2">
            <UFormField label="Name" name="name" required>
              <UInput
                v-model="contactState.name"
                placeholder="Alex Cooper"
                autocomplete="name"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Email" name="email" required>
              <UInput
                v-model="contactState.email"
                type="email"
                placeholder="alex@company.com"
                autocomplete="email"
                class="w-full"
              />
            </UFormField>
          </div>
          <UFormField
            label="Message"
            name="message"
            help="Timeline, budget, and a link to anything relevant are all helpful."
            required
          >
            <UTextarea
              v-model="contactState.message"
              placeholder="Hi Jane, we're redesigning our onboarding and..."
              :rows="5"
              autoresize
              class="w-full"
            />
          </UFormField>
          <UButton
            type="submit"
            label="Send message"
            icon="i-lucide-send"
            size="lg"
            block
          />
        </UForm>
      </UPageCard>
    </UPageSection>

    <!-- Footer -->
    <UFooter class="border-t border-(--ui-border)">
      <template #left>
        <p class="text-sm text-(--ui-text-muted)">
          © 2026 Jane Doe. Designed and built in Lisbon.
        </p>
      </template>

      <template #right>
        <UButton
          v-for="social in socials"
          :key="social.label"
          :icon="social.icon"
          :to="social.to"
          :target="social.target"
          :aria-label="social.label"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>
