<template>
  <div class="flex w-full max-w-sm flex-col items-center pt-10">
    <div class="absolute right-2 top-3 flex flex-col items-end gap-1 text-xs">
      <label for="view-select ">Current View</label>
      <select id="view-select" class="rounded-md py-1 text-sm" v-model="view">
        <option value="weeks">Week View</option>
        <option value="months">Month View</option>
        <option value="years">Year View</option>
      </select>
    </div>

    <div class="flex w-full items-center justify-between">
      <AnatomyPart text="Previous Month" position="top">
        <PhCaretLeft />
      </AnatomyPart>

      <AnatomyPart text="Grid Label" position="top">
        <span>September 2025</span>
      </AnatomyPart>

      <AnatomyPart text="Next Month" position="top">
        <PhCaretRight />
      </AnatomyPart>
    </div>

    <AnatomyPart
      :text="
        currentView.type === 'weeks'
          ? 'Grid (7 columns)'
          : currentView.type === 'months'
            ? 'Grid (3 columns)'
            : 'Grid (3 columns)'
      "
      class="w-full rounded-md border border-dashed border-zinc-500 p-2"
      position="bottom"
    >
      <div
        v-if="currentView.type === 'weeks'"
        class="mt-3 grid w-full grid-cols-7"
      >
        <div
          v-for="day in currentView.weekDays"
          :key="day"
          class="flex flex-col items-center justify-center font-medium text-zinc-200"
        >
          {{ day }}
        </div>

        <template v-for="day in currentView.days" :key="day.value.toString()">
          <div
            v-if="!day.focused"
            class="flex items-center justify-center rounded-full border-2 aria-disabled:opacity-50"
            :class="{
              'text-zinc-500': day.isOutsideMonth,
              'text-white': !day.isOutsideMonth,
              'border-transparent': !day.isToday,
            }"
          >
            {{ day.label }}
          </div>

          <AnatomyPart
            v-else
            text="Calendar Cell"
            position="left"
            class="flex items-center justify-center rounded-full border-2 border-zinc-500 text-white aria-disabled:opacity-50"
          >
            {{ day.label }}
          </AnatomyPart>
        </template>
      </div>

      <div v-if="currentView.type === 'months'" class="grid grid-cols-3 gap-2">
        <template
          v-for="month in currentView.months"
          :key="month.value.toString()"
        >
          <div
            v-if="!month.selected"
            class="flex items-center justify-center rounded-md border border-zinc-600 p-1"
          >
            {{ month.label }}
          </div>
          <AnatomyPart
            v-else
            text="Calendar Cell"
            position="right"
            class="flex items-center justify-center rounded-md border border-zinc-600 p-1"
          >
            {{ month.label }}
          </AnatomyPart>
        </template>
      </div>

      <div v-if="currentView.type === 'years'" class="grid grid-cols-3 gap-2">
        <template
          v-for="year in currentView.years"
          :key="year.value.toString()"
        >
          <div
            v-if="!year.selected"
            class="flex items-center justify-center rounded-md border border-zinc-600 p-1"
          >
            {{ year.label }}
          </div>
          <AnatomyPart
            v-else
            text="Calendar Cell"
            position="left"
            class="flex items-center justify-center rounded-md border border-zinc-600 p-1"
          >
            {{ year.label }}
          </AnatomyPart>
        </template>
      </div>
    </AnatomyPart>
  </div>
</template>

<script setup lang="ts">
import { useCalendar } from '@formwerk/core';
import { computed } from 'vue';
import AnatomyPart from './AnatomyPart.vue';
import PhCaretLeft from '~icons/ph/caret-left';
import PhCaretRight from '~icons/ph/caret-right';

const { currentView, setView } = useCalendar({
  label: 'Select a date',
  modelValue: new Date('2025-09-14'),
});

const view = computed({
  get: () => currentView.value.type,
  set: (value) => setView(value as CalendarView),
});
</script>
