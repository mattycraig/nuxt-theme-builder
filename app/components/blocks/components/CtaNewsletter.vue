<template>
  <section>
    <UPageCta
      title="Stay in the loop"
      description="Get the latest updates, tutorials, and product news delivered straight to your inbox. No spam, unsubscribe anytime."
    >
      <div class="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
        <UInput
          placeholder="you@example.com"
          icon="i-lucide-mail"
          size="lg"
          type="email"
          class="flex-1"
          aria-label="Email address"
        />
        <UButton
          label="Subscribe"
          icon="i-lucide-send"
          size="lg"
          color="primary"
          trailing
        />
      </div>
    </UPageCta>
  </section>
</template>
