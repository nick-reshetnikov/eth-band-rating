import React, { Component } from 'react';
import './ShowBands.css';

export class ShowBands extends Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    let _newVotes = {}
    props.bands.forEach((band) => _newVotes[band.name] = 0)

    this.state = {
      newVotes: _newVotes
    }
  }

  handleChange(_band, event) {
    let _newVotes = this.state.newVotes;
    _newVotes[_band] = event.target.value

    this.setState({
      newVotes: _newVotes
    });
  }

  handleSubmit(band) {
    let _band = band;
    this.props.vote(_band, this.state.newVotes[_band]);
  }

  render() {
    let bandList = this.props.bands.map((band, i) =>
      <tr key={i}>
        <td>{band.name}</td>
        <td>{band.rating}</td>
        <td>
          <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit(band.name)}}>
            <input type="text" className="integer-input" value={this.state.newVotes[band.name]} onChange={(e) => this.handleChange(band.name, e)} />
            <input type="submit" value="rate" className="clickable" />
          </form>
        </td>
      </tr>
    )

    return(
      <div>
        <table>
          <tbody>
            <tr>
              <th>Band</th>
              <th>Avg Rating</th>
              <th>Your Rating</th>
            </tr>
            {bandList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ShowBands;
