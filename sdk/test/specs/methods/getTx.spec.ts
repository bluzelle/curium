import {defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API'
import {expect} from 'chai'

describe('getTx()', () => {
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return transaction info', async () => {
        return bz.create('foo', 'bar', defaultGasParams())
            .then(x => x.txhash)
            .then(bz.getTx.bind(bz))
            .then((x: any) => x.tx.value.msg[0].value)
            .then(tx => {
                expect(tx.UUID).to.equal('uuid');
                expect(tx.Key).to.equal('foo');
                expect(tx.Value).to.equal('bar');
            });
    });

})
