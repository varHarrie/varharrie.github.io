<template>
  <main w:p="x-8 y-12">
    <article>
      <template v-if="articleLoading || !article">
        <div class="skeleton" w:h="!8" w:w="1/3" />
      </template>
      <template v-else>
        <h2 w:text="2xl gray-700 dark:gray-300">{{ article?.title }}</h2>
      </template>
      <markdown-html v-if="article" w:m="t-8" :markdown="article.body" />
    </article>

    <section>
      <h2></h2>
      <ul v-if="commentsLoading"></ul>
      <ul v-else></ul>
      <div w:m="t-8" w:display="flex" w:justify="center">
        <pagination :page="page" :page-size="pageSize" :total="total" @change="onPageChange" />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import github from '~/services/github';
import ArticleModel from '~/models/ArticleModel';
import CommentModel from '~/models/CommentModel';
import useHandling from '~/composition/use-handling';
import MarkdownHtml from '~/components/MarkdownHtml.vue';
import Pagination from '~/components/Pagination.vue';

const route = useRoute();
const router = useRouter();

const id = computed(() => parseInt(route.params.id as string, 10) || 0);
const page = computed(() => parseInt(route.query.page as string, 10) || 1);
const pageSize = ref(10);

const article = ref<ArticleModel>();
const comments = ref<CommentModel[]>([]);

const total = computed(() => article.value?.comments ?? 0);

const [articleLoading, loadArticle] = useHandling(async () => {
  const result = await github.getIssue(id.value);
  article.value = ArticleModel.from(result);
}, true);

const [commentsLoading, loadComments] = useHandling(async () => {
  const result = await github.listComments({
    issue: id.value,
    page: page.value,
    pageSize: pageSize.value,
  });

  comments.value = result.map(CommentModel.from);
}, true);

watch(id, () => loadArticle(), { immediate: true, flush: 'post' });
watch(page, () => loadComments(), { immediate: true, flush: 'post' });

const onPageChange = (page: number) => router.push({ query: { page } });
</script>
