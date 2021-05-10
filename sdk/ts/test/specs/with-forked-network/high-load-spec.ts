import {defaultLease, sentryWithClient} from "../../helpers/client-helpers/client-helpers";
import {expect} from 'chai'
import {DEFAULT_TIMEOUT} from "testing/lib/helpers/testHelpers";
import {range} from 'lodash'
import {Swarm} from "curium-control/daemon-manager/lib/Swarm";
import {SwarmConfig} from 'curium-control/daemon-manager/lib/SwarmConfig'
import {passThroughAwait} from "promise-passthrough";
import {bluzelle} from '../../../src/legacyAdapter/bluzelle-node'

describe('high-load-test', function () {
    this.timeout(DEFAULT_TIMEOUT);
    it('should store all of the keys', async () => {
        const bz = await sentryWithClient();

        await bz.withTransaction(() =>
            range(0, 100).map(l => bz.create(`foo${l}`, 'x'.repeat(l), defaultLease()))
        );
        await bz.withTransaction(() =>
            range(100000, 200000, 20000).map(l => bz.create(`foo${l}`, 'x'.repeat(l), defaultLease()))
        );

        const swarm2: Swarm | undefined | void = await bz.swarm?.export()
            .then(passThroughAwait(() => Swarm.stopDaemons(bz.swarm?.getSwarmConfig() || ({} as SwarmConfig))))
            .then(genesis =>
                new Swarm(bz.swarm?.getSwarmConfig() || ({} as SwarmConfig)).fork(genesis)
            )


        const bz2 = bluzelle({
            mnemonic: bz.mnemonic,
            endpoint: `http://localhost:${(swarm2 as Swarm).getSentries()[0].getRestPort()}`,
            uuid: bz.uuid
        })
        expect(await bz2.read('foo0')).to.equal('');
        expect(await bz2.read('foo20')).to.equal('x'.repeat(20))
        expect(await bz2.read('foo100000')).to.equal('x'.repeat(100000));


    })
});