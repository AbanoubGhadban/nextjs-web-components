export class AppAccordion extends HTMLElement {
  private openItems = new Set<string>();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private toggle(id: string) {
    if (this.openItems.has(id)) {
      this.openItems.delete(id);
    } else {
      if (!this.hasAttribute("multiple")) {
        this.openItems.clear();
      }
      this.openItems.add(id);
    }
    this.render();
    this.dispatchEvent(
      new CustomEvent("accordion-change", {
        detail: { open: [...this.openItems] },
        bubbles: true,
        composed: true,
      })
    );
  }

  private render() {
    const itemsAttr = this.getAttribute("items") || "[]";
    let items: { id: string; title: string; content: string }[];
    try {
      items = JSON.parse(itemsAttr);
    } catch {
      items = [];
    }

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .accordion { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .item { border-bottom: 1px solid #e5e7eb; }
        .item:last-child { border-bottom: none; }
        .header {
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: white;
          border: none;
          width: 100%;
          text-align: left;
          font-size: 15px;
          font-weight: 500;
          color: #111827;
          font-family: inherit;
          transition: background 0.2s;
        }
        .header:hover { background: #f9fafb; }
        .chevron {
          transition: transform 0.2s;
          font-size: 12px;
          color: #9ca3af;
        }
        .chevron.open { transform: rotate(180deg); }
        .content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          padding: 0 20px;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }
        .content.open {
          max-height: 500px;
          padding: 0 20px 16px;
        }
      </style>
      <div class="accordion">
        ${items
          .map(
            (item) => `
          <div class="item">
            <button class="header" data-id="${item.id}">
              <span>${item.title}</span>
              <span class="chevron ${this.openItems.has(item.id) ? "open" : ""}">▼</span>
            </button>
            <div class="content ${this.openItems.has(item.id) ? "open" : ""}">${item.content}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    this.shadowRoot!.querySelectorAll(".header").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.toggle((btn as HTMLElement).dataset.id!);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-accordion")) {
  customElements.define("app-accordion", AppAccordion);
}
