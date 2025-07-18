<template>
  <div
    ref="replContainer"
    class="preview-container not-content group relative mt-8 flex flex-col overflow-hidden rounded-md"
    :style="{
      '--preview-size': `${sizes[props.previewSize || 'md']}px`,
    }"
  >
    <button
      class="absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-md bg-zinc-800 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      type="button"
      title="Open in Stackblitz"
      @click="openInStackblitz"
    >
      <VscodeIconsStackblitz class="size-4" />
    </button>

    <Repl
      ref="replRef"
      :store="store"
      :height="sizes[props.previewSize || 'md']"
      :show-ts-config="false"
      :showCompileOutput="false"
      :ssr="false"
      :showImportMap="false"
      :preview-options="
        customCode
          ? {
              customCode: {
                useCode: customCode,
              },
            }
          : undefined
      "
    />

    <div
      v-if="tabs.length > 1 && !props.previewOnly"
      class="flex items-center border-t border-zinc-700 bg-zinc-950"
    >
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.filename"
        type="button"
        :hidden="tab.hidden"
        :aria-selected="activeFile === tab.filename"
        class="group relative flex cursor-pointer items-center gap-1 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-500 transition-colors duration-200 aria-selected:bg-zinc-800 aria-selected:text-white"
        @click="activeFile = tab.filename"
      >
        <component v-if="tab.icon" :is="tab.icon" class="size-4" />
        {{ tab.filename }}
        <div
          class="absolute right-0 bottom-0 left-px z-10 hidden h-0.5 translate-y-px bg-emerald-500 group-aria-selected:block"
        ></div>
      </button>
    </div>

    <div class="files-container">
      <MdxReplFile
        v-for="file in files"
        :key="file.filename"
        :name="file.filename"
        :active="activeFile === file.filename"
        :hidden="file.hidden"
        :preview-only="props.previewOnly"
      >
        <component :is="file.render" />
      </MdxReplFile>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  markRaw,
  onMounted,
  ref,
  useSlots,
  version,
  type Component,
  type Ref,
} from 'vue';
import { rewriteTypeImports, useVueImportMap } from './Repl/importMap';
import { merge, omit } from 'lodash-es';
import { useStore } from './Repl/store';
import Types from '@formwerk/core/dist/core.d.ts?raw';
import { version as fwVersion } from '@formwerk/core';
import VueIcon from '~icons/vscode-icons/file-type-vue';
import TsIcon from '~icons/vscode-icons/file-type-typescript';
import CssIcon from '~icons/vscode-icons/file-type-css';
import VscodeIconsStackblitz from '~icons/vscode-icons/file-type-stackblitz';
import type { SFCOptions } from './Repl/types';
import MdxReplFile from './MdxReplFile.vue';
import Stackblitz from '@stackblitz/sdk';
import { getViteProjectConfig } from '@utils/fork';

const Repl = defineAsyncComponent(() => import('./Repl.vue'));

const props = defineProps<{
  hideErrors?: boolean;
  importMaps?: Record<string, string>;
  customCode?: string;
  activeFile?: string;
  previewSize?: 'md' | 'lg' | 'xl';
  previewOnly?: boolean;
}>();

const isExpanded = ref(false);

const sizes = {
  sm: 150,
  md: 180,
  lg: 300,
  xl: 420,
};

const fileIcons: Record<string, Component> = {
  vue: markRaw(VueIcon),
  ts: markRaw(TsIcon),
  css: markRaw(CssIcon),
};

const replContainer = ref<HTMLElement>();
const replRef = ref<InstanceType<typeof Repl>>();

// use a specific version of Vue
const { importMap, vueVersion } = useVueImportMap({
  vueVersion: version,
});

const store = useStore({
  builtinImportMap: computed(() =>
    merge(importMap.value, {
      imports: {
        'klona/full': 'https://unpkg.com/klona@2.0.6/full/index.mjs',
        '@standard-schema/utils':
          'https://unpkg.com/@standard-schema/utils@0.3.0/dist/index.js',
        vue: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.prod.js`,
        '@formwerk/core': `https://unpkg.com/@formwerk/core@${fwVersion}/dist/core.mjs`,
        '@internationalized/date': `https://esm.sh/@internationalized/date`,
        zod: 'https://unpkg.com/@awaddev/zod@3.23.8-standard-schema/lib/index.mjs',
        '@vueuse/core': 'https://unpkg.com/@vueuse/core?module',
        '@formwerk/devtools': 'https://esm.sh/@formwerk/devtools',
      },
    }),
  ),
  vueVersion,
});

const staticFsFiles: Record<string, string> = {
  'src/formwerk-core-types.d.ts': Types,
};

store.sfcOptions = merge(store.sfcOptions || {}, {
  script: {
    inlineTemplate: import.meta.env.PROD,
    fs: {
      fileExists: (filename) => {
        return filename in staticFsFiles;
      },
      readFile: (filename) => {
        return staticFsFiles[filename];
      },
      realpath: (filename) => {
        return filename;
      },
    },
  },
} as SFCOptions);

store.setFiles({
  'App.vue': `<template>Loading...</template>`,
});

const { files, activeFile, tabs } = useSlotFiles();

onMounted(async () => {
  if (!replContainer.value) {
    return;
  }

  const contents: Record<string, string> = {};
  for (const file in files.value) {
    const fileEl = replContainer.value.querySelector(
      `[data-file-name="${file}"]`,
    ) as HTMLElement | null;
    if (fileEl) {
      const content = rewriteTypeImports(fileEl.textContent || '');
      if (fileEl.hidden) {
        files.value[file].hidden = true;
      }

      contents[file] = content ?? '<template>Failed to load file</template>';
    }
  }

  store.setFiles(contents);
});

function useSlotFiles() {
  const slots = useSlots();
  const slotFiles: Record<
    string,
    { render: Component; hidden: boolean; filename: string }
  > = {};
  for (const slot in slots) {
    const hidden = slot.startsWith('!');
    const slotName = slot.replace('!', '');

    slotFiles[`${slotName}`] = {
      render: markRaw(defineComponent(() => () => slots[slot]?.())),
      hidden,
      filename: slotName,
    };
  }

  const files: Ref<
    Record<string, { render: Component; hidden: boolean; filename: string }>
  > = ref(slotFiles);

  const tabs = computed(() => {
    return Object.keys(files.value)
      .filter((f) => !files.value[f].hidden)
      .map((f) => {
        const ext = f.split('.').pop();
        const icon = ext ? fileIcons[ext] : null;

        return {
          ...files.value[f],
          filename: f,
          icon,
        };
      })
      .sort((a, b) => {
        if (a.filename === 'App.vue' && b.filename !== 'App.vue') {
          return 1;
        }

        if (a.filename !== 'App.vue' && b.filename === 'App.vue') {
          return -1;
        }

        return 0;
      });
  });

  const activeFile = ref(
    props.activeFile || tabs.value[0]?.filename || Object.keys(slotFiles)[0],
  );

  return { files, tabs, activeFile };
}

async function openInStackblitz() {
  Stackblitz.openProject(
    await getViteProjectConfig(
      omit(store.getFiles(), ['main.js', 'import-map.json']),
    ),
    {
      newWindow: true,
      openFile: 'App.vue',
    },
  );
}
</script>

<style scoped>
@reference '@inject-css';

.preview-container {
  @apply border-0 ring-1 ring-zinc-700;

  &:deep(.iframe-container) {
    height: var(--preview-size, 100%);
  }

  &:deep(pre) {
    border: none;
    border-top-width: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

.files-container {
  background: var(--ec-frm-edBg);
}
</style>
