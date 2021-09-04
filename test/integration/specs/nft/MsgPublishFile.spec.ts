import {defaultGasParams, getSwarmAndClient} from "../../helpers/bluzelle-client";
import {Swarm} from "daemon-manager/lib/Swarm";
import {API} from "bluzelle";
import chai from 'chai'
import asPromised from 'chai-as-promised'
import createTorrent from 'create-torrent'


chai.use(asPromised);

describe('MsgPublishFile', function () {
    this.timeout(400_000);
    let bz: API
    let swarm: Swarm

    beforeEach(() => {
        return getSwarmAndClient()
            .then(({bz: newBz, swarm: newSwarm}) => {
                bz = newBz
                swarm = newSwarm
                bz.uuid = 'bluzelle'
            })
            .then(() => bz.upsert("nft-whitelist", JSON.stringify([bz.address]), defaultGasParams()))
            .then(() => Promise.all(swarm.getDaemons().map(daemon =>
                daemon.exec(`rm -rf ${daemon.getNftBaseDir()}/nft*`)
            )))
    });

    it('should be rejected if the metainfo includes tracker info', (done) => {
        new Promise((resolve) =>
            createTorrent(Buffer.from(''), {
                name: 'name',
                comment: 'comment',
                createdBy: 'createdBy',
                creationDate: Date.now(),
                private: true,
                pieceLength: 60,
                announceList: [['sometracker']],
                urlList: [],
                info: {}
            }, (err, torrent) => resolve(torrent))
        )
            .then(torrent =>
                bz.sendMessage({
                    type: 'nft/PublishFile',
                    value: {
                        creator: bz.address,
                        id: 'my-id',
                        vendor: 'vendor',
                        metainfo: Array.from(torrent as Uint8Array)
                    }
                }, defaultGasParams())
            )
            .then(x => done("should have been rejected with error"))
            .catch(e => e.error === 'Invalid torrent metainfo in publish' ? done() : done(`wrong error: ${e.error}`))
    });


})