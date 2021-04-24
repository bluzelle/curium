import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {bluzelle, mnemonicToAddress} from '../../../src/legacyAdapter/bluzelle-node'
import {API} from '../../../src/legacyAdapter/API'
import {expect} from 'chai'

describe('getBNT()', function() {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;
    let newAccount: API

    beforeEach(async () => {
        bz = await sentryWithClient();
        newAccount = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            uuid: bz.uuid,
            endpoint: bz.url
        })
    });

    it('should return 0 if account has not been funded', async () => {
        expect(await newAccount.getBNT()).to.equal(0);
    })

    it('should return the amount of BNT in an account', async () => {
        await bz.transferTokensTo(newAccount.address, 10, defaultGasParams());
        expect(await newAccount.getBNT()).to.equal(10);
    })

    it('should return the right amount for ubnt', async () => {
        await bz.transferTokensTo(newAccount.address, 10, defaultGasParams(), {ubnt: true})
        expect(await newAccount.getBNT()).to.equal(0);
        expect(await newAccount.getBNT({ubnt: true})).to.equal(10);
    });

    it('should return the account information of the passed address', async () => {
        const a = await mnemonicToAddress(bz.generateBIP39Account());
        return bz.transferTokensTo(a, 1000, defaultGasParams())
            .then(() => Promise.all([bz.getBNT(), bz.getBNT({address: a})]))
            .then(([a1, a2]) => {
                expect(a1).to.be.greaterThan(1000);
                expect(a2).to.equal(1000);
            });
    });


})