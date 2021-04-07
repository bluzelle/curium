pragma solidity 0.8.3;

contract Testing {

    address public owner;

    struct Record{
        string key;
        string value;
        string opt;
    }

    mapping(uint => Record) recordMapping;
    uint recordIndex; 

    constructor () {
        owner = msg.sender;
        recordMapping[0] = Record('foo', 'bar', 'create');
        recordMapping[1] = Record('foo', 'bat', 'update');
        recordMapping[2] = Record('foo', 'bat', 'delete');
    }

    function getAddress() public view returns(address) {
      return owner;
    }

    function getUint() public view returns(uint) {
        return 12345;
    }

    function getString() public view returns (string memory){
        return "hello world!";
    }

    function getBool() public view returns (bool) {
        return true;
    }

    function getSynchronizerData() public view returns (Record[] memory){
        Record[] memory rSet = new Record[](3);
        for (uint i = 0; i < 3; i++) {
            rSet[i] = recordMapping[i];
        }
        return rSet;
    }
}
