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

    this.textInput = React.createRef();
    this.handleAddBandClick = this.handleAddBandClick.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
  }

  handleAddBandClick(){
    let addedBand = this.textInput.current.value;

    if(ratingContract.contains(addedBand)){
      alert(`${addedBand} is already in the list!`);
    }else{
      ratingContract.add(addedBand);

      this.state.bands.push({name: addedBand, rating: 0});
      this.setState({bands: this.state.bands});
    }
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

    let addButton =
      <div className="add-button">
        <input type="text" ref={this.textInput} />
        <input
          type="button"
          value="Add Band"
          onClick={this.handleAddBandClick}
        />
      </div>

    return (
      <div className="App">
        <h1 className="intro">Band Rating App | Etherium + React</h1>
        <div className="band-table">
          <ShowBands bands={this.state.bands} vote={this.handleVoting} />
          {addButton}
        </div>
      </div>
    );
  }
}

export default App;
