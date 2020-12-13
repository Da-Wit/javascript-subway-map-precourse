import {
  appendChildrenToParent,
  convertDataArrayToElementArray,
  getAdvancedEle,
} from "../common/visualization.js";

const MapPrintContainer = function () {
  this.createLineTitle = (lineName) => getAdvancedEle("h2", null, lineName);
  this.createLineList = (line) => {
    const ul = document.createElement("ul");
    const sections = convertDataArrayToElementArray("li", null, line.sections);
    appendChildrenToParent(ul, ...sections);
    return ul;
  };
};

export const { createLineTitle, createLineList } = new MapPrintContainer();
