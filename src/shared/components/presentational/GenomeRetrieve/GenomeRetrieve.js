import React, { Component } from 'react';
import propTypes from "prop-types"
import GenomeDropdown from 'presentational/GenomeDropdown/GenomeDropdown';


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
      this.setState({
        genomes: data.coord_system_versions,
        defaultGenome: data.coord_system_versions[0]
      });
    });
  }

  render() {
    if(this.state.genomes.length === 0) {return null};
    return (
      <GenomeDropdown 
        genomes={this.state.genomes} 
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
