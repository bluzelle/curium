import {sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {expect} from "chai";
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {API} from '../../../src/legacyAdapter/API'

describe('setMaxMessagesPerTransaction()', function()  {

    this.timeout(DEFAULT_TIMEOUT);
    let bz: API;

    beforeEach(async () => {
        bz = await sentryWithClient();
    });

    it('should return the tax info', async () => {
        bz.taxInfo()
            .then(taxInfo => {
                expect(taxInfo).to.have.property('FeeBp', '100')
                expect(taxInfo).to.have.property('TransferBp', '1')
                expect(taxInfo).to.have.property('Collector', 'bluzelle1wjkdcz4hl4gcarnqtupu7vkftal6h34qxjh6rw')
            })

    })
});
