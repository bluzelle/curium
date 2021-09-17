import {getLargePayload} from "../../integration/helpers/nft-helpers"
import {uploadNft} from "bluzelle/lib/bluzelle-node";
import {passThroughAwait} from "promise-passthrough";
import {sha256} from "js-sha256";
import {TruthyValue, waitUntil} from 'async-wait-until'
import {API, bluzelle} from "bluzelle";
import delay from 'delay'

const cksum = require('cksum');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const LOOP_TIMEOUT = 10_000;

(function loop() {
    doNftUploadCheck()
        .then(() => delay(10000))
        .then(() => console.log('='.repeat(60)))
        .then(loop)
}())


function weightedRandom(max: number) {
    return Math.round(max / (Math.random() * max + 1));
}

function doNftUploadCheck() {
    return Promise.resolve({
        data: getLargePayload(20 + weightedRandom(100)),
        //bluzelle1da4s5vxxhs4cxfcqzmwf5clymyqqpfcygzgm3z
        bz: bluzelle({
            mnemonic: 'fence observe ship indicate elephant fatigue maze choice toast range repeat matrix warfare satisfy hope track tonight legal hire promote dove over retire mimic',
            endpoint: 'https://client.sentry.testnet.public.bluzelle.com:1317',
            uuid: ''
        })
    })
        .then(ctx => ({
            ...ctx,
            id: Date.now().toString(),
            hash: sha256(ctx.data)
        }))
        .then(passThroughAwait(ctx => log(`**** Upload *****(${ctx.hash}:${ctx.data.byteLength/1024/1024})`)))
        .then(passThroughAwait(ctx =>
            ctx.bz.createNft({
                id: ctx.id,
                hash: ctx.hash,
                vendor: 'xxxx',
                userId: 'user-id',
                mime: 'text/plain',
                meta: 'meta',
                size: ctx.data.byteLength,
                gasInfo: {gas_price: 0.002, max_gas: 100000000}
            })
        ))
        .then(passThroughAwait(ctx =>
            uploadNft(ctx.bz.url, ctx.data, ctx.hash, 'xxxx')
        ))
        .then(passThroughAwait(() => delay(30000)))
        .then(ctx => checkReplication(ctx.bz, ctx.hash, ctx.id, 'text/plain', 'xxxx', ctx.data))
        .catch(e => console.log('ERROR:', e))


}

const log = (text: string) =>
    console.log(`${new Date().toLocaleTimeString()}:`, text);

const checkReplication = (bz: API, hash: string, id: string, mime: string, vendor: string, content: Uint8Array): Promise<unknown> =>
    Promise.all(['a', 'b', 'c'].map(x =>
        Promise.all([
            waitUntilHttpAvailable(`https://${x}.client.sentry.testnet.public.bluzelle.com:1317/nft/${hash}`, LOOP_TIMEOUT)
                .then(passThroughAwait(checkHttpContent(content))),
            waitUntilHttpAvailable(`https://${x}.client.sentry.testnet.public.bluzelle.com:1317/nft/${vendor}/${id}`, LOOP_TIMEOUT)
                .then(passThroughAwait(checkHttpContent(content)))
        ])
    ))


const waitUntilHttpAvailable = (url: string, timeout: number): Promise<Response> =>
    waitUntil(() =>
            Promise.resolve()
                .then(() => log(`checking: ${url}`))
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


const checkHttpContent = (content: Uint8Array) => (resp: Response) =>
    resp.arrayBuffer()
        .then(buf => Buffer.from(buf).compare(content))
        .then(compare => compare === 0 || log(`NFT content mismatch: ${parseInt(cksum(content).toString('hex'), 16)}`))


