# curium



## Starting a development node using docker 

This will startup a single node for development in a docker container. 



**Install NodeJS**

NodeJS will be used to talk to the new server via the cli command



**Install Docker and Docker compose**

These will be used to build and start the Curium node.  Install for your OS.


**Copy the docker files**

https://raw.githubusercontent.com/bluzelle/curium/stargate/docker/Dockerfille
https://raw.githubusercontent.com/bluzelle/curium/stargate/docker/docker-compose.yaml



#### Build and run Curium

```
docker-compose run curium
```

**NOTE:  There will be a list of users with mnemonics.  Copy the mnemonic for vuser for the section below**


**Install the Bluzelle CLI**

`npm install -g @bluzelle/cli`



**Add vuser user to the keyring**

`blzcli keys add vuser --recover`
You will be asked for the mnemonic.  Paste in the mnemonic copied from the step above

**Talk to the node**

`blzcli tx crud create my-uuid foo bar 10000 --from vuser --gas-price 0.002 --gas 10000000`
`blzcli q crud keyValues my-uuid`

#### Clear the DB

