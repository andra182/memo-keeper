class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["title", "content", "timestamp"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .note-card {
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.25rem;
          transition: border-color 0.2s ease;
        }

        .note-card:hover {
          border-color: var(--accent-color);
        }

        .note-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .note-content {
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
          white-space: pre-line;
        }

        .note-meta {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      </style>
      <div class="note-card">
        <div class="note-title">${this.getAttribute("title") || ""}</div>
        <div class="note-content">${this.getAttribute("content") || ""}</div>
        <div class="note-timestamp">${new Date(
          this.getAttribute("timestamp")
        ).toLocaleString()}</div>
      </div>
    `;
  }
}

customElements.define("note-card", NoteCard);
