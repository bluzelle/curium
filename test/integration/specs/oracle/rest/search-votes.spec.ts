import {API} from "../../../../../../blzjs/client";
import {getBzClient} from "../bluzelle-client";
import {addSource, deleteSources, listSources} from "../source-utils";
import {expect} from "chai";
import {feedSources} from "../sources";

describe('search-votes functions', function()  {
    this.timeout(10000);
    let bz: API

    beforeEach(() => bz = getBzClient());
//    beforeEach(() => deleteSources(bz));

    it('should search votes', () => {
        return bz.abciQuery("/custom/oracle/searchvotes", {
            Prefix: '2021'
        })
            .then(x => x)

    });
});

