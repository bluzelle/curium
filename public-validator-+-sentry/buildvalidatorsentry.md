# Building a Public Validator + Sentry

[Back](../)

## Building a Public Validator + Sentry

For the following instructions, we will describe the steps to setup a validator or a sentry for an existing Public MainNet or TestNet. Unless otherwise stated, the instruction steps apply to both sentries and validators.

If you are following the **FORK** path, keep in mind that you must ensure your new validator is on the new network, and not the old. If you start your new validator but it attempts to peer with the old network, there is a risk you could get **slashed for double-signing**, that comes with a substantial penalty. Please be extra careful to ensure you setup the new validator carefully, only talking to the new network and only configured for the new network.

1. Refer to previous documents for initializing the server, dev environments, and building the Bluzelle Curium applications. Refer to steps `i-iii` listed below.

   **CRITICAL**: If you are building for the **MAIN NET**, ensure you have built curium using the "**mainnet**" target. 
   
   OR

   **CRITICAL**: If you are building for the **TEST NET**, ensure you have built curium using the "**testnet**" target. Use this if you are doing a **FORK**.
   
   These are steps involved in setting up the OS, development environment, and building the nodes that intend to run in one of our Curium zones. Please go through this process for your validator and each of your sentries. **ONLY** follow the three specific links listed below, please. **DO NOT** click through the "next" button at the bottom of the third link, as you only need to execute the steps on these three links specifically.

    i. [OS Setup for Curium](/setup/os.md)
    
    ii. [Development Environment Setup](/setup/devenv.md)
    
    iii. [Build the Curium Project](/setup/build.md)

2. Open incoming TCP port 26656 \(P2P\). Optionally, if you have sufficient firewall and packet filtering security \(to protect against DoS and DDoS attacks\), you may opt to also open up 26657 \(RPC\), and 1317 \(RESTful\). These two ports are only for the purposes of serving clients. If you have no such interest and do not want to deal with the security considerations, keep them closed. There are many DoS and DDoS vectors possible if these ports are open, to open them with caution and only if necessary.

   If you are running both a sentry and a validator, follow these directives:

   * Sentry: P2P, RPC \(optional\), RESTful \(optional\)
   * Validator: Only P2P

   Furthermore, if you are running both, be sure to set your validator to ONLY allow incoming 26656 from your sentry's IP.

3. If required, remove existing .blz\* folders from the user directory \(only necessary if you had a pre-existing install\).

   ```text
   cd
   rm -rf .blz*
   ```

4. Please ensure you have the correct chain-id. We change it whenever we restart a new network. 
   
   Run the following command to find the existing chain-id:
   
   **MAIN NET** (including **FORK** path):
   
   ```text
   curl --location --request GET 'https://client.sentry.net.bluzelle.com:1317/node_info' -s | jq '.node_info.network' | tr -d '"'
   ```

   **TEST NET**:
   
   ```text
   curl --location --request GET 'https://client.sentry.testnet.public.bluzelle.com:1317/node_info' -s | jq '.node_info.network' | tr -d '"'
   ```

5. Initialize your daemon config as follows using the chain-id found above:

   ```text
   blzd init <moniker> --chain-id <chain-id>  2>&1 | jq .node_id
   ```

   Use a unique moniker string that uniquely identifies your validator/sentry. Please start the moniker with "validator" or "sentry", depending on what you are adding, and use camel case. Try to include your own or company name, if applicable. If doing a **FORK**, please use the same moniker as for your existing node(s), to ease contest procedures.
   
   Examples:

   ```text
   sentryBob
   validatorTesla
   ```

   Here is an example of initializing your local daemon config:

   ```text
   blzd init sentryBob --chain-id bluzelleMainNet-1976  2>&1 | jq .node_id
   ```

   The JSON output will contain the node\_id. Note this value, as it can be used to identify this node to other nodes in the zone. Keep in mind that for this document’s purposes, your validator and sentry will both only point at each other. Your sentry will also point at other known public sentries (if you know any) and to Bluzelle's own gateway sentries. More on this later in this document.

   There is no need to touch the genesis file, ".blzd/config/genesis.json" yet. The one that was generated just now is generic and not needed. It will be completely replaced with the genesis file already in use. We will perform this step later in this document.

6. Set the client configuration, and remember to use the chain id of the network \(found above\) that this node will be joining:

   ```text
   blzcli config chain-id <chain-id>
   blzcli config output json 
   blzcli config indent true 
   blzcli config trust-node true
   blzcli config keyring-backend file
   ```

7. Collect the node id's of the gateway sentries. 

   Use the following command, to get a list of all the gateway sentries, including their IP addresses and node id's:

   **MAIN NET** (including **FORK** path):
   
   ```text
   curl -s http://sandbox.sentry.net.bluzelle.com:26657/net_info | jq -C '[.result.peers[] | select(.node_info.moniker | startswith("daemon-sentry-gateway")) | {moniker: .node_info.moniker, id: .node_info.id, ip_address: .remote_ip}] | sort_by(.moniker)'
   ```

   **TEST NET**:
   
   ```text
   curl -s http://sandbox.sentry.testnet.public.bluzelle.com:26657/net_info | jq -C '[.result.peers[] | select(.node_info.moniker | startswith("daemon-sentry-gateway")) | {moniker: .node_info.moniker, id: .node_info.id, ip_address: .remote_ip}] | sort_by(.moniker)'
   ```

   Note down the sentry IP address and respective id, for each such gateway sentry. You will need this information next.

8. If you are ONLY setting up a validator, do the following. Otherwise, if you are setting up both a validator AND a sentry, ONLY do the following on the sentry.

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

9. OPTIONALLY \(if you want to provide RPC services as are needed for your own REST proxy, for example\), ensure you have opened up RPC to the public in config.toml, by specifying the "laddr" value in the \[rpc\] section as follows \(the default is only to listen on localhost\):

   ```text
   laddr = "tcp://0.0.0.0:26657"
   ```

   Of course, this depends highly on your setup. If your REST proxy is local to blzd, you can opt to only open up RPC to 127.0.0.1 and restrict access to RPC.

10. If you are adding a sentry, append your validator's "@:26656" entry to the persistent\_peers comma-separated list in your sentry, in config.toml. 

11. If you are adding a validator, append your sentry's "@:26656" entry to the persistent\_peers comma-separated list in your validator, in config.toml. Only applicable if you are also adding a sentry.

12. If you are adding a sentry, set "pex = true", in config.toml.

13. If you are adding a validator, set "pex = false", in config.toml.

14. If you are adding a sentry, add your validator's node id \(only the node id\) to the "private\_peer\_ids" comma-separated list, in your sentry's config.toml. For example:

    ```
    "d229f73ac8de82fa788e495c181c7e0aaa72375e"
    ```

15. In config.toml, set the following:

    ```text
    addr_book_strict = false
    ```

16. In config.toml, set a suitable maximum \# of allowed inbound and outbound peers in the \[p2p\] section. For example, with a node that might be very busy \(such as a sentry to a secure zone for validators\), you might want to increase from the defaults, to avoid a situation where peers start to get dropped. Following are the values we have used:

    ```text
    # Maximum number of inbound peers
    max_num_inbound_peers = 200

    # Maximum number of outbound peers to connect to, excluding persistent peers
    max_num_outbound_peers = 100
    ```
    
  If you are deploying a validator and sentry edit the validator's config.toml to set a suitable redial period, anything over 2 hours is advised.
    
    ```
    # Maximum pause when redialing a persistent peer (if zero, exponential backoff is used)
    persistent_peers_max_dial_period = 10h
    ```
    
17. Edit ".blzd/config/app.toml" to set the minimum-gas-prices to “0.002ubnt”

    ```text
    # The minimum gas prices a validator is willing to accept for processing a
    # transaction. A transaction's fees must meet the minimum of any denomination
    # specified in this config (e.g. 0.25token1;0.0001token2).
    minimum-gas-prices = "0.002ubnt"
    ```

    Remember that _every_ node should have _at least_ this minimum. Feel free to set it higher if you wish.

18. Edit ".blzd/config/app.toml", to add the following:

    ```text
    bluzelle_crud = true
    ```
    
19. Copy into your "~/.blzd/config/" directory the network's existing genesis.json file. You can interactively view it as follows, from our sentry nodes:

    **MAIN NET** (including **FORK** path):
    ```text
    curl http://sandbox.sentry.net.bluzelle.com:26657/genesis | jq -C '.result.genesis' | more -r
    ```

    **TEST NET**:
    ```text
    curl http://sandbox.sentry.testnet.public.bluzelle.com:26657/genesis | jq -C '.result.genesis' | more -r
    ```

    A convenient example to download it to the current folder from our sentry nodes:

    **MAIN NET** (including **FORK** path):
    ```text
    curl http://sandbox.sentry.net.bluzelle.com:26657/genesis | jq '.result.genesis' > genesis.json
    ```

    **TEST NET**:
    ```text
    curl http://sandbox.sentry.testnet.public.bluzelle.com:26657/genesis | jq '.result.genesis' > genesis.json
    ```

    Ensure to copy over and replace the existing genesis.json file in your `~/.blzd/config/` folder with the downloaded one from the existing network.

20. ONLY do this step if you are following the **FORK** PATH. 

    Migrate your validator's consensus signing key from the old machine (the validator on the Soft MainNet) to the new machine (the validator on the Final TestNet). 
    
    To do this, copy your `~/.blzd/config/priv_validator_key.json` from the old machine to the new machine at the same location, overwriting the existing file on the new machine. 

21. Start the Bluzelle daemon

    ```text
    blzd start
    ```

    The node will start and catch up to the rest of the zone. Occasionally, this command will fail, in that case run the following command first

    ```text
    blzd unsafe-reset-all
    ```

    and then retry the start command.

    Notes.
    
    i. If you want extra info for logging or analysis or debugging purposes, you can alternatively add the `--log_level info` flag to `blzd start`. 
    
    ii. Don't get alarmed if you are following the **FORK** PATH and your validator starts up stating it is not a validator. This is NORMAL. Your validator is currently in jail, so it does not yet appear in the active validator set. That's all this message means. We will unjail you later.

22. If you are creating a validator, wait till your new node catches up to the rest of the zone. It will be obvious as the node will slow down output and be getting blocks every 4-5 seconds. 

    To be sure, run the following command in another terminal on the validator and look for the output of `true`:

    ```
    watch 'blzcli status | jq ".sync_info.catching_up == false"'
    ```

23. If you are following the **FORK** PATH, SKIP this step. 

    If you are creating a validator, you will now need to acquire BNT tokens. Following are instructions depending on if you are targeting the MAIN NET or TEST NET.

    **MAIN NET**:
   
    i) Be sure you have Metamask installed. It needs to be installed properly and connected to your ETH MainNet account that has access to the BLZ tokens you wish to use for your validator. You can use Metamask with Ledger and Trezor hardware wallets as well.
   
    ii) Goto the following URL to sign into the staking application:
    
    https://staking.bluzelle.com/ 
   
    iii) Create a new BNT mnemonic for our MAIN NET, and store and secure this BNT mnemonic securely. **If you lose this mnemonic, you will lose ALL your funds.** Bluzelle is not responsible and there is no policy to "refund" anything. Note that this web wallet is **100% client side**. Your BNT mnemonic is generated on the local browser only and is never transmitted over the network. You are 100% responsible for storing and securing this mnemonic. 
    
    iv) Add a new local keypair for the account that will be the operator for the validator on this node:

    ```text
    blzcli keys add vuser --recover
    ```

    Provide the menemonic generated above from the web staking wallet when asked for the BIP39 mnemonic, when prompted for a keyring password, provide  a password  
    to encrypt the keyring that holds the private key. You will be asked for this password in the future when signing with your private key. 
        
    v) Convert the desired amount of BLZ tokens to BNT tokens by using the "Convert to BNT" button. Please be patient, as we run the conversion relayer manually for now, and it runs a few times every day. Please join and follow our Telegram and Discord groups to keep updated.

    **TEST NET**:
   
    i) Add a new local keypair for the account that will be the operator for the validator on this node:

    ```text
    blzcli keys add vuser
    ```
    Enter a password to encrypt the keyring that will hold the private key.
    Check for the following output:

    * name: vuser type: local address: bluzelle1z&lt;...&gt; pubkey: bluzellepub1&lt;...&gt; mnemonic: "" threshold: 0 pubkeys: \[\]

      **Important** write this mnemonic phrase in a safe place. It is the only way to recover your account if you ever forget your password.

      poem reason &lt;...&gt; palace

    CRITICAL: Note the Bluzelle address (starting with "bluzelle") and mnemonic phrase values. You will need these on a long term basis.

    ii) Get some tokens to stake your validator from our FAUCET endpoint. Note that you can only use the faucet once every FIVE minutes. 
    Goto the following URL, replacing in your account's Bluzelle address:
    
    https://client.sentry.testnet.public.bluzelle.com:1317/mint/<address>
    
    iii) Verify you have tokens. If the above URL gives an error that the account it not found or something else, it likely means the faucet 
    has not yet completed (takes a few seconds) or has failed for some reason. Use the following command to check your balance: 
    ```
    blzcli q account $(blzcli keys show vuser -a) --node http://sandbox.sentry.testnet.public.bluzelle.com:26657
    ```
    
24. ONLY do this step if you are following the **FORK** PATH. 

    Export your existing validator's operator wallet from the existing validator machine and import it to the new validator machine. We will assume that the existing wallet account is called `vuser` and will call the new imported wallet account the same name. 

    i. On the existing validator machine: 
    
    ```
    blzcli keys export vuser 
    ```
    
    Note that the `passphrase to encrypt the exported key` that you provide is required when you import the key in the next step. Copy the output of the above command (it will display the output to your screen) and store it into a file. We will assume this file is called `export.txt`.
    
    ii. On the new validator machine (provide the second password entered when doing the export):
    
    ```
    blzcli keys import vuser export.txt
    ```
    
    Enter a password to encrypt the keys to vuser
    
    Notes:
    
    i. If you have the mnemonic handy for your original vuser, you can just add the vuser to the new validator with the following:
    
    ```
    blzcli keys add vuser --recover
    ```
    
    Paste in the mnemonic, when asked.
    Enter a password to encrypt the keys to vuser
    
    ii. If your vuser for your original vuser is secured with a Ledger device, add it to the new validator machine as follows (ensure your Ledger device is plugged in and running the COSMOS app):
    
    ```
    blzcli keys add vuser --ledger --account <i>
    ```
    
    Typically, the value of i will be 0, unless you have multiple HD-derived accounts. 

25. Verify your vuser account has the tokens you expect, by asking the local node:

    ```text
    blzcli q account $(blzcli keys show vuser -a) | jq ".value.coins"
    ```  

26. If you are following the **FORK** PATH, SKIP this step. 

    At this point, the new "vuser" account will also reflect the BNT tokens that were funded to it. We now need to add this node as a validator, as follows:

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
      --gas=auto --gas-adjustment=2.0 \
      --gas-prices=<minimum gas price> \
      --from vuser
    ```

    The --identity \(an optional field\) is used to identify your organization, verifiably. Generate a PGP key on your Keybase account, and provide the 16 HEX digit public key hash \(no spaces\). This identity is also used to retrieve a logo for your validator's profile, if provided. According to COSMOS documentation, UPort may alternatively be used.

    This will stake this node’s validator with the prescribed amount of ubnt tokens to become a validator. The validator will participate in validating new operations sent to block chain and earn rewards and commision for doing so.

    Be sure to note the pubkey in the output.

    You can experiment with different values for the amount, commission rate, and gas price, although the latter should match whatever you put into app.toml.

    Be sure to not use 100% of the amount of BNT in your vuser account, as you need some BNT to pay for gas. 
    
    We HIGHLY recommend including your Discord account and/or Email address in the "security contact" field, along with your name, as the primary contact.

    For example:

    ```text
    blzcli tx staking create-validator \
      --amount=1500000000ubnt \
      --pubkey=$(blzd tendermint show-validator) \
      --website="https://bluzelle.com" \
      --details="To infinity and beyond" \
      --security-contact="neeraj#1234, a@b.com, Neeraj Murarka" \
      --identity=5615416F70265000 \
      --moniker=validatorNeeraj \
      --commission-rate=0.1 \
      --commission-max-rate=0.2 \
      --commission-max-change-rate=0.01 \
      --min-self-delegation=1 \
      --gas=auto --gas-adjustment=2.0 \
      --gas-prices=0.002ubnt \
      --from vuser
    ```

27. ONLY do this step if you are following the **FORK** PATH. 
    
    You will now unjail your validator to bring it back into the active validator set. Once you do this, the network will expect your validator to be running and it will once again be subject to all the requirements of being a validator, including slashing penalties, etc. Note that once unjailed, you CANNOT "re-jail" your validator. 

    ```
    blzcli tx slashing unjail --gas-prices 0.002ubnt --gas=auto --gas-adjustment=2.0 --from vuser --chain-id <chain id>
    ```   

28. Verify that your validator is now active and running with the following command, and look for your validator's moniker:

    ```
    blzcli q staking validators | jq -r '.[] | select(.status == 2) | .description.moniker'
    ```

29. Optionally, you can also get the current validator set with the commands \(be sure to check all available pages -- the limit cannot exceed 100\):

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

30. Furthermore, within a few minutes, you should also see your validator listed listed at the Bluzelle Explorer:

    **MAIN NET** (including **FORK** path):

    http://bigdipper.net.bluzelle.com/validators
    
    **TEST NET**:

    https://bigdipper.testnet.public.bluzelle.com/validators

[Back](../)
