# Curium Application

https://github.com/cosmos/sdk-tutorials/tree/master/nameservice


This project will form the basis of the Bluzelle <????> Swarm Application.


## Building and running the example

* Install Golang version 1.13.4 from https://golang.org
* Optionally install your favourite Golang IDE (JetBrains Goland is a good one). Vim or emacs is probably all you need, though.
* make sure your Environment paths are set in your profile or rc file, for example:  
`export GOPATH=/Users/rnistuk/go`  
`export GOBIN=${GOPATH}/bin`  
`export PATH=$PATH:$GOBIN`
* cd to the project root folder  
* build and install the project  
`make`  
`make install`  
* This will create the command line interface `blzcli` and the daemon `blzd` applications in your $GOBIN
* Now you can spool up a node and try it out!
* Open a new terminal for the daemon 
* In the daemon terminal use blzd init to initialize the config files and genesis file  
`blzd init <moniker> --chain-id namechain`  
moniker will be the name of the node, e.g.) Bluzelle
* In another terminal we will use the cli `blzcli` to set up a user or two  
`blzcli keys add rich`  
"rich" is the name of the user to be added. Follow the crypto related instructions from the blzcli
* Use the daemon to give yourself some nametokens  
`blzd add-genesis-account $(blzcli keys show rich -a) 1000nametoken,1000000000stake`  
note the use of blzcli to get the identifier for rich, try running the keys function on it's own
* Do some configure magic (we're not sure what a couple of these do yet...)  
`blzcli config chain-id namechain`  
`blzcli config output json`  
`blzcli config indent true`  
`blzcli config trust-node true`  
* generate and validate a genesis transaction to start up the blockchain.  
`blzd gentx --name rich`  
`blzd collect-gentxs`  
`blzd validate-genesis`
* In the daemon terminal start the node  
`blzd start`
* Query the node and make some transactions.

#Here are some Example queries transactions:  

\# Initialize configuration files and genesis file
\# moniker is the name of your node  
 blzd init <moniker> --chain-id namechain  
   
   
 \# Copy the `Address` output here and save it for later use    
 \# [optional] add "--ledger" at the end to use a Ledger Nano S  
 blzcli keys add jack  
 
 \# Copy the `Address` output here and save it for later use  
 blzcli keys add alice  
   
 \# Add both accounts, with coins to the genesis file  
 blzd add-genesis-account $(blzcli keys show jack -a) 1000nametoken,100000000stake  
 blzd add-genesis-account $(blzcli keys show alice -a) 1000nametoken,100000000stake  
   
 \# Configure your CLI to eliminate need for chain-id flag  
 blzcli config chain-id namechain  
 blzcli config output json  
 blzcli config indent true  
 blzcli config trust-node true  
   
 blzd gentx --name jack <or your key_name>`  
 