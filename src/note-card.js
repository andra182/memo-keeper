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

  setAppInstance(appInstance) {
    this.appInstance = appInstance;
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

        .note-button-container {
          display: flex;
          justify-content: space-between;
        }

        .note-button {
          background-color: var(--surface-card);
          width: 60px;
          height: 30px;
          margin-top: 20px;
          transition: 0.2s ease;
          }
          
        .archive-note {
          border: 1px solid var(--button-archive);
          }
          
        .delete-note {
          border: 1px solid var(--button-delete);
        }

        .archive-note:hover {
          background-color: var(--button-archive-hover);
          }
          
        .delete-note:hover {
          background-color: var(--button-delete-hover);
        }
      </style>
      <div class="note-card">
        <div class="note-title">${this.getAttribute("title") || ""}</div>
        <div class="note-content">${this.getAttribute("content") || ""}</div>
        <div class="note-timestamp">${new Date(
          this.getAttribute("timestamp"),
        ).toLocaleString()}</div>
        <div class="note-button-container">
        <button class="note-button archive-note">
          Arsip
        </button>
        <button class="note-button delete-note">
          Hapus
        </button>
        </div>
      </div>
    `;

    this.shadowRoot
      .querySelector(".archive-note")
      .addEventListener("click", () => {
        if (this.appInstance) {
          this.appInstance.archiveNotes(this.getAttribute("id"));
        }
      });

    this.shadowRoot
      .querySelector(".delete-note")
      .addEventListener("click", () => {
        if (this.appInstance) {
          this.appInstance.deleteNotes(this.getAttribute("id"));
        }
      });
  }
}

customElements.define("note-card", NoteCard);
