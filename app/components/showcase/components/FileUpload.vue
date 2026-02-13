<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default File Upload"
      description="Basic file input for selecting files."
    >
      <UFormField label="Attachment">
        <UFileUpload />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Accept Filter"
      description="Restricting to specific file types."
      :prop-hints="['accept']"
    >
      <UFormField
        label="Profile photo"
        description="PNG, JPG, or GIF up to 5 MB"
      >
        <UFileUpload accept="image/*" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Multiple Files"
      description="Allowing selection of more than one file."
      :prop-hints="['multiple']"
    >
      <UFormField label="Documents">
        <UFileUpload multiple accept=".pdf,.doc,.docx" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive file upload."
      :prop-hints="['disabled']"
    >
      <UFormField label="Upload (disabled)">
        <UFileUpload disabled />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>
