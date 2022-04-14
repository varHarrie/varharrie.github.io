import HtmlSandbox from './sandboxes/HtmlSandbox';
import Sandbox, { SandboxInstance } from './sandboxes/Sandbox';
import VueSfcSandbox from './sandboxes/VueSfcSandbox';

type PlaygroundInfo = {
  defaultTabs: string[];
  sandbox: SandboxInstance;
};

const playgrounds: Record<string, PlaygroundInfo> = {
  js: {
    defaultTabs: ['editor', 'console'],
    sandbox: Sandbox,
  },
  html: {
    defaultTabs: ['editor', 'preview'],
    sandbox: HtmlSandbox,
  },
  'vue-sfc': {
    defaultTabs: ['editor', 'preview'],
    sandbox: VueSfcSandbox,
  },
  // react: {
  //   defaultTabs: ['editor', 'preview'],
  //   sandbox: ReactSandbox,
  // },
};

export type PlaygroundType = keyof typeof playgrounds;

export default playgrounds;
