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
* This will create the command line interface `nscli` and the daemon `nsd` applications in your $GOBIN
* Now you can spool up a node and try it out!
* Open a new terminal for the daemon 
* In the daemon terminal use nsd init to initialize the config files and genesis file  
`nsd init <moniker> --chain-id namechain`  
moniker will be the name of the node, e.g.) Bluzelle
* In another terminal we will use the cli `nscli` to set up a user or two  
`nscli keys add rich`  
"rich" is the name of the user to be added. Follow the crypto related instructions from the nscli
* Use the daemon to give yourself some nametokens  
`nsd add-genesis-account $(nscli keys show rich -a) 1000nametoken,1000000000stake`  
note the use of nscli to get the identifier for rich, try running the keys function on it's own
* Do some configure magic (we're not sure what a couple of these do yet...)  
`nscli config chain-id namechain`  
`nscli config output json`  
`nscli config indent true`  
`nscli config trust-node true`  
* generate and validate a genesis transaction to start up the blockchain.  
`nsd gentx --name rich`  
`nsd collect-gentxs`  
`nsd validate-genesis`
* In the daemon terminal start the node  
`nsd start`
* Query the node and make some transactions.

#Here are some Example queries transactions:  

\# Initialize configuration files and genesis file
\# moniker is the name of your node  
 nsd init <moniker> --chain-id namechain  
   
   
 \# Copy the `Address` output here and save it for later use    
 \# [optional] add "--ledger" at the end to use a Ledger Nano S  
 nscli keys add jack  
 
 \# Copy the `Address` output here and save it for later use  
 nscli keys add alice  
   
 \# Add both accounts, with coins to the genesis file  
 nsd add-genesis-account $(nscli keys show jack -a) 1000nametoken,100000000stake  
 nsd add-genesis-account $(nscli keys show alice -a) 1000nametoken,100000000stake  
   
 \# Configure your CLI to eliminate need for chain-id flag  
 nscli config chain-id namechain  
 nscli config output json  
 nscli config indent true  
 nscli config trust-node true  
   
 nsd gentx --name jack <or your key_name>`  
 
