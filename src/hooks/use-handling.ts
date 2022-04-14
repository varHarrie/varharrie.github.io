import { useState } from 'react';

import { AnyFunction } from '../utils';

export default function useHandling<T extends AnyFunction>(
  handler: T,
  initialValue = false
) {
  const [handling, setHandling] = useState(initialValue);

  const execute = async (...args: Parameters<T>) => {
    setHandling(true);

    try {
      return (await handler(...args)) as Promise<ReturnType<T>>;
    } finally {
      setHandling(false);
    }
  };

  return [handling, execute as T] as const;
}
