<template>
  <section>
    <h2 class="text-lg font-semibold mb-4">Cards</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Card with header, body, footer -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">Project Overview</h3>
            <UBadge label="Active" color="success" variant="soft" />
          </div>
        </template>

        <p class="text-sm text-(--ui-text-muted)">
          This project is currently in development. All milestones are on track
          and the team is making steady progress toward the Q2 deadline.
        </p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              label="Details"
              color="neutral"
              variant="ghost"
              size="sm"
            />
            <UButton label="Open" color="primary" variant="solid" size="sm" />
          </div>
        </template>
      </UCard>

      <!-- Simple card -->
      <UCard>
        <div class="flex items-center gap-3 mb-3">
          <UAvatar
            src="https://i.pravatar.cc/128?u=alice"
            alt="Alice Johnson"
            size="lg"
          />
          <div>
            <p class="font-semibold">Alice Johnson</p>
            <p class="text-sm text-(--ui-text-muted)">Lead Designer</p>
          </div>
        </div>
        <p class="text-sm text-(--ui-text-muted)">
          Passionate about creating intuitive interfaces and building design
          systems that scale across products.
        </p>
      </UCard>

      <!-- Card with form -->
      <UCard>
        <template #header>
          <h3 class="font-semibold">Quick Feedback</h3>
        </template>

        <div class="space-y-3">
          <UInput
            placeholder="Your name"
            icon="i-lucide-user"
            aria-label="Your name"
          />
          <UTextarea
            placeholder="Write your feedback..."
            :rows="3"
            aria-label="Your feedback"
          />
        </div>

        <template #footer>
          <UButton label="Submit" color="primary" variant="solid" block />
        </template>
      </UCard>
    </div>
  </section>
</template>
