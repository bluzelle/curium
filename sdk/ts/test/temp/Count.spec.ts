import {expect} from "chai";
import {BluzelleSdk} from "../../src/bz-sdk/bz-sdk";
import {getSdk, createKeys} from "../helpers/client-helpers/sdk-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('tx.Count()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let sdk: BluzelleSdk;
    let uuid: string

    beforeEach(() => {
        useChaiAsPromised();
        return getSdk("phrase lonely draw rubber either tuna harbor route decline burger inquiry aisle scrub south style chronic trouble biology coil defy fashion warfare blanket shuffle")
            .then(newSdk => sdk = newSdk)
            .then(() => uuid = Date.now().toString())
    });

    it('should return 0 if no keys', async () => {
        expect(await sdk.db.tx.Count({
            creator: sdk.db.address,
            uuid
        }).then(resp => resp.count)).to.equal(0);
    });

    it('should return the number of keys', async () => {
        const {keys} = await createKeys(sdk.db, 5, uuid);

        expect(await sdk.db.q.Count({
            uuid
        }).then(resp => resp.count)).to.equal(5);

        await sdk.db.tx.Delete({
            creator: sdk.db.address,
            uuid,
            key: keys[0]
        });

        expect(await sdk.db.q.Count({
            uuid
        }).then(resp => resp.count)).to.equal(4);
    });
});
