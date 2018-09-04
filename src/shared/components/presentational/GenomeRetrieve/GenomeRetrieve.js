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
    fetch('https://rest.ensembl.org/info/assembly/homo_sapiens?content-type=application/json')
    .then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        genomes: data.coord_system_versions,
      });
    });
  }

  render() {
    console.log('state genomes :', this.state.genomes);
    return (
      <GenomeDropdown genomes={this.state.genomes} />
    );
  }
}

export default GenomeRetrieve;
