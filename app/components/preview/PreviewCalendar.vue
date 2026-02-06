<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Calendar</h3>

    <div class="flex flex-col sm:flex-row items-start gap-4">
      <UCalendar v-model="selectedDate" />
      <div class="text-sm text-(--ui-text-muted)">
        <p class="font-medium">Selected date:</p>
        <p>{{ selectedDate ? selectedDate.toString() : "None" }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { today, getLocalTimeZone } from "@internationalized/date";

const selectedDate = ref(today(getLocalTimeZone()));
</script>
