import React, { Component } from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import propTypes from "prop-types"

class UploadCSV extends Component {
  constructor(props) {
    super(props)
  }

  // handleForce = data => {
  //   console.log(data);
  // };

  handleUpload = (data) => {
    this.props.onFileUpload(data)
  }

  render() {
    return (
      <div className="container">
      <CSVReader
      cssClass="react-csv-input"
      label="Select CSV"
      onFileLoaded={this.handleUpload}
      />
      <p>and then open the console</p>
      </div>
    );
  }
}

UploadCSV.propTypes = {
  onFileUpload: propTypes.func
};

export default UploadCSV
