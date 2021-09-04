import {defaultGasParams, getSwarmAndClient} from "../../helpers/bluzelle-client";
import {Swarm} from "daemon-manager/lib/Swarm";
import {API} from "bluzelle";
import chai, {expect} from 'chai'
import asPromised from 'chai-as-promised'
import {getLargePayload} from "../../helpers/nft-helpers";

chai.use(asPromised);

describe('MsgCreateNft', function () {
    this.timeout(400_000);
    let bz: API
    let swarm: Swarm

    beforeEach(() => {
        return getSwarmAndClient()
            .then(({bz: newBz, swarm: newSwarm}) => {
                bz = newBz
                swarm = newSwarm
                bz.uuid = 'bluzelle'
            })
            .then(() => bz.upsert("nft-whitelist", JSON.stringify([bz.address]), defaultGasParams()))
            .then(() => Promise.all(swarm.getDaemons().map(daemon =>
                daemon.exec(`rm -rf ${daemon.getNftBaseDir()}/nft*`)
            )))
    });

    it('should require the account be on a whitelist to allow create', () => {
        return bz.delete('nft-whitelist', {gas_price: 0.002, max_gas: 10_000_000})
            .catch(e => {
                if (/Key does not exist/.test(e.error) === false) {
                    throw e
                }
            })
            .then(() => expect(bz.createNft({
                    id: 'my-id',
                    hash: 'hash',
                    vendor: 'mintable',
                    userId: 'user-id',
                    mime: 'mime',
                    meta: 'meta',
                    size: 1000,
                    gasInfo: defaultGasParams()
                })
                    .catch(e => {
                        throw e.error
                    })
            ).to.be.rejectedWith('not on nft whitelist'))
    });

    it('should pass only if on nft whitelist', () => {
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
            .then(x => expect(x.token).to.equal('hash'));
    })

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
                /upload too large/.test(e.error) ? done() : done(new Error('should have returned an error'))
            })
    })

    it('should charge the user for a create', () => {
        return bz.getBNT({ubnt: true})
            .then(bal => ({balBefore: bal}))
            .then(ctx => ({...ctx, data: getLargePayload(50)}))
            .then(ctx => bz.createNft({
                    id: 'my-id',
                    hash: 'hash',
                    vendor: 'mintable',
                    userId: 'user-id',
                    mime: 'text/txt',
                    meta: 'meta',
                    size: ctx.data.byteLength,
                    gasInfo: defaultGasParams()
                })
                    .then(resp => ({...ctx, token: resp.token}))
            )
            .then(ctx =>
                bz.getBNT({ubnt: true})
                    .then(bal => ({...ctx, balAfter: bal}))
            )
            .then(ctx => expect(ctx.balBefore).to.be.greaterThan(ctx.balAfter))

    })
})