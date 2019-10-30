import {LitElement, css, html, unsafeCSS} from 'lit-element';

class FilingCabinet extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        transition: grid-template-columns 600ms ease-in-out;
      }

      section {
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
        position: relative;
        overflow: hidden;
      }

      main > div {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    `
  }

  getFractions() {
    return html`
      <style>
        :host {
          grid-template-columns: ${this.items.map(item =>
            item.open ? '1fr' : '0fr').join(' ')
          };
        }
      </style>
    `
  }


  static get properties() {
    return {
      items: { type: Array }
    };
  }

  constructor() {
    super();
    this.items = [{
      header: 'Titel A',
      main: 'Lorem ipsum dolor sit amet.',
      open: true
    }, {
      header: 'Titel B',
      main: 'Lorem ipsum dolor sit amet.',
      open: true
    }, {
      header: 'Titel C',
      main: 'Lorem ipsum dolor sit amet.',
      open: true
    }, {
      header: 'Titel D',
      main: 'Lorem ipsum dolor sit amet.',
      open: true
    }];
    this.clickCount = 0;
    this.clickTimer
  }

  render() {
    return html`
      ${this.getFractions()}
      ${this.items.map((item, key) => html`
        <section>
          <header
            @click="${e => this.handleClick(item)}"
          >${item.header}</header>
          <main
            ?aria-hidden=${!item.open}
          >
            <div>${item.main}</div>
          </main>
        </section>
      `)}
    `;
  }

  handleClick(updatedItem) {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.clickTimer = setTimeout(function() {
        this.clickCount = 0;
        this.wasSolelyOpenedSectionClicked(updatedItem)
          ? this.openAllSections()
          : this.toggleOpenClose(updatedItem);
      }.bind(this), 300);
    } else {
      clearTimeout(this.clickTimer);
      this.clickCount = 0;
      this.openSectionButCloseOthers(updatedItem);
    }
  }

  wasSolelyOpenedSectionClicked(updatedItem) {
    return updatedItem.open === true && this.items.filter(item => item.open === true).length <= 1
  }

  toggleOpenClose(updatedItem) {
    this.items = this.items.map(item =>
      updatedItem === item ? {...item, open: !item.open} : item
    );
  }

  openSectionButCloseOthers(updatedItem) {
    this.items = this.items.map(item =>
      updatedItem === item ? {...item, open: true } : {...item, open: false}
    )
  }

  openAllSections() {
    this.items = this.items.map(item =>
      {return {...item, open: true }}
    )
  }
}

customElements.define('filing-cabinet', FilingCabinet);

