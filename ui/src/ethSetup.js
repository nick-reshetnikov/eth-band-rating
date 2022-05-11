import Web3 from 'web3';
import RatingContract from './contracts/Rating.json';

let RATING_CONTRACT_ADDRESS='0x37061bb18885dFE495E935d9ab9ce491Ad034adA';

const getContract = async () => {
  const web3     = new Web3(Web3.givenProvider || "http://127.0.0.1:8545")
  const accounts = await web3.eth.getAccounts()

  web3.eth.defaultAccount = accounts[0]

  return await new web3.eth.Contract(RatingContract.abi, RATING_CONTRACT_ADDRESS, { from: web3.eth.defaultAccount })
}

export { getContract }
