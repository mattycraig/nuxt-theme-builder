<script setup lang="ts">
import {
  today,
  getLocalTimeZone,
  type CalendarDate,
} from "@internationalized/date";

const selectedDate = shallowRef(today(getLocalTimeZone())) as Ref<CalendarDate>;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Single Date"
      description="Calendar picker for selecting a single date."
    >
      <div class="flex flex-col sm:flex-row items-start gap-4">
        <UCalendar v-model="selectedDate" />
        <div class="text-sm text-(--ui-text-muted)">
          <p class="font-medium">Selected date:</p>
          <p>{{ selectedDate ? selectedDate.toString() : "None" }}</p>
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Inline Calendar"
      description="Calendar rendered inline without selection feedback."
    >
      <UCalendar />
    </ShowcaseSpecimen>
  </div>
</template>
