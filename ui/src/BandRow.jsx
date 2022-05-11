import React, { useEffect, useState } from 'react';
import './ShowBands.css';

const BandRow = ({contract, name}) => {
  const [ratingInContract, setRatingInContract] = useState()
  const [enteredRating, setEnteredRating] = useState()
  const handleVote = async () => {
    contract.methods.voteForBand(name, parseInt(enteredRating)).call({}, (e,r)=>{console.log(e,r)})
  }

  useEffect(() => {
    const fetchRating = async () => {
      let [ratingSum, numVotes] = Object.values(await contract.methods.ratingFor(name).call())
      let _ratingInContract = (numVotes === "0") ? 0 : parseInt(ratingSum) / parseInt(numVotes)

      setRatingInContract(_ratingInContract)
    }

    fetchRating()
  }, [contract, name])

  return(
    <tr>
      <td>{name}</td>
      <td>{ratingInContract}</td>
      <td>
        <form onSubmit={(e) => {e.preventDefault(); handleVote()}}>
          <input type="text" className="integer-input" onChange={(e) => setEnteredRating(e.target.value)} />
          <input type="submit" value="rate" className="clickable" />
        </form>
      </td>
    </tr>
  )
}

export default BandRow
