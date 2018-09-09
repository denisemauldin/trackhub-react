import React, { Component } from 'react';
import propTypes from "prop-types"
import GenomeDropdown from 'presentational/GenomeDropdown/GenomeDropdown';

let uscsGenomeConversion = {
  "GRCh38": 'hg38',
  "GRCh37": 'hg37',
  "NCBI36": 'hg36',
  "NCBI35": 'hg35',
  "NCBI34": 'hg34'
}

class GenomeRetrieve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genomes: [],
      default: []
    };
  }

  componentDidMount() {
    let initialGenomes = [];
    fetch('https://rest.ensembl.org/info/assembly/homo_sapiens?content-type=application/json')
      .then(response => {
        return response.json();
      }).then(data => {
        let ucscGenomes = []
        data.coord_system_versions.map((genome) => {
          ucscGenomes.push(uscsGenomeConversion[genome])
        })
        this.setState({
          genomes: data.coord_system_versions,
          ucscGenomes: ucscGenomes,
          defaultGenome: data.coord_system_versions[0]
        });
      });
  }

  render() {
    if (this.state.genomes.length === 0) { return null };
    return (
      <GenomeDropdown
        genomes={this.state.genomes}
        ucscGenomes={this.state.ucscGenomes}
        onChangeGenome={this.props.onChangeGenome}
        selected={this.state.defaultGenome}
      />
    );
  }
}

GenomeRetrieve.propTypes = {
  onChangeGenome: propTypes.func
};

export default GenomeRetrieve;
