import { defineConfig } from 'windicss/helpers';
import lineClamp from 'windicss/plugin/line-clamp';

export default defineConfig({
  attributify: { prefix: 'w:' },
  theme: {
    extend: {
      fontFamily: {
        base: ['Fira Code VF', 'Segoe UI', 'Consolas', 'monospace', 'Microsoft YaHei'],
      },
    },
  },
  shortcuts: {
    skeleton: 'h-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse',
  },
  plugins: [lineClamp],
});
