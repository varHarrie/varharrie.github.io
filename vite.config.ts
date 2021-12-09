import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import WindiCSS from 'vite-plugin-windicss';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    WindiCSS(),
    Icons({
      compiler: 'vue3',
      scale: 1.2,
    }),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
    }),
  ],
});
