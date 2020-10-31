pragma solidity >=0.4.22 <0.8.0;

contract Rating{
  mapping (bytes32 => uint8) public ratingsReceived;

  bytes32[] public bandList;

  constructor(bytes32[] memory bandNames) public {
    bandList = bandNames;
  }

  /* function Rating(bytes32[] memory bandNames) public {
    bandList = bandNames;
  } */

  function totalVotesFor(bytes32 band) view public returns (uint8) {
    return ratingsReceived[band];
  }

  function voteForBand(bytes32 band) public {
    ratingsReceived[band] += 1;
  }
}
