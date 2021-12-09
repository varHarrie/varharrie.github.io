import { Ref, ref } from 'vue';

import { AnyFunction } from '~/utils';

export default function useHandling<T extends AnyFunction>(
  handler: T,
  initial = false,
): [Ref<boolean>, T] {
  const handling = ref(initial);

  const execute = async (...args: never[]) => {
    handling.value = true;

    try {
      await handler(...args);
    } finally {
      handling.value = false;
    }
  };

  return [handling, execute as T];
}
