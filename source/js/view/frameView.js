import View from "./view.js";

class FrameView extends View {
  _progressElement = this._selectId("footerProgressBar");

  _cursor = this._selectId("cursorContainer");

  _toStartBtn = this._selectId("scrollToStartButton");

  addHandlerScrollHorizontally(handler) {
    this._addEventListeners(this._pageFrame, "wheel", handler, {
      passive: true,
    });
  }

  addHandlerScroll(handler) {
    this._addEventListeners(this._pageFrame, "scroll", handler, {
      passive: true,
    });
  }

  addHandlerCursor(handler) {
    this._addEventListeners(document, "mousemove", handler, { passive: true });
  }

  addHandlerScrollToStart(handler) {
    this._addEventListeners(this._toStartBtn, "click", handler, {
      passive: true,
    });
  }

  _scrollHorizontally(e) {
    e.preventDefault();
    this._pageFrame.scrollLeft += e.deltaY;
  }

  _scrollProgress() {
    let scrolled =
      (this._pageFrame.scrollLeft /
        (this._pageFrame.scrollWidth - this._pageFrame.clientWidth)) *
      100;

    this._progressElement.style.width = scrolled + "%";
  }

  _controlCursor(e) {
    this._cursor.style.left = e.pageX + "px";
    this._cursor.style.top = e.pageY + "px";

    // on links
    const elementsOnLink = document.querySelectorAll(
      "a, #scrollToStartButton, #btnReload, #filterList li"
    );

    elementsOnLink.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this._addClass(this._cursor, "on-link");
      });
      element.addEventListener("mouseleave", () => {
        this._removeClass(this._cursor, "on-link");
      });
    });

    // on black
    const elementsOnBlack = [
      this._heroSection,
      this._profileSection,
      this._contactSection,
    ];

    elementsOnBlack.forEach((element) => {
      element.addEventListener("mouseover", () => {
        this._addClass(this._cursor, "on-black");
      });
      element.addEventListener("mouseleave", () => {
        this._removeClass(this._cursor, "on-black");
      });
    });
  }

  _scrollToStart(e) {
    e.preventDefault();

    const id = "#sectionHero";

    document
      .querySelector(id)
      .scrollIntoView({ behavior: "smooth", inline: "start" });
  }
}

export default new FrameView();
