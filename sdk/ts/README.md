<a href="https://bluzelle.com/"><img src='https://raw.githubusercontent.com/bluzelle/api/master/source/images/Bluzelle%20-%20Logo%20-%20Big%20-%20Colour.png' alt="Bluzelle" style="width: 100%"/></a>

**sdk-js** is a JavaScript library that can be used to access the Bluzelle database service.


# sdk-js Installation


```
yarn add @bluzelle/sdk-js
or
npm install @bluzelle/sdk-js
```



# Quick Start

To connect your instance to the Bluzelle testnet, you can:

1)  mint an account by visiting **https://client.sentry.testnet.private.bluzelle.com:1317/mint**, which will provide a mnemonic and an address. This may take a few seconds. 

2) check your balance at **https://client.sentry.testnet.private.bluzelle.com:1317/bank/balances/{address}**. If your account balance is 0, mint another account until a positive ubnt balance shows

3) configure your sdk instance with the following options:

```
import {bluzelle} from '@bluzelle/sdk-js'

const sdk = await bluzelle({
        mnemonic: mnemonic_from_mint_endpoint, 
        url: https://client.sentry.testnet.private.bluzelle.com:26657,
        maxGas: 100000000, 
        gasPrice:  0.002 		 
    });

```

Note: if the specified gasPrice and/or maxGas is too low, any transactions may be rejected by a validator (e.g. a transaction requires more gas than maxGas specified, or the gasPrice is too low to cover validator fees). The default suggestion for these fields above will suffice.

# Usage

## sdk-hierarchy

*After configuring your sdk, you will have access to various modules and their corresponding methods.* 

- **Hierarchal format:** 

```
sdk.[module].[q or tx or field].[method]({...request fields})
```

- **Available Modules**: db, nft, staking, bank, distribution
- **Available Fields**: url, address, withTransactions()

## Queries

*Each method takes a single parameter as an object (i.e. request), and returns an object (i.e. response). To see the request and response types, see the curium/proto/[module] for queries and transactions.*

- Crud module query:

```
sdk.db.q.Read({
	uuid: 'myUuid', 				// Read takes a QueryReadRequest object
	key: 'myKey'		 
})
.then(resp => resp.value) 	

// returns a promise of a QueryReadResponse object*
```

*Note: resp.value is a Uint8Array representing the byte-encoded value that had been queried. To get the string-representation of the value, use new TextDecoder().decode(resp.value)

- Bank module query:


```
sdk.bank.q.Balance({
	address: sdk.bank.address, 	// you can access your sdk's bluzelle address
	denom: 'ubnt'
})
```

## Transactions

*The sdk can also send transactions to the chain. Each module has a tx method to send various transaction messages.*

- Crud module tx:


```
sdk.db.tx.Create({					// takes a MsgCreateRequest object
     creator: sdk.db.address,     			// the creator of the transaction should always be the sender's address*
     uuid: 'uuid',	
     key: 'myKey',
     value: new TextEncoder().encode('myValue'),	// values are stored as byte arrays 
     metadata: new Uint8Array(),			
     lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0} // Lease object to specify lifespan of key-value**
})
 
 // returns a promise of a MsgCreateResponse, which in this case is an empty object
```

*Note: the sdk is signing and sending the transaction, so the signer address must match the creator of the transaction. Otherwise, an error will be thrown

**Note: see codec/crud/lease.ts to see the Lease interface

- Bank module tx:


```
sdk.bank.tx.Balance({
	amount: [{
		denom: 'ubnt',
		amount: '300'
	}], 
	fromAddress: sdk.bank.address, 
	toAddress: [some_bluzelle_address]
})
```

Note: IDEs should recognize the types and auto-fill the sdk module hierarchy, and the corresponding fields for the request and response objects for each method: IntelliJ, VS, WebStorm, PhpStorm, etc.





