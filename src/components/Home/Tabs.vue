<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  useSlots,
  watchEffect,
  type Component,
} from 'vue';

const slots = useSlots();

const props = defineProps<{
  tabs: string[];
}>();

const currentTab = ref(props.tabs[0]);
const indicator = ref<HTMLElement>();
const tabsRoot = ref<HTMLElement>();

const tabsContent = computed(() => {
  const contents: Record<string, { name: string; render: Component }> = {};

  for (const tab in slots) {
    contents[tab] = {
      name: tab,
      render: slots[tab] as Component,
    };
  }

  return contents;
});

watchEffect(() => {
  currentTab.value;
  if (!tabsRoot.value || !indicator.value) {
    return;
  }

  const activeTab = tabsRoot.value.querySelector(
    `[data-tab-trigger="${currentTab.value}"]`,
  ) as HTMLElement | null;

  if (activeTab) {
    indicator.value.style.width = `${activeTab.clientWidth}px`;
    indicator.value.style.height = `${activeTab.clientHeight}px`;
    indicator.value.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  }
});

function onTransitionEnd(e: AnimationEvent) {
  const el = e.target as HTMLElement;
  if (el.dataset.active === 'false') {
    el.style.display = 'none';
  }

  const nextEl = tabsRoot.value?.querySelector(
    `[data-tab-content="${currentTab.value}"]`,
  ) as HTMLElement;

  if (nextEl) {
    nextEl.style.display = 'block';
  }
}

function activateTab(tab: string) {
  const oldTabIdx = props.tabs.indexOf(currentTab.value);
  const newTabIdx = props.tabs.indexOf(tab);

  currentTab.value = tab;

  const oldTabEl = tabsRoot.value?.querySelector(
    `[data-tab-content="${props.tabs[oldTabIdx]}"]`,
  ) as HTMLElement;
  const newTabEl = tabsRoot.value?.querySelector(
    `[data-tab-content="${tab}"]`,
  ) as HTMLElement;

  oldTabEl.style.setProperty(
    '--direction',
    `${Math.sign(oldTabIdx - newTabIdx)}`,
  );
  newTabEl.style.setProperty(
    '--direction',
    `${Math.sign(newTabIdx - oldTabIdx)}`,
  );
}

function getInitialStyle(name: string) {
  if (tabsRoot.value) {
    return {};
  }

  return {
    display: name === currentTab.value ? undefined : 'none',
  };
}
</script>

<template>
  <div class="mt-5 w-full overflow-hidden" ref="tabsRoot">
    <div class="relative mb-8 flex shrink-0" role="tablist">
      <div
        ref="indicator"
        class="absolute rounded-full bg-gradient-to-r from-zinc-50 to-zinc-300 transition-all duration-300"
      ></div>

      <button
        v-for="tab in tabs"
        :key="tab"
        :data-tab-trigger="tab"
        class="relative flex bg-transparent px-4 py-2 text-center text-base font-semibold text-white transition-colors duration-300 select-none focus:text-balance aria-selected:text-black"
        role="tab"
        :aria-selected="currentTab === tab"
        @click="activateTab(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <div class="flex w-full max-w-full min-w-full overflow-hidden">
      <div
        v-for="tab in tabsContent"
        :key="tab.name"
        :data-active="currentTab === tab.name"
        :data-tab-content="tab.name"
        class="tab-content w-full flex-shrink-0"
        :style="getInitialStyle(tab.name)"
        @animationend="onTransitionEnd"
      >
        <component :is="tab.render" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference '@inject-css';

.tab-content {
  &[data-active='true'] {
    animation: slide-in 300ms ease;
  }

  &[data-active='false'] {
    animation: slide-out 300ms ease;
  }
}

@keyframes slide-out {
  to {
    transform: translateX(calc(var(--direction, 1) * 100%));
    opacity: 0;
  }
}

@keyframes slide-in {
  from {
    transform: translateX(calc(var(--direction, 1) * 100%));
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
