import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import delay from 'delay'

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
        .then(() => console.log("\nCreating key: shortLeaseKey value: someValue"))
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
        .then(amt => firstCost -= amt)
        .then(console.log.bind(null, "Cost of create with short lease: "))

    let secondCost = 0;
    await sdk.bank.q.Balance({
        address: sdk.db.address,
        denom: "ubnt"
    })
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => secondCost += amt)
        .then(() => console.log("\nCreating key: longLeaseKey value: someValue"))
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
        .then(amt => secondCost -= amt)
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
        .then(() => console.log("\nCREATING key: someKeyA value: someValue"))
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
        .then(amt => firstCost -= amt)
        .then(console.log.bind(null, "COST OF FIRST CREATE: "))

    let secondCost = 0;
    await sdk.bank.q.Balance({
        address: sdk.db.address,
        denom: "ubnt"
    })
        .then(resp => parseInt(resp.balance?.amount || '0'))
        .then(amt => secondCost += amt)
        .then(() => console.log("\nCreating key: someKeyB value: someValue"))
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
        .then(amt => secondCost -= amt)
        .then(console.log.bind(null, "Cost of second create: "))

    return firstCost - secondCost
}


const uuid = Date.now().toString()


let sdk: BluzelleSdk

const main = async () => {

    sdk = await bluzelle({
        mnemonic: "fee blossom summer between addict destroy roast inspire figure behave team beach love donor sausage retreat warfare poverty frost void release cost pond blur",
        url: "https://client.sentry.testnet.private.bluzelle.com:26657",
        maxGas: 100000000,
        gasPrice: 0.002
    })

    await sdk.db.tx.Create({
        creator: sdk.db.address,
        uuid: uuid,
        key: 'myKey',
        value: new TextEncoder().encode('myValue'),
        metadata: new Uint8Array(),
        lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0}

    })
        .then(() => console.log(`\nCreated key: myKey value: myValue in ${uuid} `))
        .then(() => sdk)

    await sdk.db.q.Read({
        uuid: uuid,
        key: 'myKey'
    })
        .then(resp => new TextDecoder().decode(resp.value))
        .then(console.log.bind(null, `\nREAD myKey in ${uuid}: `))

    await sdk.db.tx.Update({
        creator: sdk.db.address,
        uuid: uuid,
        key: 'myKey',
        value: new TextEncoder().encode('updatedValue'),
        lease: {days: 0, seconds: 0, years: 0, hours: 0, minutes: 1},
        metadata: new Uint8Array()
    })
        .then(() => console.log('\nUpdated key: myKey to value: updatedValue, for a 1 minute lease'))

    await sdk.db.q.Read({
        uuid: uuid,
        key: 'myKey'
    })
        .then(resp => new TextDecoder().decode(resp.value))
        .then(console.log.bind(null, "\nRead myKey after updating: "))

    await sdk.db.q.GetLease({
        uuid: uuid,
        key: 'myKey'
    })
        .then(resp => resp.seconds)
        .then(console.log.bind(null, "\nRemaining lease time (seconds) "))
        .then(() => populateUuid(sdk))
        .then(() => console.log("\nCreated 3 new key-values"))

    await sdk.db.q.KeyValues({
        uuid
    })
        .then(resp => resp.keyValues)
        .then(console.log.bind(null, `\nReading all values in ${uuid} `));

    await diffCostForEqualSizeCreates()
        .then(console.log.bind(null, "\nTotal cost difference for creates of equal size: "))

    await diffCostForLeaseChange()
        .then(console.log.bind(null, "\nTotal cost difference 1 day vs. 1 hour "))

    await sdk.db.q.Search({
        uuid,
        searchString: 's'
    })
        .then(resp => resp.keyValues)
        .then(console.log.bind(null, "\nKey-values with keys matching the search string 's': "));

    await sdk.db.q.GetNShortestLeases({
        uuid,
        num: 5
    })
        .then(console.log.bind(null, "\nGetting the 5 shortest leases"));

    await sdk.db.tx.RenewLeasesAll({
        creator: sdk.db.address,
        uuid,
        lease: {seconds: 10, minutes: 0, hours: 0, days: 0, years: 0}
    })
        .then(() => console.log("\nRenewing all key-values to leases of 10 seconds"))

    await sdk.db.q.GetNShortestLeases({
        uuid,
        num: 6
    })
        .then(console.log.bind(null, "\nGetting 6 of the shortest leases"));

    await delay(10000).then(() => console.log("\nWaiting 10 seconds for lease expiries"))

    await sdk.db.q.KeyValues({
        uuid
    })
        .then(console.log.bind(null, `Querying all key-values in uuid: ${uuid}:`))
}

main()




