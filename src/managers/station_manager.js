import {
  getFormattedLines,
  getFormattedStations,
  isBiggerThanTwo,
  setStateAndLocalSrorage,
} from "../common/function.js";
import {
  appendChildrenToParent,
  appendRecursiveChild,
  getTableHavingTableHead,
} from "../common/visualization.js";
import {
  createAddDiv,
  createTableTitle,
  createTbody,
  createTr,
} from "../containers/station_container.js";

const StationManager = function () {
  this.clearInputValue = (input) => {
    input.value = "";
  };

  this.isOverwritten = (inputValue) =>
    getFormattedStations().indexOf(inputValue) !== -1;

  this.addButtonClickFunction = () => {
    const input = document.getElementById("station-name-input");
    if (!isBiggerThanTwo(input.value.length)) {
      alert("Station name should be bigger than two.");
      return;
    }
    if (this.isOverwritten(input.value)) {
      alert("It's overwritten.");
      return;
    }
    const nextStations = getFormattedStations().concat(input.value);
    setStateAndLocalSrorage("stations", nextStations);
    this.rerenderAfterAdding(input.value);
    this.clearInputValue(input);
  };
  this.setAddButtonClickListener = () => {
    const addButton = document.getElementById("station-add-button");
    addButton.addEventListener("click", this.addButtonClickFunction);
  };

  this.initialRender = (parent) => {
    const addDiv = createAddDiv();

    const tableTitle = createTableTitle();
    const table = getTableHavingTableHead("역 이름", "설정");
    const tbody = createTbody(getFormattedStations());
    appendRecursiveChild(parent, addDiv, tableTitle, [table, tbody]);
    this.setDeleteButtonClickListener();
  };

  this.isContainedInLengthTwoSections = (stationName) => {
    let result = false;
    getFormattedLines().forEach((line) => {
      if (
        line.sections.length === 2 &&
        line.sections.indexOf(stationName) !== -1
      )
        result = true;
    });
    return result;
  };

  this.getFilteredLines = (station) =>
    getFormattedLines().map((line) => {
      line.sections = line.sections.filter((sections) => sections !== station);
      return line;
    });

  this.deleteButtonClickFuntion = ({ target }) => {
    const { stationName } = target.dataset;
    if (this.isContainedInLengthTwoSections(stationName)) {
      alert("That station is contained in the line which has two sections.");
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    const nextStations = getFormattedStations().filter(
      (station) => station !== stationName
    );
    const nextLines = this.getFilteredLines(stationName);
    setStateAndLocalSrorage("stations", nextStations);
    setStateAndLocalSrorage("lines", nextLines);
    this.rerenderAfterDeleting(target);
  };
  this.setDeleteButtonClickListener = () => {
    const buttons = document.getElementsByClassName("station-delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.deleteButtonClickFuntion);
    }
  };
  this.rerenderAfterAdding = (newStation) => {
    const newTr = createTr(newStation);
    const tbody = document.querySelector("tbody");
    appendChildrenToParent(tbody, newTr);
    this.setDeleteButtonClickListener();
  };
  this.rerenderAfterDeleting = (targetButton) => {
    const targetTr = targetButton.parentElement.parentElement;
    const tbody = targetTr.parentElement;
    tbody.removeChild(targetTr);
  };
};

export const {
  initialRender,
  setAddButtonClickListener,
} = new StationManager();
