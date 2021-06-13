import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";

console.log("STARTING CRUD DEMO")

const populateUuid = (sdk: BluzelleSdk) =>
    sdk.db.withTransaction(() => {
        sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'firstKey',
            value: new TextEncoder().encode('firstValue'),
            metadata: new Uint8Array(),
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
        });
        sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'secondKey',
            value: new TextEncoder().encode('secondValue'),
            metadata: new Uint8Array(),
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
        });
        sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'thirdKey',
            value: new TextEncoder().encode('thirdValue'),
            metadata: new Uint8Array(),
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}
        })
    }, {memo: ''})

const diffCostForLeaseChange = async (): Promise<number> => {

    let firstCost = 0;
    await sdk.bank.q.Balance({
        address: sdk.db.address,
        denom: "ubnt"
    })
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => firstCost += amt)
        .then(() => console.log("CREATING key: shortLeaseKey value: someValue"))
        .then(() => sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'shortLeaseKey',
            value: new TextEncoder().encode('someValue'),
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0},
            metadata: new Uint8Array()
        }))
        .then(() => sdk.bank.q.Balance({
            address: sdk.db.address,
            denom: "ubnt"
        }))
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => firstCost-=amt)
        .then(console.log.bind(null, "COST OF CREATE WITH SHORT LEASE: "))

    let secondCost = 0;
    await sdk.bank.q.Balance({
        address: sdk.db.address,
        denom: "ubnt"
    })
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => secondCost += amt)
        .then(() => console.log("CREATING key: longLeaseKey value: someValue"))
        .then(() => sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'longLeaseKey',
            value: new TextEncoder().encode('someValue'),
            lease: {days: 1, seconds: 0, years: 0, hours: 0, minutes: 0},
            metadata: new Uint8Array()
        }))
        .then(() => sdk.bank.q.Balance({
            address: sdk.db.address,
            denom: "ubnt"
        }))
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => secondCost-=amt)
        .then(console.log.bind(null, "COST OF CREATE WITH LONG LEASE: "))

    return secondCost - firstCost
}

const diffCostForEqualSizeCreates = async () => {
    let firstCost = 0;
    await sdk.bank.q.Balance({
        address: sdk.db.address,
        denom: "ubnt"
    })
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => firstCost += amt)
        .then(() => console.log("CREATING key: someKeyA value: someValue"))
        .then(() => sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'someKeyA',
            value: new TextEncoder().encode('someValue'),
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0},
            metadata: new Uint8Array()
        }))
        .then(() => sdk.bank.q.Balance({
            address: sdk.db.address,
            denom: "ubnt"
        }))
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => firstCost-=amt)
        .then(console.log.bind(null, "COST OF FIRST CREATE: "))

    let secondCost = 0;
    await sdk.bank.q.Balance({
        address: sdk.db.address,
        denom: "ubnt"
    })
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => secondCost += amt)
        .then(() => console.log("CREATING key: someKeyB value: someValue"))
        .then(() => sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'someKeyB',
            value: new TextEncoder().encode('someValue'),
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0},
            metadata: new Uint8Array()
        }))
        .then(() => sdk.bank.q.Balance({
            address: sdk.db.address,
            denom: "ubnt"
        }))
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => secondCost-=amt)
        .then(console.log.bind(null, "COST OF SECOND CREATE: "))

    return firstCost - secondCost
}


const uuid = Date.now().toString()


let sdk: BluzelleSdk

const main = async () => {

    sdk = await bluzelle({
        gasPrice: 0.002,
        maxGas: 10000000,
        url: "http://localhost:26667",
        mnemonic: "armor armor shop farm grab twice address month tired tide pulse dove banner spider fold leader wink planet stable future major orchard solar culture"
    })
    await sdk.db.tx.Create({
        creator: sdk.db.address,
        uuid: uuid,
        key: 'myKey',
        value: new TextEncoder().encode('myValue'),
        metadata: new Uint8Array(),
        lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}

    })
        .then(() => console.log(`CREATED key: myKey value: myValue in ${uuid} `))
        .then(() => sdk)

        .then(sdk => sdk.db.q.Read({
            uuid: uuid,
            key: 'myKey'
        }))
        .then(resp => new TextDecoder().decode(resp.value))
        .then(console.log.bind(null, `READ myKey in ${uuid}: `))
        .then(() => sdk.db.tx.Update({
            creator: sdk.db.address,
            uuid: uuid,
            key: 'myKey',
            value: new TextEncoder().encode('updatedValue'),
            lease: {days: 0, seconds: 0, years: 0, hours: 0, minutes: 1},
            metadata: new Uint8Array()
        }))
        .then(() => console.log('UPDATED key: myKey to value: updatedValue, for a 1 minute lease'))

        .then(() => sdk.db.q.Read({
            uuid: uuid,
            key: 'myKey'
        }))
        .then(resp => new TextDecoder().decode(resp.value))
        .then(console.log.bind(null, "READ myKey after updating: "))
        .then(() => sdk.db.q.GetLease({
            uuid: uuid,
            key: 'myKey'
        }))
        .then(resp => resp.leaseBlocks.toInt() * 5.5)
        .then(console.log.bind(null, "Remaining lease time (seconds) "))
        .then(() => populateUuid(sdk))
        .then(() => console.log("POPULATED UUID WITH NEW KEY-VALUES"))
        .then(() => sdk.db.q.KeyValues({
            uuid
        }))
        .then(resp => resp.keyValues)
        .then(console.log.bind(null, `READING ALL KEY VALUES IN ${uuid} `));

    await diffCostForEqualSizeCreates()
        .then(console.log.bind(null, "TOTAL COST DIFFERENCE for creates of equal size: "))

    await diffCostForLeaseChange()
        .then(console.log.bind(null, "TOTAL COST DIFFERENCE 1 DAY vs 1 HOUR: "))

    await sdk.db.q.Search({
        uuid,
        searchString: 'fi'
    })
        .then(resp => resp.keyValues)
        .then(console.log.bind(null, "KEY-VALUES with keys matching the search string: "))
}

main()




