import {expect} from "chai";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {BluzelleSdk} from "../../src/bz-sdk/bz-sdk";
import {
    createKeys, decodeData,
    defaultLease,
    encodeData,
    getSdk,
    newSdkClient,
    zeroLease
} from "../helpers/client-helpers/sdk-helpers";
import Long from 'long'
import delay from "delay";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {getSwarm} from "testing/lib/helpers/swarmHelpers";
import {Lease} from "../../src/codec/crud/lease";

describe('tx.Keys()', function () {

    let sdk: BluzelleSdk;
    let uuid: string;
    let creator: string;
    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
            .then(() => creator = sdk.db.address)
    });

    it('should return the list of keys', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'someKey',
            value: new TextEncoder().encode('someValue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        })
            .then(() => sdk.db.q.Keys({
                uuid,
            }))
            .then(resp => resp.keys)
            .then(keys => expect(keys[0]).to.equal('someKey'))
    })

    it('should return a empty list if there are no keys', async () => {
        expect(await sdk.db.tx.Keys({
            creator,
            uuid,
        }).then(resp => resp.keys)).to.have.length(0);
    });

    it('should work with an empty value', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'key1',
                value: new TextEncoder().encode('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'key2',
                value: new TextEncoder().encode(''),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''})
        expect(await sdk.db.tx.Keys({
            creator,
            uuid
        }).then(resp => resp.keys)).to.deep.equal(['key1', 'key2']);
    })

    it('should return a list of keys', async () => {
        const {keys} = await createKeys(sdk.db, 5, uuid);
        expect(await sdk.db.tx.Keys({
            creator,
            uuid
        }).then(resp => resp.keys)).to.deep.equal(keys);
    });

    it('should return all keys from someone elses uuid', async () => {

        const otherSdk = await newSdkClient(sdk)
        const otherUuid = (Date.now() + 1).toString()

        await sdk.db.tx.Create({
            creator,
            uuid,
            key: 'key1',
            value: new TextEncoder().encode('my2'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        await otherSdk.db.tx.Create({
            creator: otherSdk.db.address,
            uuid: otherUuid,
            key: 'key2',
            value: new TextEncoder().encode('my2'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        await otherSdk.db.tx.Create({
            creator: otherSdk.db.address,
            uuid: otherUuid,
            key: 'key3',
            value: new TextEncoder().encode('other'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });


        expect(await sdk.db.tx.Keys({
            creator,
            uuid: otherUuid
        }).then(resp => resp.keys)).to.deep.equal(['key2', 'key3']);
    });

    it('should pass back correct number of keys below pagination', async () => {
        const {keys, values} = await createKeys(sdk.db, 101, uuid);
        await sdk.db.tx.Keys({
            creator,
            uuid,
            pagination: {
                startKey: keys[0],
                limit: Long.fromInt(100),
            }
        }).then(resp => {
            expect(resp.keys).to.have.length(keys.length - 1)
            expect(resp.pagination?.nextKey).to.equal(keys[99])
        })

        await sdk.db.tx.Keys({
            creator,
            uuid,
            pagination: {
                startKey: keys[11],
                limit: Long.fromInt(5),
            }
        }).then(resp => {
            expect(resp.keys).to.have.length(5)
            expect(resp.pagination?.nextKey).to.equal('key-16')
        })
    });

    it('should not pick up expired keys', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'key1',
                value: new TextEncoder().encode('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'shouldExpire',
                value: new TextEncoder().encode('value2'),
                lease: {...zeroLease, seconds: 30},
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'key3',
                value: new TextEncoder().encode('value3'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''});

        await delay(40000);

        expect(await sdk.db.tx.Keys({
            creator,
            uuid
        }).then(resp => resp.keys)).to.deep.equal(['key1', 'key3']);
    });
});