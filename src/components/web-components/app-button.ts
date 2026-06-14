export class AppButton extends HTMLElement {
  static observedAttributes = ["variant", "size", "disabled", "loading"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot!.querySelector("button")?.addEventListener("click", (e) => {
      if (this.hasAttribute("disabled") || this.hasAttribute("loading")) {
        e.stopPropagation();
        return;
      }
      this.dispatchEvent(new CustomEvent("app-click", { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const variant = this.getAttribute("variant") || "primary";
    const size = this.getAttribute("size") || "md";
    const disabled = this.hasAttribute("disabled");
    const loading = this.hasAttribute("loading");

    const variants: Record<string, string> = {
      primary: "background: #3b82f6; color: white; border: none;",
      secondary: "background: #6b7280; color: white; border: none;",
      outline: "background: transparent; color: #3b82f6; border: 2px solid #3b82f6;",
      ghost: "background: transparent; color: #374151; border: none;",
      danger: "background: #ef4444; color: white; border: none;",
    };

    const sizes: Record<string, string> = {
      sm: "padding: 6px 12px; font-size: 12px;",
      md: "padding: 10px 20px; font-size: 14px;",
      lg: "padding: 14px 28px; font-size: 16px;",
    };

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: inline-block; }
        button {
          ${variants[variant] || variants.primary}
          ${sizes[size] || sizes.md}
          border-radius: 8px;
          font-weight: 600;
          cursor: ${disabled || loading ? "not-allowed" : "pointer"};
          opacity: ${disabled ? "0.5" : "1"};
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: inherit;
        }
        button:hover:not(:disabled) {
          filter: brightness(0.9);
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
      <button ${disabled ? "disabled" : ""}>
        ${loading ? '<span class="spinner"></span>' : ""}
        <slot></slot>
      </button>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-button")) {
  customElements.define("app-button", AppButton);
}
