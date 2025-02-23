class HeaderBar extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <header class="app-header">
        <h1>Memo Keeper</h1>
      </header>
    `;
  }
}

customElements.define("header-bar", HeaderBar);
