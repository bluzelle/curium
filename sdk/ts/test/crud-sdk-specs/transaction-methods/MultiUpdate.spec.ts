import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {
    decodeData,
    defaultLease,
    encodeData,
    getSdk,
    createKeys,
    newSdkClient, encodeKeyValues
} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";

describe('tx.MultiUpdate()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
    });

    it('should throw an error if a key does not exist', () => {
        return expect(
            sdk.db.tx.MultiUpdate({
                creator: sdk.db.address,
                uuid,
                keyValues: encodeKeyValues([{key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'}])
            })
        ).to.be.rejectedWith(/key not found/);
    })

    it('should work with empty values', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: "key1",
                value: encodeData('xx'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key2',
                value: encodeData('xx'),
                lease: defaultLease,
                metadata: new Uint8Array()
            })
        }, {memo: ''});

        await sdk.db.tx.MultiUpdate({
            creator: sdk.db.address,
            uuid,
            keyValues: encodeKeyValues([{key: 'key1', value: 'value1'}, {key: 'key2', value: ''}])

        });
        expect(await sdk.db.q.Read({
            key: 'key1',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('value1');

        expect(await sdk.db.q.Read({
            key: 'key2',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('');
    })

    it.skip('should not update any keys if one of the keys fail', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: "key1",
            value: encodeData('value1'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        expect(await sdk.db.q.Read({
            key: 'key1',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('value1');

        expect(
            await sdk.db.tx.MultiUpdate({
                creator: sdk.db.address,
                uuid,
                keyValues: encodeKeyValues([{key: 'key1', value: 'newVal'}, {key: 'key2', value: 'newVal'}])
            })
        )
        expect(await sdk.db.q.Read({
            key: 'key1',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('value1');
    })

    it('should update a value in the store', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: "key",
            value: encodeData('value1'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        await sdk.db.tx.MultiUpdate({
            creator: sdk.db.address,
            uuid,
            keyValues: encodeKeyValues([{key: 'key', value: 'newVal'}])
        });

        expect(await sdk.db.q.Read({
            key: 'key',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('newVal');
    })

    it('should update multiple values in a store', async () => {
        const {keys, values} = await createKeys(sdk.db, 3, uuid);
        await sdk.db.tx.MultiUpdate({
            creator: sdk.db.address,
            uuid,
            keyValues: encodeKeyValues([{key: keys[0], value: 'newValue1'}, {key: keys[2], value: 'newValue2'}])
        });

        expect(await sdk.db.q.Read({
            key: keys[0],
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('newValue1');

        expect(await sdk.db.q.Read({
            key: keys[1],
            uuid
        }).then(resp => decodeData(resp.value))).to.equal(values[1]);

        expect(await sdk.db.q.Read({
            key: keys[2],
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('newValue2');
    });

    it('should only let the owner MultiUpdate()', async () => {

        const otherSdk = await newSdkClient(sdk);

        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: "key",
            value: encodeData('value1'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        await expect(otherSdk.db.tx.MultiUpdate({
            creator: otherSdk.db.address,
            uuid,
            keyValues: encodeKeyValues([{key: 'key', value: 'newVal'}])

        })).to.be.rejectedWith(/incorrect owner/)

        expect(await otherSdk.db.q.Read({
            key: 'key',
            uuid
        }).then(resp => decodeData(resp.value))).to.equal('value1');
    });

    it('should fail all updates if one fails', async () => {

        const {keys} = await createKeys(sdk.db, 3, uuid);
        await expect(sdk.db.tx.MultiUpdate({
            creator: sdk.db.address,
            uuid,
            keyValues: encodeKeyValues([{key: keys[0], value: 'newValue1', lease: defaultLease}, {key: 'nonExistingKey', value: 'badValue'}, {key: keys[2], value: 'newValue2'}])
        })).to.be.rejectedWith(/key not found/)

        expect(await sdk.db.q.KeyValues({
            uuid
        }).then(resp => resp.keyValues
            .map(({key}) => key))).to.deep.equal(keys)
    });

});
