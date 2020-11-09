/* pragma solidity >=0.4.22 <0.8.0; */
pragma experimental ABIEncoderV2;

contract Rating {
  mapping (string => uint8) public ratingsReceived;
  mapping (string => bool) public inBandList;

  string[] public bandList;

  constructor(string[] memory _bandList) public {
    bandList = _bandList;

    for (uint i=0; i<_bandList.length; i++) {
      inBandList[_bandList[i]] = true;
    }
  }

  function totalVotesFor(string memory _band) view public returns (uint8) {
    return ratingsReceived[_band];
  }


  function add(string memory _band) public {
    bandList.push(_band);
    inBandList[_band] = true;
  }

  function contains(string memory _band) view public returns (bool){
      return inBandList[_band];
  }

  function voteForBand(string memory _band) public {
    ratingsReceived[_band] += 1;
  }
}
