import Prism from 'prismjs';

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

export function createQueryURL(
  raw: Record<string, string | number | undefined>
) {
  const params: Record<string, string> = {};

  Object.entries(raw).forEach(([key, value]) => {
    if (value === undefined) return;
    params[key] = typeof value === 'number' ? value.toString() : value;
  });

  return `?${new URLSearchParams(params)}`;
}

export function highlight(code: string, lang: string) {
  const grammar = Prism.languages[lang] ?? Prism.languages.plain;
  return Prism.highlight(code, grammar, lang);
}

export async function loadThemeStyles(id: string, theme: string) {
  const existed = document.getElementById(id);
  if (existed) existed.remove();

  const style = document.createElement('style');
  style.setAttribute('id', id);
  style.textContent = theme;
  document.head.appendChild(style);
}
