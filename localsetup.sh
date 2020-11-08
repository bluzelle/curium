#!/bin/sh

rm -rf ~/.blzd
rm -rf ~/.blzcli

blzd init masternode --chain-id blzchain
blzcli config chain-id blzchain
blzcli config output json
blzcli config indent true
blzcli config trust-node true

blzcli keys add node0 --keyring-backend=test --recover <<< "cat indoor zoo vivid actress steak female fat shrug payment harvest sadness hazard frown alcohol mountain erode latin symbol peace repair inspire blade supply"
blzd add-genesis-account $(blzcli keys show node0 -a --keyring-backend=test) 1000000000stake

blzd gentx --name node0 --keyring-backend=test
blzd collect-gentxs
blzd start

## try sending with genesis configuration ##
# blzcli keys add user1 --keyring-backend=test
# blzcli tx bank send node0 $(blzcli keys show -a user1  --keyring-backend=test) 10000stake --keyring-backend=test --fees=1000stake
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
# expected result: 11stake
# blzcli query tax info

## create tax_owner key on local ##
# blzcli keys add tax_owner --recover --keyring-backend=test
# day rabbit mom clown bleak brown large lobster reduce accuse violin where address click dynamic myself buyer daughter situate today wheel thumb sudden drill

## try tax param change with wrong account ##
# blzcli tx tax set-bp 10 20 --from node0 --keyring-backend=test
# blzcli query tax info 
# blzcli tx tax set-collector $(blzcli keys show -a user1 --keyring-backend=test) --from node0 --keyring-backend=test
# blzcli query tax info 

## try tax param change with correct account ##
# blzcli tx tax set-bp 30 40 --from tax_owner --keyring-backend=test
# blzcli query tax info 
# blzcli tx tax set-collector $(blzcli keys show -a user1 --keyring-backend=test) --from tax_owner --keyring-backend=test
# blzcli query tax info 

## try bank send with modified params ##
# blzcli tx bank send node0 $(blzcli keys show -a user1  --keyring-backend=test) 10000stake --keyring-backend=test --fees=1000stake
# blzcli query account $(blzcli keys show -a user1 --keyring-backend=test)
# expected result: 20043stake

## set tax owner back to original ##
# blzcli tx tax set-collector $(blzcli keys show -a tax_owner --keyring-backend=test) --from user1 --keyring-backend=test
# blzcli query tax info 
