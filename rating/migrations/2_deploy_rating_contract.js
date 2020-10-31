var Ratings = artifacts.require("./Rating.sol");

module.exports = function (deployer) {
  deployer.deploy(Ratings, ["Children of Bodom", "Pentagram", "Megadeth"], {gas: 6700000});
};
