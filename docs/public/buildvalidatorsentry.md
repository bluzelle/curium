[Back](../../README.md)
***

Building a Public TestNet Validator + Sentry
============================================

For the following instructions, we will describe the steps to setup a validator
or a sentry for the existing Public TestNet. Unless otherwise stated, the 
instruction step applies to both sentries and validators. 

1.  Refer to previous documents for initializing the server, dev environments, 
    and building the Bluzelle Curium applications.
    
    **CRITICAL**: Ensure you have built curium using the "**testnet**" target. 
    
    Open incoming TCP ports 26656 (P2P), 26657 (RPC), and 1317 (RESTful). If you 
    are only running a validator, open all ports. 
    
    CAVEAT: You do not actually need to open RPC and RESTful, if you are only 
    strictly acting as a validator or sentry without the desire to support RPC or 
    RESTful services. Feel free to skip RPC and RESTful if you prefer.
    
    If you are running both, follow these directives:
    
    - Sentry: P2P, RPC, RESTful
    - Validator: Only P2P
    
    Furthermore, if you are running both, set your validator to ONLY allow
    incoming 26656 from your sentry's IP. 

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
        
5.  Collect the node id's of the public sentries on the testnet. The existing public sentry
    hostnames are as follows:
    
        a.sentry.testnet.public.bluzelle.com
        b.sentry.testnet.public.bluzelle.com
        c.sentry.testnet.public.bluzelle.com
        d.sentry.testnet.public.bluzelle.com
        e.sentry.testnet.public.bluzelle.com
        
    Use the following command on each, to get their node id:
    
        blzcli status --node tcp://<sentry hostname>:26657 | jq ".node_info.id" | tr -d '"'
        
    So, for example:
    
        blzcli status --node tcp://a.sentry.testnet.public.bluzelle.com:26657 | jq ".node_info.id" | tr -d '"'
        
    Note down the sentry hostnames and respective node id's. You will need these next.
        
6.  If you are ONLY setting up a validator, do the following. Otherwise, if you are setting
    up both a validator AND a sentry, ONLY do the following on the sentry. 
    
    Edit ".blzd/config/config.toml". Add the hostnames and node id's and ports
    of each of the sentries found earlier, as a comma-separated list, to the 
    "persistent_peers" value (replace the existing value, if any), as follows:

        # Comma separated list of nodes to keep persistent connections to
        persistent_peers = "<node id>@<node hostname>:26656"
        
    So, for example, the following:
    
        # Comma separated list of nodes to keep persistent connections to
        persistent_peers = "1ab16482640f1625a7a802bccdc2cc7afa93ed9e@a.sentry.testnet.public.bluzelle.com:26656, d229f73ac8de82fa788e495c181c7e0dbd72375d@b.sentry.testnet.public.bluzelle.com:26656"
        
    Next, OPTIONALLY (if you want to provide RPC services as are needed for your own REST proxy,
    for example), ensure you have opened up RPC to the public in config.toml, by specifying the "laddr"
    value in the [rpc] section as follows (the default is only to listen on localhost):
    
        laddr = "tcp://0.0.0.0:26657"

7.  If you are adding a sentry, append your validator's "<node id>@<node hostname>:26656" 
    entry to the persistent_peers comma-separated list in your sentry, in config.toml. Only 
    applicable if you are also adding a validator.
    
    If you are adding a validator, append your sentry's "<node id>@<node hostname>:26656" 
    entry to the persistent_peers comma-separated list in your validator, in config.toml. Only 
    applicable if you are also adding a sentry.
    
8.  If you are adding a sentry, set "pex = true", in config.toml.
    
    If you are adding a validator, set "pex = false", in config.toml.
    
9.  If you are adding a sentry, add your validator's node id (only the node id) to the 
    "private_peer_ids" comma-separated list, in your sentry's config.toml. For example:
    
    "d229f73ac8de82fa788e495c181c7e0aaa72375e"
    
    Note: You can skip this step if you are not adding any validators.
    
10. In config.toml, set the following:

        addr_book_strict = false
    
11. Edit ".blzd/config/app.toml" to set the minimum-gas-prices to “10.0ubnt”

        # The minimum gas prices a validator is willing to accept for processing a
        # transaction. A transaction's fees must meet the minimum of any denomination
        # specified in this config (e.g. 0.25token1;0.0001token2).
        minimum-gas-prices = "10.0ubnt"
        
    Remember that *every* node should have *at least* this minimum. Feel free 
    to set it higher if you wish.
    
12. Edit ".blzd/config/app.toml", to add the following:
    
        bluzelle_crud = true

13. If you are creating a validator, add a new local keypair for the account that will be 
    the self-delegator to the validator on this node:

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

    CRITICAL: Note the address and mnemonic phrase values. You will need these on a
    long term basis.

14. If you are creating a validator, you will now need to acquire BNT tokens from the 
    public testnet and send them to the address of the acccount just created for your 
    validator. 
    
    There are various ways you may be able to do this, but this step is beyond the 
    scope of this document. 
    
    Please refer to community documentation and forums to acquire testnet BNT, as 
    needed. Any amount is sufficient, for the time being.
  
15. Copy into your "~/.blzd/config/" directory the public testnet's existing
    genesis.json file. You can view it as follows, from our sentry nodes:
    
        curl http://testnet.public.bluzelle.com:26657/genesis | jq -C '.result.genesis' | more -r
   
    A convenient example to download it to the current folder from our sentry nodes:
            
        curl http://testnet.public.bluzelle.com:26657/genesis | jq '.result.genesis' > genesis.json
        
    Ensure to copy over and replace the existing genesis.json file in your 
    "~/.blzd/config/" folder with the downloaded one from the testnet.  
 
16. Start the Bluzelle daemon 

        blzd start
        
    the node will start and catch up to the rest of the zone. Occasionally, 
    this command will fail, in that case run the following command first

        blzd unsafe-reset-all
        
    and then retry the start command.

17. If you are creating a validator, wait till your new node catches up to the
    rest of the zone. It will be obvious as the node will slow down output and
    be getting blocks every 4-5 seconds. To be sure, run the following command
    in another terminal on the validator and look for false:
    
        blzcli status | jq ".sync_info.catching_up"
        
    Once completed, also, verify your vuser account has the tokens you funded it
    with, by asking the local node:
    
        blzcli q account $(blzcli keys show vuser -a) | jq ".value.coins"
    
    At this point, the new "vuser" account will also have the 
    BNT tokens you funded to it. We now need to add this node as a validator for
    the testnet, as follows:  

        blzcli tx staking create-validator \
          --amount=<bonding amount> \
          --pubkey=$(blzd tendermint show-validator) \
          --website="<your website>" \
          --details="<description of your organization>" \ 
          --security-contact="<contact information>" \
          --identity=<keyBase/UPort 16 HEX digit PGP public key hash> \
          --moniker=<your moniker> \
          --commission-rate=0.1 \
          --commission-max-rate=0.2 \
          --commission-max-change-rate=0.01 \
          --min-self-delegation=1 \
          --gas=auto --gas-adjustment=1.2 \
          --gas-prices=<minimum gas price> \
          --from vuser

    The --identity (an optional field) is used to identify your organization, 
    verifiably. Generate a PGP key on your Keybase account, and provide the 
    16 HEX digit public key hash (no spaces). This identity is also used to
    retrieve a logo for your validator's profile, if provided. According to 
    COSMOS documentation, UPort may alternatively be used.

    This will stake this node’s validator with the prescribed amount of ubnt 
    tokens to become a validator. The validator will participate in validating 
    new operations sent to block chain and earn rewards and commision for doing 
    so. 
    
    Be sure to note the pubkey in the output.
    
    You can experiment with different values for the amount, commission rate,
    and gas price, although the latter should match whatever you put into app.toml. 
    
    Be sure to not use 100% of the amount of BNT in your vuser account, as you need
    some BNT to pay for gas.
    
    For example:

        blzcli tx staking create-validator \
          --amount=1000000000ubnt \
          --pubkey=$(blzd tendermint show-validator) \
          --website="https://bluzelle.com" \
          --details="To infinity and beyond" \
          --security-contact="Neeraj Murarka, CTO @ Bluzelle Networks" \
          --identity=5615416F70265000 \
          --moniker=validatorNeeraj \
          --commission-rate=0.1 \
          --commission-max-rate=0.2 \
          --commission-max-change-rate=0.01 \
          --min-self-delegation=1 \
          --gas=auto --gas-adjustment=1.2 \
          --gas-prices=10.0ubnt \
          --from vuser

18. You can get the current validator set with the command

        blzcli q tendermint-validator-set
        
    which will produce the output like the following:

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
        
    Look for your pubkey here, as confirmation.    
    
    Furthermore, within a few minutes, you should also see your validator listed
    listed at the Bluzelle Explorer:
    
        http://bigdipper.testnet.public.bluzelle.com:3000/validators

[Back](../../README.md)
