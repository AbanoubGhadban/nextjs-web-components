export class WcOpenShadow extends HTMLElement {
  private _count = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .inner { padding: 16px; border: 2px solid #3b82f6; border-radius: 8px; }
        .title { color: var(--wc-title-color, #3b82f6); margin: 0 0 8px; font-size: 16px; }
        .description { font-size: 13px; color: #6b7280; margin: 0 0 12px; }
        .btn { background: #3b82f6; color: white; border: none; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 14px; }
        .btn:hover { background: #2563eb; }
        .secret { margin-top: 8px; padding: 8px; background: #eff6ff; border-radius: 4px; font-size: 12px; font-family: monospace; }
        .slot-area { margin-top: 8px; border-top: 1px dashed #3b82f6; padding-top: 8px; }
      </style>
      <div class="inner" part="container">
        <h4 class="title" part="title">Open Shadow DOM (mode: 'open')</h4>
        <p class="description">element.shadowRoot is accessible externally. External JS CAN reach in via shadowRoot.querySelector(). Styles are encapsulated.</p>
        <div>
          <button data-testid="open-btn" class="btn" part="button">Count: <span data-testid="open-count">0</span></button>
        </div>
        <div data-testid="open-secret" class="secret">Secret data: OPEN-XYZ-789</div>
        <div class="slot-area">
          <slot></slot>
        </div>
      </div>
    `;
    this.shadowRoot!
      .querySelector('[data-testid="open-btn"]')
      ?.addEventListener("click", () => {
        this._count++;
        const el = this.shadowRoot!.querySelector(
          '[data-testid="open-count"]',
        );
        if (el) el.textContent = String(this._count);
        this.dispatchEvent(
          new CustomEvent("wc-click", {
            detail: { count: this._count },
            bubbles: true,
            composed: true,
          }),
        );
      });
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("wc-open-shadow")
) {
  customElements.define("wc-open-shadow", WcOpenShadow);
}
