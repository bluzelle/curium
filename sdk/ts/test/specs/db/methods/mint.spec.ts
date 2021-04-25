import {defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {expect} from 'chai'
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {mnemonicToAddress, bluzelle} from '../../../src/legacyAdapter/bluzelle-node'

describe('mint()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    it('should mint tokens into provided account', async () => {
        const bz = await sentryWithClient();
        const newMnemonic = bz.generateBIP39Account();
        const newAccount = {
            mnemonic: newMnemonic,
            address: mnemonicToAddress(newMnemonic)
        };
        await bz.mint(newAccount.address, defaultGasParams());
        const bz2 = bluzelle({
            mnemonic: newAccount.mnemonic,
            endpoint: bz.url,
            uuid: bz.uuid
        });
        expect(await bz2.getBNT()).to.equal(2000);
    });
});