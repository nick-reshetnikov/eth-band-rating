import Web3 from 'web3';
import Rating from './contracts/Rating.json';

// const ERC20Token = new web3.eth.Contract(ERC20Contract.abi, contractAddress)
let ratingAddress='0xF8db6D0E6eb5Dd0d7aaE9d956B2c8c290ede6bc5';
let ratingABI=[{"inputs":[{"internalType":"string[]","name":"_bandList","type":"string[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bandList","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"inBandList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRating","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minRating","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"numVotes","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"_band","type":"string"}],"name":"ratingFor","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_band","type":"string"}],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"_band","type":"string"}],"name":"contains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_band","type":"string"},{"internalType":"uint8","name":"_rating","type":"uint8"}],"name":"voteForBand","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const ethEnabled = () => {
  if (window.web3) {
    window.web3 = new Web3(window.ethereum);

    console.log(window.web3)
    console.log(window.ethereum)
    window.ethereum.enable();
    return true;
  }
  return false;
}



  // if (window.ethereum) {
  //   await window.ethereum.request({method: 'eth_requestAccounts'})
  //   window.web3 = new Web3(window.ethereum)
  //   console.log(window.web3)
  //   return true
  // }
  // return false;
// }

const getContract = async () => {
  const web3     = new Web3("http://localhost:8545")
  const accounts = await web3.eth.getAccounts()

  web3.eth.defaultAccount = accounts[0]

  return await new web3.eth.Contract(Rating.abi, ratingAddress)

  // if (ethEnabled()) {
    // window.web3.eth.defaultAccount = window.web3.eth.accounts[0];
    // window.web3.eth.contract(ratingABI).at(ratingAddress)
    // console.log(window.web3.eth)
  // } else {
  //   alert("Please install MetaMask to use this dApp!")
  // }
}

export { getContract }
