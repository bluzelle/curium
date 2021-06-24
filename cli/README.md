<a href="https://bluzelle.com/"><img src='https://raw.githubusercontent.com/bluzelle/api/master/source/images/Bluzelle%20-%20Logo%20-%20Big%20-%20Colour.png' alt="Bluzelle" style="width: 100%"/></a>

**Bluzelle Command Line Interface** **(blzcli)** that can be used to access the Bluzelle database service.

# CLI Installation


```
yarn add @bluzelle/cli
or
npm install @bluzelle/cli
```

# Quick Start

To use the CLI against the Bluzelle testnet, you can:

1)  mint an account by visiting **https://client.sentry.testnet.private.bluzelle.com:1317/mint**, which will provide a mnemonic and an address.

2) add a user to the your local keyring with the following command:

```Command
blzcli keys add [user] --recover
```

3) copy and paste your mnemonic when prompted, and press enter

4) send transactions to the Bluzelle chain with the flag --from [user] 

# Usage 

## blzcli

*blzcli* is the root command for interacting with the Bluzelle DB via CRUD commands

***Use --help to get all available commands, arguments, and structure***

- Hierarchal format: 

```
blzcli [q or tx] crud [method] (...args) (...flags)
```

## Queries (q)

*Query CRUD info from the chain*

- Query command example:

```
blzcli q crud read uuid myKey 
// will print the string of the value of myKey
```

*Note: the --node flag currently defaults to the Bluzelle testnet, https://client.sentry.testnet.private.bluzelle.com:26657

## Transactions (tx)

*Send CRUD transactions to the chain*

- Tx command example:


```typescript
blzcli tx crud create uuid myKey myValue 3600 --from [user]
```

*Note: the remaining flags currently default to:

- --gas 1000000000
- --gasPrice 0.002ubnt
- --node https://client.sentry.testnet.private.bluzelle.com:26657

## Keys (keys)

*Manage users stored on local file system*

- Keys command example:


```typescript
blzcli keys add newUser
```

- This will generate a new mnemonic and save newUser's info in your local file system
- Navigate to .curium/cli in your home directory to see the encoded user info

