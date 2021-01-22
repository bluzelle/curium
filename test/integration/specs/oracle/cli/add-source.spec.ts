import {deleteSources} from "../source-utils";
import {getBzClient} from "../bluzelle-client";
import {BLOCK, blzcli, STANDARD_GAS} from "../../../helpers/blzcli";
import {expect} from 'chai'

describe('add-source', () => {
     beforeEach(() => deleteSources(getBzClient()))

    it('should add a source', () => {
        return blzcli('tx oracle add-source my-name my-url my-property --from vuser -y', STANDARD_GAS, BLOCK)
            .then(() => getBzClient().abciQuery('/custom/oracle/listsources'))
            .then(x => {
                expect(x.result[0].name).to.equal('my-name');
                expect(x.result[0].url).to.equal('my-url');
                expect(x.result[0].property).to.equal('my-property');
                expect(x.result[0].owner).not.to.be.undefined;
            })
    })
});


