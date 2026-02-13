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

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Text Inputs"
      description="Standard text fields with icons and placeholder text."
      :prop-hints="['icon', 'placeholder']"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div>
          <label for="preview-disabled" class="block text-sm font-medium mb-1"
            >Disabled</label
          >
          <UInput
            id="preview-disabled"
            model-value="Cannot edit this"
            disabled
          />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Textarea"
      description="Multi-line text input for longer content such as messages or descriptions."
    >
      <label for="preview-message" class="block text-sm font-medium mb-1"
        >Message</label
      >
      <UTextarea
        id="preview-message"
        v-model="message"
        placeholder="Write your message here..."
        :rows="3"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Select"
      description="A single-selection dropdown for choosing from a predefined list."
    >
      <label for="preview-role" class="block text-sm font-medium mb-1"
        >Role</label
      >
      <USelect
        id="preview-role"
        v-model="selectedRole"
        :items="roles"
        placeholder="Select a role"
        class="max-w-xs"
        :aria-label="`Role: ${selectedRole}`"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Slider"
      description="Continuous range input for numeric values."
      :prop-hints="['min', 'max', 'step']"
    >
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
        class="max-w-sm"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Switches"
      description="Toggle switches for boolean settings."
    >
      <div class="space-y-3">
        <USwitch v-model="notifications" label="Enable notifications" />
        <USwitch v-model="darkMode" label="Dark mode" />
        <USwitch v-model="autoSave" label="Auto-save" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Checkboxes"
      description="Checkbox group for multi-select options."
    >
      <div class="space-y-3">
        <UCheckbox v-model="agreeTerms" label="I agree to the terms" />
        <UCheckbox v-model="newsletter" label="Subscribe to newsletter" />
        <UCheckbox v-model="rememberMe" label="Remember me" />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
