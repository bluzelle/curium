import {expect} from 'chai'
import {sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";

describe('version()', function() {
    this.timeout(DEFAULT_TIMEOUT);

    it('should return a version', async () => {
        const bz = await sentryWithClient();
        expect(await bz.version()).to.match(/^.*-.*-.*$/);
    });
});