import {expect} from "chai";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {bluzelle, BluzelleSdk, DbSdk, newMnemonic} from "../../../src/bz-sdk/bz-sdk";
import {
    createKeys,
    defaultLease,
    getSdk, newSdkClient, parseJSONCliStdout,
    zeroLease
} from "../../helpers/client-helpers/sdk-helpers";
import Long from 'long'
import delay from "delay";
import {curiumd, execute} from "../../helpers/cli-helpers/curiumd-helpers";



describe('q.Keys()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string;
    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should return a empty list if there are no keys', () => {
        return curiumd(`q crud keys ${uuid} -o json`)
            .then(parseJSONCliStdout)
            .then(({keys}) => expect(keys).to.have.length(0))

    });
    it('should return a list of keys in the uuid',  async () => {
        const {keys} = await createKeys(sdk.db, 5, uuid)
        const Keys = keys

        await curiumd(`q crud keys ${uuid} -o json`)
            .then(parseJSONCliStdout)
            .then(({keys}) => expect(keys).to.deep.equal(Keys))
    });
});