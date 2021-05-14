import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API';
import {expect} from "chai";
import {useChaiAsPromised} from "testing/lib/globalHelpers";

describe('multiUpdate()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
        useChaiAsPromised();
    });

    it('should throw an error if a key does not exist', async () => {
        expect(
            await bz.multiUpdate([{key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'}], defaultGasParams()).catch(e => e.error)
        ).to.match(/Key does not exist/);
    })

    it('should work with empty values', async () => {
        await bz.withTransaction(() => {
            bz.create('key1', 'xx', defaultGasParams());
            bz.create('key2', 'xx', defaultGasParams());
        });
        await bz.multiUpdate([{key: 'key1', value: 'value1'}, {key: 'key2', value: ''}], defaultGasParams())
        expect(await bz.read('key1')).to.equal('value1');
        expect(await bz.read('key2')).to.equal('');
    })

    it('should not update any keys if one of the keys fail', async () => {
        await bz.create('key1', 'value1', defaultGasParams());
        expect(await bz.read('key1')).to.equal('value1');
        expect(
            await bz.multiUpdate([{key: 'key1', value: 'newVal'}, {key: 'key2', value: 'newVal'}], defaultGasParams()).catch(e => e.error)
        )
        expect(await bz.read('key1')).to.equal('value1');
    })

    it('should update a value in the store', async () => {
        await bz.create('key', 'value', defaultGasParams());
        await bz.multiUpdate([{key: 'key', value: 'newValue'}], defaultGasParams())
        expect(await bz.read('key')).to.equal('newValue');
    })

    it('should update multiple values in a store', async () => {
        const {keys, values} = await createKeys(bz, 3);
        await bz.multiUpdate([{
            key: keys[0], value: 'newValue1'
        },{
            key: keys[2], value: 'newValue2'
        }], defaultGasParams())
        expect(await bz.read(keys[0])).to.equal('newValue1');
        expect(await bz.read(keys[1])).to.equal(values[1]);
        expect(await bz.read(keys[2])).to.equal('newValue2');
    })
});

