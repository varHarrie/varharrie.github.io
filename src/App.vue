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
    >
      <router-link w:flex="1" :to="{ name: 'home' }">
        <h1 w:text="lg">
          <span w:text="xxl">&lt;</span>
          <span w:display="hidden lg:inline" w:m="x-0.5" w:text="blue-500">Harrie's Blog</span>
          <span w:display="inline lg:hidden" w:m="x-0.5" w:text="blue-500">H</span>
          <span w:text="xxl">/&gt;</span>
        </h1>
      </router-link>

      <nav w:display="grid" w:grid="gap-3 lg:gap-5 flow-col" w:font="leading-5">
        <router-link v-for="(tab, index) of tabs" :key="index" :to="tab.to" class="tab">
          <component :is="tab.icon" w:display="inline lg:hidden" />
          <span w:display="hidden lg:inline">{{ tab.title }}</span>
        </router-link>
        <a :href="githubUrl" target="_blank" class="tab">
          <icon-github />
        </a>
        <a href="javascript:void(0)" class="tab">
          <icon-light v-if="theme === 'dark'" @click="setTheme('light')" />
          <icon-dark v-else @click="setTheme('dark')" />
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

    <transition name="fade">
      <spin v-if="loadingRef" w:pos="!absolute top-22 left-1/2" w:z="2" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import IconArticles from 'virtual:vite-icons/ri/article-line';
import IconSnippets from 'virtual:vite-icons/ri/sticky-note-line';
import IconProjects from 'virtual:vite-icons/ri/function-line';
import IconAbout from 'virtual:vite-icons/ri/account-pin-box-line';
import IconGithub from 'virtual:vite-icons/ri/github-line';
import IconLight from 'virtual:vite-icons/ri/sun-line';
import IconDark from 'virtual:vite-icons/ri/moon-line';

import Spin from './components/Spin.vue';
import useTheme from './composition/use-theme';
import { debounce } from './utils';

const { t } = useI18n();
const router = useRouter();
const [theme, setTheme] = useTheme();

const githubUrl = import.meta.env.VITE_GITHUB_URL;

const tabs = [
  { title: t('tab.posts'), to: { name: 'posts' }, icon: IconArticles },
  { title: t('tab.snippets'), to: { name: 'snippets' }, icon: IconSnippets },
  { title: t('tab.projects'), to: { name: 'projects' }, icon: IconProjects },
  { title: t('tab.about'), to: { name: 'about' }, icon: IconAbout },
];

const loadingRef = ref(false);

const delaySetLoading = debounce((value: boolean) => {
  loadingRef.value = value;
}, 500);

let cleanBefore: (() => void) | undefined;
let cleanAfter: (() => void) | undefined;

onMounted(() => {
  cleanBefore = router.beforeEach(() => {
    loadingRef.value = true;
  });

  cleanAfter = router.afterEach(() => {
    delaySetLoading(false);
  });

  return () => {
    cleanBefore?.();
    cleanAfter?.();
  };
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply opacity-100 transition-opacity duration-300 ease-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

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
    "projects": "项目",
    "about": "关于"
  }
}
</i18n>

<i18n lang="json" locale="en">
{
  "tab": {
    "posts": "Posts",
    "snippets": "Snippets",
    "projects": "Projects",
    "about": "About"
  }
}
</i18n>
