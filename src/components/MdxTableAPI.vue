<script setup lang="ts">
import {
  extractNamedTypeSignature,
  extractFunctionReturnTypeSignature,
} from '@utils/typePrinter';

const props = defineProps<{
  typeName?: string;
  fnName?: string;
}>();

if (!props.fnName && !props.typeName) {
  throw new Error('Either `fnName` or `typeName` must be provided.');
}

const { fields } = props.fnName
  ? extractFunctionReturnTypeSignature(props.fnName)
  : props.typeName
    ? extractNamedTypeSignature(props.typeName)
    : { fields: [] };
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>

    <tbody v-once>
      <tr v-for="field in fields" :key="field.name">
        <td class="text-sm font-semibold">{{ field.name }}</td>
        <td
          class="font-mono text-xs"
          :style="{
            '--popover-anchor-name': `--popover-${typeName || fnName}-${field.name}`,
          }"
        >
          <button
            class="w-max max-w-72 cursor-pointer truncate rounded bg-zinc-200/80 px-1 py-0.5 text-current dark:bg-zinc-700/50"
            :popovertarget="`popover-${typeName || fnName}-${field.name}`"
          >
            {{ field.type }}
          </button>

          <div
            v-if="field.truncated"
            :id="`popover-${typeName || fnName}-${field.name}`"
            popover
            class="rounded-md bg-zinc-200 p-2 text-sm shadow-md dark:bg-zinc-800"
          >
            {{ field.type }}
          </div>
        </td>
        <td class="text-sm">{{ field.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
button[popovertarget] {
  anchor-name: var(--popover-anchor-name);
}

[popover] {
  margin: 0;
  margin-top: 0.5rem;
  inset: auto;
  position-anchor: var(--popover-anchor-name);
  inset-area: bottom;
  position-area: bottom;
  opacity: 0;
  transition:
    opacity 0.1s allow-discrete,
    overlay 0.1s allow-discrete,
    display 0.1s allow-discrete;

  &:popover-open {
    opacity: 1;
  }
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
  }
}
</style>
