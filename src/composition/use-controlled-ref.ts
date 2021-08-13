import { Ref, ref, watch } from 'vue';

export default function useControlledRef<T>(getter: () => T, defaultValue: T): Ref<T> {
  const current = ref(defaultValue) as Ref<T>;
  const controlled = ref(false);

  watch(
    getter,
    (value, oldValue) => {
      if (!controlled.value && value !== oldValue) {
        controlled.value = true;
      }

      if (controlled.value && current.value !== value) {
        current.value = value;
      }
    },
    { immediate: true },
  );

  return current;
}
