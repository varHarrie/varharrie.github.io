<template>
  <div ref="container" w:w="full" w:h="full" w:p="4"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

import { ensureArray } from '~/utils';

import type { SandboxInstance } from './sandbox/Sandbox';
import DefaultSandbox from './sandbox/Sandbox';
import VueSfcSandbox from './sandbox/VueSfcSandbox';
import type { LogRecord } from './types';

const sandboxes: Record<string, SandboxInstance> = {
  html: DefaultSandbox,
  'vue-sfc': VueSfcSandbox,
};

export type PreviewProps = {
  code: string;
  env: string;
};

export type PreviewEmits = {
  (event: 'log', log: LogRecord): void;
};

const props = defineProps<PreviewProps>();
const emit = defineEmits<PreviewEmits>();

const Sandbox: SandboxInstance = sandboxes[props.env] || sandboxes.html;

const container = ref<HTMLDivElement>();
const sandbox = new Sandbox();

const onMessage = (e: MessageEvent) => {
  const args = e.data.args;
  emit('log', { level: args.level, message: ensureArray(args.message) });
};

onMounted(() => {
  if (container.value) {
    sandbox.mount(container.value, props.code);
    window.addEventListener('message', onMessage);
  }
});

onUnmounted(() => {
  window.removeEventListener('message', onMessage);
});

watch(
  () => props.code,
  () => sandbox.update(props.code),
);
</script>
