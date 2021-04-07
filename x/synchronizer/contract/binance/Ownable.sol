pragma solidity >=0.4.22 <0.9.0;

/// @dev Stub for access control.

contract Ownable {
    
    address public owner;
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    event LogNewOwner(address sender, address newOwner);
    
    constructor() public {
        owner = msg.sender;
    }
    
    function renounceOwnership() public onlyOwner {
        emit LogNewOwner(owner, address(0));
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit LogNewOwner(msg.sender, newOwner);
    }
}