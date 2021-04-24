import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {API} from '../../../src/legacyAdapter/API'
import {expect} from 'chai'

describe('abciQuery()', function () {
    this.timeout(DEFAULT_TIMEOUT);
    var bz: API

        beforeEach(() => sentryWithClient().then(x => bz = x))

    it('should send a abci query', async () => {
        return bz.abciQuery<any>('custom/acc/account', {
            Address: bz.address
        })
            .then(({result}) => {
                bz.getBNT({ubnt: true})
                    .then(value => {
                        expect(result.value.coins[0].amount).to.equal(value.toString())
                    })
            })
    });

    it('should return an error for a bad path', async () => {
        let caught: any;
        await bz.abciQuery<any>('fake/path')
            .catch((e: Error) => caught = e)
        expect(caught.status).to.equal(400);
        expect(caught.error).to.match(/unknown query path/)
    });

    it('should return any errors', async () => {
        let caught: any;
        await bz.abciQuery<any>('custom/acc/account', {
            Address: 'bluzelle1ws42h2gjr6q8u5d2teexhrzz9xr9lqrxru50u5'
        })
            .catch((e: Error) => caught = e)
        expect(caught.status).to.equal(400)
    });

});
