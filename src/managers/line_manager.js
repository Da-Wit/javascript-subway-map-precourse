import {
  getFormattedLines,
  isBiggerThanOneWithoutSpace,
  setStateAndLocalStorage,
} from "../common/function.js";
import {
  appendNewLine,
  setDefaultValue,
  removeTr,
  getSelectors,
} from "../containers/line_container.js";

const LineManager = function () {
  this.isOverwritten = (inputValue) =>
    getFormattedLines().reduce(
      (result, line) => result || line.name === inputValue,
      false
    );

  this.checkValidity = (lineName, startSelector, endSelector) => {
    const SMALL_THAN_TWO = "Line name should be bigger than two.";
    const STATION_IS_SAME =
      "The selected start station is same with the end one.";
    const OVERWRITEEN = "It's overwritten.";
    if (!isBiggerThanOneWithoutSpace(lineName))
      return { value: false, errorMessage: SMALL_THAN_TWO };
    if (startSelector.value === endSelector.value)
      return { value: false, errorMessage: STATION_IS_SAME };
    if (this.isOverwritten(lineName))
      return { value: false, errorMessage: OVERWRITEEN };
    return { value: true };
  };

  this.handleAddProcess = (lineNameInput, startSection, endSection) => {
    const newLines = getFormattedLines().concat({
      name: lineNameInput.value,
      sections: [startSection.value, endSection.value],
    });
    setStateAndLocalStorage("lines", newLines);
    appendNewLine(lineNameInput, startSection.value, endSection.value);
    setDefaultValue(lineNameInput, startSection, endSection);
    this.setDeleteButtonClickListener();
  };

  this.lineAddClickFunction = () => {
    const input = document.getElementById("line-name-input");
    const [startSection, endSection] = getSelectors();
    const validity = this.checkValidity(input.value, startSection, endSection);
    if (validity.value) this.handleAddProcess(input, startSection, endSection);
    else alert(validity.errorMessage);
  };

  this.setLineAddClickListener = () => {
    const button = document.getElementById("line-add-button");
    button.addEventListener("click", this.lineAddClickFunction);
  };

  this.deleteButtonClickFunction = ({ target }) => {
    const { lineName } = target.dataset;
    const lines = getFormattedLines();
    const lineIndex = lines.findIndex((line) => line.name === lineName);
    if (!confirm("Are you sure?")) return;
    lines.splice(lineIndex, 1);
    setStateAndLocalStorage("lines", lines);
    removeTr(target);
  };

  this.setDeleteButtonClickListener = () => {
    const buttons = document.getElementsByClassName("line-delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", this.deleteButtonClickFunction);
    }
  };
};

export const {
  setLineAddClickListener,
  setDeleteButtonClickListener,
} = new LineManager();
