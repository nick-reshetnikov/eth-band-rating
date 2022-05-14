import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getContract } from "./ethSetup"
import BandRow from "./BandRow"

const App = () => {
  const [bandList, setBandList]       = useState([])
  const [contract, setContract]       = useState(undefined)
  const [enteredBand, setEnteredBand] = useState()
  const [transactionToggle, setTransactionToggle] = useState(false)

  const bandName      = async (c, i) => await c.methods.bandList(i).call()
  const buildBandList = async (c)    => {
    const _bandCount = parseInt(await c.methods.bandCount().call())
    let _bandList    = []

    for (let i of Array(_bandCount).keys()) {
      _bandList.push(await bandName(c, i))
    }

    return _bandList
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(await contract.methods.contains(enteredBand).call()) {
      alert(`${enteredBand} is already in the list!`)
    } else {
      await contract.methods.add(enteredBand).send()
      setTransactionToggle(prev => !prev)
    }
  }

  useEffect(() => {
    const retrieveContract = async () => setContract(await getContract())

    retrieveContract()
  }, [])

  useEffect(() => {
    if(contract) contract.events.VoteApplied({}, (error, event) => { console.log(event.returnValues) })
  }, [contract])

  useEffect(() => {
    const updateBandList = async () => {
      if (contract) setBandList(await buildBandList(contract))
    }

    updateBandList()
  }, [contract, transactionToggle])

  let addForm =
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        <input type="text" onChange={(e) => setEnteredBand(e.target.value)} />
      </label>
      <input className="clickable" type="submit" value="Add Band" />
    </form>

  return (
    <div className="App">
      <h1 className="intro">Rate the Bands</h1>
      <div className="band-table">
        <div>
          <table>
            <tbody>
              <tr>
                <th>Band</th>
                <th>Avg Rating</th>
                <th>Your Rating</th>
              </tr>
              {
                bandList.map((bandName, i) =>
                  <BandRow key={`bandName_${i}`} name={bandName} contract={contract}/>)
              }
            </tbody>
          </table>
          {addForm}
      </div>
    </div>
  </div>
  )
}

export default App
