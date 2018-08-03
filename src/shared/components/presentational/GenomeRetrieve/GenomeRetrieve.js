import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, withRouter} from 'react-router-dom';
import GenomeDropdown from 'presentational/GenomeDropdown/GenomeDropdown';


class GenomeRetrieve extends Component {
  constructor() {
    super();
    this.state = {
      genomes: [],
    };
  }

  componentDidMount() {
    let initialGenomes = [];
    fetch('/data/api/genome/?has_browser_label=True&page_size=50',
      {
        credentials: 'include'
      })
    .then(response => {
      return response.json();
    }).then(data => {
      initialGenomes = data.results.sort((a,b) => {
        return a.label < b.label ? -1 : 1
      });
      this.setState({
        genomes: initialGenomes,
      });
    });
  }

  render() {
    return (
      <GenomeDropdown genomes={this.state.genomes} />
    );
  }
}

export default GenomeRetrieve;
