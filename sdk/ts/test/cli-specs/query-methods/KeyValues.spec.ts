import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import Long from 'long'
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from 'chai'
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {defaultLease, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {curiumd} from "../../helpers/cli-helpers/curiumd-helpers";
import {QueryKeyValuesResponse} from "../../../src/codec/crud/query";
describe('tx.KeyValues()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string

    beforeEach(async () => {
        useChaiAsPromised()
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should be able to handle empty values', async () => {
        await sdk.db.withTransaction(() => {
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid,
                key: 'key1',
                value: encodeData('value1'),
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

        await curiumd(`q crud keyValues ${uuid} -o json`)
            .then(({stdout}) => JSON.parse(stdout))
            .then((obj: any) => obj.keyValues[0])
            .then(kv => Buffer.from(kv.value, 'base64').toString())
    })

    // it('should return an empty array if there are no keys', async () => {
    //     expect(await sdk.db.q.KeyValues({
    //         uuid,
    //     }).then(resp => resp.keyValues)).to.have.length(0);
    // })
    //
    // it('should allow other users to read keyvalues', async () => {
    //     const otherSdk = await newSdkClient(sdk);
    //
    //     const {keys, values} = await createKeys(sdk.db, 3, uuid);
    //
    //     expect(await otherSdk.db.q.KeyValues({
    //         uuid
    //     }).then(resp => resp.keyValues)).to.deep.equal([
    //         {key: keys[0], value: encodeData(values[0])},
    //         {key: keys[1], value: encodeData(values[1])},
    //         {key: keys[2], value: encodeData(values[2])}
    //     ])
    // });
    //
    // it('should paginate keyValues correctly', async () => {
    //
    //     await sdk.db.tx.Create({
    //         creator: sdk.db.address,
    //         uuid,
    //         key: 'A',
    //         value: encodeData('valueA'),
    //         lease: defaultLease,
    //         metadata: new Uint8Array()
    //     });
    //     await sdk.db.tx.Create({
    //         creator: sdk.db.address,
    //         uuid,
    //         key: 'B',
    //         value: new TextEncoder().encode('valueB'),
    //         lease: defaultLease,
    //         metadata: new Uint8Array()
    //     });
    //     await sdk.db.tx.Create({
    //         creator: sdk.db.address,
    //         uuid,
    //         key: 'C',
    //         value: new TextEncoder().encode('valueC'),
    //         lease: defaultLease,
    //         metadata: new Uint8Array()
    //     });
    //
    //     const response = await sdk.db.q.KeyValues({
    //         uuid,
    //         pagination: {
    //             startKey: 'A',
    //             limit: Long.fromInt(2)
    //         }
    //     });
    //
    //     await expect(response.keyValues).to.deep.equal([{
    //         key: 'A',
    //         value: encodeData('valueA')
    //     }, {
    //         key: 'B',
    //         value: encodeData('valueB')
    //     }]);
    //
    //     await expect(response.pagination?.nextKey).to.equal('C')
    // })
});
