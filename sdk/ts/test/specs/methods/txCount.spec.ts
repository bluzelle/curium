import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API';
import {expect} from "chai";

describe('txCount()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return 0 if no keys', async () => {
        expect(await bz.txCount(defaultGasParams()).then(x => x.count)).to.equal(0);
    });

    it('should work with empty values', async () => {
        await bz.withTransaction(() => {
            bz.create('key1', 'value1', defaultGasParams());
            bz.create('key2', '', defaultGasParams());
        });
        expect(await bz.txCount(defaultGasParams())).to.have.property('count', 2);
    })

    it('should return the number of keys', async () => {
        const {keys} = await createKeys(bz, 5);
        expect(await bz.txCount(defaultGasParams()).then(x => x.count)).to.equal(5);
        await bz.delete(keys[0], defaultGasParams());
        expect(await bz.txCount(defaultGasParams()).then(x => x.count)).to.equal(4);
    });
});
