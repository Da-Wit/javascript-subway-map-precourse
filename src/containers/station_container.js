import {
  appendChildrenToParent,
  appendRecursiveChild,
  getAdvancedEle,
} from "../common/visualization.js";

const StationContainer = function () {
  this.createAddWrapper = () =>
    getAdvancedEle("div", { id: "station-add-wrapper" });

  this.createAddTitle = () => getAdvancedEle("div", null, "역 이름");

  this.createAddInput = () =>
    getAdvancedEle("input", {
      id: "station-name-input",
      placeholder: "역 이름을 입력해주세요.",
    });

  this.createAddButton = () =>
    getAdvancedEle("button", { id: "station-add-button" }, "역 추가");

  this.createAddDiv = () => {
    const div = this.createAddWrapper();
    const titleDiv = this.createAddTitle();
    const input = this.createAddInput();
    const button = this.createAddButton();
    appendChildrenToParent(div, titleDiv, input, button);
    return div;
  };

  this.createTableTitle = () => getAdvancedEle("h2", null, "🚉 지하철 역 목록");

  this.createTr = (stationName) => {
    const tr = document.createElement("tr");
    const stationTd = getAdvancedEle("td", null, stationName);
    const buttonTd = document.createElement("td");
    const button = getAdvancedEle(
      "button",
      { class: "station-delete-button", "data-station-name": stationName },
      "삭제"
    );
    appendRecursiveChild(tr, stationTd, [buttonTd, button]);
    return tr;
  };
  this.createTbody = (stations) => {
    const tbody = document.createElement("tbody");
    stations.forEach((station) => {
      const tr = this.createTr(station);
      appendChildrenToParent(tbody, tr);
    });
    return tbody;
  };
};

export const {
  createAddDiv,
  createTableTitle,
  createTbody,
  createTr,
} = new StationContainer();
