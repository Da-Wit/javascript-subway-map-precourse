import { setLineSelectionButtonClickListener } from "./managers/section_manager.js";
import { renderMapPrint } from "./managers/map_print_manager.js";
import { resultDIV } from "./state.js";
import { clearResultDIV } from "./common/function.js";
import {
  setStationAddButtonClickListener,
  setStationDeleteButtonClickListener,
} from "./managers/station_manager.js";
import { renderSection } from "./containers/section_container.js";
import { initialRender as stationInitialRender } from "./containers/station_container.js";
import { primaryRender } from "./containers/line_container.js";

const Handler = function () {
  this.onStationButtonClick = () => {
    clearResultDIV();
    stationInitialRender(resultDIV);
    setStationAddButtonClickListener();
    setStationDeleteButtonClickListener();
  };
  this.onLineButtonClick = () => {
    clearResultDIV();
    primaryRender(resultDIV);
  };
  this.onSectionButtonClick = () => {
    clearResultDIV();
    renderSection(resultDIV);
    setLineSelectionButtonClickListener();
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
