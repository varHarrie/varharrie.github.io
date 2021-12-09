<template>
  <div v-show="active" w:w="full" w:h="full">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onUnmounted, watch } from 'vue';

import { TabsInjectionKey } from './tab-context';

export type TabPaneProps = {
  id: string;
  title: string;
};

const props = defineProps<TabPaneProps>();

const context = inject(TabsInjectionKey);

const active = computed(() => context?.activeId === props.id);

watch(props, () => context?.register(props.id, props.title), { immediate: true });

onUnmounted(() => context?.unregister(props.id));
</script>
