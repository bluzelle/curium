import {expect} from "chai";
import {passThrough} from "promise-passthrough";
import {API, bluzelle} from "bluzelle";
import {Some} from "monet";
import {Swarm} from "daemon-manager/lib/Swarm"
import {Daemon} from "daemon-manager/lib/Daemon"
import {waitUntil} from "async-wait-until"
import {memoize} from 'lodash'
import {SwarmConfig, SentryTypes, PruningTypes} from 'daemon-manager/lib/SwarmConfig'
import {defaultGasParams} from "./bluzelle-client";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


export const getSentryUrl = (port: number = 1317): string =>
    `https://18.142.15.86:${port}`;

export const encodeData = (data: string): Uint8Array => new TextEncoder().encode(data);

export const decodeData = (data: Uint8Array): string => new TextDecoder().decode(data)

export type APIAndSwarm = { bz: API, swarm: Swarm }

export const getAPIAndSwarm = (config: SwarmConfig = mattnetConfig, reimage: boolean = false): Promise<APIAndSwarm> =>
    Swarm.stopDaemons(config)
        .then(() => new Swarm(config).start({reimage}))
        .then(swarm => swarm.connect())
        .then(swarm =>
            swarm.getValidators()[0].getAuth()
                .then(auth => auth.mnemonic)
                .then(mnemonic => bluzelle({
                    mnemonic,
                    endpoint: getSentryUrl(),
                    uuid: "uuid",
                }))
                .then(bz => ({
                    bz,
                    swarm
                }))
        );

export const createBz = (bz: API, url: string = getSentryUrl()): API =>
    Some(bz.generateBIP39Account())
        .map(mnemonic => bluzelle({
            mnemonic,
            uuid: Date.now().toString(),
            endpoint: url,
        }))
        .map(async (newBz) => {
            await bz.transferTokensTo(newBz.address, 100000, defaultGasParams(), {ubnt: true})
            return newBz
        })
        .join();

export const createMintedBz = (url: string = getSentryUrl()): Promise<API> =>
    fetch(`${url}/mint`)
        .then(x => x.arrayBuffer().then(buf => ({x, buf})))
        .then(resp => ({
            body: new Uint8Array(resp.buf),
            contentType: resp.x.headers.get('content-type') || ''
        }))
        .then(({body}) => new TextDecoder().decode(body))
        .then(x => JSON.parse(x))
        .then(resp => resp.mnemonic)
        .then(mnemonic => bluzelle({
            mnemonic,
            endpoint: getSentryUrl(),
            uuid: Date.now().toString(),
        }));


export const checkFileReplication = (daemon: Daemon, hash: string, fileSize: number): Promise<Daemon> =>
    waitUntil(() =>
            daemon.exec(`stat -c "%s" .blzd/nft/${hash}`)
                .then(resp => /^[0-9]*$/.test(resp) ? resp : '0')
                .then(parseInt)
                .then(size => size === fileSize)
        , {timeout: 50000}
    )
        .then(() => console.log("File replicated on ", daemon.getName()))
        .then(() => daemon);

export const checkInfoFileReplication = (daemon: Daemon, hash: string): Promise<Daemon> =>
    waitUntil(() =>
            daemon.exec(`ls .blzd/nft/${hash}.info`)
                .then(x => /No such file/.test(x) === false)
        , {timeout: 50000}
    )
        .then(() => console.log("Metadata file replicated on ", daemon.getName()))
        .then(() => daemon);

export const checkUpload = (daemon: Daemon, hash: string, vendor: string): Promise<Daemon> =>
    waitUntil(() =>
            daemon.exec(`ls .blzd/nft-upload/${vendor}/${hash}*`)
                .then(x => /No such file/.test(x) === false)
        , {timeout: 50000}
    )
        .then(() => console.log("Files were uploaded", daemon.getName()))
        .then(() => daemon);

export const checkVendorInfoFileReplication = (daemon: Daemon, vendor: string, id: string): Promise<Daemon> =>
    waitUntil(() =>
            daemon.exec(`ls .blzd/nft/${vendor}-${id}.info`)
                .then(x => /No such file/.test(x) === false)
        , {timeout: 50000}
    )
        .then(() => console.log("Metadata file replicated on ", daemon.getName()))
        .then(() => daemon);

export const checkMimeType = (daemon: Daemon, hash: string, mimeType: string): Promise<Daemon> =>
    daemon.exec(`cat .blzd/nft/${hash}.info`)
        .then(resp => expect(resp.Mime).to.equal(mimeType))
        .then(() => daemon)

export const checkFileSize = (daemon: Daemon, hash: string, size: number): Promise<Daemon> =>
    daemon.exec(`stat -c "%s" .blzd/nft/${hash}`)
        .then(parseInt)
        .then(fileSize => expect(fileSize).to.equal(size))
        .then(() => console.log("File size matches on ", daemon.getName()))
        .then(() => daemon);

export const checkFileSizeFromEndpoint = (daemon: Daemon, hash: string, size: number): Promise<Daemon> =>
    fetchDataWithHash(hash)
        .then((resp: { body: Uint8Array, contentType: string }) => {
            expect(resp.body.length).to.equal(size)
            console.log("File size from endpoint matches on ", daemon.getName())
        })
        .then(() => daemon);

export const checkTextFileContents = (daemon: Daemon, hash: string, contents: string): Promise<Daemon> =>
    daemon.exec(`cat .blzd/nft/${hash}`)
        .then(resp => expect(resp).to.equal(contents))
        .then(() => console.log("File contents matches on ", daemon.getName()))
        .then(() => daemon);

export const checkHashEndpoint = (daemon: Daemon, hash: string, contents: string): Promise<Daemon> =>
    daemon.getIPAddress()
        .then(ip => fetchDataWithHash(hash, `https://${ip}:${daemon.getRestPort().toString()}`))
        .then((resp: { body: Uint8Array, contentType: string }) => {
            console.log(decodeData(resp.body))
            expect(resp.body).to.deep.equal(encodeData(contents))
            console.log("File contents from endpoint matches on ", daemon.getName())

        })
        .then(() => daemon);

export const checkHashEndpointBytes = (daemon: Daemon, hash: string, contents: Uint8Array): Promise<Daemon> =>
    daemon.getIPAddress()
        .then(ip => fetchDataWithHash(hash, `https://${ip}:${daemon.getRestPort().toString()}`))
        .then((resp: { body: Uint8Array, contentType: string }) => {
            console.log(decodeData(resp.body))
            expect(resp.body).to.deep.equal(contents)
        })
        .then(() => daemon);

export const checkVendorIdEndpoint = (daemon: Daemon, id: string, vendor: string, contents: string): Promise<Daemon> =>
    daemon.getIPAddress()
        .then(ip => {
            console.log(ip)
            return fetchDataWithIdAndVendor(id, vendor, `https://${ip}:${daemon.getRestPort().toString()}`)
        })
        .then(passThrough(() => console.log("Request made to", id, vendor)))
        .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.body).to.deep.equal(encodeData(contents)))
        .then(() => console.log("File contents from endpoint matches on ", daemon.getName()))
        .then(() => daemon);

export const checkVendorIdEndpointBytes = (daemon: Daemon, id: string, vendor: string, contents: Uint8Array): Promise<Daemon> =>
    daemon.getIPAddress()
        .then(ip => fetchDataWithIdAndVendor(id, vendor, `https://${ip}:${daemon.getRestPort().toString()}`))
        .then((resp: { body: Uint8Array, contentType: string }) => expect(resp.body).to.deep.equal(contents))
        .then(() => daemon);

export const getLargePayload = memoize<(length: number) => Uint8Array>((length) => {
    return new Uint8Array(length * 1024 * 1024).map((v, idx) => idx % 256)
});

export const fetchData = (hash: string = '', {id, vendor}: { id?: string, vendor?: string }): Promise<unknown> =>
    (id ? fetch(`${getSentryUrl()}/nft/${vendor}/${id}`) : fetch(`${getSentryUrl()}/nft/${hash}`))
        .then(resp => resp);

export const fetchDataWithIdAndVendor = (id: string, vendor: string, url: string = getSentryUrl()) =>
    fetch(`${url}/nft/${vendor}/${id}`)
        .then(x => x.arrayBuffer().then(buf => ({x, buf})))
        .then(resp => ({
            body: new Uint8Array(resp.buf),
            contentType: resp.x.headers.get('content-type') || ''
        }));
export const fetchDataWithHash = (hash: string, url: string = getSentryUrl()) =>
    fetch(`${url}/nft/${hash}`)
        .then(x => x.arrayBuffer().then(buf => ({x, buf})))
        .then(resp => ({
            body: new Uint8Array(resp.buf),
            contentType: resp.x.headers.get('content-type') || ''
        }));

export const mattnetConfig = {
    feeBp: 0,
    transferBp: 0,
    maxInboundPeers: 400,
    maxOutboundPeers: 100,
    corsAllowedOrigins: [],
    pruning: 'nothing' as PruningTypes,
    upnp: false,
    commissionRate: 0.1,
    commissionMaxChangeRate: 0.01,
    commissionMaxRate: 0.2,
    minSelfDelegation: 1,
    gasAdjustment: 1.2,
    logDir: 'logs',
    genesisTokenBalance: 50 * 1000 * 1000,
    chainId: 'bluzelle',
    bluzelleCrud: false,
    bluzelleFaucet: true,
    communityTax: 0.0001,
    baseProposerReward: 0.01,
    bonusProposerReward: 0.04,
    signedBlocksWindow: 1000,
    minSignedPerWindow: 0.5,
    downtimeJailDuration: 600,
    slashFractionDoubleSign: 0.05,
    slashFractionDowntime: 0.0001,
    unbondingTime: 1814400,
    maxValidators: 100,
    minGasPrice: 0.000000002,
    denom: 'bnt',
    monikerBase: 'daemon',
    privateKey: getPrivateKey(),
    targetBranch: 'temp',
    oracleAdmin: "bluzelle1ducse9gtmu34n6dyq3e70x53ata7nka6qa0w82",
    govMinDepositAmount: 10000000,
    govMaxDepositPeriod: 172800,
    govVotingPeriod: 172800,
    govTallyQuorum: 0.334,
    govTallyThreshold: 0.5,
    govTallyVeto: 0.334,
    ssl: false,
    taxCollector: "bluzelle1ducse9gtmu34n6dyq3e70x53ata7nka6qa0w82",
    daemons: ['54.79.213.230',
        '18.142.15.86',
        '65.1.186.244',
        '3.24.28.51',
        '13.213.216.27',
        '54.179.6.127',
        '3.37.164.193',
        '3.37.151.39',
        '3.36.7.190',
        '18.139.187.86'
    ].map((ip, idx) => ({
        host: ip,
        privateKey: getPrivateKey(),
        sentry: idx === 1 || idx === 3 ? 'client' : ((idx % 2 ? 'sandbox' : undefined) as SentryTypes)
    }))
}

function getPrivateKey() {
    return '-----BEGIN RSA PRIVATE KEY-----\n' +
        'MIIEowIBAAKCAQEAvRO0Stz5E0m570nsuzWOYey2s4XXRAIHcuQVtlqb4VzEIha0\n' +
        'FYWzhTFyvn0qQ1fgo65VDtZiP/DvuMK8ajTpmo+Wesa++MKGNv9SWVxCvKF7iUfl\n' +
        'fnU/FO8MPS9PA/n3wyyuG1O89DBJRao8H7AjaK0+P2sgOuVc2c/NUC1/bYdJbT+z\n' +
        '4p1FNKr99Hq+03fdGTsXirq5fG+WlpgMuSMflWtq6zhlE7dQGIVpB63Qy/hCmQzW\n' +
        'WWSLhSmJ4IDMufB/gpJ3hqME6KTszBxl+f9WHFnetgeviEE70Rf4f5Yb1RWrZK1e\n' +
        'ecyPs7aiczrrLjaVqUAnUMlutquk2FWbIB20TwIDAQABAoIBAEDB9OgHEs/GWoZY\n' +
        'PVpJF4D2gASwfG/wefihocYY9naTPSGnwPn2FuwxaWlQmR8DhA7LcJpqVrArpw8S\n' +
        's1F02eVz9EgMte+hQDKp89xjOwA8FoGIPFO5eGeFEB4Mi/WCsZcJQIBfh8Hin9Xa\n' +
        'XklEHHyHiWBTInDJiamYAGvLiW9LZYrv34zWGHTHPqWV3hUPqtG6mO90su7hRiDs\n' +
        'PVim8StBH23ndNKVW70m1O2bLIZJg/S6hMcDPoEOnm7occ1WQ9GvK1zHxbuVEH08\n' +
        'j9BUF+WT8yhQz7FIp7oe2UDkt/GN8l9i92WteYslGOgAtdY7VvhDxDdcR2jWjGlX\n' +
        'GoOrc1ECgYEA69abVbU9HWTSVWHXETWsvwgrKfxpudeR7zA0YHE+FCstPWHvoB2D\n' +
        'DW1YueVJ9R0wgRW2co0/WfwNyCpChbIX6OKeAS5OVlO/RMa+F8jDuviNvyp/nYHv\n' +
        'L6x9rbu6eN6txLkAdpPp9JPooTevyzLOGbP1xzQgLUXVW1RubjLSAHsCgYEAzT22\n' +
        'G9Y4s6bh5zkmEM7K9YolXK/lt6L+NyvJFaGmYwEbXI80b+bT86AJX3P1YuiJF967\n' +
        'oKkhmFC7OrP/cyX0cwqU8ZEdkQEIGVymwwQ6qxCvH3k87uVPXfo8xubTkzKO0PZ6\n' +
        'WWrh0QSVr4N3/SmtRDEFtgCwqQJ1X/Bk9AGklT0CgYAzE+3cqD4uSZHMcD5WOdvK\n' +
        'HAjNNR/o4il3NmeBo8UgNSG9M6LkeL/TfqVCzcgw0DubGYrEUJcx9AdAHPb/Yc0P\n' +
        '4VT7SH4q8ERyruCo4hCSRBbfGmM9R9D38FHf+NKwLvpPqwnQpMR89jPiBt+KENzW\n' +
        'cEWA+WcmpwNInoa0U0lsVQKBgQCcN7uUJpMUExLhZztVEcGj8RmNGgl0pChxH++3\n' +
        'eknmE6Ka6hlUj1KGnipkMCP3u90VgSA5ImMCx3grL3RhVeNhaQ2DbRwfEbTzcPUx\n' +
        'fNeW+2UARMyfXYTymBSIpIsoABR6cxEfXF4zNRUl+aBr3rwWKmYZaR8OFWP3uUdt\n' +
        '/o4iVQKBgH6AVcplpVT0O85Ghgb4p91VEPBuwapSi3uGwoCt+KuyxNitozAelLcF\n' +
        'aw3RFY6jn7qUDLWEAnUKXIjsU+CoU5wIVFu3KYqYdGwlQP6UtZsWImO3dliqSJ3q\n' +
        '6CVD47YwZBQFtKuHuQ4j51Ufg3WonVJ4mjSTB1tBxdla0CY9F2So\n' +
        '-----END RSA PRIVATE KEY-----\n'
}
