export class AppToast extends HTMLElement {
  static observedAttributes = ["message", "variant", "duration", "visible"];

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldVal: string, newVal: string) {
    if (oldVal === newVal) return;
    this.render();
    if (_name === "visible" && this.hasAttribute("visible")) {
      this.startTimer();
    }
  }

  show(message?: string) {
    if (message) this.setAttribute("message", message);
    this.setAttribute("visible", "");
    this.startTimer();
  }

  hide() {
    this.removeAttribute("visible");
    this.dispatchEvent(new CustomEvent("toast-close", { bubbles: true, composed: true }));
  }

  private startTimer() {
    if (this.timer) clearTimeout(this.timer);
    const dur = parseInt(this.getAttribute("duration") || "3000");
    this.timer = setTimeout(() => this.hide(), dur);
  }

  private render() {
    const message = this.getAttribute("message") || "";
    const variant = this.getAttribute("variant") || "info";
    const visible = this.hasAttribute("visible");

    const variants: Record<string, { bg: string; icon: string }> = {
      info: { bg: "#3b82f6", icon: "ℹ" },
      success: { bg: "#22c55e", icon: "✓" },
      warning: { bg: "#f59e0b", icon: "⚠" },
      error: { bg: "#ef4444", icon: "✕" },
    };

    const v = variants[variant] || variants.info;

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; position: fixed; top: 20px; right: 20px; z-index: 2000; pointer-events: ${visible ? "auto" : "none"}; }
        .toast {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: ${v.bg};
          color: white;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: translateX(${visible ? "0" : "120%"});
          opacity: ${visible ? "1" : "0"};
          transition: all 0.3s ease;
          font-family: inherit;
          min-width: 250px;
        }
        .icon { font-size: 18px; }
        .close {
          margin-left: auto;
          background: none;
          border: none;
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          font-size: 16px;
          padding: 0 0 0 8px;
        }
        .close:hover { color: white; }
      </style>
      <div class="toast">
        <span class="icon">${v.icon}</span>
        <span>${message}</span>
        <button class="close">&times;</button>
      </div>
    `;

    this.shadowRoot!.querySelector(".close")?.addEventListener("click", () => this.hide());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-toast")) {
  customElements.define("app-toast", AppToast);
}
