import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";


describe('rename()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    it('should rename a key', async () => {
        bz = await sentryWithClient();
        await bz.withTransaction(() => {
            bz.create('keyBefore', 'value', defaultGasParams());
            bz.rename('keyBefore', 'keyAfter', defaultGasParams());

        })
            .then(() => bz.txKeys(defaultGasParams()))
            .then((results) => expect(results.keys).to.contain('keyAfter'));

    });
});


