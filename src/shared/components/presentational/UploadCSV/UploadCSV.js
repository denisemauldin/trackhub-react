import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import propTypes from "prop-types"
import VerifyCSV from "../VerifyCSV/VerifyCSV";

class UploadCSV extends Component {
 constructor(props) {
  super(props)
 }

 handleUpload = (data) => {
  let vc = new VerifyCSV()
  data = vc.cleanEntry(data)
  vc.verifyHeader(data) ? this.props.onFileUpload(vc.removeEmpty(data)) : alert("Invalid Head Row. File not parsed.")
 }


 render() {
  return (
   <div className="container">
    <CSVReader
      cssClass="react-csv-input"
      label="Select CSV"
      onFileLoaded={this.handleUpload}
    />
   </div>
  );
 }
}

UploadCSV.propTypes = {
 onFileUpload: propTypes.func
};

export default UploadCSV
