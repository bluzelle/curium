import {expect} from 'chai'
import {API} from '../../../src/legacyAdapter/API';
import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";

describe('read()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should send a query to Curium', () => {
        return bz.create('foo', 'bar', defaultGasParams())
            .then(() => bz.query<{value: string}>('crud/read/uuid/foo'))
            .then(({value}) => expect(value).to.equal('bar'));
    });

});


