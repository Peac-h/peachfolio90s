import View from "./view.js";

class WorkView extends View {
  _workFilterContainer = this._selectId("workFilterContainer");

  _workFilterHeader = this._selectId("filtersHeader");

  addHandlerImages(handler) {
    this._addEventListeners(
      this._workListContainer,
      "mouseover",
      (event) => {
        const target = event.target.closest("[data-role='work-item']");

        if (target) handler(target);
      },
      { passive: true }
    );
  }

  _revealImage(target) {
    const image = target.querySelector("img");

    if (!image) return;

    const src = image.getAttribute("data-img");

    if (image.src !== "") return;

    image.src = src;
  }

  _revealWorkHeader() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === this._heroSection) {
          if (!entry.isIntersecting)
            this._removeClass(this._workFilterContainer, "hide");
          else this._addClass(this._workFilterContainer, "hide");

          observer.unobserve(this._heroSection);
        }

        if (entry.target === this._profileSection) {
          if (entry.isIntersecting)
            this._addClass(this._workFilterContainer, "hide");

          observer.unobserve(this._profileSection);
        }
      });
    });

    observer.observe(this._heroSection);

    observer.observe(this._profileSection);
  }

  _revealWorkItems() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;

          this._removeClass(item, "animated-item--random");

          observer.unobserve(item);
        }
      });
    });

    const workItems = this._selectAllElements("[data-role='work-item']");

    workItems.forEach((item) => observer.observe(item));
  }

  _revealFilteredItems() {
    const workItems = this._selectAllElements("[data-role='work-item']");
    const delay = 100;

    workItems.forEach((item, index) => {
      setTimeout(
        () => this._removeClass(item, "animated-item--random"),
        delay * index
      );
    });
  }

  _scrollToMainStart() {
    this._workListContainer.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }

  _updateFilterHeader(filterValue, length) {
    const value = filterValue
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    this._workFilterHeader.innerHTML = `${value} <span class="item-italic">${length} creations</span>`;
  }
}

export default new WorkView();
