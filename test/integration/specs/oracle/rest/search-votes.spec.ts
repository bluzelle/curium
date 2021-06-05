import {API} from "../../../../../../blzjs/client";
import {getBzClient} from "../../../helpers/bluzelle-client";
import {addVote, deleteVotes} from "../oracle-utils";
import {expect} from "chai";
import {passThrough} from "promise-passthrough";
import {searchOracleVotes} from 'oracle-js'

describe('search-votes functions', function () {
    this.timeout(60000);
    let bz: API

    beforeEach(() => bz = getBzClient());
    beforeEach(() => deleteVotes(bz));

    it('should search votes', () => {
        return Promise.all([
            addVote(bz, {
                Value: '10.5',
                SourceName: 'my-source'
            }),
            addVote(bz, {
                Value: '20.2',
                SourceName: 'my-source-2'
            })
        ])
            .then(() => searchOracleVotes(bz, {Prefix: '2021'}))
            .then(passThrough(votes => expect(votes).to.have.length(2)))
            .then((votes: any[]) => votes.map(v => parseFloat(v.Value)))
            .then(votes => expect(votes).to.deep.equal([20.2, 10.5]))
    });

    it('should search vote keys', () => {
        return bz.abciQuery("/custom/oracle/searchvotekeys", {
            Prefix: '2021'
        })
            .then(x => x)
    })
});

