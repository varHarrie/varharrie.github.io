<template>
  <main w:p="x-8 y-12">
    <h2 w:text="2xl gray-500">
      {{ t('title') }}
    </h2>

    <ul v-if="projectLoading" w:m="t-8" w:display="grid" w:grid="cols-1 lg:cols-2 gap-2">
      <project-ghost-item v-for="i of 10" :key="i" />
    </ul>

    <ul v-else w:m="t-8" w:display="grid" w:grid="cols-1 lg:cols-2 gap-2">
      <project-item v-for="project of projects" :key="project.id" :project="project" />
    </ul>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ProjectGhostItem from '~/components/ProjectGhostItem.vue';
import ProjectItem from '~/components/ProjectItem.vue';
import useHandling from '~/composition/use-handling';
import ProjectModel from '~/models/ProjectModel';
import github, { Direction, RepositorySort, RepositoryType } from '~/services/github';

const { t } = useI18n();

const projects = ref<ProjectModel[]>([]);

const [projectLoading, loadProject] = useHandling(async () => {
  const list = await github.listRepositories({
    type: RepositoryType.All,
    sort: RepositorySort.Pushed,
    direction: Direction.Desc,
    page: 1,
    pageSize: 50,
  });

  projects.value = list
    .map(ProjectModel.from)
    .filter((p) => p.stargazersCount > 0 && !p.archived && !p.disabled)
    .sort((a, b) => b.stargazersCount - a.stargazersCount);
}, true);

onMounted(() => loadProject());
</script>

<i18n lang="json" locale="cn">
{
  "title": "项目"
}
</i18n>

<i18n lang="json" locale="en">
{
  "title": "Projects"
}
</i18n>
