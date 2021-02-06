import {expect} from 'chai'
import {API, bluzelle} from "bluzelle";
import {addSource, deleteSources, listSources} from "../oracle-utils";
import {getBzClient} from "../bluzelle-client";
import {feedSources} from "../sources";

describe('add-source functions', function()  {
    this.timeout(10000);
    let bz: API

    beforeEach(() => bz = getBzClient());
    beforeEach(() => deleteSources(bz));

    it('should add sources', () => {
        return addSource(bz, 'my-source', 'my-url', 'my-property', bz.address)
            .then(() => listSources(bz))
            .then(sources => {
                expect(sources).to.have.length(1);
                expect(sources[0].name).to.equal('my-source');
            });
    });

    it('should be able to add a source', async () => {
        await addSource(
            bz,
            feedSources[0].name,
            feedSources[0].url,
            feedSources[0].property,
            bz.address
        )

        await listSources(bz)
            .then(sources => expect(sources).to.deep.equal([{
                name: "binance-eth-in-usdt",
                url: "https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT",
                property: "price",
                owner: "bluzelle1ws42h2gjr6q8u5d2teexhrzz9xr9lqrxru50u2"
            }]));

    });

});

