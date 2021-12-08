<template>
  <li
    w:pos="relative"
    w:p="3 l-15"
    w:display="inline-block"
    w:bg="white dark:dark-800"
    w:border="rounded-md"
    w:shadow="sm hover:md dark:transparent"
    w:transition="all duration-300"
  >
    <div class="icon" :style="{ color: icon.color }">
      <component :is="icon.component" />
    </div>
    <a :href="project.htmlUrl" w:text="blue-500 sm">{{ project.fullName }}</a>
    <div class="line-clamp-2" w:m="t-2" w:text="gray-500 sm">{{ project.description }}</div>
    <ul
      w:display="flex"
      w:m="t-2"
      w:w="min-0"
      w:space="x-3"
      w:text="sm gray-400"
      w:font="leading-5"
    >
      <li>
        <icon-star w:text="top" />
        <span w:m="l-2">{{ project.stargazersCount }}</span>
      </li>
      <li>
        <icon-forked w:text="top" />
        <span w:m="l-2">{{ project.forksCount }}</span>
      </li>
      <li>
        <icon-issue w:text="top" />
        <span w:m="l-2">{{ project.openIssuesCount }}</span>
      </li>
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { Component } from 'vue';
import IconDefault from 'virtual:vite-icons/ri/code-s-slash-line';
import IconTs from 'virtual:vite-icons/teenyicons/typescript-outline';
import IconJs from 'virtual:vite-icons/teenyicons/javascript-outline';
import IconHtml from 'virtual:vite-icons/ri/html5-line';
import IconCss from 'virtual:vite-icons/ri/css3-line';
import IconVue from 'virtual:vite-icons/ri/vuejs-line';
import IconCS from 'virtual:vite-icons/vscode-icons/file-type-csharp';
import IconStar from 'virtual:vite-icons/octicon/star-16';
import IconForked from 'virtual:vite-icons/octicon/repo-forked-16';
import IconIssue from 'virtual:vite-icons/octicon/issue-opened-16';
import ProjectModel from '~/models/ProjectModel';

type IconDetail = {
  component: Component;
  color: string;
};

const iconMap: Record<string, IconDetail> = {
  default: { component: IconDefault, color: '' },
  TypeScript: { component: IconTs, color: '#3178C6' },
  JavaScript: { component: IconJs, color: '#FCD002' },
  HTML: { component: IconHtml, color: '#FF3C41' },
  CSS: { component: IconCss, color: '#10BDFF' },
  Vue: { component: IconVue, color: '#41B883' },
  'C#': { component: IconCS, color: '#368833' },
};

export type ProjectItemProps = {
  project: ProjectModel;
};

const props = defineProps<ProjectItemProps>();

const icon = computed(() => iconMap[props.project.language] ?? iconMap.default);
</script>

<style scoped>
.icon {
  @apply absolute top-3 left-3 flex items-center justify-center w-9 h-9 rounded-md overflow-hidden font-bold;
}

.icon::before {
  @apply absolute top-0 left-0 block content- w-full h-full opacity-15;
  background-color: currentColor;
}
</style>
