import {expect} from 'chai'
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node';
import {API} from '../../../src/legacyAdapter/API'
import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {useChaiAsPromised} from "testing/lib/globalHelpers";


describe('read()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
    });

    it('should immediately retrieve a value from the store', async () => {
        await bz.withTransaction(() => {
            bz.create('myKey', 'myvalue', defaultGasParams());
            bz.create('myKey2', 'myvalue2', defaultGasParams());
            bz.create('myKey3', 'myvalue3', defaultGasParams());
            bz.create('myKey4', 'myvalue4', defaultGasParams());
        });

        expect(await bz.read('myKey2')).to.equal('myvalue2');
        expect(await bz.read('myKey3')).to.equal('myvalue3');
        expect(await bz.read('myKey4')).to.equal('myvalue4');
    });

    it('should throw an error if key does not exist', async () => {
        await expect(bz.read('noKey')).to.be.rejectedWith(Error, /key not found/);
    });

    it('should handle parallel reads', async () => {
        const {keys, values} = await createKeys(bz, 5);
        expect(await Promise.all(keys.map(key => bz.read(key)))).to.deep.equal(values);
    });

    describe('pread', () => {
        it('should retrieve a value from the store', async () => {
            await bz.create('myKey', 'myvalue', defaultGasParams());
            expect(await bz.read('myKey', true)).to.equal('myvalue');
        });

        it('should throw an error if key does not exist', async () => {
            await expect(bz.read('noKey', true)).to.be.rejectedWith(Error, /key not found/);
        });

        it('should handle parallel reads', async () => {
            const {keys, values} = await createKeys(bz, 5);
            expect(await Promise.all(keys.map(key => bz.read(key, true)))).to.deep.equal(values);
        });

    })

    it('should work when the account has no transactions', async () => {
        const bz2 = bluzelle({
            mnemonic: bz.generateBIP39Account(),
            uuid: bz.uuid,
            endpoint: bz.url
        });
        await bz.create('foo', 'bar', defaultGasParams());
        expect(await bz2.read('foo')).to.equal('bar');
    })

    it('should work when there is no mnemonic', async () => {
        const bz2 = bluzelle({
            mnemonic: '',
            uuid: bz.uuid,
            endpoint: bz.url
        })
        await bz.create('foo', 'bar', defaultGasParams());
        expect(await bz2.read('foo')).to.equal('bar');
    })
});


