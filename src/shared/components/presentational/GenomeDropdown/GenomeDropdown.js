import React, { Component } from 'react';
import propTypes from "prop-types"

class GenomeDropdown extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this sets the default value for the dropdown in 
    // the parent component
    let gd = this.refs.genomeDropdown;
    let e = new Event('change', {bubbles: true});
    gd.dispatchEvent(e)
  }

  render() {
    if (!this.props.genomes) {
      return null;
    }
    let genomes = this.props.genomes;
    let handleChange = this.props.onChangeGenome;

    let genomeOptions = genomes.map((genome,i) =>
      <option key={genome} value={this.props.ucscGenomes[i]}>{genome}</option>
    );
    return(
      <div>
        <select
          ref="genomeDropdown"
          name="genome"
          onChange={handleChange}
        >
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
