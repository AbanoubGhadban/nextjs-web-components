export class WcSlotDemo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .container { padding: 16px; border: 2px solid #22c55e; border-radius: 8px; }
        .title { color: #22c55e; margin: 0 0 8px; font-size: 16px; }
        .description { font-size: 13px; color: #6b7280; margin: 0 0 12px; }
        .slot-area { padding: 12px; border: 2px dashed #86efac; border-radius: 4px; margin: 8px 0; min-height: 24px; }
        .slot-label { font-size: 11px; color: #22c55e; text-transform: uppercase; font-weight: bold; margin-bottom: 4px; }
        /* ::slotted() can only style top-level slotted elements */
        ::slotted([slot="header"]) { border-bottom: 2px solid #22c55e; padding-bottom: 8px; display: block; }
        ::slotted(.highlight) { background: #f0fdf4; padding: 4px 8px; }
      </style>
      <div class="container">
        <h4 class="title">Slot Projection (Content Distribution)</h4>
        <p class="description">
          Slotted content lives in the LIGHT DOM but renders inside the shadow layout.
          Outer CSS affects slotted content. Shadow CSS provides layout.
          ::slotted() can style top-level slotted elements from shadow side.
        </p>
        <div class="slot-area">
          <div class="slot-label">Named slot: "header"</div>
          <slot name="header"><em style="color:#9ca3af">No header provided</em></slot>
        </div>
        <div class="slot-area">
          <div class="slot-label">Default slot</div>
          <slot><em style="color:#9ca3af">No default content provided</em></slot>
        </div>
        <div class="slot-area">
          <div class="slot-label">Named slot: "footer"</div>
          <slot name="footer"><em style="color:#9ca3af">No footer provided</em></slot>
        </div>
      </div>
    `;
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("wc-slot-demo")
) {
  customElements.define("wc-slot-demo", WcSlotDemo);
}
