<script setup lang="ts">
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const activeTab = ref<"login" | "register">("login");

const loginFields = [
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "you@example.com",
    icon: "i-lucide-mail",
  },
  {
    name: "password",
    label: "Password",
    type: "password" as const,
    placeholder: "Enter your password",
    icon: "i-lucide-lock",
  },
];

const registerFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text" as const,
    placeholder: "John Doe",
    icon: "i-lucide-user",
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "you@example.com",
    icon: "i-lucide-mail",
  },
  {
    name: "password",
    label: "Password",
    type: "password" as const,
    placeholder: "Create a password",
    icon: "i-lucide-lock",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password" as const,
    placeholder: "Confirm your password",
    icon: "i-lucide-lock",
  },
];

const providers = [
  {
    label: "GitHub",
    icon: "i-lucide-github",
    color: "neutral" as const,
    variant: "outline" as const,
  },
  {
    label: "Google",
    icon: "i-lucide-chrome",
    color: "neutral" as const,
    variant: "outline" as const,
  },
];

function onLoginSubmit(event: any) {
  console.log("Login submitted:", event.data);
}

function onRegisterSubmit(event: any) {
  console.log("Register submitted:", event.data);
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md space-y-6">
      <!-- Logo / Brand -->
      <div class="text-center space-y-2">
        <div class="flex items-center justify-center gap-2">
          <UIcon name="i-lucide-palette" class="size-8 text-(--ui-primary)" />
          <span class="text-2xl font-bold text-(--ui-text-highlighted)"
            >Acme Inc</span
          >
        </div>
        <p class="text-sm text-(--ui-text-muted)">
          {{
            activeTab === "login"
              ? "Welcome back! Sign in to your account."
              : "Create your account to get started."
          }}
        </p>
      </div>

      <!-- Tab switcher -->
      <UTabs
        :items="[
          { label: 'Sign In', value: 'login' },
          { label: 'Sign Up', value: 'register' },
        ]"
        :model-value="activeTab"
        @update:model-value="activeTab = $event as 'login' | 'register'"
        class="w-full"
      />

      <!-- Login Form -->
      <UCard v-if="activeTab === 'login'">
        <div class="space-y-6">
          <!-- OAuth -->
          <div class="grid grid-cols-2 gap-3">
            <UButton
              v-for="provider in providers"
              :key="provider.label"
              v-bind="provider"
              block
            />
          </div>

          <USeparator label="or continue with" />

          <!-- Form -->
          <UForm
            :schema="loginSchema"
            :state="{ email: '', password: '' }"
            @submit="onLoginSubmit"
            class="space-y-4"
          >
            <UFormField
              v-for="field in loginFields"
              :key="field.name"
              :label="field.label"
              :name="field.name"
            >
              <template #hint>
                <ULink
                  v-if="field.name === 'password'"
                  class="text-xs text-(--ui-primary)"
                >
                  Forgot password?
                </ULink>
              </template>
              <UInput
                :type="field.type"
                :placeholder="field.placeholder"
                :icon="field.icon"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <div class="flex items-center gap-2">
              <UCheckbox label="Remember me" />
            </div>

            <UButton
              type="submit"
              label="Sign In"
              icon="i-lucide-log-in"
              block
              size="lg"
              color="primary"
            />
          </UForm>
        </div>
      </UCard>

      <!-- Register Form -->
      <UCard v-else>
        <div class="space-y-6">
          <!-- OAuth -->
          <div class="grid grid-cols-2 gap-3">
            <UButton
              v-for="provider in providers"
              :key="provider.label"
              v-bind="provider"
              block
            />
          </div>

          <USeparator label="or continue with" />

          <!-- Form -->
          <UForm
            :schema="registerSchema"
            :state="{ name: '', email: '', password: '', confirmPassword: '' }"
            @submit="onRegisterSubmit"
            class="space-y-4"
          >
            <UFormField
              v-for="field in registerFields"
              :key="field.name"
              :label="field.label"
              :name="field.name"
            >
              <UInput
                :type="field.type"
                :placeholder="field.placeholder"
                :icon="field.icon"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <div class="flex items-center gap-2">
              <UCheckbox>
                <template #label>
                  <span class="text-sm">
                    I agree to the
                    <ULink class="text-(--ui-primary) font-medium"
                      >Terms of Service</ULink
                    >
                    and
                    <ULink class="text-(--ui-primary) font-medium"
                      >Privacy Policy</ULink
                    >
                  </span>
                </template>
              </UCheckbox>
            </div>

            <UButton
              type="submit"
              label="Create Account"
              icon="i-lucide-user-plus"
              block
              size="lg"
              color="primary"
            />
          </UForm>
        </div>
      </UCard>

      <!-- Footer -->
      <p class="text-center text-xs text-(--ui-text-dimmed)">
        By continuing, you acknowledge that you have read and agree to our Terms
        of Service and Privacy Policy.
      </p>
    </div>
  </div>
</template>
