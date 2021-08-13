<template>
  <li
    w:display="flex"
    w:flex="col"
    w:justify="center"
    w:h="20"
    w:border="t-1 dotted gray-300 dark:gray-700"
  >
    <dl w:display="flex" w:align="items-center">
      <dt class="skeleton" w:display="hidden lg:block" w:w="36" />
      <dd w:m="l-4" w:flex="1">
        <div class="skeleton" :style="{ width: titleWidth() }" />
      </dd>
    </dl>
    <dl w:m="t-1" w:display="flex" w:align="items-center">
      <dt w:display="hidden lg:block" w:w="36">
        <div class="skeleton" w:w="10" w:float="right" />
      </dt>
      <dd w:m="l-4" w:display="flex" w:flex="1">
        <div v-for="i of labelCount()" :key="i" class="skeleton" w:m="r-4" w:w="10" />
      </dd>
    </dl>
  </li>
</template>

<script lang="ts" setup>
const titleWidth = () => 50 + Math.random() * 50 + '%';

const labelCount = () => Math.floor(Math.random() * 3) + 1;
</script>
