export default class View {
  // reusable classes
  _pageFrame = this._selectId("pageFrame");

  _heroSection = this._selectId("sectionHero");

  _workSection = this._selectId("sectionWork");

  _profileSection = this._selectId("sectionProfile");

  _contactSection = this._selectId("sectionContact");

  _navSection = this._selectId("sectionNavigation");

  _workListContainer = this._selectId("workList");

  _splashScreen = this._selectId("splashScreen");

  // common events
  addHandlerLoad(handler) {
    this._addEventListeners(window, "load", handler, { passive: true });
  }

  // reusable methods
  _selectId(id) {
    return document.getElementById(id);
  }

  _selectAllElements(selector) {
    return document.querySelectorAll(selector);
  }

  _addEventListeners(target, event, handler) {
    target.addEventListener(event, handler);
  }

  _removeClass(element, className) {
    element.classList.remove(className);
  }

  _addClass(element, className) {
    element.classList.add(className);
  }

  _toggleClass(element, className, condition) {
    if (condition) element.classList.add(className);
    else element.classList.remove(className);
  }
}
