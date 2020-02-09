import {expect} from 'chai'
import {startDaemon, stopDaemons} from "../control/manager";

const {bluzelle} = require('../scripts/blz-tmclient/lib/bluzelle-node');

let bz;
beforeEach(async () => {
    await stopDaemons();
    const daemon = await startDaemon('daemon1');
    console.log(await daemon.status())
    // bz = await bluzelle({
    //     address: '6d4fd6b408572a31986bfa8a3b252a9130e270a2',
    //     mnemonic: 'uniform tumble fragile define modify boy burger nose lizard hub shine novel brass document aerobic tomorrow jaguar now since sentence person auction dignity miss',
    //     endpoint: "http://localhost:26657",
    //     chain_id: "integration"
    // });
});

describe('a suite', () => {
    it('should pass', () => {
        expect(true).to.be.true
    })
});

