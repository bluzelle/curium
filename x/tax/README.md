# Readme 

Tax module is for customization of fees flow.

DeductFee ante handler is sending specified bp(basis point, unit of `0.0001`) of fee to the address specified by tax module.
And rest of them are sent to fee collector module as it was doing.

# Queries

Query command query tax collector (owner) and fee tax bp and transfer tax bp.
```sh
blzcli query tax info 
```

# Transactions

Set tax fee bp and transfer tax bp.
```sh
blzcli tx tax set-bp 30 40 --from tax_owner --keyring-backend=test
blzcli tx tax set-collector $(blzcli keys show -a user1 --keyring-backend=test) --from tax_owner --keyring-backend=test
```
# Command to run test

Go to root directory of project and run `make test-tax`.