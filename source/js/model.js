import data from "./data.js";

export const state = {
  data: [],
};

export const loadGeneralData = function () {
  state.data = data;
};

export const loadFilteredData = function (key) {
  state.data = data.filter((item) => item.type === key);
};
