import {getSwarmAndClient} from "../../helpers/bluzelle-client";
import {Swarm} from "daemon-manager/lib/Swarm";
import {API, uploadNft} from "bluzelle";
import {getSentryUrl} from "../../helpers/nft-helpers";

describe('nft upload', function() {
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

    it('should send a 403 if upload has not been authorized', () => {
        uploadNft(getSentryUrl(swarm), new TextEncoder().encode('data'), '1111', 'mintable')
            .then(x => x)
            .catch(e => e)


    })
})