import * as model from "./model.js";
import View from "./view/view.js";
import SplashScreenView from "./view/splashScreenView.js";
import FrameView from "./view/frameView.js";
import HeroView from "./view/heroView.js";
import NavigationView from "./view/navigationView.js";
import DataView from "./view/dataView.js";
import WorkView from "./view/workView.js";
import ContactView from "./view/contactView.js";

class App {
  constructor() {
    const view = new View();

    // ON LOAD
    view.addHandlerLoad(() => {
      // Hero
      (async () => {
        await SplashScreenView._renderSplashScreen();

        await HeroView._renderHero();
      })();

      setInterval(() => HeroView._renderDate(), 1000);

      // Data
      model.loadGeneralData();

      const { data } = model.state;

      DataView._render(data);

      WorkView._updateFilterHeader("all (selected) projects", data.length);

      // Contact
      setInterval(() => ContactView._handleSocialText(), 200);
    });

    // Frame View
    FrameView.addHandlerScrollHorizontally((e) =>
      FrameView._scrollHorizontally(e)
    );

    FrameView.addHandlerScroll(() => {
      FrameView._scrollProgress();

      WorkView._revealWorkHeader();

      WorkView._revealWorkItems();
    });

    FrameView.addHandlerCursor((e) => FrameView._controlCursor(e));

    FrameView.addHandlerScrollToStart((e) => FrameView._scrollToStart(e));

    // Hero View
    HeroView.addReloadButtons(() => location.reload());

    // Navigation View
    NavigationView.addHandlerNavClick((e) => NavigationView._handleNavClick(e));

    // Work View
    WorkView.addHandlerImages((target) => WorkView._revealImage(target));

    // Filtering Data
    DataView.addHandlerFilter((event) => {
      const filterValue = event.target.dataset.role;

      if (!filterValue) return;

      filterValue === "all (selected) projects"
        ? model.loadGeneralData()
        : model.loadFilteredData(filterValue);

      WorkView._scrollToMainStart();

      const { data } = model.state;

      DataView._render(data);

      WorkView._updateFilterHeader(filterValue, data.length);

      WorkView._revealFilteredItems();
    });
  }
}

const lumos = new App();
