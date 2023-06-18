import View from "./view.js";

class HeroView extends View {
  _date = this._selectId("currDateGeorgia");

  _reloadBtn = this._selectId("btnReload");

  addReloadButtons(handler) {
    this._addEventListeners(this._reloadBtn, "click", handler, {
      passive: true,
    });
  }

  _renderDate() {
    const currDate = new Intl.DateTimeFormat("ka-GE", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
    }).format(new Date());

    this._date.innerHTML = `${currDate} in Tbilisi`;
  }

  async _renderHero() {
    const spans = document.querySelectorAll(".introductory-text-span");

    const items = document.querySelectorAll(".animated-item--translateX");

    for (const span of spans) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      span.classList.remove("animated-item--translateY");
    }

    for (const item of items) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      item.classList.remove("animated-item--translateX");
    }
  }
}

export default new HeroView();
