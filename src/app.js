import Swal from "sweetalert2";
import "./styles.css";
import "./header.js";
import "./note-card.js";
import "./note-creator.js";

const API_URL = "https://notes-api.dicoding.dev/v2";

class NotesApp {
  constructor() {
    this.container = document.querySelector("#notesContainer");
    this.loadingIndicator = document.querySelector("#loadingIndicator");
    if (!this.container) {
      console.error("Element dengan id 'notesContainer' tidak ditemukan!");
      return;
    }

    this.fetchNotes();

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("note-created", (event) => {
      console.log("Note created event received:", event.detail);
      const newNote = {
        title: event.detail.title,
        body: event.detail.body,
      };
      this.addNotes(newNote);
      this.fetchNotes();
    });
  }

  showLoading() {
    this.loadingIndicator.classList.remove("hidden");
  }

  hideLoading() {
    this.loadingIndicator.classList.add("hidden");
  }

  async deleteNotes(noteId) {
    this.showLoading();
    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status === "success") {
        Swal.fire("Success", data.message, "success");
      } else {
        Swal.fire("Error", data.message, "error");
      }
      this.fetchNotes();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "An error occurred while deleting the note.", "error");
    } finally {
      this.hideLoading();
    }
  }

  async archiveNotes(noteId) {
    this.showLoading();
    try {
      const response = await fetch(`${API_URL}/notes/${noteId}/archive`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.status === "success") {
        Swal.fire("Success", data.message, "success");
      } else {
        Swal.fire("Error", data.message, "error");
      }
      this.fetchNotes();
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "An error occurred while archiving the note.",
        "error",
      );
    } finally {
      this.hideLoading();
    }
  }

  async fetchNotes() {
    this.showLoading();
    try {
      const response = await fetch(`${API_URL}/notes`);
      const data = await response.json();
      this.renderNotes(data.data);
      if (data.status === "success") {
        console.log("Success fetching notes:", data.data);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "An error occurred while fetching the notes.",
        "error",
      );
    } finally {
      this.hideLoading();
    }
  }

  async addNotes(noteData) {
    this.showLoading();
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      const data = await response.json();
      if (data.status === "success") {
        Swal.fire("Success", data.message, "success");
      } else {
        Swal.fire("Error", data.message, "error");
      }
      this.fetchNotes();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "An error occurred while adding the note.", "error");
    } finally {
      this.hideLoading();
    }
  }

  renderNotes(notesData) {
    this.container.innerHTML = "";

    const activeNotes = notesData;

    activeNotes.forEach((note) => {
      const noteElement = document.createElement("note-card");
      noteElement.setAttribute("id", note.id);
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("content", note.body);
      noteElement.setAttribute("timestamp", note.createdAt);
      noteElement.setAppInstance(this);
      this.container.appendChild(noteElement);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new NotesApp();
});
