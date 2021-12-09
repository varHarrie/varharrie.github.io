<template>
  <main w:p="x-8 y-20" w:text="center">
    <h2 w:text="4xl gray-600 dark:gray-300" w:font="bold leading-15" v-html="t('intro.title')" />

    <p w:m="t-4" w:text="gray-300 dark:gray-600" v-html="t('intro.description')" />

    <router-link :to="{ name: 'posts' }">
      <button
        w:m="t-10"
        w:p="y-3 x-6"
        w:border="rounded-full"
        w:outline="!none"
        w:bg="blue-400 :active:blue-500"
        w:text="blue-50"
        w:transition="all"
      >
        <span>{{ t('intro.checkOut') }}</span>
        <icon-arrow-right w:m="l-2" w:text="middle" />
      </button>
    </router-link>
  </main>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import IconArrowRight from '~icons/ri/arrow-right-line';

const { t } = useI18n();
</script>

<i18n lang="json" locale="cn">
{
  "intro": {
    "title": "你好，我是Harrie",
    "description": "一个全栈的Web开发者，主要专注于Node.js、Vue、React等技术",
    "checkOut": "开始阅读"
  }
}
</i18n>

<i18n lang="json" locale="en">
{
  "intro": {
    "title": "Hi, I'm Harrie",
    "description": "A full-stack web developer, focuses on Node.js, Vue, React and other technologies",
    "checkOut": "Check out my Posts"
  }
}
</i18n>
