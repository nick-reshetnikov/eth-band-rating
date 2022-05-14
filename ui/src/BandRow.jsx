import React, { useEffect, useState } from 'react';
import './ShowBands.css';

const BandRow = ({contract, name}) => {
  const [ratingInContract, setRatingInContract] = useState()
  const [enteredRating, setEnteredRating] = useState()
  const [transactionToggle, setTransactionToggle] = useState(false)

  const handleVote = async (e) => {
    e.preventDefault()
    contract.events.VoteApplied({}, (error, event) => { console.log(event.returnValues) })
    await contract.methods.voteForBand(name, parseInt(enteredRating)).send()

    setTransactionToggle(prev => !prev)
  }

  useEffect(() => {
    const fetchRating = async () => {
      let [ratingSum, numVotes] = Object.values(await contract.methods.ratingFor(name).call())
      let _ratingInContract = (numVotes === "0") ? 0 : parseInt(ratingSum) / parseInt(numVotes)

      setRatingInContract(_ratingInContract)
    }

    fetchRating()
  }, [contract, name, transactionToggle])

  return(
    <tr>
      <td>{name}</td>
      <td>{ratingInContract?.toFixed(1)}</td>
      <td>
        <form onSubmit={(e) => handleVote(e)}>
          <input type="text" className="integer-input" onChange={(e) => setEnteredRating(e.target.value)} />
          <input type="submit" value="rate" className="clickable" />
        </form>
      </td>
    </tr>
  )
}

export default BandRow
