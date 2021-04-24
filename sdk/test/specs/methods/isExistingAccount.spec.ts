import {DEFAULT_TIMEOUT, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API'
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node'
import {expect} from 'chai'

describe('isExistingAccount()', function()  {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return true for an account that has transactions on the blockchain', async () => {
        expect(await bz.isExistingAccount()).to.be.true
    })

    it('should return false for an account that has no transactions in the blockchain', async () => {
        const bz2 = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            uuid: bz.uuid,
            endpoint: bz.url
        });
        expect(await bz2.isExistingAccount()).to.be.false
    })
})