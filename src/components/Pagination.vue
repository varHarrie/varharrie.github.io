<template>
  <ul v-if="totalPages" class="pagination">
    <li :class="{ disabled: !hasPrevious }"><icon-arrow-left /></li>
    <li v-for="i of pages" :key="i" :class="{ active: i === page }" @click="onGoto(i)">{{ i }}</li>
    <li :class="{ disabled: !hastNext }"><icon-arrow-right /></li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';

import { clamp } from '~/utils';
import IconArrowLeft from '~icons/ri/arrow-left-s-line';
import IconArrowRight from '~icons/ri/arrow-right-s-line';

const RADIUS = 2;
const RANGE = 2 * RADIUS;

export type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
};

export type PaginationEmits = {
  (event: 'change', page: number): void;
};

const props = defineProps<PaginationProps>();

const emit = defineEmits<PaginationEmits>();

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const pages = computed(() => {
  if (totalPages.value < 1) return [];

  const start = clamp(
    props.page + RADIUS > totalPages.value ? totalPages.value - RANGE : props.page - RADIUS,
    1,
    totalPages.value,
  );

  const end = clamp(start + RANGE, start, totalPages.value);
  const length = end - start + 1;

  return Array.from({ length }).map((_, i) => start + i);
});

const hasPrevious = computed(() => props.page > 1);
const hastNext = computed(() => props.page < totalPages.value);

const onGoto = (page: number) => emit('change', page);
</script>

<style scoped>
.pagination {
  @apply space-x-4 flex items-center;
}

.pagination > li {
  @apply w-8 h-8 leading-8 rounded-sm text-gray-300 text-center cursor-pointer;
}

.pagination > li.active {
  @apply bg-blue-500 text-white dark:text-black;
}

.pagination > li.disabled {
  @apply opacity-30 cursor-not-allowed;
}

.pagination > li > svg {
  @apply align-middle;
}
</style>
