import {LitElement, css, html, unsafeCSS} from 'lit-element';

class Cabinet extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        transition: grid-template-columns 2s ease;
      }
    `
  }

  constructor() {
    super();
    this.items = [{
      header: 'Titel A',
      main: 'Lorem ipsum dolor sit amet.'
    }, {
      header: 'Titel B',
      main: 'Lorem ipsum dolor sit amet.'
    }, {
      header: 'Titel C',
      main: 'Lorem ipsum dolor sit amet.'
    }];
    this.delimiter = ':';
    this.openCases = [true, true, false];
  }

  clickHeader(e) {
    console.log('Cabinet', e);
    this.openCases.forEach(function(part, index) {
      this[index] = !this[index];
    }, this.openCases);
  }

  get dynamicStyles() {
    return css`:host {grid-template-columns: ${this.fractions}}`;
  }

  get fractions() {
    console.log(this.openCases.map(item => item ? '1fr' : '0fr').join(' '));
    return unsafeCSS`${this.openCases.map(item => item ? '1fr' : '0fr').join(' ')}`;
  }



  render() {
    return html`
      <style>${this.dynamicStyles}</style>
      ${this.items.map(item => html`
        <nihu-case
          @click="${this.clickHeader}"
          header="${item.header}"
          main="${item.main}"
        ></nihu-case>
      `)}
    `;
  }
}

customElements.define('nihu-cabinet', Cabinet);
