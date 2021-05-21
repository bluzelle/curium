import {expect} from "chai";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {bluzelle, BluzelleSdk, DbSdk, newMnemonic} from "../../src/bz-sdk/bz-sdk";
import {
    createKeys,
    defaultLease,
    getSdk, newSdkClient,
    zeroLease
} from "../helpers/client-helpers/sdk-helpers";
import Long from 'long'
import delay from "delay";
import {curiumd} from "../helpers/cli-helpers/curiumd-helpers";


describe('q.Keys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should return a empty list if there are no keys', async () => {
        await sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid,
            key: 'aven',
            value: new TextEncoder().encode('dauz'),
            lease: defaultLease,
            metadata: new Uint8Array()
        })
        expect(await curiumd(`q crud ${uuid}`)).to.equal('[aven]')
    });
});