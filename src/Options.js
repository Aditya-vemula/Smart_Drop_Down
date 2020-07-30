import React from "react";

function Options(props) {
  let { defaultOptions, filteredOptions, searchText } = props;
  var renderContent;
  function showOptions(options) {
    return options.map((option, index) => {
      return (
        <li
          key={index}
          className={`option ${index > props.uiOptionCount ? "hide" : ""}`}
          onClick={() => props.onOptionClick(option)}
        >
          {option.label}
        </li>
      );
    });
  }
  function addNewOption() {
    return (
      <li className="option addOption">
        <span>{`"${searchText}"  Not found`}</span>
        {props.canAddOption ? (
          <button
            className="addOptionButton"
            onClick={() => props.addOptionHandler(searchText)}
          >
            Add & Select
          </button>
        ) : (
          ""
        )}
      </li>
    );
  }
  if (props.optionClicked) {
    renderContent = showOptions(defaultOptions);
  } else if (filteredOptions.length !== 0) {
    renderContent = showOptions(filteredOptions);
  } else if (filteredOptions.length === 0 && searchText !== "") {
    renderContent = addNewOption();
  } else if (filteredOptions.length === 0 && searchText === "") {
    renderContent = showOptions(defaultOptions);
  }
  return (
    <div>
      <ul className="optionsContainer">{renderContent}</ul>
    </div>
  );
}

export default Options;

// <button
//   className={`${showViewMoreButton ? "" : "hide"}`}
//   onClick={this.handleViewMoreClick.bind(this)}
// >
//   {`${this.state.ddOptions.length - this.state.uiOptionCount}`} more...
// </button>
