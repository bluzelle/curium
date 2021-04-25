import {DEFAULT_TIMEOUT, sentryWithClient, defaultGasParams} from "../../helpers/client-helpers/client-helpers";
import {API} from "../../../src/legacyAdapter/API";
import {expect} from 'chai'

describe('getNShortestLeases', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return the first 2 shortest leases', async () => {
        await Promise.all([
             bz.create('key1', 'value', defaultGasParams(), {days: 1}),
             bz.create('key2', 'value', defaultGasParams(), {hours: 1}),
             bz.create('key4', 'value', defaultGasParams(), {seconds: 30}),
             bz.create('key3', 'value', defaultGasParams(), {minutes: 1})
        ]);
        const result = await bz.getNShortestLeases(2);

        expect(result.find(({key}) => key === 'key3')?.lease).to.be.closeTo(60, 12);
        expect(result.find(({key}) => key === 'key4')?.lease).to.be.closeTo(30, 12);
    })
});