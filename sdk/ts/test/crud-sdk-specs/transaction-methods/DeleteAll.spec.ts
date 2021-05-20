import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {defaultGasParams, newBzClient} from "../../helpers/client-helpers/client-helpers";
import {
    createKeys,
    decodeData,
    defaultLease,
    encodeData,
    getSdk,
    newSdkClient
} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('tx.DeleteAll()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string
    beforeEach(async () => {
        useChaiAsPromised()
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should do nothing if there are no keys', async () => {
        await sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid
        });
    });

    it('should throw an error for an empty uuid', () => {
        return expect(sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid: ''
        })).to.be.rejectedWith(/Uuid cannot be empty/)
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
        }).then(resp => resp.keyValues)).to.have.length(0)

    })

    it('should delete all keys', async () => {
        await createKeys(sdk.db, 5, uuid);
        expect(await sdk.db.q.Count({
            uuid,
            address: sdk.db.address
        }).then(resp => resp.count.toInt())).to.equal(5);

        await sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid
        });
        expect(await sdk.db.q.Count({
            uuid,
            address: sdk.db.address
        }).then(resp => resp.count.toInt())).to.equal(0);

    });

    it('should delete all keys in specified uuid', async () => {

        const otherUuid = (Date.now() + 1).toString()

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
            });

            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: otherUuid,
                key: 'otherKey',
                value: encodeData('myValue'),
                lease: defaultLease,
                metadata: new Uint8Array()
            })

        }, {memo: ''});

        await sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid
        });

        expect(await sdk.db.q.Keys({
            uuid
        }).then(resp => resp.keys)).to.deep.equal([]);

        expect(await sdk.db.q.Keys({
            uuid: otherUuid
        }).then(resp => resp.keys)).to.deep.equal(['otherKey'])
    });

    it("should free up uuid space after uuid is emptied, claim ownership", async () => {
        const otherSdk = await newSdkClient(sdk);

        await createKeys(sdk.db, 10, uuid);

        await sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid
        });

        expect(await otherSdk.db.tx.Create({
            creator: otherSdk.db.address,
            uuid,
            key: 'I took this uuid',
            value: encodeData('my uuid'),
            lease: defaultLease,
            metadata: new Uint8Array()
        }));

        expect(await otherSdk.db.tx.KeyValues({
            creator: otherSdk.db.address,
            uuid,
        }).then(resp => resp.keyValues)).to.deep.equal([{key: 'I took this uuid', value: encodeData('my uuid')}]);

        await expect(sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'newKey',
            value: encodeData('firstValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })).to.be.rejectedWith(/incorrect owner of uuid/);

    });

    it('should only allow owner of uuid to deleteAll', async () => {

        const otherSdk = await newSdkClient(sdk);

        const {keys} = await createKeys(sdk.db, 10, uuid);

        await expect(otherSdk.db.tx.DeleteAll({
            creator: otherSdk.db.address,
            uuid
        })).to.be.rejectedWith(/incorrect owner of uuid/);

        expect(await sdk.db.q.Count({
            uuid,
            address: sdk.db.address
        }).then(resp => resp.count.toInt())).to.equal(keys.length)

    });
});



