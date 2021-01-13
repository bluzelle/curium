import {expect} from 'chai'
import {API, bluzelle} from "bluzelle";

describe('add-source functions', () => {
    let bz: API
    beforeEach(() => {
        bz = bluzelle({
            mnemonic: 'bone soup garage safe hotel remove rebuild tumble usage marriage skin opinion banana scene focus obtain very soap vocal print symptom winter update hundred',
            endpoint: 'http://localhost:1317',
            uuid: 'uuid'
        });
        return deleteSources(bz);
    });

    it('should work', () => {
        return bz.sendMessage({
            type: 'oracle/addsource',
            value: {
                Name: 'my-source',
                Url: 'my-url',
                Property: 'my-property',
                Owner: bz.address
            }
        }, {gas_price: 0.002, max_gas: 10000000})
            .then(() => bz.query('oracle/listsources'))
            .then(sources => {
                expect(sources).to.have.length(1);
                expect(sources[0].name).to.equal('my-source');
            });
    });


});

const deleteSources = (bz: API) =>
    bz.query('oracle/listsources')
        .then((sources: any[]) => bz.withTransaction(() =>
                Promise.all(sources.map(source => deleteSource(bz, source.name)))
            )
        )

const deleteSource = (bz: API, name: string): Promise<any> =>
    bz.sendMessage({
        type: 'oracle/deletesource',
        value: {
            Name: name,
            Owner: bz.address
        }
    }, {gas_price: 0.002, max_gas: 10000000});

