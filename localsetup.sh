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
# blzcli tx send node0 $(blzcli keys show -a user1  --keyring-backend=test) 10000stake  --keyring-backend=test --fees=1000stake
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
# expected result: 22stake
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

# blzcli keys add user1 --keyring-backend=test
# blzcli tx send node0 $(blzcli keys show -a user1 --keyring-backend=test) 10000000stake --gas-prices 1.0stake --keyring-backend=test --yes

## set tax owner back to original ##
# blzcli tx tax set-collector $(blzcli keys show -a tax_owner --keyring-backend=test) --from user1 --keyring-backend=test
# blzcli query tax info 

############ negatives testing #################

## Transfer taxes are not being charged on create-validator (you bond an amount as part of this) ## $(blzd tendermint show-validator)
# blzcli keys add nval --keyring-backend=test
# blzcli tx bank send node0 $(blzcli keys show -a nval --keyring-backend=test) 1000000stake --keyring-backend=test --fees=1000stake
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
# blzcli tx staking create-validator --amount=10000stake --moniker="nval" --pubkey=bluzellevalconspub1zcjduepqladdfp8vrmpjwm7e0pcvxg34qk0uh0fd9sqtakduzm6dhqd5zmhsv285xk --commission-rate="0.10" --commission-max-rate="0.20" --commission-max-change-rate="0.01" --min-self-delegation="1" --gas="auto" --gas-prices="0.025stake" --from nval --keyring-backend=test
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw

## Transfer taxes are not being charged on delegations (self or not) ## $(blzcli q staking validators)
# VALADDR=$(blzcli query staking validators | sed -n 's/\"operator_address\": \"\(bluzellevaloper.*\)\".*/\1/p')
# echo $VALADDR
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
# blzcli tx staking delegate $VALADDR 10000stake --from nval --keyring-backend=test --yes
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw

## Transfer taxes are not being charged on governance submit-proposal (that also takes an initial deposit) ##
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
# blzcli tx gov submit-proposal --title="Test Proposal" --description="My awesome proposal" --type="Text" --deposit="10000stake" --from nval --keyring-backend=test
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw

## Transfer taxes are not being charged on governance deposits ##
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
# blzcli tx gov deposit 1 10000stake --from node0 --keyring-backend=test --yes
# blzcli query account bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw
