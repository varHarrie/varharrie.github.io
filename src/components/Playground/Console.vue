<template>
  <ul class="list">
    <li v-for="(log, i) of logs" :key="i" class="item" :class="log.level">
      <component :is="levelToIcon[log.level]" class="icon" />
      <p>
        <span v-for="(msg, j) of log.message" :key="j">
          {{ msg }}
        </span>
      </p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import IconRight from 'virtual:vite-icons/ri/arrow-right-s-line';
import IconWarning from 'virtual:vite-icons/ri/error-warning-fill';
import IconError from 'virtual:vite-icons/ri/close-circle-fill';
import IconFatal from 'virtual:vite-icons/ri/bug-fill';

import type { LogRecord } from './types';

export type ConsoleProps = {
  logs: LogRecord[];
};

defineProps<ConsoleProps>();

const levelToIcon = {
  log: IconRight,
  info: IconRight,
  warn: IconWarning,
  error: IconError,
  fatal: IconFatal,
};
</script>

<style scoped>
.list {
  @apply w-full h-full overflow-auto;
}

.list::-webkit-scrollbar {
  @apply w-2;
}

.list::-webkit-scrollbar-thumb {
  @apply bg-light-800 dark:bg-dark-100;
}

.item {
  @apply p-1 flex items-center text-gray-600 dark:text-gray-400 border-b-1 border-light-500 dark:border-dark-300 border-solid;
}

.item .icon {
  @apply mr-1 opacity-80 text-sm;
}

.item.info {
  @apply text-blue-500;
}

.item.warn {
  @apply text-orange-500;
}

.item.error {
  @apply text-red-500;
}
</style>
