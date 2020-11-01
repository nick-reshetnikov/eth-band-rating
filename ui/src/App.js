import React, { Component } from 'react';
import './App.css';
import { ratingContract } from "./ethSetup"
import { ShowBands } from "./ShowBands"

class App extends Component {

  constructor(props){
    super(props)

    let bandNames = [];
    let i = 0;

    this.state = { bands: [] }

    while(true){
      try {
        let name = ratingContract.bandList(i);
        this.state.bands.push(
          { name: name, rating: ratingContract.totalVotesFor(name).toNumber()}
        );
      }
      catch (e) {
        break;
      }
      i++;
    }

    this.handleVoting = this.handleVoting.bind(this);
  }

  handleVoting(band){
    ratingContract.voteForBand(band);
    let votes = ratingContract.totalVotesFor(band).toNumber();
    this.setState(
      {
        bands: this.state.bands.map(
          (el) => (el.name === band) ? Object.assign({},el,{rating:votes}) : el
        )
      }
    );
  }

  render() {

    return (
      <div className="App">
        <h1 className="intro">Band Rating App | Etherium + React</h1>
        <div className="band-table">
          <ShowBands bands={this.state.bands} vote={this.handleVoting} />
        </div>
      </div>
    );
  }
}

export default App;
