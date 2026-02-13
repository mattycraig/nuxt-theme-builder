<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Grouped Fields"
      description="Visually group related form fields with a label and description."
      :prop-hints="['label', 'description']"
    >
      <UFieldGroup
        label="Personal Information"
        description="Please provide your basic details."
      >
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="First name">
            <UInput placeholder="John" />
          </UFormField>
          <UFormField label="Last name">
            <UInput placeholder="Doe" />
          </UFormField>
        </div>
      </UFieldGroup>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Nested Groups"
      description="Multiple field groups stacked within a form."
    >
      <div class="space-y-6">
        <UFieldGroup label="Account" description="Your login credentials.">
          <div class="space-y-3">
            <UFormField label="Email">
              <UInput
                type="email"
                placeholder="you@example.com"
                icon="i-lucide-mail"
              />
            </UFormField>
            <UFormField label="Password">
              <UInput
                type="password"
                placeholder="••••••••"
                icon="i-lucide-lock"
              />
            </UFormField>
          </div>
        </UFieldGroup>
        <UFieldGroup
          label="Preferences"
          description="Customize your experience."
        >
          <div class="space-y-3">
            <UFormField label="Language">
              <USelect
                :items="['English', 'French', 'German', 'Spanish']"
                placeholder="Select language"
              />
            </UFormField>
          </div>
        </UFieldGroup>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
