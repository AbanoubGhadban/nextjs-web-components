export class AppAvatar extends HTMLElement {
  static observedAttributes = ["src", "name", "size", "status"];

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

  private getInitials(name: string): string {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  private getColor(name: string): string {
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }

  private render() {
    const src = this.getAttribute("src");
    const name = this.getAttribute("name") || "?";
    const size = this.getAttribute("size") || "40";
    const status = this.getAttribute("status");
    const px = parseInt(size);

    const statusColors: Record<string, string> = {
      online: "#22c55e",
      offline: "#9ca3af",
      busy: "#ef4444",
      away: "#f59e0b",
    };

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: inline-block; position: relative; }
        .avatar {
          width: ${px}px;
          height: ${px}px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: ${px * 0.35}px;
          color: white;
          background: ${src ? "transparent" : this.getColor(name)};
          overflow: hidden;
          font-family: inherit;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .status {
          position: absolute;
          bottom: 0;
          right: 0;
          width: ${px * 0.28}px;
          height: ${px * 0.28}px;
          border-radius: 50%;
          border: 2px solid white;
          background: ${status ? statusColors[status] || "#9ca3af" : "transparent"};
        }
      </style>
      <div class="avatar">
        ${src ? `<img src="${src}" alt="${name}" />` : this.getInitials(name)}
      </div>
      ${status ? '<div class="status"></div>' : ""}
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-avatar")) {
  customElements.define("app-avatar", AppAvatar);
}
