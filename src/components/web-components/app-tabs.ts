export class AppTabs extends HTMLElement {
  static observedAttributes = ["active"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  attributeChangedCallback() {
    this.render();
    this.setupListeners();
  }

  private setupListeners() {
    this.shadowRoot!.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = (btn as HTMLElement).dataset.tab!;
        this.setAttribute("active", tab);
        this.dispatchEvent(
          new CustomEvent("tab-change", { detail: { tab }, bubbles: true, composed: true })
        );
      });
    });
  }

  private render() {
    const active = this.getAttribute("active") || "";
    const tabsAttr = this.getAttribute("tabs") || "";
    const tabs = tabsAttr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!tabs.length) return;

    const activeTab = active || tabs[0];

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .tabs-header {
          display: flex;
          border-bottom: 2px solid #e5e7eb;
          gap: 4px;
        }
        .tab-btn {
          padding: 10px 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .tab-btn:hover { color: #3b82f6; }
        .tab-btn.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }
        .tabs-content { padding: 20px 0; }
        ::slotted([slot]) { display: none; }
        ::slotted([slot="${activeTab}"]) { display: block; }
      </style>
      <div class="tabs-header">
        ${tabs.map((t) => `<button class="tab-btn ${t === activeTab ? "active" : ""}" data-tab="${t}">${t}</button>`).join("")}
      </div>
      <div class="tabs-content">
        ${tabs.map((t) => `<slot name="${t}"></slot>`).join("")}
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-tabs")) {
  customElements.define("app-tabs", AppTabs);
}
