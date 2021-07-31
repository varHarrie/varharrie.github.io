import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

export default defineConfig({
  plugins: [
    Vue(),
    WindiCSS(),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
    }),
  ],
});
