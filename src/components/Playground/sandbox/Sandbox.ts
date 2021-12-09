import { ensureArray } from '~/utils';

import template from './template.html?raw';

export type Imports = Record<string, string>;

export type SandboxInstance = {
  new (): Sandbox;
};

export default class Sandbox {
  public iframe: HTMLIFrameElement;

  constructor(imports: Imports = {}) {
    const importMap = JSON.stringify({ imports });
    const src = template.replace(/<!--IMPORT_MAP-->/, importMap);

    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute(
      'sandbox',
      [
        'allow-forms',
        'allow-modals',
        'allow-pointer-lock',
        'allow-popups',
        'allow-same-origin',
        'allow-scripts',
        'allow-top-navigation-by-user-activation',
      ].join(' '),
    );

    this.iframe.srcdoc = src;
    this.iframe.style.display = 'block';
    this.iframe.style.border = 'none';
    this.iframe.style.width = '100%';
    this.iframe.style.height = '100%';
  }

  public mount(container: HTMLElement, code: string): void {
    this.iframe.addEventListener('load', () => this.update(code));
    container.appendChild(this.iframe);
  }

  public update(code: string): void {
    this.eval(`document.body.innerHTML = \`${code}\``);
  }

  public eval(code: string | string[]): void {
    const scripts = ensureArray(code);
    this.iframe.contentWindow?.postMessage({ action: 'eval', args: { scripts } }, '*');
  }
}
