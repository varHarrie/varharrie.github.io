<template>
  <li w:m="r-4">
    <router-link :to="getLink(label.name)" w:display="flex" w:align="items-center">
      <span :style="{ background: label.color }" w:w="2" w:h="2" w:border="rounded-full" />
      <span w:m="l-2">{{ label.name }}</span>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import LabelModel from '~/models/LabelModel';

export type LabelItemProps = {
  label: LabelModel;
  getLink: (label: string) => unknown;
};

defineProps<LabelItemProps>();
</script>
