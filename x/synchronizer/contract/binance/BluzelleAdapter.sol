
import './Ownable.sol';
import './BluzelleAdapterLibraries.sol';

pragma solidity >=0.4.22 <0.9.0; 

contract BluzelleAdapter is Ownable {
    using SafeMath for uint;
    using SafeERC20 for IERC20;

    struct TransactionDedupe{
        Transaction[] transactions;
        uint versionCount;
    }

    struct Transaction{
        string opt;
        string uuid;
        string key;
        string value;
        uint bookmark;
    }

    struct ExpiredKeyValueSet {
        ExpiredKeyValue[] ekv;
        uint totalCount;
    }

    struct ExpiredKeyValue {
        string key;
        uint expiry;
    }

    struct KeyValue {
        string value;
        bool isActive;
        uint expiry;
    }

    struct App {
        mapping(string => KeyValue) kvp;
        mapping(string => string) keys;
        uint totalRecordsCount;
        bool isActive;
    }
    struct Crud {
        mapping(string => App) app;
        string[] ownedApps;
        uint ownedAppsCount;
        bool isActive;
    }

    

    mapping(string => ExpiredKeyValueSet) expiryKeyValueMapping;
    mapping(address => Crud) crudMapping;

    mapping(string => bool) uuidMapping;
    mapping(uint => Transaction) transactionMapping;
    mapping(string =>TransactionDedupe) transactionDedupeMapping;

    uint public transactionCount; 
    uint public createCount;
    uint public updateCount;
    uint public deleteCount;
    uint public lease;
    uint public uuidMax;
    uint public keyMax;
    uint public valueMax;
    uint public MULTIPLIER;
    uint256 public chargePerByte;

    address public tokenContract;

    IERC20 public token;

    // Constructor
    constructor() {
      owner = msg.sender;
      transactionCount = 0;
      createCount = 0;
      updateCount = 0;
      deleteCount = 0;
      lease = 31536000; //default to a year in seconds
      tokenContract = 0xa27f67eEC3fe27168f81924974Fb6356936Eda7F;
      chargePerByte=146002;
      uuidMax=2048;
      keyMax=4097;
      valueMax=262144;
      MULTIPLIER=10**12;
    }

    /////////////////////////////////////////////////////////////////
    /////
    // INTERNAL FUNCTIONS
    /////
    /////////////////////////////////////////////////////////////////
    function expireKVP(address _address) internal {
        for(uint i=0; i<crudMapping[_address].ownedAppsCount; i++){            
            // loop through keys for given uuid
            for(uint h=0;h<expiryKeyValueMapping[crudMapping[_address].ownedApps[i]].totalCount;h++){
                if(expiryKeyValueMapping[crudMapping[_address].ownedApps[i]].ekv[h].expiry < block.timestamp){
                    remove(crudMapping[_address].ownedApps[i], expiryKeyValueMapping[crudMapping[_address].ownedApps[i]].ekv[h].key);
                }
            }
        }
    }
    
    /////////////////////////////////////////////////////////////////
    /////
    // PUBLIC UTILITY FUNCTIONS
    /////
    /////////////////////////////////////////////////////////////////

    function getEstimateCRUDCost(string memory _key, string memory _value) public view returns (uint){
        uint charge = (chargePerByte.mul(bytes(_key).length)).add((chargePerByte.mul(bytes(_value).length)));
        charge = charge.mul(MULTIPLIER);

        return charge;
    }

    /////////////////////////////////////////////////////////////////
    /////
    // SYNCHRONIZER FUNCTIONS
    /////
    /////////////////////////////////////////////////////////////////

    // for bluzelle synchronizer
    function getSynchronizerData(uint256 _start, uint256 _limit) public view returns (Transaction[] memory){
        Transaction[] memory tSet = new Transaction[](transactionCount);
        uint maxLimit = _limit;

        if(maxLimit == 0 || maxLimit > transactionCount){
            maxLimit = transactionCount;
        }
        
        // TODO: Need to deduping logic.  Use bookmarks and dedupe mapping.
        for (uint i = _start; i < maxLimit; i++) {
            tSet[i] = transactionMapping[i];
        }

        return tSet;
    }

    /////////////////////////////////////////////////////////////////
    /////
    // ADMINISTRATIVE FUNCTIONS
    /////
    /////////////////////////////////////////////////////////////////


    // set lease
    function setLease(uint _seconds) public onlyOwner returns(bool){
        lease = _seconds;
        return true;
    }

    function setChargeperByte(uint256 _chargePerByte) public onlyOwner returns (bool) {
        chargePerByte = _chargePerByte;
        return true;
    }

    function withdraw() public onlyOwner returns (bool) {
        token = IERC20(tokenContract);
        token.transfer(msg.sender, token.balanceOf(address(this)));

        return true;
    }

    /////////////////////////////////////////////////////////////////
    /////
    // DATABASE FUNCTIONS
    /////
    /////////////////////////////////////////////////////////////////

    // create kvp function.  NOTE: USERS NEED TO APPROVE CONTRACT ADAPTER with approve() AGAINST TOKEN CONTRACT
    function create(string memory _uuid, string memory _key, string memory _value) public returns (bool) {
        require(bytes(_uuid).length <= uuidMax, "UUID exceeds max size in bytes");
        require(bytes(_key).length <= keyMax, "Key exceeds max size in bytes");
        require(bytes(_value).length <= valueMax, "Value exceeds max size in bytes");
        require(keccak256(abi.encodePacked(_uuid)) != keccak256(abi.encodePacked("")), "UUID cannot be a blank string");
        require(keccak256(abi.encodePacked(_key)) != keccak256(abi.encodePacked("")), "Key cannot be a blank string");
        require(keccak256(abi.encodePacked(_value)) != keccak256(abi.encodePacked("")), "Value cannot be a blank string");
        require(uuidMapping[_uuid] != true, "UUID already taken");
        require(keccak256(abi.encodePacked(crudMapping[msg.sender].app[_uuid].keys[_key])) != keccak256(abi.encodePacked(_key)),"Key exists in the UUID already");

        expireKVP(msg.sender);

        uint256 charge = (chargePerByte.mul(bytes(_key).length)).add((chargePerByte.mul(bytes(_value).length)));
        charge = charge.mul(MULTIPLIER);

        // charge create fee
        token = IERC20(tokenContract);
        token.transferFrom(msg.sender, address(this), charge);

        // claim the uuid globally
        uuidMapping[_uuid] = true;
        crudMapping[msg.sender].ownedApps.push(_uuid);
        crudMapping[msg.sender].ownedAppsCount++;

        if(!crudMapping[msg.sender].isActive){
            crudMapping[msg.sender].app[_uuid].totalRecordsCount = 0;
            crudMapping[msg.sender].isActive = true;
        }
        
        if(!crudMapping[msg.sender].app[_uuid].isActive ){
            crudMapping[msg.sender].app[_uuid].isActive = true;
        }

        uint currentExpiry = block.timestamp.add(lease);

        crudMapping[msg.sender].app[_uuid].keys[_key] = _key;
        crudMapping[msg.sender].app[_uuid].kvp[_key].value = _value;
        crudMapping[msg.sender].app[_uuid].kvp[_key].isActive = true;
        crudMapping[msg.sender].app[_uuid].kvp[_key].expiry = currentExpiry; //add a year from now
        crudMapping[msg.sender].app[_uuid].totalRecordsCount++;

        // store expiries
        ExpiredKeyValue memory exkv = ExpiredKeyValue({key: _key, expiry: currentExpiry});
        expiryKeyValueMapping[_uuid].ekv.push(exkv);
        expiryKeyValueMapping[_uuid].totalCount++;

        // log create for synchronizer
        transactionMapping[transactionCount].opt = "create";
        transactionMapping[transactionCount].uuid = _uuid;
        transactionMapping[transactionCount].key = _key;
        transactionMapping[transactionCount].value = _value;
        transactionMapping[transactionCount].bookmark = transactionCount;

        transactionDedupeMapping[string(abi.encodePacked(_uuid,_key))].transactions.push(transactionMapping[transactionCount]);
        transactionDedupeMapping[string(abi.encodePacked(_uuid,_key))].versionCount++;

        // increase counts
        createCount++;
        transactionCount++;

        return true;
    }

    // returns KeyValue struct given uuid and key lookup
    function read(address _user, string memory _uuid, string memory _key) public view returns (KeyValue memory) {
        return crudMapping[_user].app[_uuid].kvp[_key];
    }
    
    // update kvp function.  NOTE: USERS NEED TO APPROVE CONTRACT ADAPTER with approve() AGAINST TOKEN CONTRACT
    function update(string memory _uuid, string memory _key, string memory _value) public returns (KeyValue memory)  {
        require(bytes(_value).length <= valueMax, "Value exceeds max size in bytes");
        require(keccak256(abi.encodePacked(_uuid)) != keccak256(abi.encodePacked("")), "UUID cannot be a blank string");
        require(keccak256(abi.encodePacked(_key)) != keccak256(abi.encodePacked("")), "Key cannot be a blank string");
        require(keccak256(abi.encodePacked(_value)) != keccak256(abi.encodePacked("")), "Value cannot be a blank string");
        require(uuidMapping[_uuid] == true, "No keys in UUID");
        require(keccak256(abi.encodePacked(crudMapping[msg.sender].app[_uuid].keys[_key])) == keccak256(abi.encodePacked(_key)),"Key not found in UUID");

        expireKVP(msg.sender);

        uint256 charge = chargePerByte.mul(bytes(_value).length);
        charge = charge.mul(MULTIPLIER);

        // charge create fee
        token = IERC20(tokenContract);
        token.transferFrom(msg.sender, address(this), charge);

        // make the update
        crudMapping[msg.sender].app[_uuid].kvp[_key] = KeyValue({value: _value, isActive: true, expiry: crudMapping[msg.sender].app[_uuid].kvp[_key].expiry});

        // log update for synchronizer
        transactionMapping[transactionCount].opt = "update";
        transactionMapping[transactionCount].uuid = _uuid;
        transactionMapping[transactionCount].key = _key;
        transactionMapping[transactionCount].value = _value;
        transactionMapping[transactionCount].bookmark = transactionCount;

        transactionDedupeMapping[string(abi.encodePacked(_uuid,_key))].transactions.push(transactionMapping[transactionCount]);
        transactionDedupeMapping[string(abi.encodePacked(_uuid,_key))].versionCount++;

        // increase counts
        updateCount++;
        transactionCount++;

        return crudMapping[msg.sender].app[_uuid].kvp[_key];
    }

    // delete kvp by key function.  NOTE: USERS NEED TO APPROVE CONTRACT ADAPTER with approve() AGAINST TOKEN CONTRACT
    function remove(string memory _uuid, string memory _key) public returns (bool)  {
        require(keccak256(abi.encodePacked(_uuid)) != keccak256(abi.encodePacked("")), "UUID cannot be a blank string");
        require(keccak256(abi.encodePacked(_key)) != keccak256(abi.encodePacked("")), "Key cannot be a blank string");
        require(uuidMapping[_uuid] == true, "No keys in UUID");
        require(keccak256(abi.encodePacked(crudMapping[msg.sender].app[_uuid].keys[_key])) == keccak256(abi.encodePacked(_key)),"Key not found in UUID");

        expireKVP(msg.sender);

        // make the delete
         ExpiredKeyValue[] memory ekvp = expiryKeyValueMapping[_uuid].ekv;
        for(uint i = 0; i < expiryKeyValueMapping[_uuid].totalCount; i++){
            if(keccak256(abi.encodePacked(ekvp[i].key)) == keccak256(abi.encodePacked(_key))){
                // remove kvp
                crudMapping[msg.sender].app[_uuid].keys[ekvp[i].key] = "";
                crudMapping[msg.sender].app[_uuid].kvp[ekvp[i].key] = KeyValue({value: "", isActive: false, expiry: 0});
                crudMapping[msg.sender].app[_uuid].totalRecordsCount--;

                // log update for synchronizer
                transactionMapping[transactionCount].opt = "delete";
                transactionMapping[transactionCount].uuid = _uuid;
                transactionMapping[transactionCount].key = ekvp[i].key;
                transactionMapping[transactionCount].value = "";
                transactionMapping[transactionCount].bookmark = transactionCount;

                transactionDedupeMapping[string(abi.encodePacked(_uuid,ekvp[i].key))].transactions.push(transactionMapping[transactionCount]);
                transactionDedupeMapping[string(abi.encodePacked(_uuid,ekvp[i].key))].versionCount++;

                ekvp[i].key = "";
                ekvp[i].expiry = 0;

                // increase counts
                deleteCount++;
                transactionCount++;
                break;
            }
        }

        return true;
    }
    
    // delete all kvp in uuid function.  NOTE: USERS NEED TO APPROVE CONTRACT ADAPTER with approve() AGAINST TOKEN CONTRACT
    function removeAll(string memory _uuid) public returns (bool) {
        require(keccak256(abi.encodePacked(_uuid)) != keccak256(abi.encodePacked("")), "UUID cannot be a blank string");
        require(uuidMapping[_uuid] == true, "No keys in UUID");

        expireKVP(msg.sender);

        // make the delete
         ExpiredKeyValue[] memory ekvp = expiryKeyValueMapping[_uuid].ekv;
        for(uint i = 0; i < expiryKeyValueMapping[_uuid].totalCount; i++){
           remove(_uuid, ekvp[i].key);
        }

        return true;
    }

    // returns list of kvp given uuid
    function keysValues(address _user, string memory _uuid) public view returns (KeyValue[] memory) {
        KeyValue[] memory kvlist = new KeyValue[](expiryKeyValueMapping[_uuid].totalCount);
        
        for(uint i = 0; i < expiryKeyValueMapping[_uuid].totalCount; i++){
            if((keccak256(abi.encodePacked(expiryKeyValueMapping[_uuid].ekv[i].key)) != keccak256(abi.encodePacked(""))) && (expiryKeyValueMapping[_uuid].ekv[i].expiry != 0)){
                kvlist[i] = crudMapping[_user].app[_uuid].kvp[expiryKeyValueMapping[_uuid].ekv[i].key];
            }
        }

        return kvlist;
    }        
}