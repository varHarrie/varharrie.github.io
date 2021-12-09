<template>
  <li
    :id="`comment-${comment.id}`"
    w:pos="relative"
    w:m="t-8"
    w:p="t-8 l-12"
    w:border="t-1 light-700 dark:dark-300 solid"
  >
    <div w:pos="absolute top-8 left-0" w:w="8" w:h="8" w:border="rounded-full" w:overflow="hidden">
      <img :src="comment.user.avatarUrl" />
    </div>
    <header w:m="b-2" w:display="flex" w:align="items-center" w:text="sm" w:space="x-4">
      <a :href="comment.user.htmlUrl">{{ comment.user.login }}</a>
      <span
        v-if="comment.authorAssociation === 'OWNER'"
        w:p="x-1"
        w:text="xs white"
        w:font="leading-5"
        w:border="rounded-sm"
        w:bg="blue-500"
      >
        {{ t('owner') }}
      </span>
      <router-link :to="getLink(comment.id)" w:opacity="45" w:text="xs">
        {{ format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss') }}
      </router-link>
    </header>
    <markdown-html :markdown="comment.body" />
  </li>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { useI18n } from 'vue-i18n';

import CommentModel from '~/models/CommentModel';

import MarkdownHtml from './MarkdownHtml.vue';

export type CommentItemProps = {
  comment: CommentModel;
  getLink: (id: number) => unknown;
};

defineProps<CommentItemProps>();

const { t } = useI18n();
</script>

<i18n lang="json" locale="cn">
{
  "owner": "作者"
}
</i18n>

<i18n lang="json" locale="en">
{
  "owner": "Author"
}
</i18n>
