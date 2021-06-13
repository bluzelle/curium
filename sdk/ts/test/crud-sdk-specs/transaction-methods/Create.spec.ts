import {
    checkBalance,
    createKeys,
    decodeData,
    DEFAULT_TIMEOUT,
    defaultLease, encodeData, getMintedAccount,
    getSdk,
    newSdkClient
} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from 'chai'
import {bluzelle, BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {Lease} from "../../../src/codec/crud/lease";
import {getPrintableChars} from "testing/lib/helpers/testHelpers";
import {localChain} from "../../config";
import {getSentry, getSwarm, getValidator, SINGLE_SENTRY_SWARM} from "testing/lib/helpers/swarmHelpers";
import {times} from 'lodash'

describe('tx.Create()', function () {
    //this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string;
    beforeEach( () => {
        return getSwarm()
            .then(() => getMintedAccount())
            .then(({mnemonic}) => getSdk(mnemonic))
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
            .then(() => creator = sdk.db.address)
    });

    it('should just do a create', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'someKey',
            value: new TextEncoder().encode('someValue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
            .then(() => sdk.db.tx.Read({
                creator: sdk.db.address,
                uuid,
                key: 'someKey'
            }))
            .then(resp => new TextDecoder().decode(resp.value))
            .then(val => expect(val).to.equal('someValue'))
    })

    it('should do multiple creates', async () => {

        await Promise.all(times(10).map(idx => sdk.db.tx.Create({
            creator,
            uuid,
            key: `key-${idx}`,
            value: new TextEncoder().encode(`value-${idx}`),
            lease: defaultLease,
            metadata: new Uint8Array()
        })))

        await Promise.all(times(10).map(idx => sdk.db.q.Read({
            uuid,
            key: `key-${idx}`
        })))
            .then(arrayValues => arrayValues.map(val => new TextDecoder().decode(val.value)))
            .then(decodedValues => expect(decodedValues).to.deep.equal(times(10).map(idx => `value-${idx}`)))
    })

    it('should throw an error if key already exists', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'firstkeys',
            value: new TextEncoder().encode('firstvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
            .then(() => expect(sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'firstkeys',
                value: new TextEncoder().encode('secondvalue'),
                lease: {days: 10} as Lease,
                metadata: new Uint8Array()
            })).to.be.rejectedWith(/key already exists/))
    });

    it('should handle long keys', async () => {
        const longKey = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012'
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: longKey,
            value: new TextEncoder().encode('longvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
        await sdk.db.q.Read({
            uuid,
            key: longKey
        })
            .then(resp => resp.value)
            .then(decodeData)
            .then(data => expect(data).to.equal('longvalue'));
    })

    it('should handle values with symbols', async () => {
        const symbols = getPrintableChars();
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'symbolskeys',
            value: new TextEncoder().encode(symbols),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
        await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'symbolskeys'
        })
            .then(resp => resp.value)
            .then(decodeData)
            .then(readResponse => expect(readResponse).to.equal(symbols));
    });

    it('should throw an error if key is empty', () => {
        return expect(sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: '',
            value: new TextEncoder().encode('emptyvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith('Key cannot be empty')

    })

    it('can store json', async () => {
        const json = JSON.stringify({foo: 10, bar: 'baz', t: true, arr: [1, 2, 3]});
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'jsonskeys',
            value: new TextEncoder().encode(json),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })

        await sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: 'jsonskeys'
        })
            .then(resp => resp.value)
            .then(decodeData)
            .then(readResponse => expect(readResponse).to.equal(json));

    });

    it('should not allow another user to input another address as creator', async () => {
        const otherSdk = await newSdkClient(sdk);

        await expect(sdk.db.tx.Create({
            creator: otherSdk.db.address,
            uuid,
            key: 'key',
            value: encodeData('value'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/pubKey does not match signer address/)

    })

    it('should throw an error if incorrect owner tries to create in uuid', async () => {
        const sdk2 = await newSdkClient(sdk)
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'mykeyss',
            value: new TextEncoder().encode('myvalue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        await expect(sdk2.db.tx.Create({
            creator: sdk2.db.address,
            uuid,
            key: 'yourkeyss',
            value: new TextEncoder().encode('yourvalue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/incorrect owner/)

    });

    it("should throw an error if creating in another's uuid", async () => {
        const otherSdk = await newSdkClient(sdk);

        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: `firstEntryto ${uuid}`,
            value: encodeData('myValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })

        await expect(otherSdk.db.tx.Create({
            creator: otherSdk.db.address,
            uuid,
            key: `imposterEntry to ${uuid}`,
            value: encodeData('imposterValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/incorrect owner/)

        await expect(sdk.db.tx.Read({
            creator: sdk.db.address,
            uuid,
            key: `imposterEntry to ${uuid}`
        })).to.be.rejectedWith(/key not found/)
    });

    it("should throw an error if creating with another address", async () => {
        const otherSdk = await newSdkClient(sdk);

        await expect(sdk.db.tx.Create({
            creator: otherSdk.db.address,
            uuid,
            key: `firstEntryto ${uuid}`,
            value: encodeData('myValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/invalid pubkey/)
    })

    it.skip('should include tx hash and tx height in MsgCreateResponse', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'dumbojumbo1',
            value: new TextEncoder().encode('elephant'),
            lease: {} as Lease,
            metadata: new Uint8Array()
        })
    });

    it("should free up uuid space after uuid is emptied, claim ownership", async () => {
        const otherSdk = await newSdkClient(sdk);

        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'firstKey',
            value: encodeData('firstValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        await sdk.db.tx.Delete({
            creator: sdk.db.address,
            uuid,
            key: 'firstKey'
        });

        expect(await otherSdk.db.tx.Create({
            creator: otherSdk.db.address,
            uuid,
            key: 'I took this uuid',
            value: encodeData('my uuid'),
            lease: defaultLease,
            metadata: new Uint8Array()
        }));

        expect(await otherSdk.db.tx.Read({
            creator: otherSdk.db.address,
            uuid,
            key: 'I took this uuid'
        }).then(resp => decodeData(resp.value))).to.equal('my uuid');

        await expect(sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'newKey',
            value: encodeData('firstValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/incorrect owner/);

    });

    it('should charge the same amount for equally-lengthed data', async () => {

        let firstCreateCost: number = 0;
        let secondCreateCost: number = 0;

        await sdk.bank.q.Balance({
            address: sdk.bank.address,
            denom: 'ubnt'
        }).then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => firstCreateCost += amt)
            .then(() => sdk.db.tx.Create({
                creator,
                uuid,
                key: 'key1',
                value: encodeData('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            }))

            .then(() => sdk.bank.q.Balance({
                address: sdk.bank.address,
                denom: 'ubnt'
            }))
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => firstCreateCost -= amt)

        await sdk.bank.q.Balance({
            address: sdk.bank.address,
            denom: 'ubnt'
        }).then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => secondCreateCost += amt)
            .then(() => sdk.db.tx.Create({
                creator,
                uuid,
                key: 'key2',
                value: encodeData('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            }))

            .then(() => sdk.bank.q.Balance({
                address: sdk.bank.address,
                denom: 'ubnt'
            }))
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => secondCreateCost -= amt)

        await expect(firstCreateCost).to.be.closeTo(secondCreateCost, 3)
    })

    it('should still charge for a failed transaction', () => {
        let initialCost = 0;
        return sdk.bank.q.Balance({
            address: sdk.bank.address,
            denom: 'ubnt'
        })
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => initialCost+= amt)
            .then(() => sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: '',
            value: new TextEncoder().encode('secondvalue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        }))
            .catch(x => x)
            .then(() => sdk.bank.q.Balance({
                address: sdk.bank.address,
                denom: 'ubnt'
            }))
            .then(resp => resp.balance ? parseInt(resp.balance.amount) : 0)
            .then(amt => expect(amt).to.be.lessThan(initialCost))
    })
})


