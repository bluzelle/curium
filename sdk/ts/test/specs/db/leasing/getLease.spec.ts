import {DEFAULT_TIMEOUT, sentryWithClient} from "../../../helpers/client-helpers/client-helpers";
import {API} from "../../../../src/legacyAdapter/API";
import {expect} from 'chai'
import delay from "delay";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {defaultLease} from "../../../helpers/client-helpers/sdk-helpers";

describe('getLease', function () {
    this.timeout(DEFAULT_TIMEOUT);

    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
    });

    it('should throw exception if key does not exist', async () => {
        await expect(bz.getLease('myKey4')).to.be.rejectedWith(/key not found/);
    })

    it('should return the lease time left', async () => {
        await bz.create('myKey11', 'myValue', {seconds: 30, minutes: 0, days: 0, hours: 0, years: 0});
        await delay(20000);
        expect(await bz.getLease('myKey11')).to.be.lessThan(20);
    })

});