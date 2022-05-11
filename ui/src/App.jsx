import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getContract } from "./ethSetup"
import BandRow from "./BandRow"

const App = () => {
  const [bandList, setBandList]       = useState([])
  const [contract, setContract]       = useState({})
  const [enteredBand, setEnteredBand] = useState()

  const handleSubmit = async () => {
    console.log(enteredBand)

    if(await contract.methods.contains(enteredBand).call()) {
      alert(`${enteredBand} is already in the list!`)
    } else {
      console.log(contract.methods)
      await contract.methods.add(enteredBand).call();
      // setBands(...bands, { name: enteredBand, rating: 0 })
    }
  }

  useEffect(() => {
    const fetchContract = async () => {
      const _contract  = await getContract()
      const _bandCount = parseInt(await _contract.methods.bandCount().call())
      let _bandList    = []

      for (let i of Array(_bandCount).keys()) {
        _bandList.push(await _contract.methods.bandList(i).call())
      }

      setContract(_contract)
      setBandList(_bandList)
    }

    fetchContract()

  }, [])

  // const getCount = async () => await contract.methods.bandCount().call()
  const getBandName = async (i) => await contract.methods.bandList(i).call()

  let addForm =
    <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
      <label>
        <input type="text" onChange={(e) => setEnteredBand(e.target.value)} />
      </label>
      <input className="clickable" type="submit" value="Add Band" />
    </form>


  return (
    <div className="App">
      <h1 className="intro">Band Rating App | Etherium + React</h1>
      <div className="band-table">
        <div>
          <table>
            <tbody>
              <tr>
                <th>Band</th>
                <th>Avg Rating</th>
                <th>Your Rating</th>
              </tr>
              {bandList.map((bandName, i) => <BandRow key={`bandName_${i}`} name={bandName} contract={contract} /> )}
            </tbody>
          </table>
          {addForm}
      </div>
    </div>
  </div>
  )
}

export default App
