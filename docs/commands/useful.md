[prev](./qAndTX.md) 
***

Useful Commands
===============

>For additional information for these commands please use the "--help" argument 
on the command line.



***
## node status info
>Query remote node for status

    blzcli status [flags]

>Example:

    $ blzcli status
    {
      "node_info": {
        "protocol_version": {
          "p2p": "7",
          "block": "10",
          "app": "0"
        },
        "id": "d84<...>>2",
        "listen_addr": "tcp://0.0.0.0:26656",
        "network": "bluzelle",
        "version": "0.33.0",
        "channels": "4020212223303800",
        "moniker": "curium00",
        "other": {
          "tx_index": "on",
          "rpc_address": "tcp://127.0.0.1:26657"
        }
      },
      "sync_info": {
        "latest_block_hash": "254C<..>3",
        "latest_app_hash": "4CAE<...>2",
        "latest_block_height": "52275",
        "latest_block_time": "2020-03-16T22:13:40.23211753Z",
        "catching_up": false
      },
      "validator_info": {
        "address": "A144<...>0",
        "pub_key": {
          "type": "tendermint/PubKeyEd25519",
          "value": "y0cL<...>>8="
        },
        "voting_power": "100"
      }
    }



***
## keys show 
>Given the name of a key this command returns the type, address and public key 
for that key. Using the "-a" will return only the address info, this is useful
for other commands, see below:

    blzcli keys show [name [name...]] [flags]
    
>Example:

    $ blzcli keys show vuser
    {
      "name": "vuser",
      "type": "local",
      "address": "bluzelle1<...>",
      "pubkey": "bluzellepub1<...>"
    }
    
    
   
***
## query account
>Given and validator address, show account info for a validator

    blzcli query account [address] [flags]
    
>Example:

    blzcli q account bluzelle1<...>
    {
      "type": "cosmos-sdk/Account",
      "value": {
        "address": "bluzelle1<...>",
        "coins": [
          {
            "denom": "ubnt",
            "amount": "489999976000000"
          }
        ],
        "public_key": "bluzellepub1<...>",
        "account_number": 3,
        "sequence": 13
      }
    }

>Note that the address can be retrieved with the keys show command:
    
    blzcli q account (blzcli keys show [key name] -a)



***
## get genesis file
>Get the network's genesis file

    curl http://testnet.public.bluzelle.com:1317/genesis.json

>Example:

    $ curl http://testnet.public.bluzelle.com:1317/genesis.json
    {
        "jsonrpc": "2.0",
        "id": -1,
        "result": {
            "genesis": {
                "genesis_time": "2020-05-29T09:06:28.12740914Z",
                "chain_id": "bluzelle",
                "consensus_params": {
                    "block": {
                        "max_bytes": "22020096",
                        "max_gas": "-1",
                        .
                        .
                        .
    }


    
***
## get cosmos validator info
>Get the details on a specific COSMOS validator

    blzcli q staking validator bluzellevaloper1w2s4crgepcvyx6gpgeade40efpdexncuklxaq6

>Example:

    $ blzcli q staking validator bluzellevaloper1w2s4crgepcvyx6gpgeade40efpdexncuklxaq6
    {
      "operator_address": "bluzellevaloper1w2s4crgepcvyx6gpgeade40efpdexncuklxaq6",
      "consensus_pubkey": "bluzellevalconspub1zcjduepqqrl0670chvhhackx9qltsn39w5q2kdx9p4ss3ekrp8cunm3qnevq9xhucf",
      "jailed": false,
      "status": 2,
      "tokens": "12136929000",
      "delegator_shares": "12138142814.281428142814281428",
      "description": {
        "moniker": "Johnnee",
        "identity": "10570583C83E9D8A",
        "website": "3457526@GMAIL.COM",
        "security_contact": "Neeraj Murarka, CTO @ Bluzelle Networks",
        "details": "I'm BEST"
      },
      "unbonding_height": "15427",
      "unbonding_time": "2020-06-20T12:40:11.466304121Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2020-05-29T11:11:11.924616391Z"
      },
      "min_self_delegation": "1"
    }


    
***
## query tendermint-validator-set
>Get the full Tendermint validator set for the zone at given height

    blzcli query tendermint-validator-set [height] [flags]

>if the height is not specified the current height will be used.

>Pagination is always on and shows max 100 items per page. Be sure
to use the --limit 100 --page 1 flags. Pages are one-based.

>Example:

    $ blzcli query tendermint-validator-set --limit 100 --page 1
    {
      "block_height": "48659",
      "validators": [
        {
          "address": "bluzellevalcons1<...>",
          "pub_key": "bluzellevalconspub1<...>",
          "proposer_priority": "0",
          "voting_power": "100"
        },
        <...>,
        {
          "address": "bluzellevalcons1<...>",
          "pub_key": "bluzellevalconspub1<...>",
          "proposer_priority": "0",
          "voting_power": "100"
        }
      ]
    }
    
    
    
***
## tx unjail
>Unjail validator previously jailed for downtime

    blzcli tx slashing unjail --gas-prices 10.0ubnt --from [validator owner]

>Example:

    $ blzcli tx slashing unjail --gas-prices 10.0ubnt --from vuser
    {
      "chain_id": "bluzelle",
      "account_number": "3",
      "sequence": "11",
      "fee": {
        "amount": [
          {
            "denom": "ubnt",
            "amount": "2000000"
          }
        ],
        "gas": "200000"
      },
      "msgs": [
        {
          "type": "cosmos-sdk/MsgUnjail",
          "value": {
            "address": "bluzellevaloper13nqmczw5kygg0dvj4cxaf4leu72jp02xgcyduv"
          }
        }
      ],
      "memo": ""
    }


    
***
## tx edit-validator
>Edit an existing validator account

    blzcli tx staking edit-validator --website=[quoted website string] --identity=[16 HEX digit PGP Keybase key hash]  --moniker=[quoted moniker string] --details=[quoted description string] --security-contact=[quoted security contact string] --from [validator owner]

>Example:

    $ blzcli tx staking edit-validator --website="https://bluzelle.com" --identity=5615416F70265000 --moniker="Daemon-Validator-0" --details="To infinity and beyond" --security-contact "Neeraj Murarka, CTO @ Bluzelle Networks" --gas-prices 10.0ubnt --from vuser
    {
      "chain_id": "bluzelle",
      "account_number": "3",
      "sequence": "10",
      "fee": {
        "amount": [
          {
            "denom": "ubnt",
            "amount": "2000000"
          }
        ],
        "gas": "200000"
      },
      "msgs": [
        {
          "type": "cosmos-sdk/MsgEditValidator",
          "value": {
            "description": {
              "moniker": "Daemon-Validator-0",
              "identity": "5615416F70265000",
              "website": "https://bluzelle.com",
              "security_contact": "Neeraj Murarka, CTO @ Bluzelle Networks",
              "details": "To infinity and beyond"
            },
            "address": "bluzellevaloper13nqmczw5kygg0dvj4cxaf4leu72jp02xgcyduv",
            "commission_rate": null,
            "min_self_delegation": null
          }
        }
      ],
      "memo": ""
    }


    
***
## query tx
>Query for a transaction by hash in a committed block

    blzcli query tx [hash] [flags]
    
>Example:

    $blzcli q tx A88D<...>7    

    {
      "height": "1191",
      "txhash": "A88D<..>7",
      "data": "7B22<...>D",
      "raw_log": "[{\"msg_index\":0,<...>}]",
      "logs": [
        <...>
      ],
      "gas_wanted": "200000",
      "gas_used": "50294",
      "tx": {<...>},
      "timestamp": "2020-03-13T22:15:28Z"
    }
    
>The "data" element of the result will provide any response returned from the 
transaction, in hex format, this can be converted to a human readable form 
using the unix commands "jq" and "xxd", for example the results of a "count"
request transaction  

    $ blzcli q tx A88D<...>7 | jq .data | xxd -r -p
    {"uuid":"<uuid>","count":"1"}



***
## query auth account
>Query account balance

    blzcli query auth account [address] [flags]

>Example:

    $ blzcli query auth account (blzcli keys show <key name> -a)
    {
      "type": "cosmos-sdk/Account",
      "value": {
        "address": "bluzelle1<...>",
        "coins": [
          {
            "denom": "ubnt",
            "amount": "489999976000000"
          }
        ],
        "public_key": "bluzellepub1<...>",
        "account_number": 3,
        "sequence": 13
      }
    }



***
# query distribution validator-outstanding-rewards
>Query distribution outstanding (un-withdrawn) rewards for a validator and all 
 their delegations

    blzcli query distribution validator-outstanding-rewards [validator] [flags]

>Example:

    $ blzcli query distribution validator-outstanding-rewards bluzellevaloper1<...>
    [
      {
        "denom": "ubnt",
        "amount": "23520000.000000000000000000"
      }
    
    
    
***
## query distribution commission
>Query validator commission rewards from delegators to that validator.

    blzcli query distribution commission [validator] [flags]
    
>Example:

    $ blzcli query distribution commission bluzellevaloper1<...>
    [
      {
        "denom": "ubnt",
        "amount": "2352000.000000000000000000"
      }
    ]



***
## query distribution rewards
>Query all rewards earned by a delegator, optionally restrict to rewards from a single validator.

    blzcli query distribution rewards [delegator-addr] [<validator-addr>] [flags]

>Example:

    $ blzcli query distribution rewards bluzelle1<...>
    {
    "rewards": [
        {
          "validator_address": "bluzellevaloper19hs2gpnk704rpjukv3z8cx33jq7zuxw97twj9k",
          "reward": [
            {
              "denom": "ubnt",
              "amount": "21168000.000000000000000000"
            }
          ]
        }
      ],
      "total": [
        {
          "denom": "ubnt",
          "amount": "21168000.000000000000000000"
        }
      ]

***
[prev](./qAndTX.md) 
