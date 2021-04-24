import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from "../../../src/legacyAdapter/API";
import {expect} from 'chai'

describe('txGetNShortestLeases', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it.skip('should return the first 2 shortest leases', async () => {
        await Promise.all([
            bz.create('key1', 'value', defaultGasParams(), {days: 1}),
            bz.create('key2', 'value', defaultGasParams(), {hours: 1}),
            bz.create('key4', 'value', defaultGasParams(), {seconds: 30}),
            bz.create('key3', 'value', defaultGasParams(), {minutes: 1})
        ]);

        const result = await bz.txGetNShortestLeases(2, defaultGasParams());
        expect(result.leases[0].key).to.equal('key4');
        expect(result.leases[0].lease).to.be.closeTo(30, 12);
        expect(result.leases[1].key).to.equal('key3');
        expect(result.leases[1].lease).to.be.closeTo(60, 12);
    })
});