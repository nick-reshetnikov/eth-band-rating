import Web3 from 'web3';

const web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
let ratingABI=[{"inputs":[{"internalType":"string[]","name":"bandNames","type":"string[]"}],"payable":false,
"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bandList","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"ratingsReceived","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"funcion"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"band","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"band","type":"bytes32"}],"name":"voteForBand","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
let ratingAddress='0x34EA6bc077BE7b8A05E0B718411603f2783d348E';
web3.eth.defaultAccount = web3.eth.accounts[0]


const ratingContract=web3.eth.contract(ratingABI).at(ratingAddress);
export {ratingContract};
