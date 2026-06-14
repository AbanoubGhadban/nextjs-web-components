export class AppNavLink extends HTMLElement {
  static observedAttributes = ["href", "active", "icon"];

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
    const href = this.getAttribute("href") || "#";
    const active = this.hasAttribute("active");
    const icon = this.getAttribute("icon") || "";

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: ${active ? "#3b82f6" : "#4b5563"};
          background: ${active ? "#eff6ff" : "transparent"};
          transition: all 0.2s;
          font-family: inherit;
        }
        a:hover {
          background: ${active ? "#eff6ff" : "#f3f4f6"};
          color: ${active ? "#3b82f6" : "#111827"};
        }
        .icon { font-size: 18px; }
      </style>
      <a href="${href}">
        ${icon ? `<span class="icon">${icon}</span>` : ""}
        <slot></slot>
      </a>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-nav-link")) {
  customElements.define("app-nav-link", AppNavLink);
}
