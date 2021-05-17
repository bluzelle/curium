import {expect} from "chai";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {bluzelle, BluzelleSdk, DbSdk, newMnemonic} from "../../../src/bz-sdk/bz-sdk";
import {
    createKeys,
    decodeData,
    defaultLease,
    encodeData,
    getSdk, newSdkClient,
    zeroLease
} from "../../helpers/client-helpers/sdk-helpers";
import Long from 'long'
import delay from "delay";

describe('q.Keys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk ;
    let uuid: string;
    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should return a empty list if there are no keys', async () => {
        expect(await sdk.db.q.Keys({
            uuid,
        }).then(resp => resp.key)).to.have.length(0);
    });

    it('should work with an empty value', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key3',
                value: new TextEncoder().encode('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key4',
                value: new TextEncoder().encode(''),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''})
        expect(await sdk.db.q.Keys({
            uuid
        }).then(resp => resp.key)).to.deep.equal(['key3', 'key4']);
    })

    it('should return a list of keys', async () => {
        const {keys} = await createKeys(sdk.db, 5, uuid);
        expect(await sdk.db.q.Keys({
            uuid
        }).then(resp => resp.key)).to.deep.equal(keys);
    });

    it('should not see keys created by other users since its a query', async () => {

        const otherSdk = await newSdkClient(sdk)
        const otherUuid = (Date.now() + 1).toString()

        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key1',
                value: new TextEncoder().encode('my1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key2',
                value: new TextEncoder().encode('my2'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            otherSdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: otherUuid,
                key: 'key3',
                value: new TextEncoder().encode('other'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''});

        expect(await sdk.db.q.Keys({
            uuid: otherUuid
        }).then(resp => resp.key)).to.be.empty;
    });

    it('should pass back correct number of keys below pagination', async () => {
        const {keys, values} = await createKeys(sdk.db, 101, uuid);
        await sdk.db.q.Keys({
            uuid,
            pagination: {
                key: encodeData(keys[101]),
                offset: Long.fromInt(0),
                limit: Long.fromInt(100),
                countTotal: true,
                reverse: false
            }
        }).then(resp => {
            expect(resp.key).to.have.length(keys.length - 1)
            expect(decodeData(resp.pagination?.nextKey || new Uint8Array())).to.equal(keys[99])
        })

        await sdk.db.q.Keys({
            uuid,
            pagination: {
                key: encodeData(keys[11]),
                offset: Long.fromInt(0),
                limit: Long.fromInt(5),
                countTotal: true,
                reverse: false
            }
        }).then(resp => {
            expect(resp.key).to.have.length(5)
            expect(decodeData(resp.pagination?.nextKey || new Uint8Array())).to.equal('key-16')
        })
    });

    it('should not pick up expired keys', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key1',
                value: new TextEncoder().encode('value1'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'shouldExpire',
                value: new TextEncoder().encode('value2'),
                lease: {...zeroLease, seconds: 30},
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key3',
                value: new TextEncoder().encode('value3'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''});

        await delay(40000);

        expect(await sdk.db.q.Keys({
            uuid
        }).then(resp => resp.key)).to.deep.equal(['key1', 'key3']);
    });
});