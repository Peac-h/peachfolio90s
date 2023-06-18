import View from "./view.js";

class NavigationView extends View {
  _navLinksContainer = this._selectId("navigationListContainer");

  addHandlerNavClick(handler) {
    this._addEventListeners(
      this._navLinksContainer,
      "click",
      (e) => handler(e),
      { passive: true }
    );
  }

  _handleNavClick(e) {
    const target = e.target.closest("[data-role='nav-item']");

    if (!target) return;

    e.preventDefault();

    const id = target.getAttribute("href");

    document
      .querySelector(id)
      .scrollIntoView({ behavior: "smooth", inline: "start" });
  }
}

export default new NavigationView();
