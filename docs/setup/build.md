# Build the Curium Project

[prev](devenv.md) \| [next](deploy.md)

## Build the Curium Project

1. In a terminal, change to the curium working directory

   ```text
   cd ~/go/src/github.com/bluzelle/curium
   ```

2. Use make to build and install the blzd and blzcli executables. 

   - If you are building for the Bluzelle TestNet or your own private network, use "testnet" as your target. 
   - If you are building for the Bluzelle MainNet, use "mainnet" as your target. 

   ```text
   make <target>
   ```

3. Ensure Bluzelle CLI and daemon work by executing the binaries, you should be able to execute the apps from your home directory:

   ```text
   cd
   blzcli
   ```

   The output of the Bluzelle CLI will be:

   ```text
   Bluzelle CRUD Client

   Usage:
     blzcli [command]

   Available Commands:
     status      Query remote node for status
     config      Create or query an application CLI configuration file
     query       Querying subcommands
     tx          Transactions subcommands

     rest-server Start LCD (light-client daemon), a local REST server

     keys        Add or view local private keys

     version     Print the app version
     help        Help about any command

   Flags:
         --chain-id string   Chain ID of tendermint node
     -e, --encoding string   Binary encoding (hex|b64|btc) (default "hex")
     -h, --help              help for blzcli
         --home string       directory for config and data (default "/Users/rnistuk/.blzcli")
     -o, --output string     Output format (text|json) (default "text")
         --trace             print out full stack trace on errors

   Use "blzcli [command] --help" for more information about a command.
   ```

   similarly, for the Bluzelle daemon:

   ```text
   cd
   blzd
   ```

   Which will produce the following output:

   ```text
   Bluzelle CRUD Daemon (server)

   Usage:
     blzd [command]

   Available Commands:
     init                Initialize private validator, p2p, genesis, and application configuration files
     collect-gentxs      Collect genesis txs and output a genesis.json file
     gentx               Generate a genesis tx carrying a self delegation
     validate-genesis    validates the genesis file at the default location or at the location passed as an arg
     add-genesis-account Add genesis account to genesis.json
     start               Run the full node
     unsafe-reset-all    Resets the blockchain database, removes address book files, and resets priv_validator.json to the genesis state

     tendermint          Tendermint subcommands
     export              Export state to JSON

     version             Print the app version
     help                Help about any command

   Flags:
     -h, --help               help for blzd
         --home string        directory for config and data (default "/Users/rnistuk/.blzd")
         --log_level string   Log level (default "main:info,state:info,*:error")
         --trace              print out full stack trace on errors

   Use "blzd [command] --help" for more information about a command.
   ```

4. Verify the build Bluzelle CLI build version

   ```text
   blzcli version --long
   ```

   which provides output such as (these values can change and you should compare with what others have on the network):

   ```text
   name: BluzelleService
   server_name: blzd
   client_name: blzcli
   version: 0.0.0-24-g3253c8b
   commit: 3253c8b6b4e40b125c0ccdfd6a81a06a02a5e018
   build_tags: ledger,cosmos-sdk v0.37.4
   go: go version go1.13.4 darwin/amd64
   ```

   Similarly, verify the Bluzelle daemon

   ```text
   blzd version --long
   ```

   which has the output (again -- can vary -- this is an example and you should compare with what others have on the network):

   ```text
   name: BluzelleService
   server_name: blzd
   client_name: blzcli
   version: 0.0.0-24-g3253c8b
   commit: 3253c8b6b4e40b125c0ccdfd6a81a06a02a5e018
   build_tags: ledger,cosmos-sdk v0.37.4
   go: go version go1.13.4 darwin/amd64
   ```

   [prev](devenv.md) \| [next](deploy.md)

