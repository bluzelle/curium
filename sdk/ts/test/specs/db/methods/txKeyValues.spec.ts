import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API';
import {expect} from "chai";

describe('txKeyValues()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should be able to handle empty values', async () => {
        await bz.withTransaction(() => {
            bz.create('key1', 'value1', defaultGasParams());
                bz.create('key2', '', defaultGasParams());
        });
        expect(await bz.txKeyValues(defaultGasParams()).then(x => x.keyvalues))
            .to.deep.equal([{
            key: 'key1',
            value: 'value1'
        }, {
            key: 'key2',
            value: ''
        }])
    })

    it('should be able to store json', async () => {
        await bz.create('myKey', JSON.stringify({foo: 10}), defaultGasParams());
        const value = await bz.txKeyValues(defaultGasParams())
            .then(({keyvalues}) => keyvalues[0].value)
            .then(JSON.parse);
        expect(value).to.deep.equal({foo: 10});
    })


    it('should return an empty array if there are no keys', async () => {
        const {keyvalues} = await bz.txKeyValues(defaultGasParams());
        expect(keyvalues).to.have.length(0);
    })

    it('should return keys and values', async () => {
        const inPairs = await createKeys(bz, 5);
        const {keyvalues} = await bz.txKeyValues(defaultGasParams());
        expect(keyvalues).to.have.length(5);
        inPairs.keys.forEach((key, idx) => {
            expect(keyvalues.find((p: any) => p.key === key)?.value).to.equal(inPairs.values[idx]);
        })
    });
});
