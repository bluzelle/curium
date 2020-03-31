[queries](./queries.md) | [home](../../README.md)

Transactional CRUD Commands
====================================

>Transactional commands can be crytographically signed and require gas to 
perform. Where a command has a return value users must employ the "tx" 
query to retrieve the response.

>The CLI can provide usage help for the queries with the following command:

    blzcli tx --help
    
# CRUD Transactions
>Note that for transactions that provide result data, users must employ the 
"q tx" comand with the txhash returned by the initial transaction to retrieve
the result, for example, a "tx crud read" command will return 

***
## create
>create a new entry in the database

    blzcli tx crud create <uuid> <key> <data> \
        --chain-id <chain id> \
        --gas-prices 10.0ubnt \
        --from <user id>
***
## read
>read an existing entry in the database

    blzcli tx crud read <uuid> <uuid> \
        --gas-prices 10.0ubnt --from <user id>
    
>use the 'q tx' command with the txhash to retrieve the read result value

    blzcli q tx <txhash> | jq .data | xxd -r -p | jq .value
***
## update
>update an existing entry in the database

    blzcli tx crud update <uuid> <key> <new value> \
        --gas-prices 10.0ubnt --from <user id>
    
***
## delete
>delete an existing entry in the database

    blzcli tx crud delete <uuid> <key> \
        --gas-prices 10.0ubnt --from <user id>
***
## keys
>list keys for a UUID in the database

    blzcli tx crud keys uuid \
        --gas-prices 10.0ubnt --from <user id>
    
>use the 'q tx' command with the txhash to retrieve the keys result value

    blzcli q tx  <txhash> | jq .data | xxd -r -p | jq .keys
***
## has
>returns true if the key value pair exists

    blzcli tx crud has <uuid> <key> \
        --gas-prices 10.0ubnt --from <user id>
        
>use the 'q tx' command with the txhash to retrieve the has result value

    blzcli q tx  <txhash> | jq .data | xxd -r -p  | jq .has


***
## rename
>rename an existing entry in the database

    blzcli tx crud rename <uuid> <key> <new key> \
        --gas-prices 10.0ubnt --from <user id>

***
## keyvalues
>list keys/values for a UUID in the database

    blzcli tx crud keyvalues <uuid> \
        --gas-prices 10.0ubnt --from <user id>
        
>use the 'q tx' command with the txhash to retrieve the keyvalues result value

    blzcli q tx  <txhash> | jq .data | xxd -r -p  | jq .keyvalues

***
## count
>count of existing entries in the database

    blzcli tx crud count uuid \
        --gas-prices 10.0ubnt --from vuser
        
>use the 'q tx' command with the txhash to retrieve the count result value

    blzcli q tx  <txhash> | jq .data | xxd -r -p  | jq .count
***
## deleteall
>delete all entries in the database
    
    blzcli tx crud deleteall <uuid> /
        --gas-prices 10.0ubnt --from <user id>
        
***
## multiupdate
> Update existing entries in the database

    blzcli tx crud multiupdate [UUID] [key] [value] <key> <value> ... [flags]

> Example:

    $ blzcli tx crud multiupdate uuid \
        key00 "better value" key01 "new value" \
        key02 "good value" key04 "new value"  \
        --gas-prices 10.0ubnt --from vuser

***
[queries](./queries.md) | [home](../../README.md)