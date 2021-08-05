<template>
  <li
    w:display="flex"
    w:flex="col"
    w:justify="center"
    w:h="20"
    w:border="t-1 dotted gray-300 dark:gray-700"
    w:animate="pulse"
  >
    <dl w:display="flex" w:align="items-center">
      <dt class="block" w:display="hidden lg:block" w:w="36" />
      <dd w:m="l-4" w:flex="1">
        <div class="block" :style="{ width: titleWidth() }" />
      </dd>
    </dl>
    <dl w:m="t-1" w:display="flex" w:align="items-center">
      <dt w:display="hidden lg:block" w:w="36">
        <div class="block" w:w="10" w:float="right" />
      </dt>
      <dd w:m="l-4" w:display="flex" w:flex="1">
        <div v-for="i of labelCount()" :key="i" class="block" w:m="r-4" w:w="10" />
      </dd>
    </dl>
  </li>
</template>

<script lang="ts" setup>
const titleWidth = () => 30 + Math.random() * 50 + '%';

const labelCount = () => Math.floor(Math.random() * 3) + 1;
</script>

<style scoped>
.block {
  @apply h-6 rounded bg-gray-200 dark:bg-gray-700;
}
</style>
