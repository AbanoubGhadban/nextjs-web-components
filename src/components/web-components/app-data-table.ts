export class AppDataTable extends HTMLElement {
  static observedAttributes = ["columns", "rows"];

  private sortCol = "";
  private sortDir: "asc" | "desc" = "asc";

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

  private sort(col: string) {
    if (this.sortCol === col) {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      this.sortCol = col;
      this.sortDir = "asc";
    }
    this.render();
  }

  private render() {
    const colsAttr = this.getAttribute("columns") || "[]";
    const rowsAttr = this.getAttribute("rows") || "[]";
    let columns: { key: string; label: string }[];
    let rows: Record<string, string>[];
    try {
      columns = JSON.parse(colsAttr);
      rows = JSON.parse(rowsAttr);
    } catch {
      columns = [];
      rows = [];
    }

    if (this.sortCol) {
      rows = [...rows].sort((a, b) => {
        const va = a[this.sortCol] || "";
        const vb = b[this.sortCol] || "";
        const cmp = va.localeCompare(vb, undefined, { numeric: true });
        return this.sortDir === "asc" ? cmp : -cmp;
      });
    }

    this.shadowRoot!.innerHTML = `
      <style>
        :host { display: block; }
        .table-wrapper {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: inherit;
        }
        th {
          background: #f9fafb;
          padding: 12px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          user-select: none;
          border-bottom: 1px solid #e5e7eb;
        }
        th:hover { background: #f3f4f6; }
        .sort-icon { margin-left: 4px; font-size: 10px; }
        td {
          padding: 12px 16px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #fafafa; }
      </style>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              ${columns
                .map(
                  (col) => `
                <th data-col="${col.key}">
                  ${col.label}
                  ${
                    this.sortCol === col.key
                      ? `<span class="sort-icon">${this.sortDir === "asc" ? "▲" : "▼"}</span>`
                      : ""
                  }
                </th>
              `
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
              <tr>${columns.map((col) => `<td>${row[col.key] || ""}</td>`).join("")}</tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    this.shadowRoot!.querySelectorAll("th").forEach((th) => {
      th.addEventListener("click", () => this.sort((th as HTMLElement).dataset.col!));
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("app-data-table")) {
  customElements.define("app-data-table", AppDataTable);
}
