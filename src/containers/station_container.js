import { getFormattedStations } from "../common/function.js";
import {
  appendRecursiveChild,
  getAdvancedEle,
  getTableHavingTableHead,
} from "../common/visualization.js";
import {
  createAddDiv,
  createTableTitle,
  createTbody,
  createTr,
} from "../creator/station_creator.js";

const StationContainer = function () {
  this.initialRender = (parent) => {
    const addDiv = createAddDiv();
    const tableTitle = createTableTitle();
    const table = getTableHavingTableHead("역 이름", "설정");
    const formattedStations = getFormattedStations();
    const tbody = createTbody(formattedStations);
    appendRecursiveChild(parent, addDiv, tableTitle, [table, tbody]);
  };

  this.clearInputValue = (input) => {
    input.value = "";
  };

  this.appendNewTr = (station) => {
    const tr = createTr(station);
    const tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
  };
};

export const {
  initialRender,
  clearInputValue,
  appendNewTr,
} = new StationContainer();
