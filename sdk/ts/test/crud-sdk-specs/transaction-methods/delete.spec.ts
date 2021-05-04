import {decodeData, DEFAULT_TIMEOUT, encodeData, getSdk} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from "chai";
import {Lease} from "../../../src/codec/crud/lease";
import {createKeys, defaultGasParams} from "../../helpers/client-helpers/client-helpers";

describe('sdk.tx.Delete()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: DbSdk;

    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk().then(client => sdk = client.db);
    });

    // it('should resolve to chain information', async () => {
    //     await bz.create('myKey', 'someValue', defaultGasParams());
    //     const result = await bz.delete('myKey', defaultGasParams())
    //     expect(result.txhash).to.be.a('string');
    //     expect(result.height).to.be.a('number');
    // });

    it('should delete a key in the database', async () => {
        await sdk.tx.Create({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKeys',
            value: new TextEncoder().encode('myValue'),
            lease: {days: 10} as Lease,
            metadata: new Uint8Array()
        });
        expect(await sdk.tx.Read({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKeys'
        }).then(resp => resp.value).then(decodeData)).to.equal('myValue');
        await sdk.tx.Delete({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKeys'
        });
        await expect(sdk.tx.Delete({
            creator: sdk.address,
            uuid: 'uuid',
            key: 'myKeys'
        })).to.be.rejectedWith( /key not found/);
    });

    // it('should be able to delete an empty value', async () => {
    //     await sdk.tx.Create({
    //         creator: sdk.address,
    //         uuid: 'uuid',
    //         key: 'emptyValue',
    //         value: encodeData(''),
    //         lease: {days: 10} as Lease,
    //         metadata: new Uint8Array()});
    //
    //     expect(await bz.has('key')).to.be.true;
    //     await bz.delete('key', defaultGasParams());
    //     expect(await bz.has('key')).to.be.false;
    // })
//
//     it('should throw an error if a key does not exist', async () => {
//         expect(
//             await bz.delete('noKey', defaultGasParams()).catch(e => e)
//         ).to.match(/Key does not exist/);
//     });
//
//     it('should handle parallel deletes', async () => {
//         const {keys} = await createKeys(bz, 5);
//         await Promise.all(keys.map(key => bz.delete(key, defaultGasParams())));
//         expect(await bz.keys()).to.have.length(0);
//     })
// });
});