
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
import {getSwarm} from "@bluzelle/testing/lib/helpers/swarmHelpers"
import {times} from 'lodash'
import {passThroughAwait} from "promise-passthrough";

describe('whitelist', function()  {
    this.timeout(6000000);
    let bz: API

    beforeEach(() => getAPIAndSwarm()
        .then(apiAndSwarm => bz = apiAndSwarm.bz)
    )
    // beforeEach(() => getSwarm()
    //     .then(swarm => swarm.getValidators()[0].getAuth())
    //     .then(auth => bz = bluzelle({
    //         endpoint: getSentryUrl(),
    //         mnemonic: auth.mnemonic,
    //         uuid: "uuid"
    //     }))
    // )


    it('should not charge for accounts on the whitelist', () => {
        return bz.create("WHITELIST", bz.address, defaultGasParams())
            .then(() => checkGasChargeIsZero(bz, "myNftId"))
    });

    it('should not charge for all accounts on the whitelist', () => {
        return Promise.all<API>(times(10).map(() =>
            createMintedBz()
        ))
            .then(passThroughAwait((clients : API[]) =>
                Promise.all(clients.map(client => client.address))
                    .then(addresses => bz.create("WHITELIST", addresses.toString(), defaultGasParams())
            )))
            .then((clients: API[]) => Promise.all(clients.map((client, idx) => checkGasChargeIsZero(client, `nft-id-${idx}`))))

    });

    it('should charge for any other address not on the whitelist', () => {
        return Promise.all<API>(times(2).map(() =>
            createMintedBz()
        ))
            .then(passThroughAwait((clients : API[]) =>
                Promise.all(clients.map(client => client.address))
                    .then(addresses => bz.create("WHITELIST", addresses.toString(), defaultGasParams())
                    )))
            .then(() => createBz(bz))
            .then(newBz => checkGasWasCharged(newBz, "newBzId"))
    });

    it("should everybody if the whitelist is empty", () => {
        return Promise.all<API>(times(10).map(() =>
            createMintedBz()
        ))
            .then(passThroughAwait((clients : API[]) =>
                Promise.all(clients.map(client => client.address))
                    .then(addresses => bz.create("WHITELIST", addresses.toString(), defaultGasParams())
                    )))
            .then((clients: API[]) => Promise.all(clients.map((client, idx) => checkGasChargeIsZero(client, `nft-id-${idx}`))))

    });



});



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