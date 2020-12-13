import { appendSectionElements } from "./managers/section_manager.js";
import { renderMapPrint } from "./managers/map_print_manager.js";
import { setState, resultDIV } from "./state.js";
import { primaryRender as linePrimaryRender } from "./managers/line_manager.js";
import { clearResultDIV } from "./common/function.js";
import {
  initialRender as stationInitialRender,
  setAddButtonClickListener,
} from "./managers/station_manager.js";

const Handler = function () {
  this.onStationButtonClick = () => {
    clearResultDIV();
    stationInitialRender(resultDIV);
    setAddButtonClickListener();
  };
  this.onLineButtonClick = () => {
    clearResultDIV();
    linePrimaryRender();
  };
  this.onSectionButtonClick = () => {
    setState("selectedLineIndex", null);
    clearResultDIV();
    appendSectionElements(resultDIV);
  };
  this.onPrintButtonClick = () => {
    clearResultDIV();
    renderMapPrint(resultDIV);
  };
};

export const {
  onStationButtonClick,
  onLineButtonClick,
  onSectionButtonClick,
  onPrintButtonClick,
} = new Handler();
