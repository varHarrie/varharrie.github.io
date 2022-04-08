import { useCallback, useState } from 'react';

export default function useLocalStorage<T>(
  key: string
): [T | undefined, (value: T) => void];
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void];
export default function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const update = useCallback((newValue: T) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }, []);

  return [value, update];
}
