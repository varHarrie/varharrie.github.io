import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  attributify: { prefix: 'w:' },
  theme: {
    extend: {
      fontFamily: {
        base: ['Fira Code VF', 'Segoe UI', 'Consolas', 'monospace', 'Microsoft YaHei'],
      },
    },
  },
});
