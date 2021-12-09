<template>
  <div ref="container" class="markdown-body" v-html="html" />
</template>

<script lang="ts" setup>
import 'github-markdown-css/github-markdown.css';

import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
import { App, createApp, nextTick, onMounted, ref, watch } from 'vue';

import Playground from '~/components/Playground/Playground.vue';

export type MarkdownHtmlProps = {
  playground?: boolean;
  markdown: string;
};

const props = defineProps<MarkdownHtmlProps>();

const parseArgs = (raw: string): Record<string, string> => {
  const re = /(\w+)="([^"]*)"/g;
  const args: Record<string, string> = {};

  for (const matched of raw.matchAll(re)) {
    args[matched[1]] = matched[2];
  }

  const [lang] = raw.split(' ', 1);
  if (lang) args['lang'] = lang;

  return args;
};

const highlight = (text: string, lang: string) => {
  const grammar = Prism.languages[lang] ?? Prism.languages.plain;
  return Prism.highlight(text, grammar, lang);
};

const container = ref<HTMLDivElement>();
const html = ref('');
const playgrounds = ref<App[]>([]);

const toHtml = (markdown: string) => {
  if (!markdown) return '';

  const md = new MarkdownIt({ highlight });
  const defaultFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const { content, info } = tokens[idx];
    const args = parseArgs(info);

    if (props.playground && args.playground) {
      const el = document.createElement('div');

      Object.assign(el.dataset, {
        playground: 'true',
        title: args.playground,
        env: args.playground,
        language: args.lang,
        defaultValue: content,
      });

      return el.outerHTML;
    }

    return defaultFence?.(tokens, idx, options, env, self) || '';
  };

  return md.render(props.markdown);
};

onMounted(() => {
  watch(
    () => props.markdown,
    async () => {
      if (!container.value) return;

      if (playgrounds.value.length) {
        playgrounds.value.forEach((app) => app.unmount());
        playgrounds.value = [];
      }

      html.value = toHtml(props.markdown);
      await nextTick();

      container.value.querySelectorAll('[data-playground]').forEach((el) => {
        const props = (el as HTMLDivElement).dataset;
        const app = createApp(Playground, props);

        app.mount(el);
        playgrounds.value.push(app);
      });
    },
    { immediate: true },
  );
});
</script>

<style>
.markdown-body {
  @apply dark:text-gray-300;
}

.markdown-body pre {
  @apply bg-white dark:bg-dark-600 shadow-md shadow-dark-50;
}
</style>
