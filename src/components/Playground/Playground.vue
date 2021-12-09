<template>
  <div
    w:display="flex"
    w:flex="col"
    w:h="200 lg:120"
    w:border="rounded"
    w:bg="white dark:dark-600"
    w:shadow="md dark-50"
    w:overflow="hidden"
  >
    <header
      w:p="x-4"
      w:display="flex"
      w:align="items-center"
      w:h="10"
      w:border="b-1 solid light-500 dark:dark-300"
      w:text="gray-600 dark:gray-400 sm"
    >
      <icon-code />
      <div w:m="l-2" w:flex="1" w:w="min-0">{{ title }}</div>
      <span w:m="l-auto" w:cursor="pointer" w:font="leading-0" title="copy" @click="onCopy">
        <fade-transition>
          <icon-check v-if="copied" w:text="green-500" />
          <icon-copy v-else w:text="hover:blue-500" />
        </fade-transition>
      </span>
    </header>
    <div w:display="flex" w:flex="1 col lg:row" w:h="min-0">
      <section w:flex="1" w:h="min-0">
        <tabs active-id="source">
          <tab-pane id="source" title="Source">
            <editor :value="code" :language="language" @change="onChange" />
          </tab-pane>
        </tabs>
      </section>
      <section
        w:flex="1"
        w:h="min-0"
        w:border="l-0 lg:l-1 t-1 lg:t-0 light-500 dark:dark-300 solid"
      >
        <tabs v-model:active-id="activeTab">
          <tab-pane id="preview" title="Preview">
            <preview :code="code" :env="env" @log="onLog" />
          </tab-pane>
          <tab-pane id="console" title="Console">
            <Console :logs="logs" />
          </tab-pane>
        </tabs>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import copy from 'copy-to-clipboard';
import { ref } from 'vue';

import FadeTransition from '~/components/FadeTransition.vue';
import useControlledRef from '~/composition/use-controlled-ref';
import IconCheck from '~icons/ri/checkbox-circle-fill';
import IconCode from '~icons/ri/code-s-slash-line';
import IconCopy from '~icons/ri/file-copy-2-line';

import Console from './Console.vue';
import Editor from './Editor.vue';
import Preview from './Preview.vue';
import TabPane from './TabPane.vue';
import Tabs from './Tabs.vue';
import type { LogRecord } from './types';

export type PlaygroundProps = {
  title?: string;
  language?: string;
  env?: string;
  value?: string;
  defaultValue?: string;
};

export type PlaygroundEmits = {
  (event: 'change', value: string): void;
};

const props = withDefaults(defineProps<PlaygroundProps>(), {
  title: 'Playground',
  language: 'html',
  env: 'html',
  value: undefined,
  defaultValue: '',
});

const emit = defineEmits<PlaygroundEmits>();

const activeTab = ref('preview');

const code = useControlledRef(() => props.value, props.defaultValue);

const onChange = (value: string) => {
  code.value = value;
  emit('change', value);
};

const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;

const onCopy = () => {
  copied.value = copy(code.value);
  if (copyTimer) clearTimeout(copyTimer);

  copyTimer = setTimeout(() => {
    copied.value = false;
    copyTimer = undefined;
  }, 2000);
};

const logs = ref<LogRecord[]>([]);

const onLog = (log: LogRecord) => {
  logs.value.push(log);
};
</script>
