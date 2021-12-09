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
    <div class="icon skeleton" />
    <div class="skeleton" w:w="1/2" w:h="5" w:text="blue-200 sm" />
    <div class="skeleton" w:m="t-2" w:w="2/3" />
    <div w:m="t-2" w:display="flex">
      <div v-for="i of 3" :key="i" class="skeleton" w:m="r-4" w:w="10" w:h="5" />
    </div>
  </li>
</template>

<style scoped>
.icon {
  @apply absolute top-3 left-3 flex items-center justify-center w-9 h-9 rounded-md overflow-hidden font-bold;
}
</style>
