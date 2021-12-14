<template>
  <div id="app" w:pos="relative" w:m="x-auto" w:p="b-16" w:w="max-screen-lg" w:h="min-100vh">
    <header
      w:pos="sticky top-0"
      w:z="1"
      w:display="flex"
      w:p="x-8"
      w:h="22"
      w:align="items-center"
      w:text="gray-400"
      w:bg="opacity-80 gray-50 dark:dark-500"
      w:backdrop="filter blur-sm saturate-150"
    >
      <router-link :to="{ name: 'home' }">
        <h1 w:text="lg">
          <span>{</span>
          <span w:m="x-0.5" w:text="blue-500">{{ title }}</span>
          <span>}</span>
        </h1>
      </router-link>

      <nav w:m="l-auto" w:display="grid" w:grid="gap-3 lg:gap-5 flow-col" w:font="leading-5">
        <router-link v-for="(tab, index) of tabs" :key="index" :to="tab.to" class="tab">
          <component :is="tab.icon" w:display="inline lg:hidden" />
          <span w:display="hidden lg:inline">{{ tab.title }}</span>
        </router-link>
        <a :href="`mailto:${email}`" class="tab">
          <icon-email />
        </a>
        <a :href="githubUrl" target="_blank" class="tab">
          <icon-github />
        </a>
        <a href="javascript:void(0)" class="tab" @click="onToggleLanguage">
          <icon-language />
        </a>
        <a href="javascript:void(0)" class="tab">
          <icon-light v-if="theme.mode === 'dark'" @click="theme.setMode('light')" />
          <icon-dark v-else @click="theme.setMode('dark')" />
        </a>
      </nav>
    </header>

    <router-view />

    <footer
      w:pos="absolute bottom-4 left-0"
      w:w="full"
      w:text="sm center gray-300 dark:gray-600"
      w:select="none"
    >
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
      <span m="l-2">2021 © varHarrie</span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import IconPosts from '~icons/ri/article-line';
import IconProjects from '~icons/ri/function-line';
import IconGithub from '~icons/ri/github-line';
import IconLanguage from '~icons/ri/global-line';
import IconEmail from '~icons/ri/mail-line';
import IconDark from '~icons/ri/moon-line';
import IconSnippets from '~icons/ri/sticky-note-line';
import IconLight from '~icons/ri/sun-line';

import useTheme from './composition/use-theme';

const { t } = useI18n();
const { locale } = useI18n({ useScope: 'global' });
const theme = useTheme();

const title = import.meta.env.VITE_TITLE;
const email = import.meta.env.VITE_EMAIL;
const githubUrl = import.meta.env.VITE_GITHUB_URL;

const tabs = computed(() => [
  { title: t('tab.posts'), to: { name: 'posts' }, icon: IconPosts },
  { title: t('tab.snippets'), to: { name: 'snippets' }, icon: IconSnippets },
  { title: t('tab.projects'), to: { name: 'projects' }, icon: IconProjects },
]);

const onToggleLanguage = () => {
  locale.value = locale.value === 'cn' ? 'en' : 'cn';
};
</script>

<style scoped>
.tab {
  @apply opacity-60 hover:opacity-100 hover:text-blue-500;
}

.tab.router-link-active {
  @apply opacity-100 text-blue-500;
}
</style>

<i18n lang="json" locale="cn">
{
  "tab": {
    "posts": "文章",
    "snippets": "代码片段",
    "projects": "项目"
  }
}
</i18n>

<i18n lang="json" locale="en">
{
  "tab": {
    "posts": "Posts",
    "snippets": "Snippets",
    "projects": "Projects"
  }
}
</i18n>
