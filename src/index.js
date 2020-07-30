import React, { Component } from "react";
import { render } from "react-dom";
import Options from "./Options";
import { localOptions } from "./ddOptions.js";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      ddOptions: [],
      searchText: "",
      showOptions: true,
      uiOptionCount: 5,
      optionClicked: false,
      showViewMoreButton: true,
      canAddOption: true,
      isOpen: true
    };
    this.selectedOption = "";
    this.filteredOptions = [];
  }
  async componentDidMount() {
    let apiOptions = await fetch(
      "https://api.jsonbin.io/b/5f2288b6250d377b5dc6c11a"
    )
      .then(res => res.json())
      .then(function(data) {
        return data.optionsList;
      });
    this.setState({
      ddOptions: apiOptions.length > 0 ? apiOptions : localOptions
    });
  }
  handleInputChange(e) {
    this.filteredOptions = this.state.ddOptions.filter(option => {
      if (option.label.includes(e.target.value)) {
        return option;
      }
    });
    this.setState({
      searchText: e.target.value,
      optionClicked: false,
      showViewMoreButton: false
    });
  }
  handleOptionClick(option) {
    this.setState({
      optionClicked: true,
      searchText: option.label
    });
    this.selectedOption = option.value;
    console.log("option.value :", this.selectedOption);
  }
  addOptionHandler(newOption) {
    let newOptionObj = { label: newOption, value: newOption };
    this.filteredOptions = [];
    this.setState({
      ddOptions: [...this.state.ddOptions, newOptionObj],
      searchText: newOption,
      optionClicked: true
    });
    this.selectedOption = newOption;
    if (this.state.uiOptionCount === this.state.ddOptions.length) {
      this.setState({
        showViewMoreButton: false
      });
    } else {
      this.setState({
        showViewMoreButton: true
      });
    }
    console.log("option.value :", this.selectedOption);
  }
  handleViewMoreClick() {
    this.setState({
      showViewMoreButton: false,
      uiOptionCount: this.state.ddOptions.length
    });
  }
  handleDropDown() {
    console.log("dasdad");
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <div className="mainContainer">
          <div className="dropDownHeaderDiv">
            <span className="dropDownHeaderText">Select a Location</span>
            <span
              onClick={this.handleDropDown.bind(this)}
              className={`arrow ${this.state.isOpen ? "upArrow" : "downArrow"}`}
            />
          </div>
          <div
            className="container"
            style={{ display: this.state.isOpen ? "block" : "none" }}
          >
            <input
              className="inputField"
              type="text"
              placeholder="Select a Country.."
              value={this.state.searchText}
              onChange={this.handleInputChange.bind(this)}
            />
            <Options
              onOptionClick={this.handleOptionClick.bind(this)}
              addOptionHandler={this.addOptionHandler.bind(this)}
              defaultOptions={this.state.ddOptions}
              filteredOptions={this.filteredOptions}
              searchText={this.state.searchText}
              showOptions={this.state.showOptions}
              canAddOption={this.state.canAddOption}
              uiOptionCount={this.state.uiOptionCount}
              optionClicked={this.state.optionClicked}
            />
            <button
              className={`viewMoreButton ${
                this.state.showViewMoreButton ? "" : "hide"
              }`}
              onClick={this.handleViewMoreClick.bind(this)}
            >
              {`${this.state.ddOptions.length - this.state.uiOptionCount}`}{" "}
              more...
            </button>
          </div>
        </div>
        <div className="otherOptionsContainer">
          <input
            type="number"
            onChange={e => this.setState({ uiOptionCount: e.target.value })}
            placeholder="show options count"
          />
          <div style={{ marginTop: "10px" }}>
            <input
              type="checkBox"
              onChange={() =>
                this.setState({ canAddOption: !this.state.canAddOption })
              }
              name="showAddButton"
            />
            <label htmlFor="showAddButton">Show Add & Select button</label>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
