[prev](./deploy.md) | [next](../commands/qAndTX.md)
***
Deploy Additional Nodes
========================

1.  Refer to previous documents for initializing the server, dev environments, and building the Bluzelle Curium applications. Open incoming TCP ports 26656 and 1317.

2. Initialize the daemon config as before

        blzd init <moniker> --chain-id <chain-id for the zone>  2>&1 | jq .node_id

    Use a new moniker string, but use the same chain-id as used in the initial node

        blzd init curium01 --chain-id bluzelle  2>&1 | jq .node_id
        
    The JSON output will contain the node_id, note that value so that it can be used to identify this node to other nodes in the zone (in their respective “persistent_peers” value in config.toml). Keep in mind that for this document’s purposes, we are only really ever pointing all second and subsequent nodes to the first node’s id. We could point them to any other running node, in theory.
    
    There is no need to edit the genesis file, .blzd/config/genesis.json, as it will be replaced with the genesis file created for the initial node in this zone.
    
3.  Set the client configuration

        blzcli config chain-id bluzelle
        blzcli config output json 
        blzcli config indent true 
        blzcli config trust-node true

4.  Edit .blzd/config/config/config.toml to add  the first node’s address to the comma separated list of persistent_peers:

        # Comma separated list of nodes to keep persistent connections to
        persistent_peers = "6ccdb7764f4b6762bca9ce254ee9db49a687cc9c@18.220.65.143:26656"
        
    The node list item is created from the node id of the first node and its server’s ip address and Cosmos port number. In theory, you could point to any of the nodes already standing, here, or even all or some of them. We just choose to point to the first one here, for the purposes of the documentation.

5.  Edit .blzd/config/app.toml to set the minimum-gas-prices  to “0.01bnt”

        # The minimum gas prices a validator is willing to accept for processing a
        # transaction. A transaction's fees must meet the minimum of any denomination
        # specified in this config (e.g. 0.25token1;0.0001token2).
        minimum-gas-prices = "0.01bnt"
        
    Remember that every node should have at least this minimum. Feel free to set it higher if you wish.
    
6.  Create the key that will be used to label the validator on this node

        > blzcli keys add validator
        Enter a passphrase to encrypt your key to disk:
        Repeat the passphrase:
        
        - name: validator
          type: local
          address: bluzelle1zgu6f3ezy0ay9eq82nla2mmlnedzypn9q86usr
          pubkey: bluzellepub1addwnpepqvz4h9kgd7xx4k04epr7z2msy82uh8ugdsdykmplzcu2sx80gttrz8x8fpr
          mnemonic: ""
          threshold: 0
          pubkeys: []

        **Important** write this mnemonic phrase in a safe place.
        It is the only way to recover your account if you ever forget your password.

        poem reason library tenant enhance uncover welcome sponsor govern math young muffin series onion coral metal uncover topple conduct pact recall moral tornado palace

    note the address and mnemonic phrase values.

7.  Return to the first node server and distribute tokens from the genesis validator to the address of the validator on the new node

        blzcli tx send <src delegator address> <dest delegator address> 1000000000bnt /
          --gas-prices 0.01bnt / 
          --from validator
    note that the the validator keys are the id’s that are prefixed with “bluzelle”, and can be obtained by running
    
        blzcli keys show validator -a
        
    on each server.
    
    The “tx send” command will place the transaction that sends 1B bnt tokens from the validator on the first node the the validator on the second node on the blockchain. 

8.  Before the node can be started it must copy the genesis.json file from the first node. Return to the new node server and use the secure copy command scp, to copy the genesis file from the first node.

        scp -i <pem> ubuntu@35.183.107.145:~/.blzd/config/genesis.json ~/.blzd/config/
    where <pem> is the identity file for the current server.

9.  Start the Bluzelle daemon as a background task on the new node

        blzd start
        
    the node will start and catch up to the rest of the zone. Occasionally, this command will fail, in that case run the following command first

        blzd unsafe-reset-all
        
    and then retry the start command.

10. When the new node catches up to the rest of the zone, the account that we have named validator will have 1B bnt tokens, and it can be turned into a validator node, allowed to participate in validating additions to the blockchain. 

        blzcli tx staking create-validator \
          --amount=100000000bnt \
          --pubkey=$(blzd tendermint show-validator) \
          --moniker=curium01 \
          --commission-rate=0.1 \
          --commission-max-rate=0.2 \
          --commission-max-change-rate=0.01 \
          --min-self-delegation=1 \
          --gas=auto --gas-adjustment=1.2 \
          --gas-prices=0.01bnt \
          --from validator

    This will stake this node’s validator with the minimum amount of bnt tokens to become a validator with 100 voting power. The validator will participate in validating new operations sent to block chain and earn rewards and commision for doing so. Be sure to note the validator address in the output.

11. You can get the current validator set with the command

        > blzcli q tendermint-validator-set
        {
          "block_height": "758",
          "validators": [
            {
              "address": "bluzellevalcons1djmvgcx9l8kn7m0zye4dgjnwsa4twypuyd9gqy",
              "pub_key": "bluzellevalconspub1zcjduepq4cdy7m8fv60d5fr9zwx5j8h00qckhthzusrk8t6sz6szaa89x3hs6zufce",
              "proposer_priority": "-87",
              "voting_power": "100"
            },
            {
              "address": "bluzellevalcons1cg0pcwwefhflctqvsr3fejc6gnt30whc8jzzzd",
              "pub_key": "bluzellevalconspub1zcjduepqnlt34pc0lqwt0rekxfxzz8k4mvf0a6z9nfasjmtvrx7xfej0ehaqxp6aqd",
              "proposer_priority": "88",
              "voting_power": "100"
            }
          ]
        }
***
[prev](./deploy.md) | [next](../commands/qAndTX.md)
        
