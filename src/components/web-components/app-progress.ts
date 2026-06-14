export class AppProgress extends HTMLElement {
  static observedAttributes = ["value", "max", "variant", "striped", "animated", "label"];

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
    const value = parseInt(this.getAttribute("value") || "0");
    const max = parseInt(this.getAttribute("max") || "100");
    const variant = this.getAttribute("variant") || "primary";
    const striped = this.hasAttribute("striped");
    const animated = this.hasAttribute("animated");
    const label = this.getAttribute("label") || "";
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    const colors: Record<string, string> = {
      primary: "#3b82f6",
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#ef4444",
    };

    const color = colors[variant] || colors.primary;

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .wrapper { width: 100%; }
        .label-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 13px;
          color: #6b7280;
          font-family: inherit;
        }
        .track {
          width: 100%;
          height: 10px;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
        }
        .fill {
          height: 100%;
          width: ${pct}%;
          background: ${color};
          border-radius: 9999px;
          transition: width 0.5s ease;
          ${
            striped
              ? `background-image: linear-gradient(
            45deg,
            rgba(255,255,255,0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255,255,255,0.15) 50%,
            rgba(255,255,255,0.15) 75%,
            transparent 75%
          );
          background-size: 1rem 1rem;`
              : ""
          }
          ${animated ? "animation: move 1s linear infinite;" : ""}
        }
        @keyframes move {
          0% { background-position: 0 0; }
          100% { background-position: 1rem 0; }
        }
      </style>
      <div class="wrapper">
        ${label ? `<div class="label-row"><span>${label}</span><span>${Math.round(pct)}%</span></div>` : ""}
        <div class="track"><div class="fill"></div></div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-progress")) {
  customElements.define("app-progress", AppProgress);
}
