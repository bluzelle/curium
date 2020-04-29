[Back](../../README.md)
***

Starting the Light-client Daemon (Local REST Server)
====================================================

>If required, please refer to the [OS Setup for Curium](../setup/os.md) and 
[Development Environment Setup](../setup/devenv.md) documents for 
instructions on how to set up your OS and Golang development environment.


1.  In a terminal, change to the Curium project working directory

        cd ~/go/src/github.com/bluzelle/curium
 
2.  Use make to build and install the blzd and blzcli executables

        make mainnet
 
3.  Ensure Bluzelle CLI works by executing the binary, you should 
    be able to execute the app from your home directory:

        cd
        blzcli
        
    The output of the Bluzelle CLI will be:

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

4.  Start the Light-client Daemon (LCD) on the command line using thes 
    rest-server command with the "--node" argument to specify the IP address of 
    a Curium node in the zone to connect to

        blzcli rest-server --node <host>:<port>
    
    if the node is not specified the default value of  "tcp://localhost:26657"
    will be used.

5.  You will now be able to interact with the connected zone via the REST 
    interface provided by the LCD.

[Back](../../README.md)
