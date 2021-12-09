import light from 'prism-themes/themes/prism-vs.css?raw';
import dark from 'prism-themes/themes/prism-vsc-dark-plus.css?raw';
import { reactive } from 'vue';

type ThemeMode = 'light' | 'dark';

type ThemeContext = {
  mode: ThemeMode;
  setMode(mode: ThemeMode): void;
};

const codeBlockThemes = { light, dark };

function get() {
  const theme = localStorage.getItem('theme');

  return theme === 'dark' ||
    (theme === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light';
}

async function set(theme: ThemeMode) {
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');

  const existed = document.getElementById('editor-theme');
  if (existed) existed.remove();

  const module = await import(
    /* @vite-ignore */
    'data:text/javascript;charset=utf-8,' + encodeURIComponent(codeBlockThemes[context.mode])
  );

  const style = document.createElement('style');
  style.setAttribute('id', 'editor-theme');
  style.setAttribute('mode', context.mode);
  style.textContent = module.default;
  document.head.appendChild(style);
}

const context = reactive<ThemeContext>({
  mode: get(),
  setMode: (value: ThemeMode) => {
    context.mode = value;
    set(value);
  },
});

context.setMode(context.mode);

export default function useTheme(): ThemeContext {
  return context;
}
