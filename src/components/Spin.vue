<template>
  <div class="spin" />
</template>

<style scoped>
@keyframes spin-rotating {
  0% {
    border-radius: 20%;
    transform: rotate(0deg) scale(1);
  }
  45% {
    border-radius: 100%;
    transform: rotate(-180deg) scale(0.8);
  }
  55% {
    border-radius: 100%;
    transform: rotate(-180deg) scale(0.8);
  }
  100% {
    border-radius: 20%;
    transform: rotate(-360deg) scale(1);
  }
}

.spin {
  @apply relative transform rotate-45;
}

.spin::before,
.spin::after {
  @apply absolute block content- origin-center transform;
  animation: spin-rotating 1.4s ease infinite;
  border-radius: 20%;
}

.spin::before {
  @apply -top-8 -left-8 w-16 h-16 bg-blue-200 bg-opacity-50;
  animation-delay: 300ms;
}

.spin::after {
  @apply -top-4 -left-4 w-8 h-8 border-3 border-blue-500 dark:border-blue-200 border-opacity-50;
}
</style>
