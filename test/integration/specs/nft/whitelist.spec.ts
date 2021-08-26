import {expect} from "chai";


import {API, bluzelle, mnemonicToAddress, uploadNft} from "bluzelle";
import {
    checkFileReplication,
    checkFileSize,
    getLargePayload, getMintedBz,
    getSentryUrl,
} from "../../helpers/nft-helpers";
import {Swarm} from "daemon-manager/lib/Swarm"
import {Daemon} from "daemon-manager/lib/Daemon"
import {defaultGasParams, getSwarmAndClient} from "../../helpers/bluzelle-client"
import {times} from 'lodash'
import {passThroughAwait} from "promise-passthrough";
import {Some} from "monet";

describe('whitelist', function()  {
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
            .then(passThroughAwait((clients : API[]) =>
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

    it('should replicate a file and charge for it', () => {
        let originalBal: number
        let nftHash: string
        return bz.getBNT({ubnt: true})
            .then(bal => originalBal = bal)
            .then(() => uploadNft(getSentryUrl(swarm), getLargePayload(50), "mintable"))
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
    });



});

const createWhitelist = (bz: API, addresses: string[]): Promise<void> =>
    bz.upsert("whitelist", JSON.stringify(addresses), defaultGasParams())
        .then(() => {})

const checkGasChargeIsZero = (swarm: Swarm, bz: API, id: string): Promise<unknown> => {
    let originalBal: number
    return bz.getBNT({ubnt: true})
        .then(bal => originalBal = bal)
        .then(() => uploadNft(getSentryUrl(swarm), getLargePayload(50), "mintable"))
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
        .then(remainingBal => expect(originalBal - remainingBal).to.equal(0))
}

const checkGasWasCharged = (swarm: Swarm, bz: API, id: string): Promise<unknown> => {
    let originalBal: number
    return bz.getBNT({ubnt: true})
        .then(bal => originalBal = bal)
        .then(() => uploadNft(getSentryUrl(swarm), getLargePayload(50), "mintable"))
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
        .then(remainingBal => expect(originalBal - remainingBal).to.be.greaterThan(0))
};


const getUserBalance = (swarm: Swarm, user: string): Promise<number> =>
    swarm.exec(`blzcli keys show ${user} -a`)
        .then(addr => swarm.exec(`blzcli q account ${addr}`))
        .then((resp: any) => parseInt(resp.value.coins[0].amount));

const checkUserWasNotCharged = (swarm: Swarm, bz: API, id: string, user: string): Promise<unknown> => {
    let originalBal: number
    return getUserBalance(swarm, user)
        .then(bal => originalBal = bal)
        .then(() => uploadNft(getSentryUrl(swarm), getLargePayload(50), "mintable"))
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
        .then(() => getUserBalance(swarm, user))
        .then(remainingBal => expect(remainingBal).to.equal(originalBal))
}

const clearWhitelist = (bz: API) =>
    bz.upsert('whitelist', '', defaultGasParams());