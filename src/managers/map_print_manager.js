import { getFormattedLines } from "../common/function.js";
import {
  createLineList,
  createLineTitle,
} from "../containers/map_print_container.js";
import { appendChildrenToParent } from "../common/visualization.js";

const MapPrintManager = function () {
  this.render = (parent, line) => {
    const lineTitle = createLineTitle(line.name);
    const lineList = createLineList(line);
    appendChildrenToParent(parent, lineTitle, lineList);
  };

  this.renderMapPrint = (parent) => {
    getFormattedLines().forEach((line) => {
      this.render(parent, line);
    });
  };
};

export const { renderMapPrint } = new MapPrintManager();
