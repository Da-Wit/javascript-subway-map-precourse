import {
  getFormattedLines,
  setStateAndLocalSrorage,
  isBiggerThanTwo,
} from "../common/function.js";
import {
  appendChildrenToParent,
  getAdvancedEle,
} from "../common/visualization.js";
import { state, setState, resultDIV } from "../state.js";
import {
  createAddSectionDIV,
  createAddTitle,
  createManagementTitleText,
  createPrimaryTitle,
  createSectionTable,
  createSectionTr,
} from "../containers/section_container.js";

const SectionManager = function () {
  this.changeManagementTitleText = (lineName) => {
    const TitleElement = document.getElementById("line-management-title");
    const newText = `${lineName} 관리`;
    TitleElement.textContent = newText;
  };

  this.changeTableBody = () => {
    const tbody = document.getElementById("section-tbody");
    tbody.innerHTML = "";
    const innerContents = createSectionTr();
    appendChildrenToParent(tbody, ...innerContents);
    this.setDeleteButtonClickEvent(this.onDeleteButtonClick);
  };

  this.isExist = (sectionName, sections) =>
    sections.indexOf(sectionName) !== -1;

  this.isOrderCorrect = (order, sections) =>
    order >= 0 && order <= sections.length;

  this.onAddButtonClick = () => {
    const newSectionName = document.getElementById("section-selector").value;
    const newSectionOrder = document.getElementById("section-order-input")
      .value;
    if (newSectionOrder === "") {
      alert("Put something into input and try again.");
      return;
    }
    const sections = getFormattedLines()[state.selectedLineIndex].sections;
    if (this.isExist(newSectionName, sections)) {
      alert("This section is already added.");
      return;
    }
    if (!this.isOrderCorrect(parseInt(newSectionOrder, 10), sections)) {
      alert("Section order isn't correct.");
      return;
    }
    const formattedLines = getFormattedLines();
    const currentSections = formattedLines[state.selectedLineIndex].sections;
    currentSections.splice(newSectionOrder, 0, newSectionName);
    setStateAndLocalSrorage("lines", formattedLines);
    this.changeTableBody();
  };

  this.onDeleteButtonClick = ({ target: { dataset } }) => {
    const { lineIndex, sectionName } = dataset;
    const lines = getFormattedLines();
    if (!isBiggerThanTwo(lines[lineIndex].sections.length)) {
      alert(`You can't delete it because Sections are less than 2.`);
      return;
    }
    if (!confirm("정말로 노선에서 제거하겠습니까?")) return;
    lines[lineIndex].sections = lines[lineIndex].sections.filter(
      (section) => section !== sectionName
    );
    setStateAndLocalSrorage("lines", lines);
    this.changeTableBody();
  };

  this.setAddButtonClickEvent = (eventFunction) => {
    const button = document.getElementById("section-add-button");
    button.addEventListener("click", eventFunction);
  };

  this.setDeleteButtonClickEvent = (eventFunction) => {
    const buttons = document.getElementsByClassName("section-delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", eventFunction);
    }
  };
  this.appendDetails = (selectedLineName) => {
    const managemenetTitle = createManagementTitleText(selectedLineName);
    const addTitle = createAddTitle();
    const addSectionDIV = createAddSectionDIV();
    const sectionTable = createSectionTable();
    appendChildrenToParent(
      resultDIV,
      managemenetTitle,
      addTitle,
      addSectionDIV,
      sectionTable
    );

    this.setAddButtonClickEvent(this.onAddButtonClick);
  };

  this.rerenderOnlyChange = (lineName) => {
    this.changeManagementTitleText(lineName);
    this.changeTableBody();
  };

  this.onLineSelectionButtonClick = ({ target: button }) => {
    const { lineIndex, lineName } = button.dataset;
    const previousSelectedLineIndex = state.selectedLineIndex;
    setState("selectedLineIndex", lineIndex);
    if (previousSelectedLineIndex !== null) this.rerenderOnlyChange(lineName);
    else this.appendDetails(lineName);
    this.setDeleteButtonClickEvent(this.onDeleteButtonClick);
  };

  this.createLineSelectionButton = ({ name: lineName }, index) => {
    const attributes = {
      "data-line-index": index,
      "data-line-name": lineName,
      class: "section-line-menu-button",
    };
    const aButton = getAdvancedEle("button", attributes, lineName);
    aButton.addEventListener("click", this.onLineSelectionButtonClick);
    return aButton;
  };

  this.getLineSelectionButtonArray = () => {
    const formattedLines = getFormattedLines();
    const lineButtons = formattedLines.map((line, index) =>
      this.createLineSelectionButton(line, index)
    );
    return lineButtons;
  };

  this.appendSectionElements = (parent) => {
    const primaryTitle = createPrimaryTitle();
    const lineSelectionButtons = this.getLineSelectionButtonArray();
    appendChildrenToParent(parent, primaryTitle, ...lineSelectionButtons);
  };
};

export const { appendSectionElements } = new SectionManager();
