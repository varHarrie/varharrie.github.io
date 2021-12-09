<template>
  <ul class="list">
    <li v-for="(log, i) of logs" :key="i" class="item" :class="log.level">
      <component :is="levelToIcon[log.level]" class="icon" />
      <p class="content">
        <span v-for="(msg, j) of log.message" :key="j">
          {{ msg }}
        </span>
      </p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import IconRight from '~icons/ri/arrow-right-s-line';
import IconFatal from '~icons/ri/bug-fill';
import IconError from '~icons/ri/close-circle-fill';
import IconWarning from '~icons/ri/error-warning-fill';

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
  @apply m-0 p-0 w-full h-full overflow-auto leading-4 text-sm;
}

.item {
  @apply p-1 flex items-center text-gray-600 dark:text-gray-400 border-b-1 border-light-500 dark:border-dark-300 border-solid;
}

.item .icon {
  @apply mr-1 opacity-80 text-sm;
}

.item .content {
  @apply m-0;
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
