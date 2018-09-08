import React, { Component } from 'react';
import propTypes from "prop-types"

class GenomeDropdown extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.genomes) {
      return null;
    }
    let genomes = this.props.genomes;
    let handleChange = this.props.onChangeGenome;

    let genomeOptions = genomes.map((genome) =>
      <option key={genome}>{genome}</option>
    );
    return(
      <div>
        <select
          name="genome"
          onChange={handleChange}>
          {genomeOptions}
        </select>
      </div>
    )
  }
}
// this would be a good place to use redux
GenomeDropdown.propTypes = {
  onChangeGenome: propTypes.func
 };
 
export default GenomeDropdown;
