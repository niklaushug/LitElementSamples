import {LitElement, css, html} from 'lit-element';

class Case extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        border: 1px solid blue;
      }

      header {
        writing-mode: vertical-rl;
        background: lightblue;
        padding: .2rem;
        flex: 0 0 min-content;
        white-space: nowrap;
      }

      main {
        flex: 1 1 100%;
        display: none;
      }
    `
  }

  static get properties() {
    return {
      header: { type: String },
      main: { type: String }
    };
  }

  constructor() {
    super();
    this.header = 'titel';
    this.main = 'main';
  }

  clickHeader(e) {
    console.log('Case', e);
  }

  render() {
    return html`
      <header
        @click="${this.clickHeader}"
      >${this.header}</header>
      <main>${this.main}</main>
    `;
  }
}

customElements.define('nihu-case', Case);
