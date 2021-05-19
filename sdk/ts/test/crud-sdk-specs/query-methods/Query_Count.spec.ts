import {expect} from "chai";
import {BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
import {getSdk, createKeys} from "../../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";

describe('count()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string

    beforeEach(async () => {
        sdk = await getSdk();
        uuid = Date.now().toString()
    });

    it('should return 0 if no keys', async () => {
        expect(await sdk.db.q.Count({
            address: sdk.db.address,
            uuid
        }).then(resp => resp.count.toInt())).to.equal(0);
    });

    it('should return the number of keys', async () => {
        const {keys} = await createKeys(sdk.db, 5, uuid);

        expect(await sdk.db.q.Count({
            address: sdk.db.address,
            uuid
        }).then(resp => resp.count.toInt())).to.equal(5);

        await sdk.db.tx.Delete({
            creator: sdk.db.address,
            uuid,
            key: keys[0]
        });

        expect(await sdk.db.q.Count({
            address: sdk.db.address,
            uuid
        }).then(resp => resp.count.toInt())).to.equal(4);
    });
});
