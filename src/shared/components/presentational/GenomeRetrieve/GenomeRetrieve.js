import React, { Component } from 'react';
import propTypes from "prop-types"
import GenomeDropdown from 'presentational/GenomeDropdown/GenomeDropdown';


class GenomeRetrieve extends Component {
  constructor(props) {
    super(props);
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
    return (
      <GenomeDropdown genomes={this.state.genomes} onChangeGenome={this.props.onChangeGenome} />
    );
  }
}

GenomeRetrieve.propTypes = {
  onChangeGenome: propTypes.func
 };

export default GenomeRetrieve;
