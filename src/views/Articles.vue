<template>
  <main w:p="x-8 y-12">
    <h2 v-if="category" w:text="2xl gray-500">
      {{ t(category.title) }}
    </h2>

    <div v-else class="skeleton" w:h="!8" w:w="24" />

    <ul v-if="articlesLoading" w:m="t-8">
      <article-ghost-item v-for="i of 8" :key="i" />
    </ul>

    <ul v-else w:m="t-8">
      <article-item
        v-for="article of articles"
        :key="article.id"
        :article="article"
        :get-link="getArticleLink"
        :get-label-link="getLabelLink"
      />
    </ul>

    <div w:m="t-8" w:display="flex" w:justify="center">
      <pagination :page="page" :page-size="pageSize" :total="total" @change="onPageChange" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import ArticleGhostItem from '~/components/ArticleGhostItem.vue';
import ArticleItem from '~/components/ArticleItem.vue';
import Pagination from '~/components/Pagination.vue';
import useHandling from '~/composition/use-handling';
import ArticleModel from '~/models/ArticleModel';
import CategoryModel from '~/models/CategoryModel';
import github from '~/services/github';

export type ArticlesProps = {
  milestone: number;
};

const props = defineProps<ArticlesProps>();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const label = computed(() => route.query.label as string);
const page = computed(() => parseInt(route.query.page as string, 10) || 1);
const pageSize = ref(10);

const category = ref<CategoryModel>();
const articles = ref<ArticleModel[]>([]);

const total = computed(() => category.value?.articles ?? 0);

const [articlesLoading, loadArticles] = useHandling(async () => {
  if (category.value?.number !== props.milestone) {
    const milestones = await github.listMilestones();
    const milestone = milestones.find((m) => m.number === props.milestone);
    category.value = milestone && CategoryModel.from(milestone);
  }

  const list = await github.listIssues({
    milestone: props.milestone,
    labels: label.value,
    page: page.value,
    pageSize: pageSize.value,
  });

  articles.value = list.map(ArticleModel.from);
}, true);

watch([props, label, page], () => loadArticles(), { immediate: true, flush: 'post' });

const getArticleLink = (id: number) => ({ path: route.path + '/' + id });
const getLabelLink = (label: string) => ({ path: route.path, query: { label, page: 1 } });

const onPageChange = (page: number) => router.push({ query: { page } });
</script>

<i18n lang="json" locale="cn">
{
  "Posts": "文章",
  "Snippets": "代码片段"
}
</i18n>

<i18n lang="json" locale="en">
{
  "Posts": "Posts",
  "Snippets": "Snippets"
}
</i18n>
