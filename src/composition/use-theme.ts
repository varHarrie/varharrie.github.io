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
  const themeRef = ref<ThemeMode>(get());

  const setTheme = (theme: ThemeMode) => {
    themeRef.value = theme;
    set(theme);
  };

  setTheme(themeRef.value);

  return [themeRef, setTheme];
}
