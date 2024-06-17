import View from "./view.js";

class DataView extends View {
  _workListRow1 = this._selectId("workListRow1");

  _workListRow2 = this._selectId("workListRow2");

  _workListRow3 = this._selectId("workListRow3");

  _workFilterList = this._selectId("filterList");

  _data = null;

  addHandlerFilter(handler) {
    this._addEventListeners(
      this._workFilterList,
      "click",
      (event) => handler(event),
      { passive: true }
    );
  }

  _generateMarkup() {
    // prettier-ignore
    const classes = ["work-style-yellow", "work-style-red", "work-style-white", "work-style-black",];

    // prettier-ignore
    const conditions = {"01": 1, "03": 3, "08": 2, "10": 0, "13": 1, "24": 0};

    // prettier-ignore
    const styledNums = ["02", "03", "06", "00", "10", "15", "17", "20", "25", "23", "26"];

    const markup = this._data.map((dataElement, index) => {
      const indexNum = `${index + 1}`.padStart(2, "0");

      const isStyled = styledNums.includes(indexNum);

      const styleEl = classes[conditions[indexNum]] || "";

      if (isStyled)
        return `
          <li class="work-item work-item-styled animated-item--random ${styleEl}" data-type="${
          dataElement.type
        }" data-role="work-item">
              <div class="work-index">${indexNum}</div>
              <div class="work-title">
              ${
                dataElement.link
                  ? `
                  <a href="${dataElement.link}" target="_blank">${
                      dataElement.title
                    }
                  <span class="work-status">${dataElement.status || ""}</span>
                  </a>
              `
                  : `
                    <span>${dataElement.title}</span>
                    <span class="work-status">${dataElement.status || ""}</span>
                    `
              }
              </div>
              ${
                dataElement.tools
                  ? `<div class="work-tools">${dataElement.tools}</div>`
                  : ""
              }
              ${
                dataElement.img
                  ? `            
              <img
              class="work-img"
              data-img="${dataElement.img}"
              alt="project screenshot"
            />`
                  : ""
              }
          </li>
        `;

      return `
        <li class="work-item animated-item--random ${styleEl}" data-type="${
        dataElement.type
      }" data-role="work-item">
            <div class="work-index">${indexNum}</div>
            <div class="work-details">
              <div>
                <div class="work-heading">${dataElement.title}</div>
                <div>${dataElement.description}</div>
              </div>
              <div>
                <div class="work-header">Used Tools</div>
                ${dataElement.tools ? `<div>${dataElement.tools}</div>` : ""}
              </div>
              <div>
                <div class="work-header"><a href="${
                  dataElement.link
                }" target="_blank">Page Link</a></div>
              </div>
            </div>
            ${
              dataElement.img
                ? `            
            <img
            class="work-img"
            data-img="${dataElement.img}"
            alt="project screenshot"
          />`
                : ""
            }
          </li>
        `;
    });

    return markup;
  }

  _render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();

    const sectionCount = 3;

    const itemCount = Math.ceil(markup.length / sectionCount);

    for (let i = 0; i < sectionCount; i++) {
      const sectionStartIndex = i * itemCount;

      const sectionEndIndex = Math.min((i + 1) * itemCount, markup.length);

      const sectionData = markup.slice(sectionStartIndex, sectionEndIndex);

      const sectionContainer = this[`_workListRow${i + 1}`];

      sectionData.forEach((data) => (sectionContainer.innerHTML += data));
    }
  }

  _clear() {
    this._workListRow1.innerHTML = "";

    this._workListRow2.innerHTML = "";

    this._workListRow3.innerHTML = "";
  }
}

export default new DataView();
