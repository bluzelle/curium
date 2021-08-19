import {expect} from 'chai'
import {API} from "bluzelle"
import {times} from 'lodash'

import {getSwarmAndClient} from "../../../helpers/bluzelle-client";
import {Swarm} from "daemon-manager/lib/Swarm";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
describe('file upload', function()  {
    this.timeout(200000);
    let bz: API;
    let swarm: Swarm;

    beforeEach(() =>
        getSwarmAndClient()
            .then(result => {
                bz = result.bz
                swarm  = result.swarm
            })
    );


    it('should create a directory nft-upload/vendor in .blzd', () => {
        return fetch(`${bz.url}/nft/upload/mintable/someHash/1`, {
            method: 'POST',
            body: "1"
        })
            .then(() => swarm.getSentries()[0].readTextFile('.blzd/nft-upload/mintable/someHash-0001'))
            .then(resp => expect(resp).to.equal("1"))
    });

    it('should allow multiple simultaneous uploads to a node', () => {
        return Promise.all(
            times(100).map(n =>
                fetch(`${bz.url}/nft/upload/vendor-${n}/someHash/1`, {
                    method: 'POST',
                    body: "xxx"
                })
                    .then(() => swarm.getSentries()[0].readTextFile(`.blzd/nft-upload/vendor-${n}/someHash-0001`))
                        .then(resp => expect(resp).to.equal('xxx'))
            )
        )
    });
});
