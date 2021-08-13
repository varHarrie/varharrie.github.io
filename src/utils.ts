export type AnyFunction = (...args: never[]) => unknown;

export function debounce<T extends AnyFunction>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const handler = (...args: never[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };

  return handler as T;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function ensureArray<T>(target: T | T[]): T[] {
  if (Array.isArray(target)) return target;
  return target === undefined ? [] : [target];
}
