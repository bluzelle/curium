import {API} from '../../../src/legacyAdapter/API'
import {DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {expect} from 'chai'
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node'

describe('generateBIP39Account()', function()  {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should generate a new mnemonic if not given entropy', async () => {
        const mnemonic = await bz.generateBIP39Account();
        expect(mnemonic.split(' ')).to.have.length(24);
    })

    it('should generate the same mnemonic if provided with entropy', () => {
        expect(bz.generateBIP39Account('56a41de798de7899ae98776fb781209c4fe34ad64317c7835ae69134fe671a6f')).to.equal('find can ketchup coyote travel error risk auction hurry rose else decade wreck pistol flip glass shy bracket rifle carbon exit crime have unfair')
    })

    it('should throw an error if entropy is the wrong length', () => {
        expect(() => bz.generateBIP39Account('5648883')).to.throw(Error, 'Entropy must be 64 char hex')
    })

    it('should generate a valid account', async () => {
        const b = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            endpoint: bz.url,
            uuid: bz.uuid
        })
        await bz.transferTokensTo(b.getAddress(), 1000, defaultGasParams());
        await b.create('foo', 'bar', defaultGasParams());
        expect(await b.read('foo')).to.equal('bar');
    })
})
