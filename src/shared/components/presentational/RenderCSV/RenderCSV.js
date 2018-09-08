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
          <tbody key="tableBody">
          {this.props.csv.map((row) => {
            let divStyle = { 
              'backgroundColor': `rgb(${row[row.length -1]})`,
              width: '10px',
              height: '10px'
            }
            return (
                <tr key={row[0]}>
                  <td key={`${row[1]}`}> {`${row[1]}`} </td>
                  <td key={`${row[1]}definitelyunique`}>
                    <div style={divStyle} key={`${row[1]}alsounique`}></div>
                  </td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RenderCSV