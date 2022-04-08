import { defaultNS, resources } from '../src/i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['cn'];
  }
}
