import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {defaultGasParams} from "../../helpers/client-helpers/client-helpers";
import {defaultLease, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";

describe('KeyValues()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string

    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should be able to handle empty values', async () => {
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
                key: 'key2',
                value: new TextEncoder().encode(''),
                lease: defaultLease,
                metadata: new Uint8Array()
            });
        }, {memo: ''})
        expect(await sdk.db.tx.KeyValues({
            creator: sdk.db.address,
            uuid,
        }).then(resp => resp.keyValues)).to.deep.equal([{
            key: 'key1',
            value: encodeData('value1')
        }, {
            key: 'key2',
            value: encodeData('')
        }]);

    })

    it('should return an empty array if there are no keys', async () => {
        expect(await sdk.db.tx.KeyValues({
            creator: sdk.db.address,
            uuid,
        }).then(resp => resp.keyValues)).to.have.length(0);
    })

    // it('should return keys and values', async () => {
    //     const inPairs = await createKeys(sdk, 5);
    //     const {keyvalues} = await sdk.txKeyValues(defaultGasParams());
    //     expect(keyvalues).to.have.length(5);
    //     inPairs.keys.forEach((key, idx) => {
    //         expect(keyvalues.find((p: any) => p.key === key)?.value).to.equal(inPairs.values[idx]);
    //     })
    // });
});
