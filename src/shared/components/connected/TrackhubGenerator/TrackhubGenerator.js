import React, { Component } from 'react';
import classes from './TrackhubGenerator.scss'
import UploadCSV from 'presentational/UploadCSV/UploadCSV';

class TrackhubGenerator extends Component {
 constructor(props) {
  super(props);
  this.state = {
   hub: "",
   genome: "",
   aggregationColumn: "",
   labelColumn: "",
   colorColumn: "",
   sortColumn: "",
   trackTypes: "",
   short: "",
   long: "",
   contact: "",
   display: "none"
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleChange(e) {
  const target = e.target;
  const value = target.value;
  const name = target.name;
  this.setState({
   [name]: value
  });
 }

 handleSubmit(e) {
  console.table(this.state)
  e.preventDefault();
 }

 handleMouseIn() {
  this.setState({
   hover: true,
   display: "block"
  })
 }

 handleMouseOut() {
  this.setState({
   hover: false,
   display: "none"
  })
 }

 displayCSV = (data) => {
  console.log(data);
 }

 render() {
  return(
   <React.Fragment>
    <UploadCSV onFileUpload={this.displayCSV} />
   <form onSubmit={this.handleSubmit} className={classes.form}>
    <label>
     hub name:
     <input
      type="text"
      name="hub_name"
      onChange={this.handleChange}
     />
    </label>
    <label>
     Genome assembly (e.g. hg38):
     <input
      type="text"
      name="genomes_file"
      onChange={this.handleChange}
     />
    </label>
    <label>
     Column containing the aggregation for each sample:
     <input
      type="text"
      name="agg_col"
      onChange={this.handleChange}
     />
    </label>
    <label>
     Column containing the custom label for each track:
     <input
      type="text"
      name="label_col"
      onChange={this.handleChange}
     />
    </label>
    <label>
     Column containing the color for each track:
     <input
      type="text"
      name="color_col"
      onChange={this.handleChange}
     />
    </label>
    <label>
     Column containing the value to sort each sample:
     <input
      type="text"
      name="sort_col"
      onChange={this.handleChange}
     />
    </label>
    <label>
     Column containing the aggregation for each sample:
     <input
      type="text"
      name="aggregation_column"
      onChange={this.handleChange}
     />
    </label>
    <label>
     <div
     onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
     OPTIONAL list of track types to use:
      <div style={{display: this.state.display}}>Use the "Shorthand" values from the table at 'https://lims.altiusinstitute.org/FileData/FilePurpose' </div>
      </div>
     <input
      type="text"
      name="track_types"
      onChange={this.handleChange}
     />
    </label>
    <label>
     shortLabel:
     <input
      type="text"
      name="short_label"
      onChange={this.handleChange}
     />
    </label>
    <label>
     longLabel:
     <input
      type="text"
      name="long_label"
      onChange={this.handleChange}
     />
    </label>
    <label>
     contact email:
     <input
      type="text"
      name="contact_email"
      onChange={this.handleChange}
     />
    </label>

    <input type="submit" value="Submit" className={classes.button} />
   </form>
   </React.Fragment>
  )
 }
}
// send JSON object to Flask
// Flask runs Mark's script (create custom trackhub) using all the parser arguments
// data store returns an object to the user
// have Flask service check React server for jobs to run. scales better b/c we can only
// send one react request at a time.
// need to set up file store for react
export default TrackhubGenerator;
