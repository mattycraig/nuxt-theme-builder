<script setup lang="ts">
definePageMeta({
  layout: "coming-soon",
});

const password = ref("");
const error = ref("");
const loading = ref(false);

async function unlock() {
  error.value = "";
  loading.value = true;

  try {
    await $fetch("/api/auth/launch", {
      method: "POST",
      body: { password: password.value },
    });
    await navigateTo("/", { replace: true });
  } catch {
    error.value = "Invalid password. Please try again.";
    password.value = "";
  } finally {
    loading.value = false;
  }
}

useSeoMeta({
  title: "Coming Soon — Nuxt UI Theme Builder",
  description:
    "Nuxt UI Theme Builder is launching soon. Stay tuned for the ultimate design token editor.",
  robots: "noindex, nofollow",
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 bg-(--ui-bg) text-(--ui-text)"
  >
    <div class="w-full max-w-md text-center space-y-8">
      <!-- Logo / Icon -->
      <div class="flex justify-center">
        <div
          class="size-16 rounded-2xl bg-(--ui-color-primary-500) flex items-center justify-center"
        >
          <UIcon name="i-lucide-palette" class="size-8 text-white" aria-hidden="true" />
        </div>
      </div>

      <!-- Heading -->
      <div class="space-y-3">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
          Coming Soon
        </h1>
        <p class="text-(--ui-text-muted) text-lg">
          Nuxt UI Theme Builder is not quite ready yet.
          <br >
          We're putting the finishing touches on something great.
        </p>
      </div>

      <!-- Password form -->
      <form class="space-y-4" @submit.prevent="unlock">
        <label for="launch-password" class="sr-only"> Access password </label>
        <UInput
          id="launch-password"
          v-model="password"
          type="password"
          placeholder="Enter access password"
          size="lg"
          autocomplete="off"
          :disabled="loading"
          icon="i-lucide-lock"
          class="w-full"
        />

        <p
          v-if="error"
          role="alert"
          class="text-sm text-(--ui-color-error-500)"
        >
          {{ error }}
        </p>

        <UButton
          type="submit"
          label="Unlock"
          size="lg"
          block
          :loading="loading"
          :disabled="!password.trim()"
          icon="i-lucide-arrow-right"
          trailing
        />
      </form>

      <!-- Footer note -->
      <p class="text-xs text-(--ui-text-dimmed)">
        Have early access? Enter your password above.
      </p>
    </div>
  </div>
</template>
