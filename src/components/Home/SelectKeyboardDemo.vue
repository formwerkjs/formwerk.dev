<script setup lang="ts">
import KeyboardKey from '@components/KeyboardKey.vue';
import SelectField from './SelectField.vue';
import { computed, onMounted, reactive, ref } from 'vue';

const countries = [
  { label: 'Argentina', value: 'ar' },
  { label: 'Australia', value: 'au' },
  { label: 'Brazil', value: 'br' },
  { label: 'Canada', value: 'ca' },
  { label: 'China', value: 'cn' },
  { label: 'France', value: 'fr' },
  { label: 'Germany', value: 'de' },
  { label: 'India', value: 'in' },
  { label: 'Italy', value: 'it' },
  { label: 'Japan', value: 'jp' },
  { label: 'Egypt', value: 'eg' },
  { label: 'Mexico', value: 'mx' },
  { label: 'South Africa', value: 'za' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'United States', value: 'us' },
];

const steps = reactive({
  focusNOpen: {
    done: false,
    target: 'select' as const,
    detectors: {
      onKeydown(e: KeyboardEvent) {
        if (steps.focusNOpen.done) {
          return false;
        }

        if (e.code === 'Space') {
          steps.focusNOpen.done = true;

          return true;
        }

        return false;
      },
    },
  },
  navigate: {
    done: false,
    state: { up: false, down: false },
    target: 'listbox' as const,
    detectors: {
      onKeydown(e: KeyboardEvent) {
        if (e.code === 'ArrowDown') {
          steps.navigate.state.down = true;
        }

        if (e.code === 'ArrowUp') {
          steps.navigate.state.up = true;
        }

        if (steps.navigate.state.up && steps.navigate.state.down) {
          steps.navigate.done = true;
          return true;
        }

        return false;
      },
    },
  },
  selectFocused: {
    done: false,
    target: 'option' as const,
    detectors: {
      onKeydown(e: KeyboardEvent) {
        if (e.code === 'Enter' || e.code === 'Space') {
          steps.selectFocused.done = true;
        }

        return false;
      },
    },
  },
  search: {
    done: false,
    target: 'listbox' as const,
    state: { query: '', timeout: null as number | null },
    detectors: {
      async onKeydown(e: KeyboardEvent) {
        if (e.code === 'KeyE') {
          steps.search.state.query += 'E';
        }

        if (steps.search.state.timeout) {
          clearTimeout(steps.search.state.timeout);
        }

        if (steps.search.state.query.length < 1) {
          return false;
        }

        steps.search.state.timeout = window.setTimeout(() => {
          steps.search.state.query = '';
        }, 1000);

        await new Promise((resolve) => setTimeout(resolve, 200));

        const demo = document.querySelector('#sel-demo');
        const listbox = demo?.querySelector('[aria-activedescendant]');
        const optId = listbox?.getAttribute('aria-activedescendant');
        if (optId && document.activeElement?.id === optId) {
          const option = demo?.querySelector(`#${optId}`);
          steps.search.done = option?.textContent === 'Egypt';

          return true;
        }

        return false;
      },
    },
  },
  findHome: {
    done: false,
    target: 'listbox' as const,
    detectors: {
      onKeydown(e: KeyboardEvent) {
        if (e.code === 'Home' || e.code === 'PageUp') {
          steps.findHome.done = true;

          return true;
        }

        return false;
      },
    },
  },
  findEnd: {
    done: false,
    target: 'listbox' as const,
    detectors: {
      onKeydown(e: KeyboardEvent) {
        if (e.code === 'End' || e.code === 'PageDown') {
          steps.findEnd.done = true;
        }

        return false;
      },
    },
  },
});

onMounted(() => {
  const listbox = document.querySelector(
    '#interactive-select [role="listbox"]',
  );
  const select = document.querySelector('#interactive-select');
  const options = document.querySelectorAll(
    '#interactive-select [role="option"]',
  );

  for (const step of Object.values(steps)) {
    if (step.target === 'select') {
      select?.addEventListener('keydown', (e) => {
        step.detectors.onKeydown(e as KeyboardEvent);
      });
    }

    if (step.target === 'listbox') {
      listbox?.addEventListener('keydown', (e) => {
        step.detectors.onKeydown(e as KeyboardEvent);
      });
    }

    if (step.target === 'option') {
      for (const option of options) {
        option.addEventListener('keydown', (e) => {
          step.detectors.onKeydown(e as KeyboardEvent);
        });
      }
    }
  }
});
</script>

<template>
  <div
    id="sel-demo"
    class="flex flex-col items-stretch rounded-lg border border-zinc-700/70 bg-zinc-800/60 py-8 backdrop-blur-sm lg:flex-row lg:px-8 lg:py-0"
  >
    <div class="flex w-full flex-shrink items-center justify-center pr-8">
      <SelectField
        id="interactive-select"
        label="Select a country"
        :options="countries"
        :get-option-value="(option) => option.value"
      />
    </div>

    <div
      class="flex flex-grow flex-col border-t border-zinc-700/70 py-8 pl-8 lg:border-l lg:border-t-0"
    >
      <h3 class="mb-4 text-lg font-semibold text-white">
        Try the following interactions:
      </h3>

      <ul
        class="flex flex-col gap-3 whitespace-nowrap text-white"
        data-theme="dark"
      >
        <li :class="{ 'is-done': steps.focusNOpen.done }">
          Focus the field, then press
          <KeyboardKey code="Space" label="Space" />.
        </li>
        <li :class="{ 'is-done': steps.navigate.done }">
          Move through the list with
          <KeyboardKey code="ArrowDown" /> and <KeyboardKey code="ArrowUp" />.
        </li>
        <li :class="{ 'is-done': steps.selectFocused.done }">
          Select the focused option with
          <KeyboardKey code="Enter" /> or <KeyboardKey code="Space" />.
        </li>
        <li :class="{ 'is-done': steps.search.done }">
          Find "Egypt" in the list by typing "E...".
        </li>
        <li :class="{ 'is-done': steps.findEnd.done }">
          Focus the last option with
          <KeyboardKey code="End" /> or
          <KeyboardKey code="PageDown" label="Page Down" />.
        </li>
        <li :class="{ 'is-done': steps.findHome.done }">
          Focus the first option with
          <KeyboardKey code="Home" /> or
          <KeyboardKey code="PageUp" label="Page Up" />.
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
li {
  @apply inline-flex items-center gap-1 transition-colors duration-200;

  &::before {
    content: '';
    @apply mr-1 block size-5 rounded-full border-2 border-zinc-600 transition-colors duration-200;
  }

  &.is-done {
    @apply pointer-events-none text-zinc-500;

    &::before {
      @apply border-emerald-500 bg-emerald-500 bg-center;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%23fff' viewBox='0 0 256 256'%3E%3Cpath d='M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z'%3E%3C/path%3E%3C/svg%3E");
    }
  }
}
</style>
