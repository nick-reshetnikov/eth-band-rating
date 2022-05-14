/* pragma solidity >=0.4.22 <0.8.0; */
pragma experimental ABIEncoderV2;

contract Rating {
  uint8 public minRating = 1;
  uint8 public maxRating = 10;

  // mapping (string => uint8) public ratingsReceived;
  mapping (string => bool) public inBandList;
  mapping (string => uint8[10]) public numVotes;

  string[] public bandList;

  constructor(string[] memory _bandList) public {
    bandList = _bandList;

    for (uint8 i=0; i<_bandList.length; i++) {
      string memory bandName = _bandList[i];
      inBandList[bandName] = true;
      for (uint8 j=minRating-1; j < maxRating; j++){
          numVotes[bandName][j] = 0;
      }
    }
  }

  event VoteApplied(address indexed _from, string _band, uint8 _rating, uint8 _voteNum);

  function ratingFor(string memory _band) view public returns (uint8, uint8) {
    uint8 _numVotes = 0;
    uint8 _ratingSum = 0;

    for (uint8 i=0; i < maxRating; i++){
        _ratingSum += numVotes[_band][i] * (i + 1);
        _numVotes += numVotes[_band][i];
    }
    return (_ratingSum, _numVotes);
  }

  function add(string memory _band) public {
    bandList.push(_band);
    inBandList[_band] = true;
  }

  function contains(string memory _band) view public returns (bool){
      return inBandList[_band];
  }

  function voteForBand(string memory _band, uint8 _rating) public {
    uint8 _index = _rating - 1;
    numVotes[_band][_index] += 1;
    emit VoteApplied(msg.sender, _band, _rating, numVotes[_band][_index]);
  }

  function bandCount() view public returns (uint256 _count){
    return bandList.length;
  }
}
