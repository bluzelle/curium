import {expect} from 'chai'
import {
    checkFileReplication,
    checkFileSize,
    checkFileSizeFromEndpoint,
    checkHashEndpoint,
    checkInfoFileReplication,
    checkMimeType,
    checkTextFileContents,
    checkUpload,
    checkVendorIdEndpoint,
    checkVendorInfoFileReplication,
    createBz,
    createMintedBz,
    encodeData,
    fetchDataWithHash,
    fetchDataWithIdAndVendor,
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
import {UploadNftResult} from "bluzelle";
import {getSwarmAndClient} from "../../helpers/bluzelle-client";
import delay from "delay";

global.fetch = require('node-fetch')


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 10, max_gas: 100000000, ...gasInfo})

describe("Store and retriving a NFT", function () {
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
        this.timeout(300000)


        const waitUntilHttpAvailable = (url: string): Promise<Response> =>
            fetch(url)
                .then(resp => resp.status !== 200 ? delay(500).then(() => waitUntilHttpAvailable(url)) : resp)

        const waitUntilFileAvailable = (daemon: Daemon, filepath: string): Promise<ArrayBuffer> =>
            daemon.exec(`stat ${daemon.getNftBaseDir()}/nft/${filepath}`)
                .then(() => daemon.exec(`base64  ${daemon.getNftBaseDir()}/nft/${filepath}`))
                .then(base64 => Buffer.from(base64, 'base64'))
                .catch(() => waitUntilFileAvailable(daemon, filepath))


        const checkMimeType2 = (mime: string) => (resp: Response) =>
            expect(resp.headers.get('content-type')).to.equal(mime);

        const checkHttpContent = (content: Uint8Array) => (resp: Response) =>
            resp.arrayBuffer()
                .then(buf => Buffer.from(buf).compare(content))
                .then(compare => expect(compare).to.equal(0));

        const checkFileContent = (content: Uint8Array) => (file: ArrayBuffer) =>
            Promise.resolve(Buffer.from(file).compare(content))
                .then(compare => expect(compare).to.equal(0))

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
                    // TODO: FINISH HERE
                )))


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
            // .then(([binanceResp, mintableResp, cryptoResp]) =>
            //     Promise.all(swarm.getSentries('client').map(sentry =>
            //             checkHashEndpoint(sentry, binanceResp.hash, 'binance nft')
            //                 .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'binance', 'binance nft'))
            //                 .then(() => checkHashEndpoint(sentry, mintableResp.hash, 'mintable nft'))
            //                 .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'mintable', 'mintable nft'))
            //                 .then(() => checkHashEndpoint(sentry, cryptoResp.hash, 'crypto nft'))
            //                 .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'crypto', 'crypto nft'))
            //         )
            //     )
            // )
        });


        it('should replicate a file using a minted user', () => {
            const id = Date.now().toString()
            return Promise.resolve(getSentryUrl(swarm))
                .then(url => uploadNft(url, new TextEncoder().encode('new nft'), 'binance'))
                .then(passThroughAwait(({hash}) =>
                    createMintedBz(bz)
                        .then(mintedBz => mintedBz.createNft(id, hash, "binance", "myUserId", 'text/txt', "", defaultGasParams())))
                )
                .then(({hash}) =>
                    Promise.all(swarm.getDaemons()
                        .map(daemon =>
                            checkFileReplication(daemon, hash, 7)
                                .then(() => checkInfoFileReplication(daemon, hash))
                                .then(daemon => checkFileSize(daemon, hash, 7))
                                .then(daemon => checkTextFileContents(daemon, hash, 'new nft'))
                        )
                    ))
        });

        it('should not append to identical nfts', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'binance')
                .then(() => uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'binance'))
                .then(passThroughAwait(({hash}) =>
                    swarm.exec(`stat -c "%s" .blzd/nft-upload/binance/${hash}-0000`)
                        .then(size => expect(size).to.equal(13))
                ))
                .then(passThroughAwait(({hash}) =>
                    swarm.exec(`ls .blzd/nft-upload | wc -l`)
                        .then(num => expect(num).to.equal(1))
                ))
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/txt', "", defaultGasParams())))
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/txt', "", defaultGasParams())))
                .then(({hash}) =>
                    Promise.all(swarm.getDaemons().map(daemon =>
                            checkFileReplication(daemon, hash, 13)
                        )
                    ))
        });

        it('should handle duplicate nfts from multiple vendors', () => {
            let hashBinance: string;
            let hashMintable: string;
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'binance')
                .then(({hash: hashResp}) => hashBinance = hashResp)
                .then(() => bz.createNft(id, hashBinance, "binance", "myUserId", 'text/txt', "", defaultGasParams()))
                .then(() => uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'mintable'))
                .then(({hash: hashResp}) => hashMintable = hashResp)
                .then(() => bz.createNft(id, hashBinance, "mintable", "myUserId", 'text/txt', "", defaultGasParams()))
                .then(() => Promise.all(swarm.getDaemons()
                    .map(d =>
                        checkFileReplication(d, hashBinance, 13)
                            .then(() => checkInfoFileReplication(d, hashBinance))
                            .then(d => checkFileSize(d, hashBinance, 13))
                            .then(d => checkFileSize(d, hashMintable, 13))
                            .then(d => checkTextFileContents(d, hashBinance, 'identical nft'))
                            .then(d => checkTextFileContents(d, hashMintable, 'identical nft'))
                    )
                ))
        });

        it('should replicate a 100MB file', () => {
            const id = Date.now().toString()
            const data = getLargePayload(100)
            return uploadNft(getSentryUrl(swarm), data, 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(({hash}) =>
                    Promise.all(swarm.getDaemons()
                        .map(daemon =>
                            checkFileReplication(daemon, hash, getLargePayload(100).byteLength)
                                .then((daemon: Daemon) => checkFileSize(daemon, hash, getLargePayload(100).byteLength))
                        )
                    ))
        });

        it('should retrieve 100 MB replicated file from endpoint', () => {
            const id = Date.now().toString()
            const data = getLargePayload(100)
            return uploadNft(getSentryUrl(swarm), data, 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(({hash}) =>
                    Promise.all(swarm.getSentries('client')
                        .map(daemon =>
                            checkFileReplication(daemon, hash, getLargePayload(100).byteLength)
                                .then(daemon => checkInfoFileReplication(daemon, hash))
                                .then(daemon => checkFileSizeFromEndpoint(daemon, hash, getLargePayload(100).byteLength))
                        )
                    ))
        });

        it('should be able to retrieve replicated files from endpoint', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(passThroughAwait(({hash}) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                        checkFileReplication(sentry, hash, 7)
                            .then(daemon => checkInfoFileReplication(daemon, hash))
                    ))
                ))
                .then(({hash}) => fetchDataWithHash(swarm, hash))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.body).to.deep.equal(encodeData('new nft')))
                .then(() => fetchDataWithIdAndVendor(swarm, id, 'binance'))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.body).to.deep.equal(encodeData('new nft')))
        });

        it('should save and return the correct mime type', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(passThroughAwait(({hash}) =>
                    Promise.all(swarm.getSentries().map(sentry =>
                        checkFileReplication(sentry, hash, 7)
                            .then(daemon => checkInfoFileReplication(daemon, hash))
                            .then(daemon => checkMimeType(daemon, hash, 'text/plain'))
                    ))
                ))
                .then(({hash}) => fetchDataWithHash(swarm, hash))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.contentType).to.deep.equal('text/plain'))
                .then(() => fetchDataWithIdAndVendor(swarm, id, 'binance'))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.contentType).to.deep.equal('text/plain'))
        });

        it('should be able to retrieve replicated files from different vendors', () => {
            let hashBinance: string;
            let hashMintable: string;
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'binance')
                .then(({hash: hashResp}) => hashBinance = hashResp)
                .then(() => bz.createNft(id, hashBinance, "binance", "myUserId", 'text/plain', "", defaultGasParams()))
                .then(() => uploadNft(getSentryUrl(swarm), new TextEncoder().encode('identical nft'), 'mintable'))
                .then(({hash: hashResp}) => hashMintable = hashResp)
                .then(() => bz.createNft(id, hashBinance, "mintable", "myUserId", 'text/plain', "", defaultGasParams()))
                .then(() => Promise.all(swarm.getDaemons()
                    .map(d =>
                        checkFileReplication(d, hashBinance, 'identical nft'.length)
                            .then(() => checkInfoFileReplication(d, hashBinance))
                            .then(() => checkVendorInfoFileReplication(d, 'binance', id))
                            .then(() => checkVendorInfoFileReplication(d, 'mintable', id))
                    )
                ))
                .then(() => Promise.all(swarm.getSentries('client')
                    .map(d =>
                        checkVendorIdEndpoint(bz.url, d, id, 'binance', 'identical nft')
                            .then(d => checkVendorIdEndpoint(bz.url, d, id, 'mintable', 'identical nft'))
                    )
                ));
        });

        it('should be able to retrieve replicated files from endpoints from all client sentries', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(swarm), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(({hash}) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                            checkFileReplication(sentry, hash, 7)
                                .then(() => checkInfoFileReplication(sentry, hash))
                                .then(() => checkHashEndpoint(sentry, hash, 'new nft'))
                                .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'binance', 'new nft'))
                        )
                    )
                )
        });

        it('should allow two clients (vendors) to facilitate createNft() in parallel to the same sentry', async () => {
            const newBz = await createMintedBz(bz);
            const id = Date.now().toString()
            await Promise.all([
                uploadNft(getSentryUrl(swarm), encodeData('binance nft'), 'binance'),
                uploadNft(getSentryUrl(swarm), encodeData('mintable nft'), 'mintable')]
            )
                .then(passThroughAwait(([binanceResp, mintableResp]) =>
                    Promise.all([
                        bz.createNft(id, binanceResp.hash, "binance", "myUserId", 'text/plain', "", defaultGasParams()),
                        newBz.createNft(id, mintableResp.hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())]
                    )
                ))
                .then(passThroughAwait(([binanceResp, mintableResp]) =>
                    Promise.all(swarm.getDaemons().map(daemon =>
                            checkFileReplication(daemon, binanceResp.hash, 'binance nft'.length)
                                .then(() => checkFileReplication(daemon, mintableResp.hash, 'mintable nft'.length))
                                .then(() => checkInfoFileReplication(daemon, binanceResp.hash))
                                .then(() => checkInfoFileReplication(daemon, mintableResp.hash))
                        )
                    )
                ))
                .then(([binanceResp, mintableResp]) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                            checkHashEndpoint(sentry, binanceResp.hash, 'binance nft')
                                .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'binance', 'binance nft'))
                                .then(() => checkHashEndpoint(sentry, mintableResp.hash, 'mintable nft'))
                                .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'mintable', 'mintable nft'))
                        )
                    )
                )
        });


        it.skip('should allow one client to send 2 in parallel to the same sentry', async () => {
            const id1 = "id1"
            const id2 = "id2"
            await Promise.all([
                uploadNft(getSentryUrl(swarm), encodeData('nft 1'), 'mintable'),
                uploadNft(getSentryUrl(swarm), encodeData('nft 2'), 'mintable')]
            )
                .then(passThroughAwait((hashResps) =>
                    Promise.all([
                        bz.createNft(id1, hashResps[0].hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams()),
                        bz.createNft(id2, hashResps[1].hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())
                    ])
                ))
                .then(passThroughAwait((hashResps) =>
                    Promise.all(hashResps.map(hashResp =>
                        Promise.all(swarm.getDaemons().map(daemon =>
                                checkFileReplication(daemon, hashResp.hash, 5)
                                    .then(() => checkInfoFileReplication(daemon, hashResp.hash))
                            )
                        )
                    ))
                ))
                .then((hashResps) =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        Promise.all(swarm.getSentries('client').map(sentry =>
                                checkHashEndpoint(sentry, hashResp.hash, `nft ${idx + 1}`)
                                    .then(sentry => checkVendorIdEndpoint(bz.url, sentry, `id${idx + 1}`, 'mintable', `nft ${idx + 1}`))
                            )
                        )
                    ))
                )
        });

        it.skip('should allow one client to send many createNft() in parallel to the same sentry', () => {
            return Promise.all<UploadNftResult>(
                times(3).map((idx) =>
                    uploadNft(getSentryUrl(swarm), encodeData(`nft-${idx}`), "mintable")
                )
            )
                .then(passThroughAwait((hashResps) =>
                    bz.withTransaction(() =>
                        hashResps.map((hashResp, idx) =>
                            bz.createNft(`ID-${idx}`, hashResp.hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())
                        )
                    )
                ))
                .then(passThroughAwait((hashResps) =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        Promise.all(swarm.getDaemons().map(daemon =>
                                checkFileReplication(daemon, hashResp.hash, `nft-${idx}`.length)
                                    .then(() => checkInfoFileReplication(daemon, hashResp.hash))
                                    .then(() => checkVendorInfoFileReplication(daemon, "mintable", `ID-${idx}`))
                            )
                        )
                    ))
                ))
                .then(hashResps =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        Promise.all(swarm.getSentries('client').map(sentry =>
                                checkHashEndpoint(sentry, hashResp.hash, `nft-${idx}`)
                                    .then(sentry => checkVendorIdEndpoint(bz.url, sentry, `ID-${idx}`, 'mintable', `nft-${idx}`))
                            )
                        )
                    ))
                )
        });

        it.skip('should allow many clients to upload in parallel', () => {
            return Promise.all<UploadNftResult>(
                times(2).map((idx) =>
                    uploadNft(getSentryUrl(swarm), encodeData(`nft-${idx}`), `vendor-${idx}`)
                )
            )
                .then(passThroughAwait((hashResps) =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        createMintedBz(bz)
                            .then(newBz => newBz.createNft(`ID-${idx}`, hashResp.hash, `vendor-${idx}`, "myUserId", 'text/plain', "", defaultGasParams()))
                    ))
                ))
                .then(passThroughAwait((hashResps) =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        Promise.all(swarm.getDaemons().map(daemon =>
                                checkFileReplication(daemon, hashResp.hash, `nft-${idx}`.length)
                                    .then(() => checkInfoFileReplication(daemon, hashResp.hash))
                                    .then(() => checkVendorInfoFileReplication(daemon, "mintable", `ID-${idx}`))
                            )
                        )
                    ))
                ))
                .then(hashResps =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        Promise.all(swarm.getSentries('client').map(sentry =>
                                checkHashEndpoint(sentry, hashResp.hash, `nft-${idx}`)
                                    .then(sentry => checkVendorIdEndpoint(bz.url, sentry, `ID-${idx}`, 'mintable', `nft-${idx}`))
                            )
                        )
                    ))
                )
        });

        it('should allow a client to send of sequential creates', () => {
            let queue: Promise<unknown> = Promise.resolve();
            const queueHead = queue;
            return Promise.all<UploadNftResult>(
                times(3).map((idx) =>
                    uploadNft(getSentryUrl(swarm), encodeData(`nft-${idx}`), "mintable")
                )
            )
                .then(passThroughAwait((hashResps) =>
                    Promise.all(hashResps.map((hashResp, idx) => {
                            queue = queue
                                .then(() => bz.createNft(`ID-${idx}`, hashResp.hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams()))
                            return queueHead
                        }
                    ))
                ))
                .then(passThroughAwait((hashResps) =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        Promise.all(swarm.getDaemons().map(daemon =>
                                checkFileReplication(daemon, hashResp.hash, `nft-${idx}`.length)
                                    .then(() => checkInfoFileReplication(daemon, hashResp.hash))
                                    .then(() => checkVendorInfoFileReplication(daemon, "mintable", `ID-${idx}`))
                            )
                        )
                    ))
                ))
                .then(hashResps =>
                    Promise.all(hashResps.map((hashResp, idx) =>
                        Promise.all(swarm.getSentries('client').map(sentry =>
                                checkHashEndpoint(sentry, hashResp.hash, `nft-${idx}`)
                                    .then(sentry => checkVendorIdEndpoint(bz.url, sentry, `ID-${idx}`, 'mintable', `nft-${idx}`))
                            )
                        )
                    ))
                )
        });


        it('should allow two clients (vendors) to facilitate createNft() in parallel to different sentries', async () => {
            const newBz = await createBz(bz);
            const id = Date.now().toString()
            await Promise.all([
                uploadNft(getSentryUrl(swarm), encodeData('binance nft'), 'binance'),
                uploadNft(getSentryUrl(swarm, 1), encodeData('mintable nft'), 'mintable')]
            )
                .then(passThroughAwait(([binanceResp, mintableResp]) =>
                    Promise.all([
                        bz.createNft(id, binanceResp.hash, "binance", "myUserId", 'text/plain', "", defaultGasParams()),
                        newBz.createNft(id, mintableResp.hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())]
                    )
                ))
                .then(passThroughAwait(([binanceResp, mintableResp]) =>
                    Promise.all(swarm.getDaemons().map(daemon =>
                            checkFileReplication(daemon, binanceResp.hash, 'binance nft'.length)
                                .then(() => checkFileReplication(daemon, mintableResp.hash, 'mintable nft'.length))
                                .then(() => checkInfoFileReplication(daemon, binanceResp.hash))
                                .then(() => checkInfoFileReplication(daemon, mintableResp.hash))
                        )
                    )
                ))
                .then(([binanceResp, mintableResp]) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                            checkHashEndpoint(sentry, binanceResp.hash, 'binance nft')
                                .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'binance', 'binance nft'))
                                .then(() => checkHashEndpoint(sentry, mintableResp.hash, 'mintable nft'))
                                .then(sentry => checkVendorIdEndpoint(bz.url, sentry, id, 'mintable', 'mintable nft'))
                        )
                    )
                )
        });

        it.skip('should handle a large number of uploads', () => {
            const id = Date.now().toString();
            return Promise.all<string>(times(200).map(idx =>
                    uploadNft(getSentryUrl(swarm), encodeData(`nft-${idx}`), "mintable")
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

        it.skip('should handle large number of creates from multiple users', () => {
            const id = Date.now().toString();
            return Promise.all<string>(times(15).map(idx =>
                    uploadNft(getSentryUrl(swarm), encodeData(`nft-${idx}`), "mintable")
                        .then(passThroughAwait(({hash}) =>
                            createMintedBz(bz)
                                .then(newBz => newBz.createNft(
                                    id,
                                    hash,
                                    "mintable",
                                    "myUserId",
                                    "text/plain",
                                    "",
                                    defaultGasParams()
                                ))))
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