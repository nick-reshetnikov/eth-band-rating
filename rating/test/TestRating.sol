pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rating.sol";

contract TestRating {
  function testInitialBandListInDeployedContract() public {
    Rating ratingContract = Rating(DeployedAddresses.Rating());

    string memory expectedFirstBand = "Children of Bodom";
    string memory expectedSecondBand = "Pentagram";

    Assert.equal(ratingContract.bandList(0), expectedFirstBand, "The first band should be Children of Bodom");
    Assert.equal(ratingContract.bandList(1), expectedSecondBand, "The first band should be Pentagram");
  }
}
