[Back](../../README.md)
***

Building a Public TestNet Validator + Sentry
============================================

For the following instructions, we will describe the steps to setup a validator
or a sentry for the existing Public TestNet. Unless otherwise stated, the 
instruction step applies to both sentries and validators. 

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

    Use a new moniker string that uniquely identifies your validator/sentry. Please
    start the moniker with "validator" or "sentry", depending on what you are adding, 
    and use camel case. Examples:
    
        sentryBob
        validatorBob
    
    Use the chain-id used by the public testnet to identify the zone that this node 
    will connect to. The chain-id is "bluzelle", typically, but to check, use the
    following command:
    
        blzcli status --node tcp://testnet.public.bluzelle.com:26657 | jq ".node_info.network" | tr -d '"'

    Here is an example of initializing your local daemon config:

        blzd init sentryBob --chain-id bluzelle  2>&1 | jq .node_id
        
    The JSON output will contain the node_id. Note this value, so that it can be 
    used to identify this node to other nodes in the zone. Keep in mind that for this 
    document’s purposes, your validator and sentry will both only point at each
    other, and at other known public sentries. More on this later in this document.
    
    There is no need to touch the genesis file, ".blzd/config/genesis.json". It will be 
    completely replaced with the genesis file already in use on the public testnet. We 
    will perform this step later in this document.
    
4.  Set the client configuration, and remember to use the chain id of the zone (found above) 
    that this node will be joining:

        blzcli config chain-id <zone chain-id>
        blzcli config output json 
        blzcli config indent true 
        blzcli config trust-node true
        blzcli config keyring-backend test
        
5.  Collect the node id's of the public sentries on the testnet. The existing public sentries
    are as follows:
    
        a.sentry.testnet.public.bluzelle.com
        b.sentry.testnet.public.bluzelle.com
        
    Use the following command on each, to get their node id:
    
        blzcli status --node tcp://<sentry hostname>:26657 | jq ".node_info.id" | tr -d '"'
        
    So, for example:
    
        blzcli status --node tcp://a.sentry.testnet.public.bluzelle.com:26657 | jq ".node_info.id" | tr -d '"'
        
    Note down the sentry hostnames and respective node id's. You will need these next.
        
5.  Edit ".blzd/config/config/config.toml". Add the hostnames and node id's and ports
    of each of the sentries found earlier, as a comma-separated list, to the 
    "persistent_peers" value (replace the existing value, if any), as follows:

        # Comma separated list of nodes to keep persistent connections to
        persistent_peers = "<node id>@<node hostname>:26656"
        
    So, for example, the following:
    
        # Comma separated list of nodes to keep persistent connections to
        persistent_peers = "1ab16482640f1625a7a802bccdc2cc7afa93ed9e@a.sentry.testnet.public.bluzelle.com:26657, d229f73ac8de82fa788e495c181c7e0dbd72375d@b.sentry.testnet.public.bluzelle.com:26657"

6.  If you are adding a sentry, append your validator's "<node id>@<node hostname>:26656" 
    entry to the persistent_peers comma-separated list in your sentry, in config.toml.
    
    If you are adding a validator, append your sentry's "<node id>@<node hostname>:26656" 
    entry to the persistent_peers comma-separated list in your validator, in config.toml.
    
7.  If you are adding a sentry, set "pex = true", in config.toml.
    
    If you are adding a validator, set "pex = false", in config.toml.
    
8.  If you are adding a sentry, add your validator's node id (only the node id) to the 
    "private_peer_ids" comma-separated list, in your sentry's config.toml, as follows:
    
    "<node id>"
    
    Note: You can skip this step if you are not adding any of your own validators.
    
9. Edit ".blzd/config/app.toml" to set the minimum-gas-prices  to “10.0ubnt”

        # The minimum gas prices a validator is willing to accept for processing a
        # transaction. A transaction's fees must meet the minimum of any denomination
        # specified in this config (e.g. 0.25token1;0.0001token2).
        minimum-gas-prices = "10.0ubnt"
        
    Remember that *every* node should have *at least* this minimum. Feel free 
    to set it higher if you wish.
    
10. Edit ".blzd/config/app.toml", to add the following:
    
        bluzelle_crud = true
        

[Back](../../README.md)
