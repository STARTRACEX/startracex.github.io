import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('no-support')
export class Nosupport extends LitElement {
  protected render() {
    return html`<slot name="css"></slot>`;
  }
  static styles = css`
  :host{
    display:block;
  }
  slot[name="css"]{
    display:grid;
    grid-template-columns:0;
    grid-template-rows:0;
    overflow:hidden;
  }
  `;
}