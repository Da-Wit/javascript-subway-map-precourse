import { appendChildren } from "../common/visualization.js";
import { createOneLineElements } from "../creator/map_print_creator.js";

const MapPrintContainer = function () {
  this.appendALineElement = (lines, parent) => {
    lines.forEach((line) => {
      const { lineTitle, lineUl, lineList } = createOneLineElements(line);
      appendChildren(lineUl, ...lineList);
      appendChildren(parent, lineTitle, lineUl);
    });
  };
};

export const { appendALineElement } = new MapPrintContainer();
