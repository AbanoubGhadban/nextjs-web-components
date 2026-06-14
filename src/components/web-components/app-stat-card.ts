export class AppStatCard extends HTMLElement {
  static observedAttributes = ["title", "value", "change", "trend", "icon"];

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
    const title = this.getAttribute("title") || "";
    const value = this.getAttribute("value") || "0";
    const change = this.getAttribute("change") || "";
    const trend = this.getAttribute("trend") || "neutral";
    const icon = this.getAttribute("icon") || "📊";

    const trendColors: Record<string, { color: string; bg: string; arrow: string }> = {
      up: { color: "#15803d", bg: "#dcfce7", arrow: "↑" },
      down: { color: "#b91c1c", bg: "#fee2e2", arrow: "↓" },
      neutral: { color: "#6b7280", bg: "#f3f4f6", arrow: "→" },
    };

    const t = trendColors[trend] || trendColors.neutral;

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          font-family: inherit;
        }
        .icon { font-size: 24px; }
        .value {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          font-family: inherit;
        }
        .change-row { display: flex; align-items: center; gap: 6px; }
        .change {
          font-size: 13px;
          font-weight: 600;
          color: ${t.color};
          background: ${t.bg};
          padding: 2px 8px;
          border-radius: 6px;
          font-family: inherit;
        }
      </style>
      <div class="stat-card">
        <div class="header">
          <span class="title">${title}</span>
          <span class="icon">${icon}</span>
        </div>
        <span class="value">${value}</span>
        ${
          change
            ? `<div class="change-row"><span class="change">${t.arrow} ${change}</span></div>`
            : ""
        }
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-stat-card")) {
  customElements.define("app-stat-card", AppStatCard);
}
