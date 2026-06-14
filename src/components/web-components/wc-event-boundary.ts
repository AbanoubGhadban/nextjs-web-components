export class WcEventBoundary extends HTMLElement {
  private _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    this._shadow.innerHTML = `
      <style>
        :host { display: block; }
        .container { padding: 16px; border: 2px solid #f59e0b; border-radius: 8px; }
        .title { color: #f59e0b; margin: 0 0 8px; font-size: 16px; }
        .description { font-size: 13px; color: #6b7280; margin: 0 0 12px; }
        .btn { padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; border: none; color: white; margin: 2px; }
        .btn-composed { background: #22c55e; }
        .btn-composed:hover { background: #16a34a; }
        .btn-trapped { background: #ef4444; }
        .btn-trapped:hover { background: #dc2626; }
        .btn-host { background: #3b82f6; }
        .btn-host:hover { background: #2563eb; }
        .log { margin-top: 8px; padding: 8px; background: #fffbeb; border-radius: 4px; font-size: 12px; font-family: monospace; max-height: 120px; overflow-y: auto; white-space: pre-wrap; }
        .btns { display: flex; gap: 4px; flex-wrap: wrap; }
      </style>
      <div class="container">
        <h4 class="title">Event Boundary Demo (Closed Shadow)</h4>
        <p class="description">
          composed:true events cross shadow boundary, outer listeners catch it.<br/>
          composed:false events stay INSIDE shadow DOM, outer listeners DON'T see it.<br/>
          Host dispatch events dispatched ON host element, always visible outside.
        </p>
        <div class="btns">
          <button class="btn btn-composed" data-testid="evt-composed">composed:true</button>
          <button class="btn btn-trapped" data-testid="evt-trapped">composed:false</button>
          <button class="btn btn-host" data-testid="evt-host">dispatch on host</button>
        </div>
        <div class="log" data-testid="evt-internal-log">Internal log:</div>
      </div>
    `;

    const log = this._shadow.querySelector(
      '[data-testid="evt-internal-log"]',
    )!;

    this._shadow
      .querySelector('[data-testid="evt-composed"]')
      ?.addEventListener("click", () => {
        const evt = new CustomEvent("wc-signal", {
          detail: { type: "composed", message: "I cross shadow boundary" },
          bubbles: true,
          composed: true,
        });
        this._shadow
          .querySelector('[data-testid="evt-composed"]')!
          .dispatchEvent(evt);
        log.textContent += "\n-> Fired composed:true from shadow button";
      });

    this._shadow
      .querySelector('[data-testid="evt-trapped"]')
      ?.addEventListener("click", () => {
        const evt = new CustomEvent("wc-signal", {
          detail: {
            type: "trapped",
            message: "I stay inside shadow",
          },
          bubbles: true,
          composed: false,
        });
        this._shadow
          .querySelector('[data-testid="evt-trapped"]')!
          .dispatchEvent(evt);
        log.textContent +=
          "\n-> Fired composed:false (trapped inside shadow)";
      });

    this._shadow
      .querySelector('[data-testid="evt-host"]')
      ?.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("wc-signal", {
            detail: {
              type: "host-dispatch",
              message: "Dispatched on host element",
            },
            bubbles: true,
          }),
        );
        log.textContent += "\n-> Dispatched on host element";
      });

    // Internal listener - catches ALL events inside shadow
    this._shadow.addEventListener("wc-signal", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      log.textContent += `\n<- Shadow internal received: ${detail.type}`;
    });
  }

  fireComposed(): void {
    const btn = this._shadow.querySelector('[data-testid="evt-composed"]') as HTMLElement;
    btn?.click();
  }

  fireTrapped(): void {
    const btn = this._shadow.querySelector('[data-testid="evt-trapped"]') as HTMLElement;
    btn?.click();
  }

  fireHost(): void {
    const btn = this._shadow.querySelector('[data-testid="evt-host"]') as HTMLElement;
    btn?.click();
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("wc-event-boundary")
) {
  customElements.define("wc-event-boundary", WcEventBoundary);
}
