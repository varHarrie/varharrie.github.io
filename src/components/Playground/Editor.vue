<template>
  <label class="editor">
    <div w:pos="relative">
      <textarea
        class="code"
        :value="value"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        @input="onChange"
      />
      <pre class="highlighted" v-html="highlighted" />
    </div>
  </label>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Prism from 'prismjs';

import light from 'prism-themes/themes/prism-vs.css?raw';
import dark from 'prism-themes/themes/prism-vsc-dark-plus.css?raw';
import useTheme from '~/composition/use-theme';

export type EditorProps = {
  value: string;
  language: string;
};

export type EditorEmits = {
  (event: 'update:value', value: string): void;
  (event: 'change', value: string): void;
};

const props = defineProps<EditorProps>();

const emit = defineEmits<EditorEmits>();

const themes = { light, dark };
const theme = useTheme();

watch(
  () => theme.mode,
  async () => {
    const existed = document.getElementById('editor-theme');
    if (existed) existed.remove();

    const module = await import(
      /* @vite-ignore */
      'data:text/javascript;charset=utf-8,' + encodeURIComponent(themes[theme.mode])
    );

    const style = document.createElement('style');
    style.setAttribute('id', 'editor-theme');
    style.setAttribute('mode', theme.mode);
    style.textContent = module.default;
    document.head.appendChild(style);
  },
  { immediate: true },
);

const highlighted = ref('');

const highlight = () => {
  highlighted.value = Prism.highlight(props.value, Prism.languages[props.language], props.language);
};

watch([() => props.value, () => props.value], highlight, { immediate: true });

const onChange = (e: Event) => {
  const el = e.target as HTMLTextAreaElement;
  emit('update:value', el.value);
  emit('change', el.value);
};
</script>

<style scopped>
.editor {
  @apply p-4 block h-full overflow-auto;
}

.editor::-webkit-scrollbar {
  @apply w-2;
}

.editor::-webkit-scrollbar-thumb {
  @apply bg-light-800 dark:bg-dark-100;
}

.code,
.highlighted {
  @apply whitespace-pre-wrap break-words overflow-hidden;
  @apply text-base leading-6 dark:caret-light-50;
}

.code {
  @apply absolute top-0 left-0 h-full w-full resize-none bg-transparent outline-none;
  -webkit-text-fill-color: transparent;
}

.highlighted {
  @apply relative m-0 p-0 pointer-events-none;
  font-family: inherit;
}
</style>
