import { ref, Ref } from 'vue';

type ThemeMode = 'light' | 'dark';

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

export default function useTheme(): [Ref<ThemeMode>, (theme: ThemeMode) => void] {
  const theme = ref<ThemeMode>(get());

  const setTheme = (value: ThemeMode) => {
    theme.value = value;
    set(value);
  };

  setTheme(theme.value);

  return [theme, setTheme];
}
