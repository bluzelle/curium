import {
    decodeData,
    DEFAULT_TIMEOUT,
    defaultLease,
    encodeData,
    getSdk,
    newSdkClient, parseJSONCliStdout
} from "../../helpers/client-helpers/sdk-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {BluzelleSdk, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {expect} from "chai";
import {Lease} from "../../../src/codec/crud/lease";
import {createKeys} from "../../helpers/client-helpers/sdk-helpers";
import {defaultRegistryTypes} from "@cosmjs/stargate";
import {curiumd} from "../../helpers/cli-helpers/curiumd-helpers";

describe('tx.Delete()', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        useChaiAsPromised();
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    // it('should resolve to chain information', async () => {
    //     await bz.create('myKey', 'someValue', defaultGasParams());
    //     const result = await bz.delete('myKey', defaultGasParams())
    //     expect(result.txhash).to.be.a('string');
    //     expect(result.height).to.be.a('number');
    // });

    it('should delete a key in the database', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'myKey',
            value: new TextEncoder().encode('myValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })

            .then(() => curiumd(`tx crud delete ${uuid} myKey --from ${sdk.db.address} --fees 500ubnt -y`))
            .then(() => expect(sdk.db.tx.Read({
                creator: sdk.db.address,
                uuid,
                key: 'myKey'
            })).to.be.rejectedWith(/key not found/))
    });

    it('should be able to delete an empty value', () => {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'emptyKey',
            value: new TextEncoder().encode(''),
            lease: defaultLease,
            metadata: new Uint8Array()
        })

            .then(() => curiumd(`tx crud delete ${uuid} emptyKey --from ${sdk.db.address} --fees 500ubnt -y`))
            .then(() => expect(sdk.db.tx.Read({
                creator: sdk.db.address,
                uuid,
                key: 'emptyKey'
            })).to.be.rejectedWith(/key not found/))

    })

    it('should throw an error if a key does not exist',  () => {
        return curiumd(`tx crud delete ${uuid} nonExistentKey --from ${sdk.db.address} --fees 500ubnt -y`)
            .then(parseJSONCliStdout)
            .then(out => expect(out.raw_log).to.match(/key not found/))
    });

    it("should only be able to delete someone else's key-value", async () => {

        const otherSdk = await newSdkClient(sdk);

        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'myKey',
            value: encodeData('myValue'),
            lease: defaultLease,
            metadata: new Uint8Array()
        });

        expect(await curiumd(`tx crud delete ${uuid} myKey --from sync --fees 500ubnt -y`)
            .then(parseJSONCliStdout)
            .then(obj => obj.raw_log)).to.match(/incorrect owner/)

    });
});