import React, {Component} from 'react';

class RenderCSV extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if(!this.props.csv) {return null}
    return(
      <div>
        <table>
        {this.props.csv.map((row) => {
          let divStyle = { 
            'background-color': `rgb(${row[row.length -1]})`,
            width: '10px',
            height: '10px'
        }
          return (
            <tr key={row[0]}>
              <td> {`${row[1]}`} </td>
              <td><div style={divStyle}></div></td>
            </tr>
          )
        })
        }
        </table>
      </div>
    )
  }
}

export default RenderCSV