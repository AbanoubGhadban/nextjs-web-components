export class AppBadge extends HTMLElement {
  static observedAttributes = ["variant", "size"];

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
    const size = this.getAttribute("size") || "md";

    const variants: Record<string, string> = {
      default: "background: #f3f4f6; color: #374151;",
      primary: "background: #dbeafe; color: #1d4ed8;",
      success: "background: #dcfce7; color: #15803d;",
      warning: "background: #fef3c7; color: #b45309;",
      danger: "background: #fee2e2; color: #b91c1c;",
      info: "background: #e0f2fe; color: #0369a1;",
    };

    const sizes: Record<string, string> = {
      sm: "padding: 2px 8px; font-size: 10px;",
      md: "padding: 4px 12px; font-size: 12px;",
      lg: "padding: 6px 16px; font-size: 14px;",
    };

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: inline-block; }
        .badge {
          ${variants[variant] || variants.default}
          ${sizes[size] || sizes.md}
          border-radius: 9999px;
          font-weight: 600;
          font-family: inherit;
          white-space: nowrap;
        }
      </style>
      <span class="badge"><slot></slot></span>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-badge")) {
  customElements.define("app-badge", AppBadge);
}
