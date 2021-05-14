import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {defaultGasParams, newBzClient} from "../../helpers/client-helpers/client-helpers";
import {defaultLease, encodeData, getSdk, newSdkClient} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";

describe('deleteAll()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string
    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should do nothing if there are no keys', async () => {
        await sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid
        });
    });

    it('should delete 2 of 2 keys', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'firstkey',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'secondkey',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''});

        await sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid
        });

        expect(await sdk.db.tx.KeyValues({
            creator: sdk.db.address,
            uuid
        }).then(resp => resp.keyValues)).to.deep.equal([])

    })

    // it('should delete all keys', async () => {
    //     await createKeys(sdk, 5);
    //     expect(await sdk.count()).to.equal(5);
    //     await sdk.deleteAll(defaultGasParams());
    //     expect(await sdk.count()).to.equal(0);
    // });
    //
    it.skip('should delete all keys that you own and only keys that you own', async () => {
        const sdk2 = await newSdkClient(sdk);
        await sdk.db.withTransaction(() => {

            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'myKey1',
                value: encodeData('myValue'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });

            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'myKey2',
                value: encodeData('myValue'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });

            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'myKey3',
                value: encodeData('myValue'),
                lease: defaultLease,
                metadata: new Uint8Array()
            })

            sdk2.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'notMyKey',
                value: encodeData('myValue'),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''});

        await sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid
        });

        expect(await sdk.db.q.Keys({
            uuid
        }).then(resp => resp.key)).to.deep.equal(['notMyKey']);
    });
});



