import { LitElement, css, html } from 'lit-element';

class TimePicker extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-flow: row no-wrap;
      }

      span {
        font: 2rem/1 Consola monospace;
      }

      .hours:focus,
      .minutes:focus,
      .seconds:focus {
        outline: 0;
        background-color: #ddd;
      }

      .hours:hover,
      .minutes:hover,
      .seconds:hover {
        cursor: pointer;
      }

      .delimiter {}
    `;
  }

  // observe attribute
  static get properties() {
    return {
      time: { type: Number },
      delimiter: { type: String }
    };
  }

  // init value
  constructor() {
    super();
    this.time = 0;
    this.delimiter = ':'
  }

  // lifecyle methods
  connectedCallback() {
    super.connectedCallback();
    this.reflectTime();
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    if (name === 'time') {
      this.reflectTime();
    }
  }

  adaptTime(value = 0, type = 's') {
    const types = {
      s: 1,
      m: 60,
      h: 3600
    }
    this.time = this.time + types[type] * value;
    this.reflectTime();
  }

  reflectTime() {
    this.isPositive = this.time >= 0;
    this.hours = this.formatHours();
    this.minutes = this.formatMinutes();
    this.seconds = this.formatSeconds();
    console.log({
      'time': this.time,
      'isPositive': this.isPositive,
      'hours': this.hours,
      'minutes': this.minutes,
      'seconds': this.seconds
    })
  }

  ensurePositiveValue(value) {
    return this.isPositive ? value : value * -1;
  }

  formatHours() {
    return Math.floor(this.ensurePositiveValue(this.time) / 3600);
  }

  formatMinutes() {
    const value = this.ensurePositiveValue(this.time)
    const minutes = value >= 3600
      ? Math.floor((value - Math.floor(value / 3600) * 3600) / 60 )
      : Math.floor(value / 60);
    return this.formatLeadingZero(minutes)
  }

  formatSeconds() {
    const seconds = this.ensurePositiveValue(this.time % 60)
    return this.formatLeadingZero(seconds)
  }

  formatLeadingZero(number) {
    return number < 10 ? `0${number}` : number
  }


  // event handlers
  onFocus(e) {
    this.activeDigit = e.target.className;
  }

  onBlur(e) {
    this.activeDigit = null;
  }

  onKeydown(e) {
    e.preventDefault();
    const digit = this.activeDigit;
    const previousSection = {
      'hours': 'seconds',
      'minutes': 'hours',
      'seconds': 'minutes'
    };
    const nextSection = {
      'hours': 'minutes',
      'minutes': 'seconds',
      'seconds': 'hours'
    };

    switch (e.key) {
      case 'Tab':
        e.shiftKey
          ? this.shadowRoot.querySelector(`.${previousSection[digit]}`).focus()
          : this.shadowRoot.querySelector(`.${nextSection[digit]}`).focus()
        break;
      case 'ArrowLeft':
        this.shadowRoot.querySelector(`.${previousSection[digit]}`).focus();
        break;
      case 'ArrowUp':
        this.adaptTime(1, digit[0]);
        break;
      case 'ArrowRight':
        this.shadowRoot.querySelector(`.${nextSection[digit]}`).focus();
        break;
      case 'ArrowDown':
        this.adaptTime(-1, digit[0]);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        this.adaptTime(parseInt(e.key) - this[digit], digit[0]);
        this.shadowRoot.querySelector(`.${nextSection[digit]}`).focus()
        break;
    }
  }

  render(){
    return html`
      <span class="prefix">${this.isPositive ? '+' : '-'}</span>
      <span
        contenteditable="true"
        class="hours"
        @focus="${this.onFocus}"
        @blur="${this.onBlur}"
        @keydown="${this.onKeydown}"
       >${this.hours}</span>
      <span class="delimiter">${this.delimiter}</span>
      <span
        contenteditable="true"
        class="minutes"
        @focus="${this.onFocus}"
        @blur="${this.onBlur}"
        @keydown="${this.onKeydown}"
       >${this.minutes}</span>
      <span class="delimiter">${this.delimiter}</span>
      <span
        contenteditable="true"
        class="seconds"
        @focus="${this.onFocus}"
        @blur="${this.onBlur}"
        @keydown="${this.onKeydown}"
        >${this.seconds}</span>
    `;
  }
}

customElements.define('time-picker', TimePicker);
