<template>
  <div w:display="flex" w:flex="col" w:w="full" w:h="full">
    <ul w:p="!0" w:m="!0" w:display="flex" w:align="items-center">
      <li
        v-for="tab of context.panes"
        :key="tab.id"
        :class="{ active: context.activeId === tab.id }"
        class="item"
        @click="onClick(tab.id)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <div w:flex="1" w:h="min-0">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive } from 'vue';

import type { TabsContext } from './tab-context';
import { TabsInjectionKey } from './tab-context';

export type TabsProps = {
  activeId?: string;
};

export type TabsEmits = {
  (event: 'update:activeId', activeId: string): void;
};

const props = defineProps<TabsProps>();

const emit = defineEmits<TabsEmits>();

const context = reactive<TabsContext>({
  activeId: computed(() => props.activeId) as unknown as string,
  panes: [],
  register(id, title) {
    const existed = this.panes.find((p) => p.id === id);

    if (existed) {
      existed.title = title;
    } else {
      this.panes.push({ id, title });
    }
  },
  unregister(id) {
    this.panes = this.panes.filter((p) => p.id !== id);
  },
});

provide(TabsInjectionKey, context);

const onClick = (id: string) => {
  emit('update:activeId', id);
};
</script>

<style scoped>
.item {
  @apply relative px-4 h-10 leading-10 text-sm text-gray-400 dark:text-gray-500 cursor-pointer;
}

.item::after {
  @apply absolute bottom-0 left-3 right-3 block h-0 bg-blue-500 content-;
}

.item.active {
  @apply text-gray-600 dark:text-gray-400;
}

.item.active::after {
  @apply h-0.5;
}
</style>
