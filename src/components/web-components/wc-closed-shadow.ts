export class WcClosedShadow extends HTMLElement {
  private _shadow: ShadowRoot;
  private _count = 0;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `
      <style>
        :host { display: block; }
        .inner { padding: 16px; border: 2px solid #ef4444; border-radius: 8px; }
        .title { color: var(--wc-title-color, #ef4444); margin: 0 0 8px; font-size: 16px; }
        .description { font-size: 13px; color: #6b7280; margin: 0 0 12px; }
        .btn { background: #ef4444; color: white; border: none; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 14px; }
        .btn:hover { background: #dc2626; }
        .secret { margin-top: 8px; padding: 8px; background: #fef2f2; border-radius: 4px; font-size: 12px; font-family: monospace; }
      </style>
      <div class="inner">
        <h4 class="title">Closed Shadow DOM (mode: 'closed')</h4>
        <p class="description">element.shadowRoot returns null. External JS CANNOT reach internals. Maximum encapsulation. Only public API methods work.</p>
        <div>
          <button data-testid="closed-btn" class="btn">Count: <span data-testid="closed-count">0</span></button>
        </div>
        <div data-testid="closed-secret" class="secret">Secret data: CLOSED-TOP-SECRET-000</div>
      </div>
    `;
    this._shadow
      .querySelector('[data-testid="closed-btn"]')
      ?.addEventListener("click", () => {
        this._count++;
        const el = this._shadow.querySelector(
          '[data-testid="closed-count"]',
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

  getCount(): number {
    return this._count;
  }

  reset(): void {
    this._count = 0;
    const el = this._shadow.querySelector('[data-testid="closed-count"]');
    if (el) el.textContent = "0";
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("wc-closed-shadow")
) {
  customElements.define("wc-closed-shadow", WcClosedShadow);
}
