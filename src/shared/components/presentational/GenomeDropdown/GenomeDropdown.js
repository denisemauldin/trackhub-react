import React, { Component } from 'react';

class GenomeDropdown extends Component {
  constructor() {
    super();
  }
  render() {
    if (!this.props.genomes) {
      return null;
    }
    let genomes = this.props.genomes;
    let genomeOptions = genomes.map((genome) =>
      <option key={genome}>{genome}</option>
    );
    return(
      <div>
        <select>
          {genomeOptions}
        </select>
      </div>
    )
  }
}

export default GenomeDropdown;
