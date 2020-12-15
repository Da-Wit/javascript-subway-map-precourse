import {
  getFormattedLines,
  getFormattedStations,
  isBiggerThanOneWithoutSpace,
  setStateAndLocalStorage,
} from "../common/function.js";
import {
  appendNewTr,
  clearInputValue,
} from "../containers/station_container.js";

const StationManager = function () {
  this.isOverwritten = (inputValue) =>
    getFormattedStations().indexOf(inputValue) !== -1;

  this.getFilteredLines = (station) =>
    getFormattedLines().map((line) => {
      line.sections = line.sections.filter((sections) => sections !== station);
      return line;
    });

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

  this.removeStationFromStateAndStorage = (stationName) => {
    const nextStations = getFormattedStations().filter(
      (station) => station !== stationName
    );
    const nextLines = this.getFilteredLines(stationName);
    setStateAndLocalStorage("stations", nextStations);
    setStateAndLocalStorage("lines", nextLines);
  };

  this.removeTr = (targetButton) => {
    const tr = targetButton.parentElement.parentElement;
    const tbody = tr.parentElement;
    tbody.removeChild(tr);
  };

  this.deleteButtonClickFunction = ({ target: targetButton }) => {
    const { stationName } = targetButton.dataset;
    if (this.isContainedInLengthTwoSections(stationName)) {
      alert("That station is contained in the line which has two sections.");
      return;
    }
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    this.removeStationFromStateAndStorage(stationName);
    this.removeTr(targetButton);
  };

  this.checkStationValidity = (inputValue) => {
    const SMALLER_THAN_TWO =
      "The Station name except space should be bigger than two.";
    const OVERWRITTEN = "It's overwritten.";
    if (!isBiggerThanOneWithoutSpace(inputValue))
      return { value: false, errorMessage: SMALLER_THAN_TWO };
    if (this.isOverwritten(inputValue))
      return { value: false, errorMessage: OVERWRITTEN };
    return { value: true };
  };

  this.setStationDeleteButtonClickListener = () => {
    const buttons = document.getElementsByClassName("station-delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.deleteButtonClickFunction);
    }
  };

  this.addButtonClickFunction = () => {
    const input = document.getElementById("station-name-input");
    const validity = this.checkStationValidity(input.value);
    if (!validity.value) {
      alert(validity.errorMessage);
      return;
    }
    const nextStations = getFormattedStations().concat(input.value);
    setStateAndLocalStorage("stations", nextStations);
    appendNewTr(input.value);
    clearInputValue(input);
    this.setStationDeleteButtonClickListener();
  };

  this.setStationAddButtonClickListener = () =>
    document
      .getElementById("station-add-button")
      .addEventListener("click", this.addButtonClickFunction);
};

export const {
  setStationAddButtonClickListener,
  setStationDeleteButtonClickListener,
} = new StationManager();
