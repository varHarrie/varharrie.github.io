import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'vite-plugin-icons';
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
    Icons(),
    WindiCSS(),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
    }),
  ],
});
