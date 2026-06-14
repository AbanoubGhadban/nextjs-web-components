export class AppModal extends HTMLElement {
  static observedAttributes = ["open", "title"];

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

  show() {
    this.setAttribute("open", "");
  }

  hide() {
    this.removeAttribute("open");
    this.dispatchEvent(new CustomEvent("modal-close", { bubbles: true, composed: true }));
  }

  private render() {
    const isOpen = this.hasAttribute("open");
    const title = this.getAttribute("title") || "";

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: ${isOpen ? "flex" : "none"};
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal {
          background: white;
          border-radius: 16px;
          padding: 0;
          max-width: 500px;
          width: 90%;
          max-height: 85vh;
          overflow: auto;
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
          animation: slideUp 0.3s ease;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          font-family: inherit;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #9ca3af;
          padding: 4px;
          line-height: 1;
        }
        .close-btn:hover { color: #374151; }
        .modal-body { padding: 24px; }
        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
        }
      </style>
      <div class="overlay">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">${title}</h2>
            <button class="close-btn">&times;</button>
          </div>
          <div class="modal-body"><slot></slot></div>
          <div class="modal-footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;

    if (isOpen) {
      this.shadowRoot!.querySelector(".overlay")?.addEventListener("click", (e) => {
        if ((e.target as HTMLElement).classList.contains("overlay")) this.hide();
      });
      this.shadowRoot!.querySelector(".close-btn")?.addEventListener("click", () => this.hide());
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-modal")) {
  customElements.define("app-modal", AppModal);
}
