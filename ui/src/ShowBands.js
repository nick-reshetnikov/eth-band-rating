import React, { Component } from 'react';
import './ShowBands.css';

export class ShowBands extends Component {
  handleChange = (band) => {
    let _band = band;
    this.props.vote(_band);
  }

  render() {
    let bandList = this.props.bands.map((band, i) =>
      <tr key={i}>
        <td className="clickable" onClick={this.handleChange.bind(this, band.name)}>{band.name}</td>
        <td>{band.rating}</td>
      </tr>
    )

    return(
      <div>
        <table>
          <tbody>
            <tr>
              <th>Band</th>
              <th>Rating</th>
            </tr>
            {bandList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ShowBands;
