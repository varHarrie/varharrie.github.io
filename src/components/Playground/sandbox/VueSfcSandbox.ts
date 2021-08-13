import Sandbox from './Sandbox';

const RUNTIME_URL = 'https://unpkg.com/vue@3.2.1/dist/vue.runtime.esm-browser.prod.js';
const LOADER_URL = 'https://unpkg.com/vue3-sfc-loader@0.8.4/dist/vue3-sfc-loader.esm.js';

export default class VueSfcSandbox extends Sandbox {
  constructor() {
    super({ vue: RUNTIME_URL, 'vue3-sfc-loader': LOADER_URL });
  }

  override async update(code: string): Promise<void> {
    this.eval(`
      import * as Vue from "vue";
      import * as loader from "vue3-sfc-loader";
      
      if (window.__app__) {
        window.__app__.unmount();
        document.body.innerHTML = "";
      }

      const addStyle = (textContent) => {
        const style = Object.assign(document.createElement("style"), { textContent });
        document.body.appendChild(style);
      }
      
      const options = { moduleCache: { vue: Vue }, addStyle, getFile: () => \`${code}\` };
      const App = Vue.defineAsyncComponent(() => loader.loadModule("App.vue", options));
      
      Vue.createApp(App).mount(document.body);
    `);
  }
}
