import Web3 from 'web3';

const web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
let ratingABI=[{"inputs":[{"internalType":"string[]","name":"_bandList","type":"string[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bandList","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"inBandList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"ratingsReceived","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"_band","type":"string"}],"name":"totalVotesFor","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_band","type":"string"}],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"_band","type":"string"}],"name":"contains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_band","type":"string"}],"name":"voteForBand","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
let ratingAddress='0xE8d83A6FEC2053FEFA77aEFd2E44416Bb60523b0';
web3.eth.defaultAccount = web3.eth.accounts[0]


const ratingContract=web3.eth.contract(ratingABI).at(ratingAddress);
export {ratingContract};
