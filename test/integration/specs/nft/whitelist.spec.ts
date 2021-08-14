
import {expect} from "chai";


import {API, bluzelle, uploadNft} from "bluzelle";
import {
    createBz,
    createMintedBz,
    encodeData,
    getAPIAndSwarm,
    getLargePayload,
    getSentryUrl, mattnetConfig,
} from "../../helpers/nft-helpers";

import {defaultGasParams} from "../../helpers/bluzelle-client"
import {times} from 'lodash'
import {passThroughAwait} from "promise-passthrough";

describe('whitelist', function()  {
    this.timeout(6000000);
    let bz: API

    beforeEach(() => getAPIAndSwarm(mattnetConfig)
        .then(({bz: newBz}) => bz = newBz)
    )
    // beforeEach(() =>
    //     bz = bluzelle({
    //         endpoint: "http://localhost:1327",
    //         mnemonic: "crater trade start fresh dance else leg other dwarf flavor talk enough interest sleep woman hotel myself diet fetch recycle remove range subject myself",
    //         uuid: "uuid"
    //     })
    // )



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
            .then(() => createBz(bz))
            .then(newBz => checkGasWasCharged(newBz, "newBzId"))
    });

    it.skip("should charge not charge for large number of accounts on whitelist", () => {
        return Promise.all<API>(times(10).map(() =>
            createMintedBz()
        ))
            .then(passThroughAwait((clients : API[]) =>
                Promise.all(clients.map(client => client.address))
                    .then(addresses => createWhitelist(bz, addresses.toString())
                    )))
            .then((clients: API[]) => Promise.all(clients.map((client, idx) => checkGasChargeIsZero(client, `nft-id-${idx}`))))

    });

    it('should charge for creating an nft', () => {
        return checkGasWasCharged(bz, "myNftId")
    })



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
}