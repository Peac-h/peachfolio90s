import View from "./view.js";

class ContactView extends View {
  _spans = this._selectAllElements("#socialsContainer span");

  _handleSocialText() {
    const replacements = {
      i: "1",
      e: "3",
      u: "4",
      1: "i",
      3: "e",
      4: "u",
    };

    for (const span of this._spans) {
      const text = span.innerText;

      if (Math.random() >= 0.7 && replacements.hasOwnProperty(text)) {
        span.innerText = replacements[text];
      }

      if (Math.random() <= 0.2 && replacements.hasOwnProperty(text)) {
        span.innerText = replacements[text];
      }
    }
  }
}

export default new ContactView();
