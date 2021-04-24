import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";


describe('txHas()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });



    it('should return false if the key does not exist', async () => {
        expect(await bz.txHas('someKey', defaultGasParams())).to.have.property('has', false);
    });

    it('should return true if key exists', async () => {
        await bz.create('someKey', 'someValue', defaultGasParams());
        expect(await bz.txHas('someKey', defaultGasParams())).to.have.property('has', true);
    });
});



