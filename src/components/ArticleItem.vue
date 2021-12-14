<template>
  <li
    w:display="flex"
    w:flex="col"
    w:justify="center"
    w:h="20"
    w:border="t-1 dotted gray-300 dark:gray-700"
  >
    <dl w:display="flex" w:align="items-center">
      <dt w:display="hidden lg:block" w:w="36" w:text="sm gray-400 right">{{ createdAt }}</dt>
      <dd w:m="l-4" w:flex="1" w:w="min-0" w:text="truncate">
        <router-link :to="getLink(article.number)">
          {{ article.title }}
        </router-link>
      </dd>
    </dl>

    <dl w:m="t-1" w:display="flex" w:align="items-center">
      <dt w:display="hidden lg:block" w:w="36" w:text="sm gray-400 right">
        <icon-comments w:text="middle" />
        {{ article.comments }}
      </dt>
      <dd w:m="l-4" w:flex="1" w:w="min-0" w:text="truncate">
        <ul w:display="flex" w:text="sm gray-400">
          <label-item
            v-for="label of article.labels"
            :key="label.id"
            :label="label"
            :get-link="getLabelLink"
          />
        </ul>
      </dd>
    </dl>
  </li>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import ArticleModel from '~/models/ArticleModel';
import IconComments from '~icons/ri/chat-2-line';

import LabelItem from './LabelItem.vue';

export type ArticleItemProps = {
  article: ArticleModel;
  getLink: (id: number) => unknown;
  getLabelLink: (label: string) => unknown;
};

const props = defineProps<ArticleItemProps>();

const { t } = useI18n();
const createdAt = computed(() => format(new Date(props.article.createdAt), t('format')));
</script>

<i18n lang="json" locale="cn">
{
  "format": "yyyy / MM / dd"
}
</i18n>

<i18n lang="json" locale="en">
{
  "format": "MMM dd, yyyy"
}
</i18n>
