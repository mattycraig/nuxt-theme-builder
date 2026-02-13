<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Basic Validation"
      description="Form with required field validation using Zod schema."
    >
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 max-w-sm"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email" required>
          <UInput
            v-model="state.email"
            type="email"
            placeholder="you@example.com"
          />
        </UFormField>
        <UFormField label="Password" name="password" required>
          <UInput
            v-model="state.password"
            type="password"
            placeholder="••••••••"
          />
        </UFormField>
        <UButton type="submit" label="Sign In" />
      </UForm>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Inline Error Messages"
      description="Fields with error and help text displayed inline."
    >
      <div class="space-y-3 max-w-sm">
        <UFormField label="Username" required error="Username is already taken">
          <UInput model-value="johndoe" color="error" />
        </UFormField>
        <UFormField label="Bio" help="Max 160 characters.">
          <UTextarea placeholder="Tell us about yourself..." />
        </UFormField>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive({
  email: "",
  password: "",
});

function onSubmit() {
  // handled by UForm validation
}
</script>
