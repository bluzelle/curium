import {expect} from "chai";
import {bluzelle, BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {defaultLease, encodeData, getSdk, newSdkClient, zeroLease} from "../../helpers/client-helpers/sdk-helpers";
import delay from "delay";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('q.MyKeys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    let otherUuid: string;
    let creator: string;
    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
            .then(() => creator = sdk.db.address)
    });

    it('should return a list of only keys in all my uuids', async () => {


        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'myKey1',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
            sdk.db.tx.Create({
                creator,
                uuid,
                key: 'myKey2',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
            sdk.db.tx.Create({
                creator,
                uuid: otherUuid,
                key: 'myKey3',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
        }, {memo: ''});

        expect(await sdk.db.q.MyKeys({
            address: creator,
            uuid
        }).then(resp => resp.keys)).to.deep.equal(['myKey1', 'myKey2'])

        expect(await sdk.db.q.MyKeys({
            address: creator,
            uuid: otherUuid
        }).then(resp => resp.keys)).to.deep.equal(['myKey3'])

    });

    it('should not show keys that have been deleted', async () => {

        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'my1',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'my2',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
        }, {memo: ''});

        expect(await sdk.db.q.MyKeys({
            address: sdk.db.address,
            uuid: uuid
        }).then(resp => resp.keys)).to.deep.equal(['my1', 'my2']);

        await sdk.db.tx.Delete({
            creator: sdk.db.address,
            key: 'my1',
            uuid: uuid
        })

        expect(await sdk.db.q.MyKeys({
            address: sdk.db.address,
            uuid: uuid
        }).then(resp => resp.keys)).to.deep.equal(['my2'])
    });

    it('should not show a key after it expires', async () => {
        const uuidTime = Date.now().toString()
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: uuidTime,
                key: 'my1',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: {...zeroLease, seconds: 8}
            });
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: uuidTime,
                key: 'my2',
                value: encodeData('value'),
                metadata: new Uint8Array(),
                lease: defaultLease
            });
        }, {memo: ''});

        await delay(8000)

        expect(await sdk.db.q.MyKeys({
            uuid: uuidTime,
            address: sdk.db.address
        }).then(resp => resp.keys)).to.deep.equal(['my2']);

        await delay(12000);

        expect(await sdk.db.q.MyKeys({
            uuid: uuidTime,
            address: sdk.db.address
        }).then(resp => resp.keys)).to.deep.equal(['my2']);
    });

    it('should show the right keys if you rename a key', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'my1',
                value: encodeData('value'),
                lease: defaultLease,
                metadata: new Uint8Array()
            }),
                sdk.db.tx.Create({
                    creator: sdk.db.address,
                    uuid,
                    key: 'my2',
                    value: encodeData('value'),
                    lease: defaultLease,
                    metadata: new Uint8Array()
                })
        }, {memo: ''});

        expect(await sdk.db.q.MyKeys({address: sdk.db.address, uuid}).then(resp => resp.keys)).to.deep.equal(['my1', 'my2']);

        await sdk.db.tx.Rename({
            creator: sdk.db.address,
            key: 'my1',
            newKey: 'myOne',
            uuid
        });

        expect(await sdk.db.q.MyKeys({address: sdk.db.address, uuid}).then(resp => resp.keys)).to.deep.equal(['my2', 'myOne']);
    })
})