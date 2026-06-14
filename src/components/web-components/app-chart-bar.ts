export class AppChartBar extends HTMLElement {
  static observedAttributes = ["data", "height"];

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
    const dataAttr = this.getAttribute("data") || "[]";
    const height = parseInt(this.getAttribute("height") || "200");
    let data: { label: string; value: number; color?: string }[];
    try {
      data = JSON.parse(dataAttr);
    } catch {
      data = [];
    }

    if (!data.length) return;

    const maxVal = Math.max(...data.map((d) => d.value));
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .chart {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          height: ${height}px;
          padding: 0 8px;
        }
        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          height: 100%;
          justify-content: flex-end;
        }
        .bar {
          width: 100%;
          max-width: 48px;
          border-radius: 6px 6px 0 0;
          transition: height 0.5s ease;
          min-height: 4px;
          position: relative;
        }
        .bar:hover { filter: brightness(1.1); }
        .bar-value {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          font-family: inherit;
        }
        .bar-label {
          font-size: 11px;
          color: #6b7280;
          text-align: center;
          font-family: inherit;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 60px;
        }
      </style>
      <div class="chart">
        ${data
          .map(
            (d, i) => `
          <div class="bar-group">
            <div class="bar" style="height: ${(d.value / maxVal) * 100}%; background: ${d.color || colors[i % colors.length]};">
              <span class="bar-value">${d.value}</span>
            </div>
            <span class="bar-label">${d.label}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-chart-bar")) {
  customElements.define("app-chart-bar", AppChartBar);
}
