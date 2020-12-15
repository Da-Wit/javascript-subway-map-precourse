import { getFormattedLines } from "../common/function.js";
import { appendALineElement } from "../containers/map_print_container.js";

const MapPrintManager = function () {
  this.renderMapPrint = (parent) => {
    const lines = getFormattedLines();
    appendALineElement(lines, parent);
  };
};

export const { renderMapPrint } = new MapPrintManager();
