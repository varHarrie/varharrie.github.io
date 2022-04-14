import Sandbox from './Sandbox';

export default class HtmlSandbox extends Sandbox {
  public override update(code: string): void {
    this.eval(`document.body.innerHTML = \`${code}\``);
  }
}
