import React, { Component } from 'react';
import './App.css';
import { ratingContract } from "./ethSetup"
import { ShowBands } from "./ShowBands"

class App extends Component {

  constructor(props){
    super(props)

    let i = 0;

    this.state = { bands: [] }

    while(true){

      try {
        let band = ratingContract.bandList(i);

        this.state.bands.push(
          { name: band, rating: this.ratingForBand(band) }
        );
      }
      catch (e) {
        break;
      }
      i++;
    }

    this.textInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
  }

  ratingForBand(band){
    let [ratingSum, numVotes] = ratingContract.ratingFor(band)
    return (numVotes === 0) ? 0 : ratingSum.toNumber() / numVotes.toNumber();
  }

  handleSubmit(){
    let addedBand = this.textInput.current.value;

    if(ratingContract.contains(addedBand)){
      alert(`${addedBand} is already in the list!`);
    }else{
      ratingContract.add(addedBand);

      this.state.bands.push({name: addedBand, rating: 0});
      this.setState({bands: this.state.bands});
    }
  }


  handleVoting(band, rating){
    ratingContract.voteForBand(band, rating);
    this.setState(
      {
        bands: this.state.bands.map(
          (el) => (el.name === band) ? Object.assign({},el,{rating:this.ratingForBand(band)}) : el
        )
      }
    );
  }

  render() {

    let addForm =
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" ref={this.textInput} />
        </label>
        <input className="clickable" type="submit" value="Add Band" />
      </form>

    return (
      <div className="App">
        <h1 className="intro">Band Rating App | Etherium + React</h1>
        <div className="band-table">
          <ShowBands bands={this.state.bands} vote={this.handleVoting} />
          {addForm}
        </div>
      </div>
    );
  }
}

export default App;
