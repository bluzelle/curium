<a href="https://bluzelle.com/"><img src='https://raw.githubusercontent.com/bluzelle/api/master/source/images/Bluzelle%20-%20Logo%20-%20Big%20-%20Colour.png' alt="Bluzelle" style="width: 100%"/></a>

**sdk-js** is a JavaScript library that can be used to access the Bluzelle database service.

# Setup


```
1) sudo apt update

2) curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

3) export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

4) exec "$SHELL"

5) nvm install 14 

6) nvm use 14
```



# sdk-js Installation


```
yarn add @bluzelle/sdk-js
or
npm install @bluzelle/sdk-js
```



# Quick Start

To connect your instance to the Bluzelle testnet, you can:

1)  mint an account by visiting **https://client.sentry.testnet.private.bluzelle.com:1317/mint**, which will provide a mnemonic and an address. This may take a while.

2) check your balance at **https://client.sentry.testnet.private.bluzelle.com:1317/bank/balances/{address}**. If your account balance is 0, mint another account until a positive ubnt balance shows

3) configure your sdk instance with the following options:

```typescript
import {bluzelle} from '@bluzelle/sdk-js'

const sdk = await bluzelle({
        mnemonic: mnemonic_from_mint_endpoint, 
        url: "https://client.sentry.testnet.private.bluzelle.com:26657",
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
- **Available Fields**: url, address, withTransactions(fn)

## Queries

*Each method takes a single parameter as an object (i.e. request), and returns an object (i.e. response). To see the request and response types, see the curium/proto/[module] for queries and transactions.*

- Crud module query:

```typescript
sdk.db.q.Read({
	uuid: 'myUuid', 				// Read takes a QueryReadRequest object
	key: 'myKey'		 
})
.then(resp => resp.value) 	

// returns a promise of a QueryReadResponse object*
```

*Note: resp.value is a Uint8Array representing the byte-encoded value that had been queried. To get the string-representation of the value, use new TextDecoder().decode(resp.value)

- Bank module query:


```typescript
sdk.bank.q.Balance({
	address: sdk.bank.address, 	// you can access your sdk's bluzelle address
	denom: 'ubnt'
})
```

## Transactions

*The sdk can also send transactions to the chain. Each module has a tx method to send various transaction messages.*

- Crud module tx:


```typescript
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


```typescript
sdk.bank.tx.Send({
	amount: [{
		denom: 'ubnt',
		amount: '300'
	}], 
	fromAddress: sdk.bank.address, 
	toAddress: [some_bluzelle_address]
})
```

Note: IDEs should recognize the types and auto-fill the sdk module hierarchy, and the corresponding fields for the request and response objects for each method: IntelliJ, VS, WebStorm, PhpStorm, etc.

## withTransactions(() => {...})

*Wrap multiple messages in a single transaction.*

```typescript
sdk.db.withTransactions(() => {
  sdk.db.tx.Create({
    creator: sdk.db.address,
    uuid: 'uuid',
    key: 'firstKey',
    value: new TextEncoder().encode('firstValue'),
    metadata: new Uint8Array(),
    lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
  });
  sdk.db.tx.Create({
    creator: sdk.db.address,
    uuid: 'uuid',
    key: 'secondKey',
    value: new TextEncoder().encode('secondValue'),
    metadata: new Uint8Array(),
    lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
  });
  sdk.db.tx.RenewLeasesAll({
    creator: sdk.db.address,
    uuid: 'uuid',
    lease: {days: 0, seconds: 0, years: 0, hours: 3, minutes: 0}
  });
}, {memo: 'someMemo'});
```

Note: if any one of the messages fail in the function passed to withTransaction, then all messages will fail and not be committed to a block

# CRUD (db) module methods

- **Transactions**
  - **<a href="#Create">Create({...}) </a>**
  - **<a href="#Delete">Delete({...}) </a>**
  - **<a href="#DeleteAll">DeleteAll({...}) </a>**
  - **<a href="#MultiUpdate">MultiUpdate({...}) </a>**
  - **<a href="#Rename">Rename({...}) </a>**
  - **<a href="#RenewLease">RenewLease({...}) </a>**
  - **<a href="#RenewLeasesAll">RenewLeasesAll({...}) </a>**
  - **<a href="#Update">Update({...}) </a>**
  - **<a href="#Upsert">Upsert({...}) </a>**
- **Queries**
  - **<a href="#Count">Count({...}) </a>**
  - **<a href="#GetLease">GetLease({...}) </a>**
  - **<a href="#GetNShortestLeases">GetNShortestLeases({...}) </a>**
  - **<a href="#Has">Has({...}) </a>**
  - **<a href="#Keys">Keys({...}) </a>**
  - **<a href="#KeyValues">KeyValues({...}) </a>**
  - **<a href="#MyKeys">MyKeys({...}) </a>**
  - **<a href="#Read">Read({...}) </a>**
  - **<a href="#Search">Search({...}) </a>**



## Transactions

### Create\(MsgCreateRequest) <a id="Create"></a> 

Create a key-value in the database.

```typescript
const createResp = await sdk.db.tx.Create({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'myKey',
  value: new TextEncoder().encode('myValue'),
  metadata: new Uint8Array(),
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})

.....

sdk.db.tx.Create({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'secondKey',
  value: new TextEncoder().encode('secondValue'),
  metadata: new Uint8Array(),
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgCreateResponse (empty object)

| MsgCreateRequest | Description         | Type       |
| :--------------- | :------------------ | ---------- |
| creator          | Signer address      | string     |
| uuid             | Database identifier | string     |
| key              |                     | string     |
| value            |                     | Uint8Array |
| metadata         |                     | Uint8Array |
| lease            | Key-value life-span | Lease *    |

*Lease {seconds: number, minutes: number, hours: number, days: number, years: number}

- ### Delete\(MsgDeleteRequest)<a id="Delete"></a>

Delete a key-value in the database.

```typescript
const deleteResp = await sdk.db.tx.Delete({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'myKey',
})

.....

sdk.db.tx.Delete({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'myKey',
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgDeleteResponse (empty object)

| MsgDeleteRequest | Description         | Type   |
| :--------------- | :------------------ | ------ |
| creator          | Signer address      | string |
| uuid             | Database identifier | string |
| key              | Key to delete       | string |

- ### DeleteAll\(MsgDeleteAllRequest)<a id="DeleteAll"></a>

Renew all the leases of key-values in the specified uuid.

```typescript
const deleteAllResp = await sdk.db.tx.DeleteAll({
  creator: sdk.db.address,
  uuid: 'myUuid',
})

.....

sdk.db.tx.DeleteAll({
  creator: sdk.db.address,
  uuid: 'myUuid',
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgDeleteAllResponse (empty object)

| MsgDeleteAllRequest | Description         | Type   |
| :------------------ | :------------------ | ------ |
| creator             | Signer address      | string |
| uuid                | Database identifier | string |

- ### MultiUpdate\(MsgMultiUpdateRequest)<a id="MultiUpdate"></a>

Update a set of key-values in the specified uuid.

```typescript
const myLease = {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}

const multiUpdateResp = await sdk.db.tx.MultiUpdate({
  creator: sdk.db.address,
  uuid: 'myUuid',
  keyValues: [{key: 'existingKey1', value: 'newValue1', lease: myLease}, {key: 'existingKey2', value: 'newValue2', lease: myLease}]
})

.....

sdk.db.tx.MultiUpdate({
  creator: sdk.db.address,
  uuid: 'myUuid',
  keyValues: [{key: 'existingKey1', value: 'newValue1', lease: myLease}, {key: 'existingKey2', value: 'newValue2', lease: myLease}]
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgMultiUpdateResponse (empty object)

| MsgMultiUpdateRequest | Description                                                  | Type             |
| :-------------------- | :----------------------------------------------------------- | ---------------- |
| creator               | Signer address                                               | string           |
| uuid                  | Database identifier                                          | string           |
| keyValues             | KeyValueLease {key: string, value: Uint8Array, lease: Lease} | KeyValueLease [] |

*Lease {seconds: number, minutes: number, hours: number, days: number, years: number}

- ### Rename\(MsgRenameRequest)<a id="Rename"></a>

Renew the lease of a key-value in the database.

```typescript
const renameResp = await sdk.db.tx.Rename({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'existingKey',
  newKey: 'renamingKey'
})

.....

sdk.db.tx.Rename({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'existingKey',
  newKey: 'renamingKey'
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgRenameResponse (empty object)

| MsgRenameRequest | Description            | Type   |
| :--------------- | :--------------------- | ------ |
| creator          | Signer address         | string |
| uuid             | Database identifier    | string |
| key              | Existing key           | string |
| newKey           | New key used to rename | string |

- ### RenewLease\(MsgRenewLeaseRequest)<a id="RenewLease"></a>

Renew the lease of a key-value in the database.

```typescript
const renewLeaseResp = await sdk.db.tx.RenewLease({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'existingKey',
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})

.....

sdk.db.tx.RenewLease({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'existingKey',
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgRenewLeaseResponse (empty object)

| MsgRenewLeaseRequest | Description                 | Type    |
| :------------------- | :-------------------------- | ------- |
| creator              | Signer address              | string  |
| uuid                 | Database identifier         | string  |
| key                  |                             | string  |
| lease                | New life-span for key-value | Lease * |

*Lease {seconds: number, minutes: number, hours: number, days: number, years: number}

- ### RenewLeasesAll\(MsgRenewLeasesAllRequest)<a id="RenewLeasesAll"></a>

Renew all the leases of key-values in the specified uuid.

```typescript
const renewLeasesAllResp = await sdk.db.tx.RenewLeasesAll({
  creator: sdk.db.address,
  uuid: 'myUuid',
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})

.....

sdk.db.tx.RenewLeasesAll({
  creator: sdk.db.address,
  uuid: 'myUuid',
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgRenewLeasesAllResponse (empty object)

| MsgRenewLeasesAllRequest | Description                      | Type    |
| :----------------------- | :------------------------------- | ------- |
| creator                  | Signer address                   | string  |
| uuid                     | Database identifier              | string  |
| lease                    | New life-span for all key-values | Lease * |

*Lease {seconds: number, minutes: number, hours: number, days: number, years: number}

- ### Update\(MsgUpdateRequest)<a id="Update"></a>

Update a key-value in the database.

```typescript
const updateResp = await sdk.db.tx.Update({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'existingKey',
  value: new TextEncoder().encode('newValue'),
  metadata: new Uint8Array(),
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})

.....

sdk.db.tx.Update({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'existingKey',
  value: new TextEncoder().encode('newValue'),
  metadata: new Uint8Array(),
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgUpdateResponse (empty object)

| MsgUpdateRequest | Description            | Type       |
| :--------------- | :--------------------- | ---------- |
| creator          | Signer address         | string     |
| uuid             | Database identifier    | string     |
| key              |                        | string     |
| value            | New value to update to | Uint8Array |
| metadata         |                        | Uint8Array |
| lease            | Key-value life-span    | Lease      |

*Lease {seconds: number, minutes: number, hours: number, days: number, years: number}

- ### Upsert\(MsgUpsertRequest)<a id="Upsert"></a>

Upsert a key-value in the database: create a key-value if the key doesn't exist, update the key-value if the key exists

```typescript
const upsertResp = await sdk.db.tx.Upsert({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'keyToUpsert',
  value: new TextEncoder().encode('valueToUpsert'),
  metadata: new Uint8Array(),
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})

.....

sdk.db.tx.Upsert({
  creator: sdk.db.address,
  uuid: 'myUuid',
  key: 'keyToUpsert',
  value: new TextEncoder().encode('valueToUpsert'),
  metadata: new Uint8Array(),
  lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>MsgUpsertResponse (empty object)

| MsgUpsertRequest | Description         | Type       |
| :--------------- | :------------------ | ---------- |
| creator          | Signer address      | string     |
| uuid             | Database identifier | string     |
| key              |                     | string     |
| value            |                     | Uint8Array |
| metadata         |                     | Uint8Array |
| lease            | Key-value life-span | Lease *    |

*Lease {seconds: number, minutes: number, hours: number, days: number, years: number}



## Queries

- ### Count\(QueryCountRequest)<a id="Count"></a>

Query the total number of key-values in the specified uuid.

```typescript
const countResp = await sdk.db.q.Count({
   uuid: "myUuid",
})

.....

sdk.db.q.Count({
  uuid: 'myUuid',
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryCountResponse 

| QueryCountRequest | Description         | Type   |
| :---------------- | :------------------ | ------ |
| uuid              | Database identifier | string |

| QueryCountResponse | Description                      | Type   |
| :----------------- | :------------------------------- | ------ |
| count              | Number of key-values in the uuid | number |

- ### GetLease\(QueryGetLeaseRequest)<a id="GetLease"></a>

Get the remaining lease time of a key-value.

```typescript
const getLeaseResp = await sdk.db.q.GetLease({
  uuid: 'myUuid',
  key: 'myKey',
})

.....

sdk.db.q.GetLease({
  uuid: 'myUuid',
  key: 'myKey'
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryGetLeaseResponse 

| QueryGetLeaseRequest | Description         | Type   |
| :------------------- | :------------------ | ------ |
| uuid                 | Database identifier | string |
| key                  |                     | string |

| QueryGetLeaseResponse | Description                       | Type   |
| :-------------------- | :-------------------------------- | ------ |
| seconds               | Remaining lease time of key-value | number |

- ### GetNShortestLeases\(QueryGetNShortestLeasesRequest)<a id="GetNShortestLeases"></a>

Get the remaining lease time of a n key-values.

```typescript
const getNLeasesResp = await sdk.db.q.GetNShortestLeases({
   uuid: "myUuid",
   num: 10
})

.....

sdk.db.q.GetNShortestLeases({
  uuid: 'myUuid',
  num: 10
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryGetNShortestLeasesResponse 

| QueryGetNShortestLeasesRequest | Description                   | Type   |
| :----------------------------- | :---------------------------- | ------ |
| uuid                           | Database identifier           | string |
| num                            | Number of keyLeases to return | number |

| QueryGetNShortestLeasesResponse | Description                             | Type        |
| :------------------------------ | :-------------------------------------- | ----------- |
| keyLeases                       | KeyLease {key: string, seconds: number} | KeyLease [] |

- ### Has\(QueryHasRequest)<a id="Has"></a>

Check if a key exists in the specified uuid.

```typescript
const hasResp = await sdk.db.q.Has({
   uuid: "myUuid",
   key: "myKey"
})

.....

sdk.db.q.Has({
  uuid: 'myUuid',
  key: "myKey"
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryHasResponse 

| QueryHasRequest | Description         | Type   |
| :-------------- | :------------------ | ------ |
| uuid            | Database identifier | string |
| key             |                     | string |

| QueryHasResponse | Description                                 | Type    |
| :--------------- | :------------------------------------------ | ------- |
| has              | true if key exists in uuid; false otherwise | boolean |

- ### Keys\(QueryKeysRequest}<a id="Keys"></a>

Read the complete set of keys in the specified uuid.

```typescript
const keysResp = await sdk.db.q.Keys({
  uuid: 'myUuid',
  pagination: {
    startKey: 'key-a'
    limit: Long.fromInt(50)
  }
})

.....

sdk.db.q.Keys({
  uuid: 'myUuid',
  pagination: {
    startKey: 'key-a'
    limit: Long.fromInt(50)
  }
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryKeysResponse 

| QueryKeysRequest      | Description                                   | Type          |
| :-------------------- | :-------------------------------------------- | ------------- |
| uuid                  | Database identifier                           | string        |
| pagination (optional) | PagingRequest {startKey: string, limit: Long} | PagingRequest |

| QueryKeysResponse     | Description                                   | Type           |
| :-------------------- | :-------------------------------------------- | -------------- |
| keys                  |                                               | string []      |
| pagination (optional) | PagingResponse {nextKey: string, total: Long} | PagingResponse |

- ### KeyValues\(QueryKeyValuesRequest)<a id="KeyValues"></a>

Read the complete set of key-values in the specified uuid.

```typescript
const keyValuesResp = await sdk.db.q.KeyValues({
  uuid: 'myUuid',
  pagination: {
    startKey: 'key-a'
    limit: Long.fromInt(50)
  }
})

.....

sdk.db.q.KeyValues({
  uuid: 'myUuid',
  pagination: {
    startKey: 'key-a'
    limit: Long.fromInt(50)
  }
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryKeyValuesResponse 

| QueryKeyValuesRequest | Description                                   | Type          |
| :-------------------- | :-------------------------------------------- | ------------- |
| uuid                  | Database identifier                           | string        |
| pagination (optional) | PagingRequest {startKey: string, limit: Long} | PagingRequest |

| QueryKeyValuesResponse | Description                                   | Type           |
| :--------------------- | :-------------------------------------------- | -------------- |
| keyValues              | KeyValue {key: string, value: Uint8Array}     | KeyValue []    |
| pagination (optional)  | PagingResponse {nextKey: string, total: Long} | PagingResponse |

- ### MyKeys\(QueryMyKeysRequest)<a id="MyKeys"></a>

Read the complete set of keys by address in the specified uuid.

```typescript
const keysResp = await sdk.db.q.Keys({
  uuid: 'myUuid',
  address: sdk.db.address
})

.....

sdk.db.q.Keys({
  uuid: 'myUuid',
  address: sdk.db.address
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryMyKeysResponse 

| QueryMyKeysRequest    | Description                                   | Type          |
| :-------------------- | :-------------------------------------------- | ------------- |
| uuid                  | Database identifier                           | string        |
| address               | Bluzelle address                              | string        |
| pagination (optional) | PagingRequest {startKey: string, limit: Long} | PagingRequest |

| QueryMyKeysResponse   | Description                                   | Type           |
| :-------------------- | :-------------------------------------------- | -------------- |
| keys                  |                                               | string []      |
| pagination (optional) | PagingResponse {nextKey: string, total: Long} | PagingResponse |

- ### Read\(QueryReadRequest)<a id="Read"></a>

Read a value from the database.

```typescript
const readResp = await sdk.db.q.Read({
  uuid: 'myUuid',
  key: 'existingKey'
})

.....

sdk.db.q.Read({
  uuid: 'myUuid',
  key: 'existingKey'
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QueryReadResponse 

| QueryReadRequest | Description         | Type   |
| :--------------- | :------------------ | ------ |
| uuid             | Database identifier | string |
| key              |                     | string |

| QueryReadResponse | Description | Type       |
| :---------------- | :---------- | ---------- |
| value             |             | Uint8Array |

- ### Search\(QuerySearchRequest)<a id="Search"></a>

Search by key in the specified uuid.

```typescript
const searchResp = await sdk.db.q.Search({
  uuid: "myUuid",
  searchString: "keyPrefix",
  pagination: {
    startKey: 'keyPrefix-A'
    limit: Long.fromInt(50)
  }
})

.....

sdk.db.q.Search({
  uuid: 'myUuid',
  searchString: "keyPrefix",
  pagination: {
    startKey: 'keyPrefix-A'
    limit: Long.fromInt(50)
  }
})
	.then(resp => {...})
	.catch(err => {...})

```

Returns: Promise=>QuerySearchResponse 

| QuerySearchRequest    | Description                                          | Type          |
| :-------------------- | :--------------------------------------------------- | ------------- |
| uuid                  | Database identifier                                  | string        |
| searchString          | query for keys that start with or match searchString | string        |
| pagination (optional) | {startKey: string, limit: Long}                      | PagingRequest |

| QuerySearchResponse   | Description                               | Type           |
| :-------------------- | :---------------------------------------- | -------------- |
| keyValues             | KeyValue {key: string, value: Uint8Array} | KeyValue []    |
| pagination (optional) | {nextKey: string, total: Long}            | PagingResponse |