<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Form Inputs</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <!-- Text input -->
      <div>
        <label class="block text-sm font-medium mb-1">Full Name</label>
        <UInput v-model="name" placeholder="John Doe" icon="i-lucide-user" />
      </div>

      <!-- Email input -->
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <UInput
          v-model="email"
          placeholder="john@example.com"
          type="email"
          icon="i-lucide-mail"
        />
      </div>

      <!-- Search input -->
      <div>
        <label class="block text-sm font-medium mb-1">Search</label>
        <UInput
          v-model="search"
          placeholder="Search..."
          icon="i-lucide-search"
        />
      </div>

      <!-- Disabled input -->
      <div>
        <label class="block text-sm font-medium mb-1">Disabled</label>
        <UInput model-value="Cannot edit this" disabled />
      </div>

      <!-- Textarea -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-1">Message</label>
        <UTextarea
          v-model="message"
          placeholder="Write your message here..."
          :rows="3"
        />
      </div>

      <!-- Select -->
      <div>
        <label class="block text-sm font-medium mb-1">Role</label>
        <USelect
          v-model="selectedRole"
          :items="roles"
          placeholder="Select a role"
        />
      </div>

      <!-- Slider -->
      <div>
        <label class="block text-sm font-medium mb-1"
          >Volume: {{ volume }}%</label
        >
        <USlider v-model="volume" :min="0" :max="100" :step="1" />
      </div>

      <!-- Switches -->
      <div class="space-y-3">
        <label class="block text-sm font-medium mb-1">Switches</label>
        <USwitch v-model="notifications" label="Enable notifications" />
        <USwitch v-model="darkMode" label="Dark mode" />
        <USwitch v-model="autoSave" label="Auto-save" />
      </div>

      <!-- Checkboxes -->
      <div class="space-y-3">
        <label class="block text-sm font-medium mb-1">Checkboxes</label>
        <UCheckbox v-model="agreeTerms" label="I agree to the terms" />
        <UCheckbox v-model="newsletter" label="Subscribe to newsletter" />
        <UCheckbox v-model="rememberMe" label="Remember me" />
      </div>
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
