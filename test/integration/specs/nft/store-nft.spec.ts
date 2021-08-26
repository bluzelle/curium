import {expect} from 'chai'
import {
    checkFileReplication,
    checkHashEndpoint,
    checkInfoFileReplication,
    checkUpload,
    checkVendorIdEndpoint,
    encodeData,
    getLargePayload,
    getSentryUrl,
} from "../../helpers/nft-helpers"
import {API} from "bluzelle/lib/API";

import {times} from "lodash"
import {GasInfo} from "bluzelle/lib/types/GasInfo";
import {uploadNft} from "bluzelle/lib/bluzelle-node";

import {Swarm} from 'daemon-manager/lib/Swarm'
import {Daemon} from 'daemon-manager/lib/Daemon'
import {passThrough, passThroughAwait} from "promise-passthrough";
import {Some} from "monet";
import {getSwarmAndClient} from "../../helpers/bluzelle-client";
import delay from "delay";

const cksum = require('cksum');

global.fetch = require('node-fetch')


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 10, max_gas: 100000000, ...gasInfo})

describe("Store and retriving a NFT", function () {
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


    describe('file replication', () => {

        it('should replicate a file', () => {
            const text = `new nft - ${Date.now()}`;
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode(text), 'mintable')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "mintable", "myUserId", 'text/txt', "", defaultGasParams())))
                .then(passThrough(({hash}) => console.log('HASH:', hash)))
                .then(({hash}) =>
                    checkReplication(swarm, hash, id, 'text/txt', 'mintable', new TextEncoder().encode(text))
                )
        });

        it('should allow one client to send 3 createNft() in parallel to the same sentry', () => {
            const COUNT = 3
            const id = Date.now().toString()
            return Promise.all(
                times(COUNT).map(n =>
                    uploadNft(getSentryUrl(swarm), encodeData(`nft ${n}`), 'mintable')
                )
            )
                .then(passThroughAwait(responses =>
                    Promise.all(times(COUNT).map(n =>
                        bz.createNft(id + n, responses[n].hash, "mintable", "myUserId", 'text/plain', '', defaultGasParams())
                    ))
                ))
        });

        it('should not append to identical nfts', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'mintable')
                .then(() => uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'mintable'))
                .then(passThroughAwait(({hash}) =>
                    swarm.exec(`cat ${swarm.getSentries()[0].getNftBaseDir()}/nft-upload/mintable/${hash}-0000`)
                        .then(content => expect(content).to.equal('identical nft'))
                ))
        });

        it('should handle duplicate nfts from multiple vendors');

        it('should replicate a 200MB file', () => {
            const id = Date.now().toString()
            const data = getLargePayload(200)
            return uploadNft(getSentryUrl(swarm), data, 'mintable')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(({hash}) => checkReplication(swarm, hash, id, 'text/plain', 'mintable', data))
        });

        it('should retrieve 200 MB replicated file from endpoint');


        it('should save and return the correct mime type');

        it('should be able to retrieve replicated files from different vendors');

        it('should be able to retrieve replicated files from endpoints from all client sentries');

        it.skip('should allow many clients to upload in parallel');

        it('should allow two clients (vendors) to createNft() in parallel to different sentries');

        it('should handle a large number of uploads');

        it('should handle large number of creates from multiple users');


        it.skip('should replicate a large number of files', () => {
            const id = Date.now().toString();
            return Promise.all<string>(times(200).map(idx =>
                    uploadNft(getSentryUrl(swarm), encodeData(`nft-${idx}`), "mintable")
                        .then(passThroughAwait(({hash}) => bz.createNft(
                            id,
                            hash,
                            "mintable",
                            "myUserId",
                            "text/plain",
                            "",
                            defaultGasParams()
                        )))
                        .then(({hash}) => hash)
                )
            )
                .then(passThroughAwait(hashArray =>
                    Promise.all(hashArray.map((hash, idx) =>
                            Promise.all(swarm.getDaemons().map(daemon =>
                                    checkFileReplication(daemon, hash, `nft-${idx}`.length)
                                        .then(() => checkInfoFileReplication(daemon, hash))
                                )
                            )
                                .then(() => Promise.all(swarm.getSentries('client').map(sentry =>
                                    checkHashEndpoint(sentry, hash, `nft-${idx}`)
                                        .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'mintable', `nft-${idx}`))
                                )))
                        )
                    )
                ))
        });


        it.skip('should handle large number of uploads of large files', () => {
            const id = Date.now().toString();
            return Promise.all<string>(times(200).map(idx =>
                    uploadNft(getSentryUrl(swarm), getLargePayload(idx), "mintable")
                        .then(({hash}) => hash)
                )
            )
                .then(passThroughAwait(hashArray =>
                    Promise.all(hashArray.map((hash, idx) =>
                            Some(swarm.getSentries()[0])
                                .map(sentry => checkUpload(sentry, hash, 'mintable'))
                                .join()
                        )
                    )
                ))
        });

    });

});


const waitUntilHttpAvailable = (url: string): Promise<Response> =>
    fetch(url)
        .then(resp => resp.status !== 200 ? delay(500).then(() => waitUntilHttpAvailable(url)) : resp)

const waitUntilFileAvailable = (daemon: Daemon, filepath: string): Promise<number> =>
    Promise.resolve()
        .then(() => console.log('looking for file', `${daemon.getNftBaseDir()}/nft/${filepath}`))
        .then(() => daemon.exec(`cksum  ${daemon.getNftBaseDir()}/nft/${filepath}`))
        .then(csum => parseInt(csum.split(' ')[0]))
        .catch(() => waitUntilFileAvailable(daemon, filepath))


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
        waitUntilHttpAvailable(`${getSentryUrl(swarm)}/nft/${hash}`)
            .then(passThroughAwait(checkMimeType2(mime)))
            .then(passThroughAwait(checkHttpContent(content)))
            .then(() => waitUntilHttpAvailable(`${getSentryUrl(swarm)}/nft/${vendor}/${id}`))
            .then(passThroughAwait(checkMimeType2(mime)))
            .then(passThroughAwait(checkHttpContent(content)))
    ))
        .then(() => Promise.all(swarm.getValidators().map(daemon =>
            waitUntilFileAvailable(daemon, hash)
                .then(passThroughAwait(checkFileContent(content)))
                .then(() => waitUntilFileAvailable(daemon, `${hash}.info`))
                .then(() => waitUntilFileAvailable(daemon, `${vendor}-${id}`))
                .then(() => waitUntilFileAvailable(daemon, `${vendor}-${id}.info`))
        )))
