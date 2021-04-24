import {APIAndSwarm, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";
import {expect} from 'chai'
import {API, bluzelle} from '../../../lib/bluzelle-node'

describe('transferTokensTo', function()  {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: APIAndSwarm ;
    let otherUser: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
        otherUser = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            endpoint: bz.url,
            uuid: bz.uuid
        })
    });

    it('should transfer tokens to another account', async () => {
        await bz.transferTokensTo(otherUser.address, 1, defaultGasParams())
        expect(await otherUser.getBNT()).to.equal(1);

        await bz.transferTokensTo(otherUser.address, 1000, defaultGasParams())
        expect(await otherUser.getBNT()).to.equal(1001);
    })

    it('should transfer ubnt if the ubnt option is true', async () => {
        await bz.transferTokensTo(otherUser.address, 10, defaultGasParams(), {ubnt: true})
        expect(await otherUser.getBNT()).to.equal(0);
        expect(await otherUser.getBNT({ubnt: true})).to.equal(10)
    })
})