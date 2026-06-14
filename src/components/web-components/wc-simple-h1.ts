export class WcSimpleH1 extends HTMLElement {
  connectedCallback() {
    const h1 = document.createElement('h1');
    h1.textContent = 'I was added by the web component class';
    h1.style.fontSize = '14px';
    h1.style.color = 'tomato';
    this.appendChild(h1);
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('wc-simple-h1')) {
  customElements.define('wc-simple-h1', WcSimpleH1);
}
