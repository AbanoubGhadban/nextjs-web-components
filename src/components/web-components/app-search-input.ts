export class AppSearchInput extends HTMLElement {
  static observedAttributes = ["placeholder", "value"];

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

  get value(): string {
    return (this.shadowRoot!.querySelector("input") as HTMLInputElement)?.value || "";
  }

  set value(val: string) {
    const input = this.shadowRoot!.querySelector("input") as HTMLInputElement;
    if (input) input.value = val;
  }

  private render() {
    const placeholder = this.getAttribute("placeholder") || "Search...";
    const value = this.getAttribute("value") || "";

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .search-wrapper {
          position: relative;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 16px;
          pointer-events: none;
        }
        input {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          color: #111827;
          background: white;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        input::placeholder { color: #9ca3af; }
        .clear-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #6b7280;
        }
        .clear-btn:hover { background: #e5e7eb; }
        input:not(:placeholder-shown) ~ .clear-btn { display: flex; }
      </style>
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="${placeholder}" value="${value}" />
        <button class="clear-btn">&times;</button>
      </div>
    `;

    const input = this.shadowRoot!.querySelector("input")!;
    input.addEventListener("input", () => {
      this.dispatchEvent(
        new CustomEvent("search-input", {
          detail: { value: input.value },
          bubbles: true,
          composed: true,
        })
      );
    });

    this.shadowRoot!.querySelector(".clear-btn")?.addEventListener("click", () => {
      input.value = "";
      input.focus();
      this.dispatchEvent(
        new CustomEvent("search-input", {
          detail: { value: "" },
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-search-input")) {
  customElements.define("app-search-input", AppSearchInput);
}
