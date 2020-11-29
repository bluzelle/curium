# Deploy the Initial Node

[prev](build.md) \| [next](deployaddl.md)

## Deploy the Initial Node

> NOTE: If you wish to simply deploy a node, validating or non-validating, to an _existing_ zone please skip ahead to the [Deploy Additional Nodes](deployaddl.md) document.

1. Before initializing a node, remove the previous node config folders from your home folder, if they exist

   ```text
   rm -rf .blz*
   ```

2. Initialize the daemon

   ```text
   blzd init [moniker] [flags]
   ```

   where moniker is a human readable name for the current node, an appropriate flag would be a string for --chain-id, for example

   ```text
   blzd init curium00 --chain-id bluzelle 2>&1 | jq .node_id
   ```

   Use the jq command to parse the node\_id from the json output. Note the “2&gt;&1” argument, blzd init, in this case sends its output to stderr, so we need to redirect the output back to stdout.

   The node\_id is used to identify this node to other nodes in the zone \(see the “persistent\_peers” value in config.toml\).

3. Edit “.blzd/config/config.toml” to add

   ```text
   output = "json"
   ```

   after the line

   ```text
   ##### advanced configuration options #####
   ```

   this can be done from the command line with

   ```text
   sed -i -e '/^##### advanced configuration options #####/a \
               output = "json"' ~/.blzd/config/config.toml
   ```

4. Edit “.blzd/config/genesis.json” to change bond\_denom from “stake” to “ubnt”. This genesis.json file will be used to initialize the blockchain for this zone. This can be done from the command line with sed

   ```text
    sed -i -e 's/"bond_denom": "stake"/"bond_denom": "ubnt"/g' \
       ~/.blzd/config/genesis.json
   ```

5. Edit “.blzd/config/genesis.json” to change denom from “stake” to “ubnt” \(for governance\). This can be done from the command line with sed

   ```text
    sed -i -e 's/"denom": "stake"/"denom": "ubnt"/g' \
       ~/.blzd/config/genesis.json
   ```

6. Edit .blzd/config/app.toml in a text editor and set the minimum-gas-prices to “10.0ubnt”. Every node should have at least this minimum. This can also be done from the command line with sed:

   ```text
   sed -i -e 's/minimum-gas-prices = ""/minimum-gas-prices = "10.0ubnt"/g' \
       ~/.blzd/config/app.toml
   ```

7. Set the client configuration settings:

   ```text
   blzcli config chain-id bluzelle 
   blzcli config output json 
   blzcli config indent true 
   blzcli config trust-node true
   blzcli config keyring-backend test
   ```

   where “bluzelle” is the zone’s chain-id.

8. Derive a new key that will label the validator account for this node, call it “vuser”:

   ```text
   blzcli keys add vuser
   ```

   which will produce the output

   * name: vuser

     type: local

     address: bluzelle1&lt;...&gt;

     pubkey: bluzellepub1&lt;...&gt;

     mnemonic: ""

     threshold: 0

     pubkeys: \[\]

```text
    **Important** write this mnemonic phrase in a safe place.
    It is the only way to recover your account if you ever forget your password.

    amused silk <...> switch

Note the address, with the “bluzelle” prefix, and the mnemonic. The 
mnemonic will be used by the Bluzelle javascript client to send 
transactions to the node.
```

9. Add the first account to the blockchain using the vuser key as the account identifier

   ```text
   blzd add-genesis-account $(blzcli keys show vuser -a) 500000000000000ubnt
   ```

   this command is an alias for “tx staking create-validator”. The amount given for the ubnt tokens here will be the total amount of tokens available to the zone.

10. As this is the first node in the zone, it needs an initial transaction for the blockchain.

   ```text
   blzd gentx --name vuser --amount 10000000000000ubnt --keyring-backend test
   ```
   
   which will produce the output:

   Genesis transaction written to "/home/rich/.blzd/config/gentx/gentx-&lt;...&gt;.json"

   Remember to specify the amount of coins to bond using the --amount parameter so that _ubnt_ is used as stake, if this is neglected the bonding denomination will be stake.

   Open the genesis transaction JSON file and note the value for the validator\_address, it will have the prefix “bluzellevaloper”, this id will be used to get account info later. Alternatively, use jq to extract the value directly:

   less ~/.blzd/config/gentx/gentx-7a3a&lt;...&gt;.json  \| jq .value.msg\[0\].value.validator\_address

   Which will produce the output

   "bluzellevaloper1&lt;...&gt;"

11. Create the genesis file from the first transaction:

   ```text
   blzd collect-gentxs
   ```

   The output of this command will also contain the validator\_address, prefixed with bluzellevaloper. If you have not done so in the previous step, note the validator\_address.

   This command creates the signed genesis.json file ".blzd/config/genesis.json\)" that will be copied to the rest of the nodes in the zone.

12. The node can be started with the Bluzelle daemon:

   ```text
   blzd start
   ```

13. On a second terminal the http server can be started with the Bluzelle client

   ```text
   blzcli rest-server
   ```

   If external access to the rest server is required add the _--laddr_ argument

   ```text
   blzcli rest-server --laddr tcp://0.0.0.0:1317
   ```

[prev](build.md) \| [next](deployaddl.md)

