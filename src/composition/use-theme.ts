import { InjectionKey, inject, provide, reactive } from 'vue';

type ThemeMode = 'light' | 'dark';

type ThemeContext = {
  mode: ThemeMode;
  setMode(mode: ThemeMode): void;
};

const ThemeInjectionKey: InjectionKey<ThemeContext> = Symbol();

function get() {
  const theme = localStorage.getItem('theme');

  return theme === 'dark' ||
    (theme === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light';
}

function set(theme: ThemeMode) {
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export default function useTheme(): ThemeContext {
  let context = inject(ThemeInjectionKey);
  if (context) return context;

  context = reactive<ThemeContext>({
    mode: get(),
    setMode: (value: ThemeMode) => {
      if (!context) return;
      context.mode = value;
      set(value);
    },
  });

  context.setMode(context.mode);

  provide(ThemeInjectionKey, context);
  return context;
}
