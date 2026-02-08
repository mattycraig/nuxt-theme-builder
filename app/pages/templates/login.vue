<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

definePageMeta({ layout: "preview" });
useSeoMeta({ title: "Login — Nuxt UI Theme Builder" });

const toast = useToast();

const activeTab = ref<"login" | "register">("login");

// ---------- Login ----------
const loginSchema = z.object({
  email: z.string("Email is required").email("Please enter a valid email"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
type LoginSchema = z.output<typeof loginSchema>;

const loginFields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "remember",
    type: "checkbox",
    label: "Remember me",
  },
];

// ---------- Register ----------
const registerSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z.string("Email is required").email("Please enter a valid email"),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type RegisterSchema = z.output<typeof registerSchema>;

const registerFields: AuthFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Create a password",
    required: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    required: true,
  },
];

// ---------- Providers ----------
const providers = [
  {
    label: "GitHub",
    icon: "i-lucide-github",
    color: "neutral" as const,
    variant: "subtle" as const,
    onClick: () => {
      toast.add({ title: "GitHub", description: "Login with GitHub" });
    },
  },
  {
    label: "Google",
    icon: "i-lucide-chrome",
    color: "neutral" as const,
    variant: "subtle" as const,
    onClick: () => {
      toast.add({ title: "Google", description: "Login with Google" });
    },
  },
];

// ---------- Handlers ----------
function onLoginSubmit(payload: FormSubmitEvent<LoginSchema>) {
  toast.add({
    title: "Signed in",
    description: `Welcome back, ${payload.data.email}`,
    color: "success",
  });
}

function onRegisterSubmit(payload: FormSubmitEvent<RegisterSchema>) {
  toast.add({
    title: "Account created",
    description: `Welcome, ${payload.data.name}!`,
    color: "success",
  });
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <!-- Brand header -->
    <div class="mb-8 flex items-center gap-2">
      <UIcon name="i-lucide-palette" class="size-8 text-(--ui-primary)" />
      <span class="text-2xl font-bold text-(--ui-text-highlighted)"
        >Acme Inc</span
      >
    </div>

    <!-- Tab switcher -->
    <div class="w-full max-w-sm sm:max-w-md mb-6">
      <UTabs
        :items="[
          { label: 'Sign In', value: 'login' },
          { label: 'Sign Up', value: 'register' },
        ]"
        :model-value="activeTab"
        class="w-full"
        @update:model-value="activeTab = $event as 'login' | 'register'"
      />
    </div>

    <!-- Sign In -->
    <UPageCard v-if="activeTab === 'login'" class="w-full max-w-sm sm:max-w-md">
      <UAuthForm
        :schema="loginSchema"
        :fields="loginFields"
        :providers="providers"
        title="Welcome back!"
        description="Sign in to your account to continue."
        icon="i-lucide-lock"
        separator="or continue with email"
        :submit="{ label: 'Sign In', icon: 'i-lucide-log-in', block: true }"
        @submit="onLoginSubmit"
      >
        <template #password-hint>
          <ULink class="text-primary font-medium text-xs" tabindex="-1"
            >Forgot password?</ULink
          >
        </template>

        <template #footer>
          By signing in, you agree to our
          <ULink class="text-primary font-medium">Terms of Service</ULink>.
        </template>
      </UAuthForm>
    </UPageCard>

    <!-- Sign Up -->
    <UPageCard v-else class="w-full max-w-sm sm:max-w-md">
      <UAuthForm
        :schema="registerSchema"
        :fields="registerFields"
        :providers="providers"
        title="Create an account"
        description="Get started with Acme Inc today."
        icon="i-lucide-user-plus"
        separator="or continue with email"
        :submit="{
          label: 'Create Account',
          icon: 'i-lucide-user-plus',
          block: true,
        }"
        @submit="onRegisterSubmit"
      >
        <template #footer>
          By signing up, you agree to our
          <ULink class="text-primary font-medium">Terms of Service</ULink>
          and
          <ULink class="text-primary font-medium">Privacy Policy</ULink>.
        </template>
      </UAuthForm>
    </UPageCard>

    <!-- Bottom text -->
    <p class="mt-8 text-center text-xs text-(--ui-text-dimmed) max-w-sm">
      Protected by reCAPTCHA and subject to the Acme Inc Privacy Policy and
      Terms of Service.
    </p>
  </div>
</template>
