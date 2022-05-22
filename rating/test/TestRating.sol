pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rating.sol";

contract TestRating {
  Rating ratingContract = Rating(DeployedAddresses.Rating());
  uint8 indexForVoteOf10 = 9;

  function testInitialBandListInDeployedContract() public {
    string memory expectedFirstBand = "Children of Bodom";
    string memory expectedSecondBand = "Pentagram";
    uint expectedNumVotes = 0;

    Assert.equal(ratingContract.bandList(0), expectedFirstBand, "The first band should be Children of Bodom");
    Assert.equal(ratingContract.bandList(1), expectedSecondBand, "The second band should be Pentagram");
    Assert.equal(ratingContract.numVotes("Children of Bodom", indexForVoteOf10), expectedNumVotes, "There should be 0 votes of 10 for Children of Bodom");
    Assert.equal(ratingContract.numVotes("Pentagram", indexForVoteOf10), expectedNumVotes, "There should be 0 votes of 10 for Pentagram");
  }

  function testVotingForBand() public {
    string memory expectedFirstBand = "Children of Bodom";
    uint expectedNumVotes = 1;

    ratingContract.voteForBand("Children of Bodom", 10);

    Assert.equal(ratingContract.numVotes("Children of Bodom", indexForVoteOf10), expectedNumVotes, "There should be 1 vote of 10 for Children of Bodom");
  }
}
