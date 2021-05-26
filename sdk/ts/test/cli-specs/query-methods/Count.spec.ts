import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {getSdk, createKeys, parseJSONCliStdout} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {curiumd} from "../../helpers/cli-helpers/curiumd-helpers";

describe('q crud count', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string

    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should return 0 if no keys', () => {
        return curiumd(`q crud count ${uuid} -o json`)
            .then(parseJSONCliStdout)
            .then(({count}) => expect(count).to.equal(0))

    });

    it('should return the number of keys', async () => {
        const {keys} = await createKeys(sdk.db, 5, uuid);

        await curiumd(`q crud count ${uuid} -o json`)
            .then(parseJSONCliStdout)
            .then(({count}) => expect(count).to.equal(5))

        await sdk.db.tx.Delete({
            creator: sdk.db.address,
            uuid,
            key: keys[0]
        });

        await curiumd(`q crud count ${uuid} -o json`)
            .then(parseJSONCliStdout)
            .then(({count}) => expect(count).to.equal(4))
    });
});
