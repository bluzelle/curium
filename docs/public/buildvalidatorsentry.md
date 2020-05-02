[Back](../../README.md)
***

Building a Public TestNet Validator + Sentry
============================================

1.  Refer to previous documents for initializing the server, dev environments, 
    and building the Bluzelle Curium applications. Open incoming TCP ports 
    26656 (P2P), 26657 (RPC), and 1317 (RESTful). If you are only running a
    validator, open all ports. If you are running both, follow these
    directives:
    
    - Sentry: P2P, RPC, RESTful
    - Validator: Only P2P

2.  If required, remove existing .blz* folders from the user directory (only 
    necessary if you had a pre-existing install). 
    
        cd
        rm -rf .blz*
        
3.  Initialize the daemon config. 

        blzd init <moniker> --chain-id <chain-id for the zone>  2>&1 | jq .node_id

    Use a new moniker string that uniquely identifies your validator/sentry. 
    
    Use the chain-id used by the public testnet to identify the zone that this node 
    will connect to. The chain-id is "bluzelle", typically, but to check, use the
    following command:
    
        blzcli status --node tcp://testnet.public.bluzelle.com:26657 | jq ".node_info.network" | tr -d '"'

    Here is an example of initializing your local daemon config:

        blzd init bobSentry --chain-id bluzelle  2>&1 | jq .node_id
        
    The JSON output will contain the node_id. Note this value, so that it can be 
    used to identify this node to other nodes in the zone. Keep in mind that for this 
    document’s purposes, your validator and sentry will both only point at each
    other, and at other known public sentries. More on this later in this document.
    
    There is no need to touch the genesis file, ".blzd/config/genesis.json". It will be 
    completely replaced with the genesis file already in use on the public testnet. We 
    will perform this step later in this document.    

[Back](../../README.md)
