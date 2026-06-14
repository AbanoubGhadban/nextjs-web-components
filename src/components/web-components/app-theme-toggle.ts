export class AppThemeToggle extends HTMLElement {
  static observedAttributes = ["theme"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.getAttribute("theme")) {
      this.setAttribute("theme", "light");
    }
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private toggle() {
    const current = this.getAttribute("theme") || "light";
    const next = current === "light" ? "dark" : "light";
    this.setAttribute("theme", next);
    this.dispatchEvent(
      new CustomEvent("theme-change", { detail: { theme: next }, bubbles: true, composed: true })
    );
  }

  private render() {
    const theme = this.getAttribute("theme") || "light";
    const isDark = theme === "dark";

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: inline-block; }
        button {
          width: 56px;
          height: 28px;
          border-radius: 14px;
          border: none;
          background: ${isDark ? "#3b82f6" : "#e5e7eb"};
          cursor: pointer;
          position: relative;
          transition: background 0.3s;
          padding: 0;
        }
        .knob {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 3px;
          left: ${isDark ? "31px" : "3px"};
          transition: left 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      </style>
      <button aria-label="Toggle theme">
        <span class="knob">${isDark ? "🌙" : "☀️"}</span>
      </button>
    `;

    this.shadowRoot!.querySelector("button")?.addEventListener("click", () => this.toggle());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-theme-toggle")) {
  customElements.define("app-theme-toggle", AppThemeToggle);
}
