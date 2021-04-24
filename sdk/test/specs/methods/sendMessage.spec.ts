import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API'
import {expect} from 'chai'


describe('sendMessage()', function() {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should send a message', async () => {
        await bz.create('foo', 'bar', defaultGasParams());
        const response: any = await bz.sendMessage({
            type: 'crud/read',
            value: {
                Key: 'foo',
                UUID: bz.uuid,
                Owner: bz.address
            }
        }, defaultGasParams())
        expect(response.data[0].value).to.equal('bar');
    })
})