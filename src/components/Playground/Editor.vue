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
import Prism from 'prismjs';
import { ref, watch } from 'vue';

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

const highlighted = ref('');

const highlight = () => {
  const grammar = Prism.languages[props.language] ?? Prism.languages.plain;
  highlighted.value = Prism.highlight(props.value, grammar, props.language);
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

.code,
.highlighted {
  @apply whitespace-pre-wrap break-words overflow-hidden;
  @apply !text-base !leading-6 dark:caret-light-50 !font-base;
}

.code {
  @apply absolute top-0 left-0 h-full w-full resize-none bg-transparent outline-none;
  -webkit-text-fill-color: transparent;
}

.highlighted {
  @apply relative m-0 p-0 pointer-events-none !bg-transparent shadow-transparent;
}
</style>
