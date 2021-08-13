import {expect} from 'chai'

global.fetch = require('node-fetch')
import {
    checkFileReplication,
    checkFileSize,
    checkFileSizeFromEndpoint, checkHashEndpoint,
    checkInfoFileReplication, checkMimeType,
    checkTextFileContents, checkUpload, checkVendorIdEndpoint, checkVendorInfoFileReplication, createBz,
    createMintedBz, encodeData, fetchDataWithHash, fetchDataWithIdAndVendor,
    getAPIAndSwarm,
    getLargePayload,
    getSentryUrl, mattnetConfig,

} from "../../helpers/nft-helpers"
import {API} from "bluzelle/lib/API";

import {memoize, times} from "lodash"
import {GasInfo} from "bluzelle/lib/types/GasInfo";
import {uploadNft} from "bluzelle/lib/bluzelle-node";

import {Swarm} from 'daemon-manager/lib/Swarm'
import {Daemon} from 'daemon-manager/lib/Daemon'
import waitUntil from 'async-wait-until';
import {passThrough, passThroughAwait} from "promise-passthrough";
import {Some} from "monet";
import {UploadNftResult} from "bluzelle";


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const defaultGasParams = (gasInfo: GasInfo = {}): GasInfo => ({gas_price: 10, max_gas: 100000000, ...gasInfo})



describe("Store and retriving a NFT", function () {
    let bz: API
    let swarm: Swarm
    beforeEach(() => {

        return getAPIAndSwarm(mattnetConfig, true)
            .then(({bz: newBz, swarm: newSwarm}) => {
                bz = newBz
                swarm = newSwarm
            })
            .then(() => Promise.all(
                swarm.getDaemons()
                    .map(d => d.exec(`rm -rf .blzd/nft*`))
            ))
    });


    describe('replication on mattnet', () => {
        this.timeout(300000)
        it('should replicate a file', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/txt', "", defaultGasParams())))
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

        it('should replicate a file using a minted user', async () => {

            const mintedBz = await createMintedBz()

            const id = Date.now().toString()
            await uploadNft(getSentryUrl(), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => mintedBz.createNft(id, hash, "binance", "myUserId", 'text/txt', "", defaultGasParams())))
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
            return uploadNft(getSentryUrl(), new TextEncoder().encode('identical nft'), 'binance')
                .then(() => uploadNft(getSentryUrl(), new TextEncoder().encode('identical nft'), 'binance'))
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
            return uploadNft(getSentryUrl(), new TextEncoder().encode('identical nft'), 'binance')
                .then(({hash: hashResp}) => hashBinance = hashResp)
                .then(() => bz.createNft(id, hashBinance, "binance", "myUserId", 'text/txt', "", defaultGasParams()))
                .then(() => uploadNft(getSentryUrl(), new TextEncoder().encode('identical nft'), 'mintable'))
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
            return uploadNft(getSentryUrl(), data, 'binance')
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
            return uploadNft(getSentryUrl(), data, 'binance')
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
            return uploadNft(getSentryUrl(), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(passThroughAwait(({hash}) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                        checkFileReplication(sentry, hash, 7)
                            .then(daemon => checkInfoFileReplication(daemon, hash))
                    ))
                ))
                .then(({hash}) => fetchDataWithHash(hash))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.body).to.deep.equal(encodeData('new nft')))
                .then(() => fetchDataWithIdAndVendor(id, 'binance'))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.body).to.deep.equal(encodeData('new nft')))
        });

        it('should save and return the correct mime type', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(passThroughAwait(({hash}) =>
                    Promise.all(swarm.getSentries().map(sentry =>
                        checkFileReplication(sentry, hash, 7)
                            .then(daemon => checkInfoFileReplication(daemon, hash))
                            .then(daemon => checkMimeType(daemon, hash, 'text/plain'))
                    ))
                ))
                .then(({hash}) => fetchDataWithHash(hash))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.contentType).to.deep.equal('text/plain'))
                .then(() => fetchDataWithIdAndVendor(id, 'binance'))
                .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.contentType).to.deep.equal('text/plain'))
        });

        it('should be able to retrieve replicated files from different vendors', () => {
            let hashBinance: string;
            let hashMintable: string;
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(), new TextEncoder().encode('identical nft'), 'binance')
                .then(({hash: hashResp}) => hashBinance = hashResp)
                .then(() => bz.createNft(id, hashBinance, "binance", "myUserId", 'text/plain', "", defaultGasParams()))
                .then(() => uploadNft(getSentryUrl(), new TextEncoder().encode('identical nft'), 'mintable'))
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
                        checkVendorIdEndpoint(d, id, 'binance', 'identical nft')
                            .then(d => checkVendorIdEndpoint(d, id, 'mintable', 'identical nft'))
                    )
                ));
        });

        it('should be able to retrieve replicated files from endpoints from all client sentries', () => {
            const id = Date.now().toString()
            return uploadNft(getSentryUrl(), new TextEncoder().encode('new nft'), 'binance')
                .then(passThroughAwait(({hash}) => bz.createNft(id, hash, "binance", "myUserId", 'text/plain', "", defaultGasParams())))
                .then(({hash}) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                            checkFileReplication(sentry, hash, 7)
                                .then(() => checkInfoFileReplication(sentry, hash))
                                .then(() => checkHashEndpoint(sentry, hash, 'new nft'))
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'binance', 'new nft'))
                        )
                    )
                )
        });

        it('should allow two clients (vendors) to facilitate createNft() in parallel to the same sentry', async () => {
            const newBz = await createMintedBz();
            const id = Date.now().toString()
            await Promise.all([
                uploadNft(getSentryUrl(), encodeData('binance nft'), 'binance'),
                uploadNft(getSentryUrl(), encodeData('mintable nft'), 'mintable')]
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
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'binance', 'binance nft'))
                                .then(() => checkHashEndpoint(sentry, mintableResp.hash, 'mintable nft'))
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'mintable', 'mintable nft'))
                        )
                    )
                )
        });

        it.skip('should allow one client to send 3 createNft() in parallel to the same sentry', async () => {
            const id = Date.now().toString()
            await Promise.all([
                uploadNft(getSentryUrl(), encodeData('binance nft'), 'binance'),
                uploadNft(getSentryUrl(), encodeData('mintable nft'), 'mintable'),
                uploadNft(getSentryUrl(), encodeData('crypto nft'), 'crypto')]
            )
                .then(passThroughAwait(([binanceResp, mintableResp, cryptoResp]) =>
                    bz.withTransaction(() => {
                        bz.createNft(id, binanceResp.hash, "binance", "myUserId", 'text/plain', "", defaultGasParams()),
                            bz.createNft(id, mintableResp.hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())
                            bz.createNft(id, cryptoResp.hash, "crypto", "myUserId", 'text/plain', "", defaultGasParams())
                    })

                ))
                .then(passThroughAwait(([binanceResp, mintableResp, cryptoResp]) =>
                    Promise.all(swarm.getDaemons().map(daemon =>
                            checkFileReplication(daemon, binanceResp.hash, 'binance nft'.length)
                                .then(() => checkFileReplication(daemon, mintableResp.hash, 'mintable nft'.length))
                                .then(() => checkFileReplication(daemon, cryptoResp.hash, 'crypto nft'.length))
                                .then(() => checkInfoFileReplication(daemon, cryptoResp.hash))
                                .then(() => checkInfoFileReplication(daemon, binanceResp.hash))
                                .then(() => checkInfoFileReplication(daemon, mintableResp.hash))
                        )
                    )
                ))
                .then(([binanceResp, mintableResp, cryptoResp]) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                            checkHashEndpoint(sentry, binanceResp.hash, 'binance nft')
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'binance', 'binance nft'))
                                .then(() => checkHashEndpoint(sentry, mintableResp.hash, 'mintable nft'))
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'mintable', 'mintable nft'))
                                .then(() => checkHashEndpoint(sentry, cryptoResp.hash, 'crypto nft'))
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'crypto', 'crypto nft'))
                        )
                    )
                )
        });

        it('should allow one client to send 2 in parallel to the same sentry', async () => {
            const id1 = "id1"
            const id2 = "id2"
            await Promise.all([
                    uploadNft(getSentryUrl(), encodeData('nft 1'), 'mintable'),
                    uploadNft(getSentryUrl(), encodeData('nft 2'), 'mintable')]
            )
                .then(passThroughAwait((hashResps) =>
                    bz.withTransaction(() => {
                        bz.createNft(id1, hashResps[0].hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())
                        bz.createNft(id2, hashResps[1].hash, "mintable", "myUserId", 'text/plain', "", defaultGasParams())
                    })
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
                                    .then(sentry => checkVendorIdEndpoint(sentry, `id${idx + 1}`, 'mintable', `nft ${idx + 1}`))
                            )
                        )
                    ))

                )
        });

        it.skip('should allow one client to send many createNft() in parallel to the same sentry', () => {
            return Promise.all<UploadNftResult>(
                times(3).map((idx) =>
                    uploadNft(getSentryUrl(), encodeData(`nft-${idx}`), "mintable")
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
                                    .then(sentry => checkVendorIdEndpoint(sentry, `ID-${idx}`, 'mintable', `nft-${idx}`))
                            )
                        )
                    ))
                )
        });

        it.skip('should allow many clients to upload in parallel', () => {
            return Promise.all<UploadNftResult>(
                times(2).map((idx) =>
                    uploadNft(getSentryUrl(), encodeData(`nft-${idx}`), `vendor-${idx}`)
                )
            )
                .then(passThroughAwait((hashResps) =>
                        Promise.all(hashResps.map((hashResp, idx) =>
                            createMintedBz()
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
                                    .then(sentry => checkVendorIdEndpoint(sentry, `ID-${idx}`, 'mintable', `nft-${idx}`))
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
                    uploadNft(getSentryUrl(), encodeData(`nft-${idx}`), "mintable")
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
                                    .then(sentry => checkVendorIdEndpoint(sentry, `ID-${idx}`, 'mintable', `nft-${idx}`))
                            )
                        )
                    ))
                )
        });



        it('should allow two clients (vendors) to facilitate createNft() in parallel to different sentries', async () => {
            const newBz = await createBz(bz, 'https://3.24.28.51:1317');
            const id = Date.now().toString()
            await Promise.all([
                uploadNft(getSentryUrl(), encodeData('binance nft'), 'binance'),
                uploadNft('https://3.24.28.51:1317', encodeData('mintable nft'), 'mintable')]
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
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'binance', 'binance nft'))
                                .then(() => checkHashEndpoint(sentry, mintableResp.hash, 'mintable nft'))
                                .then(sentry => checkVendorIdEndpoint(sentry, id, 'mintable', 'mintable nft'))
                        )
                    )
                )
        });

        it.skip('should handle a large number of uploads', () => {
            const id = Date.now().toString();
            return Promise.all<string>(times(200).map(idx =>
                    uploadNft(getSentryUrl(), encodeData(`nft-${idx}`), "mintable")
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
                    uploadNft(getSentryUrl(), encodeData(`nft-${idx}`), "mintable")
                        .then(passThroughAwait(({hash}) =>
                            createMintedBz()
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
                                        .then(sentry => checkVendorIdEndpoint(sentry, id, 'mintable', `nft-${idx}`))
                                )))
                        )
                    )
                ))
        });


        it.skip('should replicate a large number of files', () => {
            const id = Date.now().toString();
            return Promise.all<string>(times(200).map(idx =>
                    uploadNft(getSentryUrl(), encodeData(`nft-${idx}`), "mintable")
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
                                        .then(sentry => checkVendorIdEndpoint(sentry, id, 'mintable', `nft-${idx}`))
                                )))
                        )
                    )
                ))
        });


        it('should allow a single blz client to createNfts in parallel', () => {
            const id = Date.now().toString()
            return Promise.all<UploadNftResult>(times(2).map(
                    idx => uploadNft(getSentryUrl(), encodeData(`nft-${idx}`), "mintable")
                )
            )
                .then(x => x)
                .then(passThroughAwait((uploadResults) =>
                    Promise.all(uploadResults.map((result, idx) =>
                            bz.createNft(id, result.hash, 'mintable', `user-${idx}`, "text/plain", "", defaultGasParams())
                        )
                    )
                ))
                .then(x => x)
                .then(passThroughAwait((uploadResults) =>
                    Promise.all(swarm.getDaemons().map(daemon =>
                            Promise.all(uploadResults.map((result, idx) =>
                                checkFileReplication(daemon, result.hash, `nft-${idx}`.length)
                                    .then(() => checkInfoFileReplication(daemon, result.hash))
                            ))
                        )
                    )
                ))
                .then((uploadResults) =>
                    Promise.all(swarm.getSentries('client').map(sentry =>
                            Promise.all(uploadResults.map((result, idx) =>
                                checkHashEndpoint(sentry, result.hash, `nft-${idx}`)
                                    .then(() => checkVendorIdEndpoint(sentry, id, 'mintable', `nft-${idx}`))
                            ))
                        )
                    )
                )
        });



        it('should handle large number of uploads of large files', () => {
            const id = Date.now().toString();
            return Promise.all<string>(times(200).map(idx =>
                    uploadNft(getSentryUrl(), getLargePayload(idx), "mintable")
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