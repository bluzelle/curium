import {expect} from 'chai'
import {getLargePayload, getSentryUrl,} from "../../helpers/nft-helpers"
import {API} from "bluzelle/lib/API";

import {times} from "lodash"
import {GasInfo} from "bluzelle/lib/types/GasInfo";
import {uploadNft} from "bluzelle/lib/bluzelle-node";

import {Swarm} from 'daemon-manager/lib/Swarm'
import {Daemon} from 'daemon-manager/lib/Daemon'
import {passThroughAwait} from "promise-passthrough";
import {getSwarmAndClient} from "../../helpers/bluzelle-client";
import delay from "delay";
import {sha256} from "js-sha256";
import {TruthyValue, waitUntil} from 'async-wait-until'

const cksum = require('cksum');

global.fetch = require('node-fetch')


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 10, max_gas: 100000000, ...gasInfo})

describe("Store and retrieve a NFT", function () {
    this.timeout(400_000);
    let bz: API
    let swarm: Swarm
    beforeEach(() => {
        return getSwarmAndClient()
            .then(({bz: newBz, swarm: newSwarm}) => {
                bz = newBz;
                swarm = newSwarm;
                bz.uuid = 'bluzelle';
            })
            .then(() => bz.upsert("nft-whitelist", JSON.stringify([bz.address]), defaultGasParams()))
    });

    describe('file replication', () => {

        it('should replicate a file', () => {
            const id = Date.now().toString()
            const data = getLargePayload(1)
            const hash = sha256(data);
            return bz.createNft({
                id,
                hash,
                vendor: 'mintable',
                userId: 'user-id',
                mime: 'text/txt',
                meta: 'meta',
                size: data.byteLength,
                gasInfo: defaultGasParams()
            })
                .then(({token}) => uploadNft(getSentryUrl(swarm), data, token, 'mintable'))
                .then(() => console.log('HASH:', hash))
                .then(() =>
                    checkReplication(swarm, hash, id, 'text/txt', 'mintable', data)
                )
        });

        it('should replicate a large file', () => {
            const id = Date.now().toString()
            const data = getLargePayload(100)
            const hash = sha256(data);
            return bz.createNft({
                id,
                hash,
                vendor: 'mintable',
                userId: 'user-id',
                mime: 'text/txt',
                meta: 'meta',
                size: data.byteLength,
                gasInfo: defaultGasParams()
            })
                .then(({token}) => uploadNft(getSentryUrl(swarm), data, token, 'mintable'))
                .then(() => console.log('HASH:', hash))
                .then(() =>
                    checkReplication(swarm, hash, id, 'text/txt', 'mintable', data)
                )
        });

        it('should allow one client to send multiple createNft() in parallel to the same sentry', () => {
            const COUNT = 4
            return Promise.all(
                times(COUNT).map(n =>
                    Promise.resolve(getLargePayload(100))
                        .then(data => ({
                            id: Date.now().toString(),
                            data,
                            hash: sha256(data)
                        }))
                        .then(passThroughAwait(ctx =>
                            bz.createNft({
                                id: ctx.id,
                                hash: ctx.hash,
                                vendor: 'mintable',
                                userId: 'user-id',
                                mime: 'text/plain',
                                meta: 'meta',
                                size: ctx.data.byteLength,
                                gasInfo: defaultGasParams()
                            })
                        ))
                        .then(passThroughAwait(ctx =>
                            uploadNft(getSentryUrl(swarm), ctx.data, ctx.hash, 'mintable')
                        ))
                        .then(ctx => checkReplication(swarm, ctx.hash, ctx.id, 'text/plain', 'mintable', ctx.data))
                )
            )
        });

        it('should not allow uploading after full upload size has been completed');

        it('should handle duplicate nfts from multiple vendors');

        it('should save and return the correct mime type');

        it('should be able to retrieve replicated files from different vendors');

        it('should be able to retrieve replicated files from endpoints from all client sentries');

        it('should allow many clients to upload in parallel');

        it('should allow two clients (vendors) to createNft() in parallel to different sentries');

        it('should handle a large number of uploads');
    });
});


const waitUntilHttpAvailable = (url: string, timeout: number): Promise<Response> =>
    waitUntil(() =>
            Promise.resolve(console.log('waitUntilHttpAvailable', url))
                .then(() => fetch(url))
                .then(resp => resp.status === 200 ? resp as unknown as TruthyValue : false)
        , {
            timeout,
            intervalBetweenAttempts: 1000
        })
        .then(x => x as unknown as Response)


const waitUntilFileAvailable = (daemon: Daemon, filepath: string, timeout: number): Promise<number> =>
    waitUntil(() =>
            Promise.resolve(console.log('looking for file', `${daemon.getNftBaseDir()}/nft/${filepath}`))
                .then(() => daemon.exec<string>(`cksum  ${daemon.getNftBaseDir()}/nft/${filepath}`))
                .then(csum => !csum || csum.includes("can't open") ? 0 : parseInt(csum.split(' ')[0]))
        , {
            timeout,
            intervalBetweenAttempts: 1000
        }
    )


const checkMimeType2 = (mime: string) => (resp: Response) =>
    expect(resp.headers.get('content-type')).to.equal(mime);

const checkHttpContent = (content: Uint8Array) => (resp: Response) =>
    resp.arrayBuffer()
        .then(buf => Buffer.from(buf).compare(content))
        .then(compare => expect(compare).to.equal(0));

const checkFileContent = (content: Uint8Array) => (csum: number) =>
    expect(csum).to.equal(parseInt(cksum(content).toString('hex'), 16))

const checkReplication = (swarm: Swarm, hash: string, id: string, mime: string, vendor: string, content: Uint8Array): Promise<unknown> =>
    Promise.all(swarm.getSentries().map(daemon =>
        waitUntilHttpAvailable(`${getSentryUrl(swarm)}/nft/${hash}`, 10000)
            .then(passThroughAwait(checkMimeType2(mime)))
            .then(passThroughAwait(checkHttpContent(content)))
            .then(() => waitUntilHttpAvailable(`${getSentryUrl(swarm)}/nft/${vendor}/${id}`, 10000))
            .then(passThroughAwait(checkMimeType2(mime)))
            .then(passThroughAwait(checkHttpContent(content)))
    ))
        .then(() => delay(5000))
        .then(() => Promise.all(swarm.getValidators().map(daemon =>
            waitUntilFileAvailable(daemon, hash, 10000)
                .then(passThroughAwait(checkFileContent(content)))
                .then(() => waitUntilFileAvailable(daemon, `${hash}.info`, 10000))
                .then(() => waitUntilFileAvailable(daemon, `${vendor}-${id}`, 10000))
                .then(() => waitUntilFileAvailable(daemon, `${vendor}-${id}.info`, 10000))
        )))
