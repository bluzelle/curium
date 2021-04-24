import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {expect} from "chai";
import {API} from '../../../src/legacyAdapter/API';

describe('count()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return 0 if no keys', async () => {
        expect(await bz.count()).to.equal(0);
    });

    it('should return the number of keys', async () => {
        const {keys} = await createKeys(bz, 5);
        expect(await bz.count()).to.equal(5);
        await bz.delete(keys[0], defaultGasParams());
        expect(await bz.count()).to.equal(4);
    });
});
