[prev](./build.md) | [next](./deployaddl.md)
***

Deploy the Initial Node
=======================

>NOTE: If you wish to simply deploy a node, validating or non-validating, to an
*existing* zone please skip ahead to the [Deploy Additional Nodes](./deployaddl.md)
document.
***

1.  Before initializing a node, remove the previous node config folders from 
    your home folder, if they exist

        rm -rf .blz*
 
2.  Initialize the daemon

        blzd init [moniker] [flags]

    where moniker is a human readable name for the current node, an appropriate 
    flag would be a string for --chain-id, for example

        blzd init curium00 --chain-id bluzelletest 2>&1 | jq .node_id
    
    Use the jq command to parse the node_id from the json output. Note the 
    “2>&1” argument, blzd init, in this case sends its output to stderr, so we 
    need to redirect the output back to stdout. 
    
    The node_id is used to identify this node to other nodes in the zone (see 
    the “persistent_peers” value in config.toml).

3.  Edit “./blzd/config/config.toml” to add 

        output = "json"

    after the line 

        ##### advanced configuration options #####
        
    this can be done from the command line with
    
        sed -i -e '/^##### advanced configuration options #####/a \
                    output = "json"' ~/.blzd/config/config.toml

4.  Edit “.blzd/config/genesis.json” to change bond_denom from “stake” to 
    “ubnt”. This genesis.json file will be used to initialize the blockchain 
    for this zone. This can be done from the command line with sed

         sed -i -e 's/"bond_denom": "stake"/"bond_denom": "ubnt"/g' \
            ~/.blzd/config/genesis.json
            
5.  Edit “.blzd/config/genesis.json” to change denom from “stake” to 
    “ubnt” (for governance). This can be done from the command line with sed

         sed -i -e 's/"denom": "stake"/"denom": "ubnt"/g' \
            ~/.blzd/config/genesis.json
            
6.  Edit .blzd/config/app.toml in a text editor and set the minimum-gas-prices 
    to “10.0ubnt”. Every node should have at least this minimum. This can also 
    be done from the command line with sed: 

        sed -i -e 's/minimum-gas-prices = ""/minimum-gas-prices = "10.0ubnt"/g' \
            ~/.blzd/config/app.toml

7.  Set the client configuration settings:

        blzcli config chain-id bluzelletest 
        blzcli config output json 
        blzcli config indent true 
        blzcli config trust-node true
        blzcli config keyring-backend test
        
    where “bluzelletest” is the zone’s chain-id.

8.  Derive a new key that will label the validator account for this node, call 
    it “vuser”:

        blzcli keys add vuser
        
    which will produce the output       
        
        - name: vuser
          type: local
          address: bluzelle1<...>
          pubkey: bluzellepub1<...>
          mnemonic: ""
          threshold: 0
          pubkeys: []
        
        
        **Important** write this mnemonic phrase in a safe place.
        It is the only way to recover your account if you ever forget your password.
        
        amused silk <...> switch

    Note the address, with the “bluzelle” prefix, and the mnemonic. The 
    mnemonic will be used by the Bluzelle javascript client to send 
    transactions to the node.

9.  Add the first account to the blockchain using the vuser key as the account 
    identifier

        blzd add-genesis-account $(blzcli keys show vuser -a) 500000000000000ubnt
        
    this command is an alias for “tx staking create-validator”. The amount 
    given for the ubnt tokens here will be the total amount of tokens available 
    to the zone.

10.  As this is the first node in the zone, it needs an initial transaction for 
    the blockchain. 

        blzd gentx --name vuser --amount 10000000000000ubnt --keyring-backend test
        
    which will produce the output:
        
        Genesis transaction written to "/home/rich/.blzd/config/gentx/gentx-<...>.json"
        
    remember to specify the  amount of coins to bond using the --amount 
    parameter so that *ubnt* is used as stake, if this is neglected the bonding 
    denomination will be stake. 
    
    Open the genesis transaction JSON file and note the value for the 
    validator_address, it will have the prefix “bluzellevaloper”,  this id will
    be used to get account info later. Alternatively, use jq to extract the 
    value directly:
    
        less ~/.blzd/config/gentx/gentx-7a3a<...>.json \
            | jq .value.msg[0].value.validator_address
    
    Which will produce the output
    
        "bluzellevaloper1<...>"
    
11. Create the genesis file from the first transaction:

        blzd collect-gentxs
        
    the output of this command will also contain the validator_address, 
    prefixed with bluzellevaloper. If you have not done so in the previous 
    step, note the validator_address. 
    
    This command creates the signed genesis.json file 
    ".blzd/config/genesis.json)" that will be copied to the rest of the nodes 
    in the zone.

12. The node can be started with the Bluzelle daemon:

        blzd start
        
13. On a second terminal the http server can be started with the Bluzelle 
    client

        blzcli rest-server
 
    If external access to the rest server is required add the _--laddr_ 
    argument
    
        blzcli rest-server --laddr tcp://0.0.0.0:1317
 
***
[prev](./build.md) | [next](./deployaddl.md)
