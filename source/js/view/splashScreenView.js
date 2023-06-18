import View from "./view.js";

class SplashScreenView extends View {
  _splashScreenHeader = this._selectId("splashScreenHeader");

  async _renderSplashScreen() {
    // show the introduction page
    await new Promise((resolve) =>
      setTimeout(() => {
        this._removeClass(this._splashScreenHeader, "hide");
        resolve();
      }, 1000)
    );

    // hide the introduction page
    await new Promise((resolve) =>
      setTimeout(() => {
        [this._splashScreenHeader, this._splashScreen].forEach((el) =>
          this._addClass(el, "hide")
        );

        resolve();
      }, 4000)
    );

    // render the main content
    await new Promise((resolve) =>
      setTimeout(() => {
        this._removeClass(this._pageFrame, "hide");

        resolve();
      }, 1000)
    );

    return Promise.resolve();
  }
}

export default new SplashScreenView();
