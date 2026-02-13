<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Pin Input"
      description="Multi-digit code entry for OTP or verification."
    >
      <UFormField label="Verification Code">
        <UPinInput v-model="pin" :length="6" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="4-Digit Code"
      description="Shorter pin input for simpler codes."
      :prop-hints="['length']"
    >
      <UFormField label="PIN">
        <UPinInput v-model="shortPin" :length="4" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Masked Input"
      description="Pin input with masked character display."
      :prop-hints="['mask']"
    >
      <UFormField label="Secret Code">
        <UPinInput v-model="maskedPin" :length="4" mask />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive pin input."
      :prop-hints="['disabled']"
    >
      <UFormField label="Locked">
        <UPinInput :length="4" disabled />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const pin = ref<string[]>([]);
const shortPin = ref<string[]>([]);
const maskedPin = ref<string[]>([]);
</script>
