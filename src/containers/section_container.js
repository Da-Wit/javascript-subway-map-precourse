import { getFormattedLines, getFormattedStations } from "../common/function.js";
import {
  appendChildrenToParent,
  appendRecursiveChild,
  createStationOptions,
  createTd,
  getAdvancedEle,
  getTableHavingTableHead,
} from "../common/visualization.js";
import { state } from "../state.js";

const SectionContainer = function () {
  this.createAddTitle = () =>
    getAdvancedEle("h3", { id: "section-add-title" }, "구간 등록");

  this.createAddButton = () =>
    getAdvancedEle("button", { id: "section-add-button" }, "등록");

  this.createAddSelect = () =>
    getAdvancedEle("select", { id: "section-selector" });

  this.createAddInput = () =>
    getAdvancedEle("input", {
      id: "section-order-input",
      type: "number",
      placeholder: "순서",
    });

  this.createAddSectionDIV = () => {
    const div = document.createElement("div");
    const select = this.createAddSelect();
    const stations = getFormattedStations();
    const options = createStationOptions(stations);
    const input = this.createAddInput();
    const button = this.createAddButton();
    appendRecursiveChild(div, [select, ...options], input, button);
    return div;
  };

  this.createDeleteButton = (section, lineIndex) => {
    const attributes = {
      class: "section-delete-button",
      "data-section-name": section,
      "data-line-index": lineIndex,
    };
    return getAdvancedEle("button", attributes, "노선에서 제거");
  };

  this.createTr = (indexTd, sectionTd, deleteButtonTd) => {
    const tr = document.createElement("tr");
    appendChildrenToParent(tr, indexTd, sectionTd, deleteButtonTd);
    return tr;
  };

  this.createSectionTr = () => {
    const selectedLineIndex = state.selectedLineIndex;
    const sections = getFormattedLines()[selectedLineIndex].sections;
    return sections.map((section, index) => {
      const indexTd = createTd(index.toString());
      const sectionTd = createTd(section);
      const deleteButtonTd = createTd();
      const deleteButton = this.createDeleteButton(section, selectedLineIndex);
      appendChildrenToParent(deleteButtonTd, deleteButton);
      const tr = this.createTr(indexTd, sectionTd, deleteButtonTd);
      return tr;
    });
  };

  this.createManagementTitleText = (selectedLineName) =>
    getAdvancedEle(
      "h2",
      { id: "line-management-title" },
      `${selectedLineName} 관리`
    );

  this.createSectionTable = () => {
    const table = getTableHavingTableHead("순서", "이름", "설정");
    const tbody = getAdvancedEle("tbody", { id: "section-tbody" });
    const multipleTr = this.createSectionTr();
    appendRecursiveChild(table, [tbody, ...multipleTr]);
    return table;
  };

  this.createPrimaryTitle = () =>
    getAdvancedEle("h2", null, "구간을 수정할 노선을 선택해주세요.");
};

export const {
  createAddSectionDIV,
  createAddTitle,
  createManagementTitleText,
  createPrimaryTitle,
  createSectionTable,
  createSectionTr,
} = new SectionContainer();
