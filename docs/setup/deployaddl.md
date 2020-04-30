[prev](./deploy.md) | [next](../commands/qAndTX.md)
***
Deploy Additional Nodes
========================

1.  Refer to previous documents for initializing the server, dev environments, 
    and building the Bluzelle Curium applications. Open incoming TCP ports 
    26656 (P2P), 26657 (RPC), and 1317 (RESTful). If you are only running a
    validator, open all ports. If you are running both, follow these
    directives:
    
    - Sentry: P2P, RPC, RESTful
    - Validator: Only P2P
    
2.  If required, remove existing .blz* folders from the user directory
    
        cd
        rm -rf .blz*
    
3.  Initialize the daemon config as before

        blzd init <moniker> --chain-id <chain-id for the zone>  2>&1 | jq .node_id

    use a new moniker string, but use the chain-id used by the existing nodes to 
    identify the zone that this node will connect to

        blzd init curium01 --chain-id bluzelle  2>&1 | jq .node_id
        
    The JSON output will contain the node_id, note that value so that it can be 
    used to identify this node to other nodes in the zone (in their respective 
    “persistent_peers” value in config.toml). Keep in mind that for this 
    document’s purposes, we are only really ever pointing all second and 
    subsequent nodes to the first node’s id. We could point them to any other 
    running node, in theory.
    
    There is no need to edit the genesis file, ".blzd/config/genesis.json", as
    it will be replaced with the genesis file created for the initial node in 
    this zone. If this node will be joining an existing zone, you will need to 
    obtain the genesis file from a node that is already participaing in the
    zone (see below). 
    
4.  Set the client configuration, remember to use the chain id of the zone that
    this node will be joining

        blzcli config chain-id <zone chain-id>
        blzcli config output json 
        blzcli config indent true 
        blzcli config trust-node true
        blzcli config keyring-backend test

5.  Edit ".blzd/config/config/config.toml" to add the address of a node that is
    already a member of the zone that this node will be joining to the comma 
    separated list of persistent_peers:

        # Comma separated list of nodes to keep persistent connections to
        persistent_peers = "6ccd<..>cc9c@<nodeip>:26656"
        
    The node list item is created from the node id of the first node and its 
    server’s ip address and Cosmos port number. In theory, you could point to 
    any of the nodes already standing, here, or even all or some of them. We 
    just choose to point to the first one here, for the purposes of the 
    documentation.

6.  Edit ".blzd/config/app.toml" to set the minimum-gas-prices  to “10.0ubnt”

        # The minimum gas prices a validator is willing to accept for processing a
        # transaction. A transaction's fees must meet the minimum of any denomination
        # specified in this config (e.g. 0.25token1;0.0001token2).
        minimum-gas-prices = "10.0ubnt"
        
    Remember that *every* node should have *at least* this minimum. Feel free 
    to set it higher if you wish.
    
7.  *Optional - Validating Nodes Only*   
    Create the key that will be used to label the validator on this node

        blzcli keys add vuser

    which will produce the following output
        
        - name: vuser
          type: local
          address: bluzelle1z<...>
          pubkey: bluzellepub1<...>
          mnemonic: ""
          threshold: 0
          pubkeys: []

        **Important** write this mnemonic phrase in a safe place.
        It is the only way to recover your account if you ever forget your password.

        poem reason <...> palace

    note the address and mnemonic phrase values.

8.  *Optional - Validating Nodes Only*   
    If this node is joining an existing zone, obtain tokens from an existing
    node.   
    Or, return to the first node server and distribute tokens from the genesis 
    validator to the address of the validator on the new node

        blzcli tx send <src delegator address> <dest delegator address> \
          1000000000000000ubnt \
          --gas-prices 10.0ubnt \ 
          --from vuser
        
    note that the the validator keys are the id’s that are prefixed with 
    “bluzelle”, and can be obtained by running
    
        blzcli keys show vuser -a
        
    on each server.
    
    The “tx send” command will place the transaction that sends 10E15ubnt 
    tokens from the validator on the first node the the validator on the second
    node on the blockchain. 

9.  Before the node can be started its' blockchain must be seeded with a 
    genesis.json file from a node already participating in the zone. If the
    node is joining an existing zone, request the the genesis.json file from 
    the owner of the zone and copy it to  the "~/.blzd/config/" directory.
    
    If you are the owner of the zone, use the secure copy command "scp", to 
    copy the genesis file from the first node.

        scp <user>@<host>:~/.blzd/config/genesis.json ~/.blzd/config/

10. Start the Bluzelle daemon 

        blzd start
        
    the node will start and catch up to the rest of the zone. Occasionally, 
    this command will fail, in that case run the following command first

        blzd unsafe-reset-all
        
    and then retry the start command.

11. Optional - Validating Nodes Only   
    When the new node catches up to the rest of the zone, the account that we 
    have named vuser will have ubnt tokens given to it by another node in the
    zone, and it can be turned into a validator node, allowed to participate 
    in validating additions to the blockchain. 

        blzcli tx staking create-validator \
          --amount=1000000000ubnt \
          --pubkey=$(blzd tendermint show-validator) \
          --moniker=curium01 \
          --commission-rate=0.1 \
          --commission-max-rate=0.2 \
          --commission-max-change-rate=0.01 \
          --min-self-delegation=1 \
          --gas=auto --gas-adjustment=1.2 \
          --gas-prices=0.01bnt \
          --from vuser

    This will stake this node’s validator with the minimum amount of ubnt 
    tokens to become a validator with 100 voting power. The validator will 
    participate in validating new operations sent to block chain and earn 
    rewards and commision for doing so. Be sure to note the validator address 
    in the output.

12. You can get the current validator set with the command

        blzcli q tendermint-validator-set
        
    which will produce the output

        {
          "block_height": "758",
          "validators": [
            {
              "address": "bluzellevalcons1d<...>",
              "pub_key": "bluzellevalconspub1<...>",
              "proposer_priority": "-87",
              "voting_power": "100"
            },
            {
              "address": "bluzellevalcons1<...>",
              "pub_key": "bluzellevalconspub1<...>",
              "proposer_priority": "88",
              "voting_power": "100"
            }
          ]
        }
***
[prev](./deploy.md) | [next](../commands/qAndTX.md)
        
