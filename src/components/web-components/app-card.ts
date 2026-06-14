export class AppCard extends HTMLElement {
  static observedAttributes = ["variant", "hoverable"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const variant = this.getAttribute("variant") || "default";
    const hoverable = this.hasAttribute("hoverable");

    const colors: Record<string, string> = {
      default: "border-color: #e5e7eb; background: white;",
      primary: "border-color: #3b82f6; background: #eff6ff;",
      success: "border-color: #22c55e; background: #f0fdf4;",
      warning: "border-color: #f59e0b; background: #fffbeb;",
      danger: "border-color: #ef4444; background: #fef2f2;",
    };

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          ${colors[variant] || colors.default}
          transition: transform 0.2s, box-shadow 0.2s;
        }
        ${
          hoverable
            ? `.card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }`
            : ""
        }
        .header {
          margin-bottom: 16px;
        }
        .footer {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }
      </style>
      <div class="card">
        <div class="header"><slot name="header"></slot></div>
        <slot></slot>
        <div class="footer"><slot name="footer"></slot></div>
      </div>
    `;
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("app-card")
) {
  customElements.define("app-card", AppCard);
}
