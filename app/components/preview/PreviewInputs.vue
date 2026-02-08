<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Form Inputs</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- Text input -->
      <div>
        <label for="preview-fullname" class="block text-sm font-medium mb-1"
          >Full Name</label
        >
        <UInput
          id="preview-fullname"
          v-model="name"
          placeholder="John Doe"
          icon="i-lucide-user"
        />
      </div>

      <!-- Email input -->
      <div>
        <label for="preview-email" class="block text-sm font-medium mb-1"
          >Email</label
        >
        <UInput
          id="preview-email"
          v-model="email"
          placeholder="john@example.com"
          type="email"
          icon="i-lucide-mail"
        />
      </div>

      <!-- Search input -->
      <div>
        <label for="preview-search" class="block text-sm font-medium mb-1"
          >Search</label
        >
        <UInput
          id="preview-search"
          v-model="search"
          placeholder="Search..."
          icon="i-lucide-search"
        />
      </div>

      <!-- Disabled input -->
      <div>
        <label for="preview-disabled" class="block text-sm font-medium mb-1"
          >Disabled</label
        >
        <UInput id="preview-disabled" model-value="Cannot edit this" disabled />
      </div>

      <!-- Textarea -->
      <div class="md:col-span-2">
        <label for="preview-message" class="block text-sm font-medium mb-1"
          >Message</label
        >
        <UTextarea
          id="preview-message"
          v-model="message"
          placeholder="Write your message here..."
          :rows="3"
        />
      </div>

      <!-- Select -->
      <div>
        <label for="preview-role" class="block text-sm font-medium mb-1"
          >Role</label
        >
        <USelect
          id="preview-role"
          v-model="selectedRole"
          :items="roles"
          placeholder="Select a role"
        />
      </div>

      <!-- Slider -->
      <div>
        <label for="preview-volume" class="block text-sm font-medium mb-1"
          >Volume: {{ volume }}%</label
        >
        <USlider
          id="preview-volume"
          v-model="volume"
          :min="0"
          :max="100"
          :step="1"
          aria-label="Volume"
        />
      </div>

      <!-- Switches -->
      <fieldset class="space-y-3">
        <legend class="text-sm font-medium mb-1">Switches</legend>
        <USwitch v-model="notifications" label="Enable notifications" />
        <USwitch v-model="darkMode" label="Dark mode" />
        <USwitch v-model="autoSave" label="Auto-save" />
      </fieldset>

      <!-- Checkboxes -->
      <fieldset class="space-y-3">
        <legend class="text-sm font-medium mb-1">Checkboxes</legend>
        <UCheckbox v-model="agreeTerms" label="I agree to the terms" />
        <UCheckbox v-model="newsletter" label="Subscribe to newsletter" />
        <UCheckbox v-model="rememberMe" label="Remember me" />
      </fieldset>
    </div>
  </section>
</template>

<script setup lang="ts">
const name = ref("Jane Smith");
const email = ref("jane@example.com");
const search = ref("");
const message = ref("");
const selectedRole = ref("Designer");
const roles = ["Admin", "Editor", "Designer", "Developer", "Viewer"];
const volume = ref(65);
const notifications = ref(true);
const darkMode = ref(false);
const autoSave = ref(true);
const agreeTerms = ref(true);
const newsletter = ref(false);
const rememberMe = ref(true);
</script>
