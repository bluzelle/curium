import {Daemon} from "../control/Daemon";
import {expect} from 'chai'

describe('blzcli', function()  {
    this.timeout(20000);
    let daemon: Daemon;
    beforeEach(async () => {
        await Daemon.stopDaemons();
        daemon = await Daemon.startDaemon('daemon1');
    });

    describe('status', () => {
        it('should return the status of a running daemon', async () => {
            const status = await daemon.exec('blzcli status');
            expect(status.node_info.network).to.equal('integration');
            expect(status.node_info.version).to.match(/^[0-9.]*$/)
        })
    })
});