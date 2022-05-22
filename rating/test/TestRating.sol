pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rating.sol";

contract TestRating {
  Rating ratingContract = Rating(DeployedAddresses.Rating());

  string expectedFirstBand = "Children of Bodom";
  string expectedSecondBand = "Pentagram";
  uint8 indexForVoteOf10 = 9;

  function testInitialBandListInDeployedContract() public {

    uint expectedNumVotes = 0;

    Assert.equal(ratingContract.bandList(0), expectedFirstBand, string(abi.encodePacked("The first band should be ", expectedFirstBand)));
    Assert.equal(ratingContract.bandList(1), expectedSecondBand, string(abi.encodePacked("The second band should be ", expectedSecondBand)));
    Assert.equal(ratingContract.numVotes(expectedFirstBand, indexForVoteOf10), expectedNumVotes, string(abi.encodePacked("There should be 0 votes of 10 for ", expectedFirstBand)));
    Assert.equal(ratingContract.numVotes(expectedFirstBand, indexForVoteOf10), expectedNumVotes, string(abi.encodePacked("There should be 0 votes of 10 for ", expectedSecondBand)));
  }

  function testVotingForBand() public {
    uint expectedNumVotes = 1;

    ratingContract.voteForBand(expectedFirstBand, 10);

    Assert.equal(ratingContract.numVotes(expectedFirstBand, indexForVoteOf10), expectedNumVotes, string(abi.encodePacked("There should be 1 vote of 10 for ", expectedFirstBand)));
  }
}
