import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";


describe('has()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return false if the key does not exist', async () => {
        expect(await bz.has('someKey')).to.be.false;
    });

    it('should return true if key exists', async () => {
        await bz.create('someKey', 'someValue', defaultGasParams());
        expect(await bz.has('someKey')).to.be.true;
    });

    it('should work with an empty value', async () => {
        await bz.create('key', '', defaultGasParams());
        expect(await bz.has('key')).to.be.true
    })
});



