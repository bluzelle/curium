import {createKeys, DEFAULT_TIMEOUT, defaultGasParams, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API';
import {expect} from "chai";

describe('keyValues()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should work with empty values', async () => {
        await bz.withTransaction(() => {
            bz.create('key1', 'value1', defaultGasParams());
            bz.create('key2', '', defaultGasParams());
        });
        expect(await bz.keyValues()).to.deep.equal([{
            key: 'key1',
            value: 'value1'
        }, {
            key: 'key2',
            value: ''
        }])
    })

    it('should be able to store json', async () => {
        await bz.create('myKey', JSON.stringify({foo: 10}), defaultGasParams());
        const value = await bz.keyValues()
            .then(keyvalues => keyvalues[0].value)
            .then(JSON.parse);
        expect(value).to.deep.equal({foo: 10});
    })

    it('should return an empty array if there are no keys', async () => {
        expect(await bz.keyValues()).to.have.length(0);
    })

    it('should return keys and values', async () => {
        const count = 5;
        const inPairs: {keys: string[], values: string[]} = await createKeys(bz, count);

        const expectedResults = inPairs.keys.reduce((memo: any[], key, idx) => {
            memo.push({key, value: inPairs.values[idx]})
            return memo
        }, [])

        expect(await bz.keyValues()).to.deep.equal(expectedResults);

    });
});


