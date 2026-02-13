<script setup lang="ts">
const sizes = ["sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Label & Help"
      description="Form field with label, placeholder, and help text."
      :prop-hints="['label', 'help']"
    >
      <UFormField label="Email address" help="We'll never share your email.">
        <UInput type="email" placeholder="you@example.com" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Required & Error"
      description="Required field displaying an error message."
      :prop-hints="['required', 'error']"
    >
      <UFormField label="Username" required error="This field is required.">
        <UInput placeholder="johndoe" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Description"
      description="Additional description below the label."
      :prop-hints="['description']"
    >
      <UFormField
        label="Password"
        description="Must be at least 8 characters with one uppercase letter."
      >
        <UInput type="password" placeholder="••••••••" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Form fields at different sizes."
      :prop-hints="['size']"
    >
      <div class="space-y-4">
        <UFormField
          v-for="size in sizes"
          :key="size"
          :label="`Size ${size}`"
          :size="size"
        >
          <UInput :placeholder="`Input size ${size}`" />
        </UFormField>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
