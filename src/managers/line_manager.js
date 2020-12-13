import {
  getFormattedLines,
  getFormattedStations,
  isBiggerThanTwo,
  setStateAndLocalSrorage,
} from "../common/function.js";
import {
  appendChildrenToParent,
  appendRecursiveChild,
  createStationOptions,
  getAdvancedEle,
  getTableHavingTableHead,
} from "../common/visualization.js";
import { resultDIV } from "../state.js";

const LineManager = function () {
  this.isOverwritten = (inputValue) =>
    getFormattedLines().reduce(
      (result, line) => result || line.name === inputValue,
      false
    );
  this.setLineAddClickListener = (button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById("line-name-input");
      if (!isBiggerThanTwo(input.value.length)) {
        alert("Line name should be bigger than two.");
        return;
      }
      if (this.isOverwritten(input.value)) {
        alert("It's overwritten.");
        return;
      }
      const startSection = document.getElementById(
        "line-start-station-selector"
      );
      const endSection = document.getElementById("line-end-station-selector");
      setStateAndLocalSrorage(
        "lines",
        getFormattedLines().concat({
          name: input.value,
          sections: [startSection.value, endSection.value],
        })
      );
    });
  };
  this.getLineAddDIV = () => {
    const result = document.createElement("div");
    const lineNameInputLabel = getAdvancedEle("div", null, "노선 이름");
    const lineNameInput = getAdvancedEle("input", {
      id: "line-name-input",
      placeholder: "노선 이름을 입력해주세요",
    });

    const startStationDIV = document.createElement("div");
    const startStationLabel = getAdvancedEle(
      "label",
      { for: "line-start-station-selector" },
      "상행 종점"
    );
    const startStationSelect = getAdvancedEle("select", {
      name: "line-start-station-selector",
      id: "line-start-station-selector",
    });
    const endStationDIV = document.createElement("div");
    const endStationLabel = getAdvancedEle(
      "label",
      { for: "line-end-station-selector" },
      "하행 종점"
    );
    const endStationSelect = getAdvancedEle("select", {
      name: "line-end-station-selector",
      id: "line-end-station-selector",
    });
    const startStationoptions = createStationOptions(getFormattedStations());
    const endStationoptions = createStationOptions(getFormattedStations());
    const LineAddButton = getAdvancedEle(
      "button",
      { id: "line-add-button" },
      "노선 추가"
    );
    this.setLineAddClickListener(LineAddButton);

    appendRecursiveChild(
      result,
      lineNameInputLabel,
      lineNameInput,
      [
        startStationDIV,
        startStationLabel,
        [startStationSelect, ...startStationoptions],
      ],
      [
        endStationDIV,
        endStationLabel,
        [endStationSelect, ...endStationoptions],
      ],
      LineAddButton
    );
    return result;
  };
  this.deleteButtonClickFunction = ({ target: { dataset } }) => {
    if (!confirm("Are you sure?")) return;
    const { lineIndex } = dataset;
    const lines = getFormattedLines();
    lines.splice(lineIndex, 1);
    setStateAndLocalSrorage("lines", lines);
  };
  this.setDeleteButtonClickListener = (button) => {
    button.addEventListener("click", this.deleteButtonClickFunction);
  };
  this.getTbody = () => {
    const result = document.createElement("tbody");

    getFormattedLines().map((line, index) => {
      const tr = document.createElement("tr");
      const lineNameTd = getAdvancedEle("td", null, line.name);
      const startStationTd = getAdvancedEle("td", null, line.sections[0]);
      const endStationTd = getAdvancedEle(
        "td",
        null,
        line.sections[line.sections.length - 1]
      );
      const deleteButtonTd = document.createElement("td");
      const deleteButton = getAdvancedEle(
        "button",
        { class: "line-delete-button", "data-line-index": index },
        "삭제"
      );
      this.setDeleteButtonClickListener(deleteButton);
      appendRecursiveChild(result, [
        tr,
        lineNameTd,
        startStationTd,
        endStationTd,
        [deleteButtonTd, deleteButton],
      ]);
    });
    return result;
  };
  this.getTable = () => {
    const table = getTableHavingTableHead(
      "노선 이름",
      "상행 종점역",
      "하행 종점역",
      "설정"
    );
    const tbody = this.getTbody();
    appendChildrenToParent(table, tbody);
    return table;
  };

  this.primaryRender = () => {
    const LineAddDIV = this.getLineAddDIV();
    const tableTitle = getAdvancedEle("h2", null, "🚉 지하철 노선 목록");
    const table = this.getTable();
    appendChildrenToParent(resultDIV, LineAddDIV, tableTitle, table);
  };
};

export const { primaryRender } = new LineManager();
