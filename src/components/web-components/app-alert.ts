export class AppAlert extends HTMLElement {
  static observedAttributes = ["variant", "title", "dismissible"];

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
    const variant = this.getAttribute("variant") || "info";
    const title = this.getAttribute("title") || "";
    const dismissible = this.hasAttribute("dismissible");

    const variants: Record<string, { bg: string; border: string; color: string; icon: string }> = {
      info: { bg: "#eff6ff", border: "#3b82f6", color: "#1e40af", icon: "ℹ️" },
      success: { bg: "#f0fdf4", border: "#22c55e", color: "#166534", icon: "✅" },
      warning: { bg: "#fffbeb", border: "#f59e0b", color: "#92400e", icon: "⚠️" },
      error: { bg: "#fef2f2", border: "#ef4444", color: "#991b1b", icon: "❌" },
    };

    const v = variants[variant] || variants.info;

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .alert {
          padding: 16px 20px;
          background: ${v.bg};
          border-left: 4px solid ${v.border};
          border-radius: 0 8px 8px 0;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-family: inherit;
        }
        .icon { font-size: 18px; flex-shrink: 0; }
        .content { flex: 1; }
        .title {
          font-weight: 600;
          font-size: 14px;
          color: ${v.color};
          margin-bottom: 4px;
        }
        .body {
          font-size: 13px;
          color: ${v.color};
          opacity: 0.85;
          line-height: 1.5;
        }
        .dismiss {
          background: none;
          border: none;
          color: ${v.color};
          cursor: pointer;
          font-size: 18px;
          opacity: 0.6;
          padding: 0;
          flex-shrink: 0;
        }
        .dismiss:hover { opacity: 1; }
      </style>
      <div class="alert">
        <span class="icon">${v.icon}</span>
        <div class="content">
          ${title ? `<div class="title">${title}</div>` : ""}
          <div class="body"><slot></slot></div>
        </div>
        ${dismissible ? `<button class="dismiss">&times;</button>` : ""}
      </div>
    `;

    this.shadowRoot!.querySelector(".dismiss")?.addEventListener("click", () => {
      this.remove();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-alert")) {
  customElements.define("app-alert", AppAlert);
}
