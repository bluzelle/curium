import {defaultGasParams, sentryWithClient} from "../../../helpers/client-helpers/client-helpers";
import {expect} from 'chai'
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {API} from '../../../../src/legacyAdapter/API'


describe('account()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    var bz: API

    beforeEach(() => sentryWithClient().then(x => bz = x))

    it('should return account information', async () => {
        const account = await bz.account();
        //console.log(account);
        expect(account.address).to.match(/bluzelle/);
        expect(account.address.length).to.be.greaterThan(20);
        expect(account.coins).to.have.length(1);
        expect(account.coins[0].denom).to.equal('ubnt');
        expect(account.account_number).to.be.a('string');
        expect(account.sequence).to.be.a('string');

    })

    // it('should return the account information of the passed address', () => {
    //     const a = mnemonicToAddress(bz.generateBIP39Account());
    //     return bz.transferTokensTo(a, 1000, defaultGasParams())
    //         .then(() => Promise.all([bz.account(), bz.account(a)]))
    //         .then(([a1, a2]) => {
    //             expect(a1.address).to.equal(bz.address);
    //             expect(a2.address).to.equal(a);
    //             expect(a2.address).not.to.equal(bz.address);
    //             expect(a1.address).not.to.equal(a)
    //         });
    // });
});