
import {expect} from "chai";


import {API, bluzelle, uploadNft} from "bluzelle";
import {
    checkFileReplication, checkFileSize, checkInfoFileReplication, checkTextFileContents,
    createBz,
    createMintedBz,
    encodeData,
    getAPIAndSwarm,
    getLargePayload,
    getSentryUrl, mattnetConfig,
} from "../../helpers/nft-helpers";
import {Swarm} from "daemon-manager/lib/Swarm"
import {Daemon} from "daemon-manager/lib/Daemon"
import {defaultGasParams} from "../../helpers/bluzelle-client"
import {times} from 'lodash'
import {passThroughAwait} from "promise-passthrough";
import {Some} from "monet";
import {mnemonicToAddress} from "../../../../blzjs/client";

describe('whitelist', function()  {
    this.timeout(6000000);
    let bz: API
    let swarm: Swarm
    beforeEach(() => getAPIAndSwarm(mattnetConfig)
        .then(({bz: newBz, swarm: newSwarm}) => {
            bz = newBz
            swarm = newSwarm
        })
    )


    it('should not charge for accounts on the whitelist', () => {
        return createWhitelist(bz, bz.address)
            .then(() => checkGasChargeIsZero(bz, "myNftId"))
    });

    it('should not charge for all accounts on the whitelist', () => {
        return Promise.all<API>(times(2).map(() =>
            createMintedBz()
        ))
            .then(passThroughAwait((clients : API[]) =>
                Promise.all(clients.map(client => client.address))
                    .then(addresses => createWhitelist(bz, addresses.toString())
            )))
            .then((clients: API[]) => Promise.all(clients.map((client, idx) => checkGasChargeIsZero(client, `nft-id-${idx}`))))

    });

    it('should charge for any other address not on the whitelist', () => {
        return Promise.all<API>(times(2).map(() =>
            createMintedBz()
        ))
            .then(passThroughAwait((clients : API[]) =>
                Promise.all(clients.map(client => client.address))
                    .then(addresses => createWhitelist(bz, addresses.toString())
                    )))
            .then(() => checkGasWasCharged(bz, "newBzId"))
    });

    it("should charge not charge for large number of accounts on whitelist", () => {
        return Promise.all<string>(times(50).map(() =>
            Some(bz.generateBIP39Account())
                .map(mnemonic => mnemonicToAddress(mnemonic, false))
                .join()
        ))
            .then((addresses: string[]) => {
                addresses.push(bz.address)
                return createWhitelist(bz, addresses.toString())
                })
            .then(() => checkGasChargeIsZero(bz, "myNftId"))
            .then(() => createMintedBz())
            .then(newBz => checkGasWasCharged(newBz, "non-whitelisted nft"))
    });

    it('should charge for creating an nft', () => {
        return checkGasWasCharged(bz, "myNftId")
    });

    it('should replicate a file and charge for it', () => {
        let originalBal: number
        let nftHash: string
        return bz.getBNT({ubnt: true})
            .then(bal => originalBal = bal)
            .then(() => uploadNft(getSentryUrl(), getLargePayload(50), "mintable"))
            .then(({hash}) => nftHash = hash)
            .then(() => bz.createNft(
                "myNftId",
                nftHash,
                "mintable",
                "myUserId",
                "text/plain",
                "",
                defaultGasParams()
            ))
            .then(() => bz.getBNT({ubnt: true}))
            .then(remainingBal => expect(remainingBal).to.be.lessThan(originalBal))
            .then(() =>
                Promise.all(swarm.getDaemons()
                    .map(daemon =>
                        checkFileReplication(daemon, nftHash, getLargePayload(50).byteLength)
                            .then((daemon: Daemon) => checkFileSize(daemon, nftHash, getLargePayload(50).byteLength))
                    )
                ))

    });

    it.skip('should not charge for nft users on local keyring', () => {
        return swarm.exec(`blzcli keys show nft -a`)
            .then((nftAddr: string) => createWhitelist(bz, nftAddr))
            .then(() => checkNftUserWasCharged(swarm, bz, "someNftId"))

    });



});

const createWhitelist = (bz: API, addresses: string): Promise<void> =>
    bz.create("bluzelle", addresses, defaultGasParams())
        .then(() => {})

const checkGasChargeIsZero = (bz: API, id: string): Promise<void> => {
    let originalBal: number
    return bz.getBNT({ubnt: true})
        .then(bal => originalBal = bal)
        .then(() => uploadNft(getSentryUrl(), getLargePayload(50), "mintable"))
        .then(({hash}) => bz.createNft(
            id,
            hash,
            "mintable",
            "myUserId",
            "text/plain",
            "",
            defaultGasParams()
        ))
        .then(() => bz.getBNT({ubnt: true}))
        .then(remainingBal => expect(remainingBal).to.equal(originalBal))
}

const checkGasWasCharged = (bz: API, id: string): Promise<void> => {
    let originalBal: number
    return bz.getBNT({ubnt: true})
        .then(bal => originalBal = bal)
        .then(() => uploadNft(getSentryUrl(), getLargePayload(50), "mintable"))
        .then(({hash}) => bz.createNft(
            id,
            hash,
            "mintable",
            "myUserId",
            "text/plain",
            "",
            defaultGasParams()
        ))
        .then(() => bz.getBNT({ubnt: true}))
        .then(remainingBal => expect(remainingBal).to.be.lessThan(originalBal))
};


const getNftUserBalance = (swarm: Swarm): Promise<number> =>
    swarm.exec(`blzcli keys show nft -a`)
        .then(addr => swarm.exec(`blzcli q account ${addr}`))
        .then((resp: any) => parseInt(resp.value.coins[0].amount));

const checkNftUserWasCharged = (swarm: Swarm, bz: API, id: string): Promise<void> => {
    let originalBal: number
    return getNftUserBalance(swarm)
        .then(bal => originalBal = bal)
        .then(() => uploadNft(getSentryUrl(), getLargePayload(50), "mintable"))
        .then(passThroughAwait(({hash}) => bz.createNft(
            id,
            hash,
            "mintable",
            "myUserId",
            "text/plain",
            "",
            defaultGasParams()
        )))
        .then(({hash}) =>
            Promise.all(swarm.getDaemons()
                .map(daemon =>
                    checkFileReplication(daemon, hash, getLargePayload(50).byteLength)
                        .then((daemon: Daemon) => checkFileSize(daemon, hash, getLargePayload(50).byteLength))
                )
            ))
        .then(() => getNftUserBalance(swarm))
        .then(remainingBal => expect(remainingBal).to.be.lessThan(originalBal))
}