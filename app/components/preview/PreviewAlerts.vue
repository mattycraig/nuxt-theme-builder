<template>
  <section>
    <h2 class="text-lg font-semibold mb-4">Alerts</h2>

    <div class="space-y-3">
      <UAlert
        title="Operation successful"
        description="Your changes have been saved and deployed to production."
        color="success"
        variant="soft"
        icon="i-lucide-check-circle"
      />
      <UAlert
        title="Information"
        description="A new software update is available for your account. Review the changelog for details."
        color="info"
        variant="soft"
        icon="i-lucide-info"
      />
      <UAlert
        title="Warning"
        description="Your storage usage is approaching the limit. Consider upgrading your plan."
        color="warning"
        variant="soft"
        icon="i-lucide-triangle-alert"
      />
      <UAlert
        title="Error occurred"
        description="Unable to connect to the server. Please check your network and try again."
        color="error"
        variant="soft"
        icon="i-lucide-x-circle"
      />
    </div>
  </section>
</template>
