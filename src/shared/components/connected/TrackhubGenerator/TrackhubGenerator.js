import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from 'react';
import axios from 'libs/axios';
import classes from './TrackhubGenerator.scss'
import UploadCSV from 'presentational/UploadCSV/UploadCSV';
import GenomeRetrieve from 'presentational/GenomeRetrieve/GenomeRetrieve';
import RenderCSV from 'presentational/RenderCSV/RenderCSV';
import { allFieldsComplete } from 'libs/VerifyCSV/VerifyCSV';
import { inputToJSON } from 'libs/inputToJSON/inputToJSON';
import { addTrackhub } from "store/actions/firebase-actions"

class TrackhubGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hubName: "",
      genome: "",
      shortLabel: "",
      longLabel: "",
      email: "",
      s3BucketName: "",
      samples: false
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
    e.preventDefault();
    if (allFieldsComplete(this.state)){
      let data = inputToJSON(this.state)
      this.sendTrackhub(data)  
    } else {
      return false
    }
  }

  sendTrackhub = (data) => {
    axios({
      url: 'https://rmvpv6ey05.execute-api.us-west-2.amazonaws.com/default/create-trackhub-write-s3-bucket/',
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "X-Api-Key": "5OpLIMUC4L9KeE16luwaZ8lAI6TcqUNx4jVfuB8K"
      },
      json: true,
      data: data
    })
      .then(response => {
        let trackhubUrl = response.data.hubPath
        const historyPush = this.props.history.push
        this.context.store.dispatch(addTrackhub(this.state, trackhubUrl, historyPush))
      })
      .catch(error => {
        console.error(error)
      })
  }

  displayCSV = (data) => {
    this.setState({ samples: data })
  }

  downloadExample(e, fileName="sample_template.csv", options={}) {
    e.preventDefault;
    // don't run on ze server
    if (typeof window === undefined) { return }

    const { 
        type = "text/csv"
    } = options

    const data = ['URL', 'shortLabel', 'longLabel', 'color (rgb)']

    const objectUrl = window.URL.createObjectURL(new Blob([data], { type }))

    const virtualTag = document.createElement("a")
    virtualTag.href = objectUrl
    virtualTag.setAttribute("download", fileName);
    virtualTag.click()

    window.URL.revokeObjectURL(objectUrl);
}

  render() {
    return (
      <div className={classes.homepage}>
        <p>Upload a CSV file using <a className={classes.pointer} onClick={this.downloadExample}>this template</a> to create a custom trackhub</p>
        <br />
        <UploadCSV onFileUpload={this.displayCSV} />
        <br />
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <label>
            <input
              type="text"
              name="s3BucketName"
              placeholder="dm-trackhubs"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Genome assembly (e.g. hg38):
          <GenomeRetrieve
              type="text"
              name="genome"
              onChangeGenome={this.handleChange}
            />
          </label>
          <br />
          <label>
            hub name:
            <input
              type="text"
              name="hubName"
              onChange={this.handleChange}
            />
          </label>
          <label>
            hub shortLabel:
            <input
              type="text"
              name="shortLabel"
              onChange={this.handleChange}
            />
          </label>
          <label>
            hub longLabel:
            <input
              type="text"
              name="longLabel"
              onChange={this.handleChange}
            />
          </label>
          <label>
            contact email:
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
            />
          </label>

          <input type="submit" value="Create trackhub" className={classes.button} />
        </form>
        <RenderCSV csv={this.state.samples} />
      </div>
    )
  }
}

const mapStateToProps = function (store) {
  return {
    userDetails: store.app.userDetails
  }
}

TrackhubGenerator.contextTypes = {
  store: PropTypes.object
}

export default connect(mapStateToProps)(TrackhubGenerator)