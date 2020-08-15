# Building a Public Validator + Sentry

[Back](../)

## Building a Public Validator + Sentry

For the following instructions, we will describe the steps to setup a validator or a sentry for the existing Public MainNet or TestNet. Unless otherwise stated, the instruction steps apply to both sentries and validators.

1. Refer to previous documents for initializing the server, dev environments, and building the Bluzelle Curium applications.

   **CRITICAL**: If you are building for the **MAIN NET**, ensure you have built curium using the "**mainnet**" target.
   
   OR

   **CRITICAL**: If you are building for the **TEST NET**, ensure you have built curium using the "**testnet**" target.

   Open incoming TCP port 26656 \(P2P\). Optionally, if you have sufficient firewall and packet filtering security \(to protect against DoS and DDoS attacks\), you may opt to also open up 26657 \(RPC\), and 1317 \(RESTful\). These two ports are only for the purposes of serving clients. If you have no such interest and do not want to deal with the security considerations, keep them closed.

   If you are running both a sentry and a validator, follow these directives:

   * Sentry: P2P, RPC \(optional\), RESTful \(optional\)
   * Validator: Only P2P

   Furthermore, if you are running both, be sure to set your validator to ONLY allow incoming 26656 from your sentry's IP.

2. If required, remove existing .blz\* folders from the user directory \(only necessary if you had a pre-existing install\).

   ```text
   cd
   rm -rf .blz*
   ```

3. Initialize the daemon config. 

   Please ensure you have the correct chain-id. We do change it whenever we restart a new network. Run the following command to find the existing chain-id:
   
   **MAIN NET**:
   
   ```text
   curl --location --request GET 'http://client.sentry.bluzellenet.bluzelle.com:1317/node_info' -s | jq '.node_info.network' | tr -d '"'
   ```

   **TEST NET**:
   
   ```text
   curl --location --request GET 'http://client.sentry.testnet.public.bluzelle.com:1317/node_info' -s | jq '.node_info.network' | tr -d '"'
   ```

   Initialize your daemon config as follows:

   ```text
   blzd init <moniker> --chain-id <chain-id>  2>&1 | jq .node_id
   ```

   Use a unique moniker string that uniquely identifies your validator/sentry. Please start the moniker with "validator" or "sentry", depending on what you are adding, and use camel case. Try to include your own or company name, if applicable.
   
   Examples:

   ```text
   sentryBob
   validatorTesla
   ```

   Here is an example of initializing your local daemon config:

   ```text
   blzd init sentryBob --chain-id bluzelle  2>&1 | jq .node_id
   ```

   The JSON output will contain the node\_id. Note this value, as it can be used to identify this node to other nodes in the zone. Keep in mind that for this document’s purposes, your validator and sentry will both only point at each other. Your sentry will also point at other known public sentries (if you know any) and to Bluzelle's own gateway sentries. More on this later in this document.

   There is no need to touch the genesis file, ".blzd/config/genesis.json" yet. The one that was generated just now is generic and not needed. It will be completely replaced with the genesis file already in use. We will perform this step later in this document.

4. Set the client configuration, and remember to use the chain id of the network \(found above\) that this node will be joining:

   ```text
   blzcli config chain-id <chain-id>
   blzcli config output json 
   blzcli config indent true 
   blzcli config trust-node true
   blzcli config keyring-backend test
   ```

5. Collect the node id's of the gateway sentries. 

   Use the following command, to get a list of all the gateway sentries, including their IP addresses and node id's:

   **MAIN NET**:
   
   ```text
   curl -s http://client.sentry.bluzellenet.bluzelle.com:26657/net_info | jq -C '[.result.peers[] | select(.node_info.moniker | startswith("daemon-sentry-gateway")) | {moniker: .node_info.moniker, id: .node_info.id, ip_address: .remote_ip}] | sort_by(.moniker)'
   ```

   **TEST NET**:
   
   ```text
   curl -s http://client.sentry.testnet.public.bluzelle.com:26657/net_info | jq -C '[.result.peers[] | select(.node_info.moniker | startswith("daemon-sentry-gateway")) | {moniker: .node_info.moniker, id: .node_info.id, ip_address: .remote_ip}] | sort_by(.moniker)'
   ```

   Note down the sentry IP address and respective id, for each such gateway sentry. You will need this information next.

6. If you are ONLY setting up a validator, do the following. Otherwise, if you are setting up both a validator AND a sentry, ONLY do the following on the sentry.

   Edit ".blzd/config/config.toml". Add the hostnames/IPs and node id's and ports of each of the gateway sentries found earlier, as a comma-separated list, to the "persistent\_peers" value \(replace the existing value, if any\), as follows:

   ```text
   # Comma separated list of nodes to keep persistent connections to
   persistent_peers = "<node id>@<node hostname>:26656"
   ```

   So, for example, the following:

   ```text
   # Comma separated list of nodes to keep persistent connections to
   persistent_peers = "ae3b71b8bb09ebeb4a5e373a00aab6f98cebb545@1.2.3.4:26656"
   ```

   Next, OPTIONALLY \(if you want to provide RPC services as are needed for your own REST proxy, for example\), ensure you have opened up RPC to the public in config.toml, by specifying the "laddr" value in the \[rpc\] section as follows \(the default is only to listen on localhost\):

   ```text
   laddr = "tcp://0.0.0.0:26657"
   ```

   Of course, this depends highly on your setup. If your REST proxy is local to blzd, you can opt to only open up RPC to 127.0.0.1 and restrict access to RPC.

7. If you are adding a sentry, append your validator's "@:26656" entry to the persistent\_peers comma-separated list in your sentry, in config.toml. Only applicable if you are also adding a validator.

   If you are adding a validator, append your sentry's "@:26656" entry to the persistent\_peers comma-separated list in your validator, in config.toml. Only applicable if you are also adding a sentry.

8. If you are adding a sentry, set "pex = true", in config.toml.

   If you are adding a validator, set "pex = false", in config.toml.

9. If you are adding a sentry, add your validator's node id \(only the node id\) to the "private\_peer\_ids" comma-separated list, in your sentry's config.toml. For example:

   "d229f73ac8de82fa788e495c181c7e0aaa72375e"

   Note: You can skip this step if you are not adding any validators.

10. In config.toml, set the following:

    ```text
    addr_book_strict = false
    ```

11. In config.toml, set a suitable maximum \# of allowed inbound and outbound peers in the \[p2p\] section. For example, with a node that might be very busy \(such as a sentry to a secure zone for validators\), you might want to increase from the defaults, to avoid a situation where peers start to get dropped. Following are the values we have used:

    ```text
    # Maximum number of inbound peers
    max_num_inbound_peers = 200

    # Maximum number of outbound peers to connect to, excluding persistent peers
    max_num_outbound_peers = 100
    ```

12. Edit ".blzd/config/app.toml" to set the minimum-gas-prices to “10.0ubnt”

    ```text
    # The minimum gas prices a validator is willing to accept for processing a
    # transaction. A transaction's fees must meet the minimum of any denomination
    # specified in this config (e.g. 0.25token1;0.0001token2).
    minimum-gas-prices = "10.0ubnt"
    ```

    Remember that _every_ node should have _at least_ this minimum. Feel free to set it higher if you wish.

13. Edit ".blzd/config/app.toml", to add the following:

    ```text
    bluzelle_crud = true
    ```
    
14. If you are creating a validator, you will now need to acquire BNT tokens. Following are instructions depending on if you are targeting the MAIN NET or TEST NET.

    **MAIN NET**:
   
    i) Be sure you have Metamask installed. It needs to be installed properly and connected to your ETH MainNet account that has access to the BLZ tokens you wish to use for your validator. You can use Metamask with Ledger and Trezor hardware wallets as well.
   
    ii) Goto the following URL to sign into the staking wallet:
    ```
    http://staking.bluzelle.com/
    ```
   
    iii) Create a new BNT mnemonic for our MAIN NET, and store and secure this BNT mnemonic securely. **If you lose this mnemonic, you will lose ALL your funds.** Bluzelle is not responsible and there is no policy to "refund" anything. Note that this web wallet is **100% client side**. Your BNT mnemonic is generated on the local browser only and is never transmitted over the network. You are 100% responsible for storing and securing this mnemonic. 
    
    iv) Add a new local keypair for the account that will be the self-delegator to the validator on this node:

    ```text
    blzcli keys add vuser --recover
    ```

    Provide the menemonic generated above from the web staking wallet, when asked for the bip39 mnemonic. 
    
    You will then see the following output:

    * name: vuser type: local address: bluzelle1z&lt;...&gt; pubkey: bluzellepub1&lt;...&gt;
   
    **TEST NET**:
   
    Get some tokens to stake your validator from our FAUCET. Note that you can only use the faucet once every FIVE minutes. 

    i) Add a new local keypair for the account that will be the self-delegator to the validator on this node:

    ```text
    blzcli keys add vuser
    ```

    which will produce the following output:

    * name: vuser type: local address: bluzelle1z&lt;...&gt; pubkey: bluzellepub1&lt;...&gt; mnemonic: "" threshold: 0 pubkeys: \[\]

      **Important** write this mnemonic phrase in a safe place. It is the only way to recover your account if you ever forget your password.

      poem reason &lt;...&gt; palace

    CRITICAL: Note the address and mnemonic phrase values. You will need these on a long term basis.

    ii) Add a local key for the "faucet" account. Its mnemonic: 
    ```
    endless clog price asthma lottery various innocent base radio discover measure cushion account oval enable shove cost private hood immune unhappy once spell million
    ```
    
    You can add it with:
    ```
    blzcli keys add faucet --recover
    ```
    
    Once added, you will have a new local address:
    ```
    bluzelle135am3hulweusuu7qlgemwejxpf2nsr0423t8sx
    ```
    
    iii) Run the faucet and fund yourself. Use the following command (this example assumes your validator user account is "vuser" from above steps):
    ```
    blzcli tx faucet mintfor $(blzcli keys show vuser -a) --node tcp://client.sentry.testnet.public.bluzelle.com:26657 --gas-prices 10.0ubnt --chain-id <chain id> --from faucet
    ```
    
    iv) Verify you have tokens. If the above command gives an error that the account it not found, it likely means the faucet has not yet completed (takes a few seconds) or has failed for some reason: 
    ```
    blzcli q account $(blzcli keys show vuser -a) --node tcp://client.sentry.testnet.public.bluzelle.com:26657
    ```
    
    **Please do NOT take tokens from the faucet address. It is there as a convenience for the community. If you really want more tokens, just use the faucet.**

15. Copy into your "~/.blzd/config/" directory the network's existing genesis.json file. You can view it as follows, from our sentry nodes:

    **MAIN NET**:
    ```text
    curl http://client.sentry.bluzellenet.bluzelle.com:26657/genesis | jq -C '.result.genesis' | more -r
    ```

    **TEST NET**:
    ```text
    curl http://client.sentry.testnet.public.bluzelle.com:26657/genesis | jq -C '.result.genesis' | more -r
    ```

    A convenient example to download it to the current folder from our sentry nodes:

    **MAIN NET**:
    ```text
    curl http://client.sentry.bluzellenet.bluzelle.com:26657/genesis | jq '.result.genesis' > genesis.json
    ```

    **TEST NET**:
    ```text
    curl http://client.sentry.testnet.public.bluzelle.com:26657/genesis | jq '.result.genesis' > genesis.json
    ```

    Ensure to copy over and replace the existing genesis.json file in your "~/.blzd/config/" folder with the downloaded one from the testnet.

16. Start the Bluzelle daemon

    ```text
    blzd start
    ```

    the node will start and catch up to the rest of the zone. Occasionally, this command will fail, in that case run the following command first

    ```text
    blzd unsafe-reset-all
    ```

    and then retry the start command.

17. If you are creating a validator, wait till your new node catches up to the rest of the zone. It will be obvious as the node will slow down output and be getting blocks every 4-5 seconds. To be sure, run the following command in another terminal on the validator and look for false:

    ```text
    blzcli status | jq ".sync_info.catching_up"
    ```

    Once completed, also, verify your vuser account has the tokens you funded it with, by asking the local node:

    ```text
    blzcli q account $(blzcli keys show vuser -a) | jq ".value.coins"
    ```
    
    If you get an error looking up your vuser account, where it does not appear to exist, it likely means your node is still catching up. Your local copy of the blockchain won't know about the existence of your account till the block that the tokens were sent to you on, gets synced to you locally.

18. At this point, the new "vuser" account will also reflect the BNT tokens that were funded to it. We now need to add this node as a validator, as follows:

    ```text
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
    ```

    The --identity \(an optional field\) is used to identify your organization, verifiably. Generate a PGP key on your Keybase account, and provide the 16 HEX digit public key hash \(no spaces\). This identity is also used to retrieve a logo for your validator's profile, if provided. According to COSMOS documentation, UPort may alternatively be used.

    This will stake this node’s validator with the prescribed amount of ubnt tokens to become a validator. The validator will participate in validating new operations sent to block chain and earn rewards and commision for doing so.

    Be sure to note the pubkey in the output.

    You can experiment with different values for the amount, commission rate, and gas price, although the latter should match whatever you put into app.toml.

    Be sure to not use 100% of the amount of BNT in your vuser account, as you need some BNT to pay for gas.

    For example:

    ```text
    blzcli tx staking create-validator \
      --amount=1500000000ubnt \
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
    ```

19. You can get the current validator set with the commands \(be sure to check all available pages -- the limit cannot exceed 100\):

    ```text
    blzcli q tendermint-validator-set --limit 100 --page 1
    blzcli q tendermint-validator-set --limit 100 --page 2
    ```

    which will produce the output like the following:

    ```text
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
    ```

    Look for your pubkey here, as confirmation.

    Furthermore, within a few minutes, you should also see your validator listed listed at the Bluzelle Explorer:

    **MAIN NET**:

    http://bigdipper.bluzellenet.bluzelle.com/validators
    
    **TEST NET**:

    http://bigdipper.testnet.public.bluzelle.com/validators

[Back](../)
