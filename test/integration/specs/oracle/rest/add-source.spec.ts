import {expect} from 'chai'
import {API, bluzelle} from "bluzelle";
import {deleteSources} from "../oracle-utils";
import {getBzClient} from "../../../helpers/bluzelle-client";
import {feedSources} from "../sources";
import {listOracleSources, addOracleSource} from 'oracle-js'

describe('add-source functions', function()  {
    this.timeout(10000);
    let bz: API

    beforeEach(() => bz = getBzClient());
    beforeEach(() => deleteSources(bz));

    it('should add sources', () => {
        return addOracleSource(bz, {Name: 'my-source', Url: 'my-url', Property: 'my-property'}, {gas_price: 0.002})
            .then(() => listOracleSources(bz))
            .then(sources => {
                expect(sources).to.have.length(1);
                expect(sources[0].Name).to.equal('my-source');
            });
    });

    it('should be able to add a source', async () => {
        await addOracleSource(
            bz,
            {
                Name: feedSources[0].name,
                Url: feedSources[0].url,
                Property: feedSources[0].property,
            },
            {gas_price: 0.002}
        )

        await listOracleSources(bz)
            .then(sources => expect(sources).to.deep.equal([{
                Name: "binance-eth-in-usdt",
                Url: "https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT",
                Property: "price",
                Owner: "bluzelle1ws42h2gjr6q8u5d2teexhrzz9xr9lqrxru50u2"
            }]));

    });

});

