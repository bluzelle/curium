import {defaultGasParams, getSwarmAndClient} from "../../helpers/bluzelle-client";
import {Swarm} from "daemon-manager/lib/Swarm";
import {API} from "bluzelle";
import chai, {expect} from 'chai'
import asPromised from 'chai-as-promised'

chai.use(asPromised);

describe('MsgCreateNft', function()  {
    this.timeout(100000);
    let bz: API
    let swarm: Swarm
    beforeEach(() => {
        return getSwarmAndClient()
            .then(({bz: newBz, swarm: newSwarm}) => {
                bz = newBz
                swarm = newSwarm
            })
    });

    it('should return a token', () => {
        return bz.createNft({
            id: 'my-id',
            hash: 'hash',
            vendor: 'mintable',
            userId: 'user-id',
            mime: 'mime',
            meta: 'meta',
            size: 1000,
            gasInfo: defaultGasParams()
        })
            .then(resp => resp.token)
            .then(token => expect(token).to.equal('hash'))
    })

    it('should reject a transaction with a size larger than 150MB', (done) => {
        bz.createNft({
                id: 'my-id',
                hash: 'hash',
                vendor: 'mintable',
                userId: 'user-id',
                mime: 'mime',
                meta: 'meta',
                size: 151 * 1024 * 1024,
                gasInfo: defaultGasParams()
            })
                .catch(e => {
                    expect(e.error).to.match(/nft too large/)
                    done();
                })
    })
})