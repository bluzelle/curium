import {expect} from "chai";


import {API, mnemonicToAddress, uploadNft} from "bluzelle";
import {getLargePayload, getMintedBz, getSentryUrl,} from "../../helpers/nft-helpers";
import {Swarm} from "daemon-manager/lib/Swarm"
import {defaultGasParams, getSwarmAndClient} from "../../helpers/bluzelle-client"
import {times} from 'lodash'
import {passThroughAwait} from "promise-passthrough";
import {Some} from "monet";

describe('whitelist', function () {
    this.timeout(6000000);
    let bz: API
    let swarm: Swarm
    beforeEach(() => getSwarmAndClient()
        .then(({bz: newBz, swarm: newSwarm}) => {
            bz = newBz
            bz.uuid = 'bluzelle'
            swarm = newSwarm
        })
        .then(() => clearWhitelist(bz))
    )

    it('should not charge for all accounts on the whitelist', () => {
        return Promise.all<API>(times(2).map((n) =>
            getMintedBz(bz, n + 1)
        ))
            .then(passThroughAwait((clients: API[]) =>
                Promise.all(clients.map(client => client.address))
                    .then(addresses => createWhitelist(bz, addresses)
                    )))
            .then((clients: API[]) => Promise.all(clients.map((client, idx) => checkGasChargeIsZero(swarm, client, `nft-id-${idx}`))))

    });

    it('should charge for any other address not on the whitelist', () => {
        return Promise.all<API>(times(2).map((n) =>
            getMintedBz(bz, n)
        ))
            .then(() => checkGasWasCharged(swarm, bz, "newBzId"))
    });

    it("should charge not charge for large number of accounts on whitelist", () => {
        return Promise.all<string>(times(50).map(() =>
            Some(bz.generateBIP39Account())
                .map(mnemonic => mnemonicToAddress(mnemonic))
                .join()
        ))
            .then((addresses: string[]) => {
                addresses.push(bz.address)
                return createWhitelist(bz, addresses)
            })
            .then(() => checkGasChargeIsZero(swarm, bz, "myNftId"))
            .then(() => getMintedBz(bz, 1))
            .then(newBz => checkGasWasCharged(swarm, newBz, "non-whitelisted nft"))
    });

    it('should charge for creating an nft', () => {
        return checkGasWasCharged(swarm, bz, "myNftId")
    });
});

const createWhitelist = (bz: API, addresses: string[]): Promise<void> =>
    bz.upsert("whitelist", JSON.stringify(addresses), defaultGasParams())
        .then(() => {
        })

const checkGasChargeIsZero = (swarm: Swarm, bz: API, id: string): Promise<unknown> => {
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
        .then(passThroughAwait(ctx => uploadNft(getSentryUrl(swarm), getLargePayload(50), ctx.token, "mintable")))
        .then(ctx =>
            bz.getBNT({ubnt: true})
                .then(bal => ({...ctx, balAfter: bal}))
        )
        .then(ctx => expect(ctx.balBefore - ctx.balAfter).to.equal(0))
}

const checkGasWasCharged = (swarm: Swarm, bz: API, id: string): Promise<unknown> => {
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
        .then(passThroughAwait(ctx => uploadNft(getSentryUrl(swarm), getLargePayload(50), ctx.token, "mintable")))
        .then(ctx =>
            bz.getBNT({ubnt: true})
                .then(bal => ({...ctx, balAfter: bal}))
        )
        .then(ctx => expect(ctx.balBefore - ctx.balAfter).to.be.greaterThan(0))
};


const getUserBalance = (swarm: Swarm, user: string): Promise<number> =>
    swarm.exec(`blzcli keys show ${user} -a`)
        .then(addr => swarm.exec(`blzcli q account ${addr}`))
        .then((resp: any) => parseInt(resp.value.coins[0].amount));


const clearWhitelist = (bz: API) =>
    bz.upsert('whitelist', '', defaultGasParams());