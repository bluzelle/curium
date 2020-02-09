import {expect} from 'chai'
import {startDaemon, stopDaemons} from "../control/manager";

beforeEach(async () => {
    await stopDaemons();
    await startDaemon('testing')
});

describe('a suite', () => {
    it('should pass', () => {
        expect(true).to.be.true
    })
});