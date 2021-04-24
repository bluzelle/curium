import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from "../../../src/legacyAdapter/API";
import {expect} from "chai";

describe('renewLease', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should increase the lease time in days', async () => {
        await bz.create('myKey', 'myValue', defaultGasParams(), {days: 1});
        expect(await bz.getLease('myKey')).to.be.closeTo(86400, 12);
        await bz.renewLease('myKey', defaultGasParams(), {days: 2});
        expect(await bz.getLease('myKey')).to.be.closeTo(172800, 12);
    });

    it('should reduce the lease time', async () => {
        await bz.create('myKey', 'myValue', defaultGasParams(), {seconds: 10000});
        expect(await bz.getLease('myKey')).to.be.closeTo(10000, 12);
        await bz.renewLease('myKey', defaultGasParams(), {seconds: 100});
        expect(await bz.getLease('myKey')).to.be.closeTo(100, 12);
    });
});
