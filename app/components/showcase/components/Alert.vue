<script setup lang="ts">
const semanticColorsAlerts = [
  {
    title: "Operation successful",
    description: "Your changes have been saved and deployed to production.",
    color: "success" as const,
    variant: "soft" as const,
    icon: "i-lucide-check-circle",
  },
  {
    title: "Information",
    description:
      "A new software update is available. Review the changelog for details.",
    color: "info" as const,
    variant: "soft" as const,
    icon: "i-lucide-info",
  },
  {
    title: "Warning",
    description:
      "Your storage usage is approaching the limit. Consider upgrading.",
    color: "warning" as const,
    variant: "soft" as const,
    icon: "i-lucide-triangle-alert",
  },
  {
    title: "Error occurred",
    description:
      "Unable to connect to the server. Check your network and try again.",
    color: "error" as const,
    variant: "soft" as const,
    icon: "i-lucide-x-circle",
  },
];

const outlineVariantAlerts = [
  {
    title: "Deployment complete",
    description: "Version 2.4.1 is now live in production.",
    color: "success" as const,
    variant: "outline" as const,
    icon: "i-lucide-rocket",
  },
  {
    title: "Scheduled maintenance",
    description: "System will be unavailable on Feb 15, 2-4 AM UTC.",
    color: "warning" as const,
    variant: "outline" as const,
    icon: "i-lucide-clock",
  },
];

const subtleVariantAlerts = [
  {
    title: "Tip",
    description: "You can use keyboard shortcuts to navigate faster.",
    color: "info" as const,
    variant: "subtle" as const,
    icon: "i-lucide-lightbulb",
  },
  {
    title: "Remember",
    description:
      "Auto-save is enabled. Your work is preserved every 30 seconds.",
    color: "neutral" as const,
    variant: "subtle" as const,
    icon: "i-lucide-save",
  },
];

const withActionsAlerts = [
  {
    title: "New version available",
    description:
      "Version 3.0 includes performance improvements and new features.",
    color: "info" as const,
    variant: "soft" as const,
    icon: "i-lucide-download",
    actions: [
      {
        label: "Update Now",
        color: "info" as const,
        variant: "solid" as const,
      },
      { label: "Later", color: "neutral" as const, variant: "ghost" as const },
    ],
  },
  {
    title: "Payment failed",
    description:
      "Your last payment could not be processed. Please update your billing info.",
    color: "error" as const,
    variant: "soft" as const,
    icon: "i-lucide-credit-card",
    actions: [
      {
        label: "Update Payment",
        color: "error" as const,
        variant: "solid" as const,
      },
    ],
  },
];

const titleOnlyAlerts = [
  {
    title: "File uploaded successfully.",
    color: "success" as const,
    variant: "soft" as const,
    icon: "i-lucide-check",
  },
  {
    title: "Your session will expire in 5 minutes.",
    color: "warning" as const,
    variant: "soft" as const,
    icon: "i-lucide-timer",
  },
  {
    title: "Access denied. Contact an administrator.",
    color: "error" as const,
    variant: "soft" as const,
    icon: "i-lucide-shield-alert",
  },
];

const neutralAlert = {
  title: "Note",
  description:
    "This action cannot be undone. Please review your changes carefully before proceeding.",
  color: "neutral" as const,
  variant: "soft" as const,
  icon: "i-lucide-info",
};
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Semantic Colors"
      description="Status alerts for success, info, warning, and error states."
      :prop-hints="['variant=soft']"
    >
      <div class="space-y-3">
        <UAlert
          v-for="(alert, index) in semanticColorsAlerts"
          :key="index"
          v-bind="alert"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Outline Variant"
      description="Alerts with a more pronounced border emphasis."
      :prop-hints="['variant=outline']"
    >
      <div class="space-y-3">
        <UAlert
          v-for="(alert, index) in outlineVariantAlerts"
          :key="index"
          v-bind="alert"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Subtle Variant"
      description="Low-emphasis alerts that blend into the background."
      :prop-hints="['variant=subtle']"
    >
      <div class="space-y-3">
        <UAlert
          v-for="(alert, index) in subtleVariantAlerts"
          :key="index"
          v-bind="alert"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Actions"
      description="Alerts that include call-to-action buttons."
    >
      <div class="space-y-3">
        <UAlert
          v-for="(alert, index) in withActionsAlerts"
          :key="index"
          v-bind="alert"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Title Only"
      description="Compact alerts with just a title for brief notifications."
    >
      <div class="space-y-3">
        <UAlert
          v-for="(alert, index) in titleOnlyAlerts"
          :key="index"
          v-bind="alert"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Neutral Alert"
      description="General-purpose alert without semantic color emphasis."
      :prop-hints="['color=neutral']"
    >
      <UAlert v-bind="neutralAlert" />
    </ShowcaseSpecimen>
  </div>
</template>
