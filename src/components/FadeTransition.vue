<template>
  <transition name="fade" mode="out-in">
    <slot />
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply opacity-100 transition-opacity duration-200 ease-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
