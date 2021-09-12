import {expect} from 'chai'
import {getLargePayload, getSentryUrl} from "../../integration/helpers/nft-helpers"

import {times} from "lodash"
import {GasInfo} from "bluzelle/lib/types/GasInfo";
import {uploadNft} from "bluzelle/lib/bluzelle-node";

import {Swarm} from 'daemon-manager/lib/Swarm'
import {Daemon} from 'daemon-manager/lib/Daemon'
import {passThrough, passThroughAwait} from "promise-passthrough";
import {getSwarmAndClient} from "../../integration/helpers/bluzelle-client";
import {sha256} from "js-sha256";
import {TruthyValue, waitUntil} from 'async-wait-until'
import {Some} from "monet";

const cksum = require('cksum');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 10, max_gas: 100000000, ...gasInfo})
const LOOP_TIMEOUT = 10_000;


doNftUploadCheck();


function doNftUploadCheck() {
    const COUNT = 3
    return Promise.all(
        times(COUNT).map(n =>
            getSwarmAndClient()
                    .then(ctx => ({...ctx, data: getLargePayload(100)}))
                    .then(ctx => ({
                        ...ctx,
                        id: Date.now().toString(),
                        hash: sha256(ctx.data)
                    }))
                    .then(passThroughAwait(ctx =>
                        ctx.bz.createNft({
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
                        uploadNft(getSentryUrl(ctx.swarm), ctx.data, ctx.hash, 'mintable')
                    ))
                    .then(ctx => checkReplication(ctx.swarm, ctx.hash, ctx.id, 'text/plain', 'mintable', ctx.data))
        )
    )
}


const checkReplication = (swarm: Swarm, hash: string, id: string, mime: string, vendor: string, content: Uint8Array): Promise<unknown> =>
    Promise.all(swarm.getSentries().map((daemon, idx) =>
        waitUntilHttpAvailable(`${getSentryUrl(swarm, idx)}/nft/${hash}`, LOOP_TIMEOUT)
            .then(passThroughAwait(checkMimeType2(mime, daemon.getName(), hash)))
            .then(passThroughAwait(checkHttpContent(content, daemon.getName(), hash)))
            .then(() => waitUntilHttpAvailable(`${getSentryUrl(swarm)}/nft/${vendor}/${id}`, LOOP_TIMEOUT))
            .then(passThroughAwait(checkMimeType2(mime, daemon.getName(), id)))
            .then(passThroughAwait(checkHttpContent(content, daemon.getName(), id)))
    ))
        .then(() => Promise.all(swarm.getValidators().map(daemon =>
            waitUntilFileAvailable(daemon, hash, LOOP_TIMEOUT)
                .then(passThroughAwait(checkFileContent(content)))
                .then(() => waitUntilFileAvailable(daemon, `${hash}.info`, LOOP_TIMEOUT))
                .then(() => waitUntilFileAvailable(daemon, `${vendor}-${id}`, LOOP_TIMEOUT))
                .then(() => waitUntilFileAvailable(daemon, `${vendor}-${id}.info`, LOOP_TIMEOUT))
        )))


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
        .catch(e => {
            console.log('ERROR:', e)
            throw e
        })


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


const checkMimeType2 = (mime: string, name: string, hash: string) => (resp: Response) =>
    Some(resp.headers.get('content-type') as string)
        .map(passThrough(mimeType => console.log('checkMimeType:', name, hash, mimeType, mime)))
        .map(mimeType => expect(mimeType).to.equal(mime))

const checkHttpContent = (content: Uint8Array, name:string, hash: string) => (resp: Response) =>
    resp.arrayBuffer()
        .then(buf => Buffer.from(buf).compare(content))
        .then(passThrough(() => console.log('checkHttpContent:', name, hash)))
        .then(compare => expect(compare).to.equal(0));

const checkFileContent = (content: Uint8Array) => (csum: number) =>
    expect(csum).to.equal(parseInt(cksum(content).toString('hex'), 16))

