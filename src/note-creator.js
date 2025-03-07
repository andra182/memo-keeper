class NoteCreator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const title = this.shadowRoot.querySelector("#title").value;
        const body = this.shadowRoot.querySelector("#body").value;

        const newNote = {
          title: title,
          body: body,
        };

        this.dispatchEvent(
          new CustomEvent("note-created", {
            detail: newNote,
            bubbles: true,
            composed: true,
          }),
        );
        console.log("Note created event dispatched:", newNote);

        this.shadowRoot.querySelector("form").reset();
      });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.25rem;
        }

        input, textarea {
          margin-bottom: 1rem;  
        }

        input, textarea {
          width: 95%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.938rem;
          color: var(--text-primary);
          font-family: inherit;
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        .btn-submit {
          width: 100%;
          background: var(--accent-color);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem;
          font-size: 0.938rem;
          font-weight: 500;
          cursor: pointer;
        }

        .btn-submit:hover {
          background: var(--accent-hover);
        }
      </style>
      <form>
        <input id="title" type="text" placeholder="Judul Catatan" required>
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button class="btn-submit" type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define("note-creator", NoteCreator);
