import {expect} from 'chai'
import {API, bluzelle} from "bluzelle";
import {deleteSources} from "../source-utils";
import {getBzClient} from "../bluzelle-client";

describe('add-source functions', function()  {
    this.timeout(10000);
    let bz: API
    beforeEach(() => {
        bz = getBzClient();
        return deleteSources(bz);
    });

    it('should add sources', () => {
        return bz.sendMessage({
            type: 'oracle/MsgOracleAddSource',
            value: {
                Name: 'my-source',
                Url: 'my-url',
                Property: 'my-property',
                Owner: bz.address
            }
        }, {gas_price: 0.002, max_gas: 10000000})
            .then(() => bz.abciQuery<any>('custom/oracle/listsources'))
            .then(sources => {
                expect(sources.result).to.have.length(1);
                expect(sources.result[0].name).to.equal('my-source');
            });
    });
});

