export class WcLightDom extends HTMLElement {
  private _count = 0;

  connectedCallback() {
    this.innerHTML = `
      <div class="wc-light-inner" data-testid="light-inner">
        <h4 class="wc-title" style="margin:0 0 8px;font-size:16px">Light DOM Component</h4>
        <p style="font-size:13px;color:#6b7280;margin:0 0 12px">No Shadow DOM. External CSS affects me. External JS can querySelector my children directly.</p>
        <div>
          <button data-testid="light-btn" style="background:#6b7280;color:white;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;font-size:14px">
            Count: <span data-testid="light-count">0</span>
          </button>
        </div>
        <div data-testid="light-secret" style="margin-top:8px;padding:8px;background:#f9fafb;border-radius:4px;font-size:12px;font-family:monospace">
          Secret data: LIGHT-ABC-123
        </div>
      </div>
    `;
    this.querySelector('[data-testid="light-btn"]')?.addEventListener(
      "click",
      () => {
        this._count++;
        const el = this.querySelector('[data-testid="light-count"]');
        if (el) el.textContent = String(this._count);
        this.dispatchEvent(
          new CustomEvent("wc-click", {
            detail: { count: this._count },
            bubbles: true,
            composed: true,
          }),
        );
      },
    );
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("wc-light-dom")
) {
  customElements.define("wc-light-dom", WcLightDom);
}
