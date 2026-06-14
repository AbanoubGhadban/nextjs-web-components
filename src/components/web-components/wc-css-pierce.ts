export class WcCssPierce extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          --_bg: var(--wc-bg, #f8fafc);
          --_text: var(--wc-text, #1e293b);
          --_accent: var(--wc-accent, #8b5cf6);
        }
        .container { padding: 16px; border: 2px solid var(--_accent); border-radius: 8px; background: var(--_bg); color: var(--_text); }
        .title { color: var(--_accent); margin: 0 0 8px; font-size: 16px; }
        .description { font-size: 13px; color: #6b7280; margin: 0 0 12px; }
        .accent-box { background: var(--_accent); color: white; padding: 8px 16px; border-radius: 4px; display: inline-block; font-size: 13px; }
        .demo-row { display: flex; gap: 8px; align-items: center; margin: 8px 0; flex-wrap: wrap; }
        .info { font-size: 12px; font-family: monospace; padding: 4px 8px; background: rgba(0,0,0,0.05); border-radius: 4px; }
      </style>
      <div class="container" part="container">
        <h4 class="title" part="title">CSS Custom Properties Pierce Shadow DOM</h4>
        <p class="description">
          CSS custom properties (--var) pass through ALL shadow boundaries (open AND closed).
          ::part() allows outer CSS to target exposed shadow elements by name.
          Regular CSS selectors (.class, #id, tag) are blocked by shadow boundary.
        </p>
        <div class="demo-row">
          <span class="accent-box" part="accent-box" data-testid="css-accent">Accent from --wc-accent</span>
        </div>
        <div class="demo-row">
          <span class="info">Background: var(--wc-bg)</span>
          <span class="info">Text: var(--wc-text)</span>
          <span class="info">Accent: var(--wc-accent)</span>
        </div>
        <div class="demo-row" part="demo-area" data-testid="css-part-area">
          This has part="demo-area" — styleable via ::part(demo-area) from outside
        </div>
      </div>
    `;
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("wc-css-pierce")
) {
  customElements.define("wc-css-pierce", WcCssPierce);
}
