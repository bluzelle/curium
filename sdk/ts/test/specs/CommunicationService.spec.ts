import {testHook} from '../../src/client-lib/CommunicationService'
import {expect} from 'chai'

describe('getDelayBetweenRequests', () => {
    it('should set the delay to 200 for small queues', () => {
        expect(testHook.getDelayBetweenRequests(400, 'http://anything')).to.equal(200);
    });

    it('should set the delay to 200 for small queues to localhost', () => {
        expect(testHook.getDelayBetweenRequests(400, 'http://localhost')).to.equal(200);
    })

    it('should set the delay to 1000 for localhost with a big queue', () => {
        expect(testHook.getDelayBetweenRequests(1000000, 'http://localhost')).to.equal(1000);
    });

    it('should set the delay to 3000 for large queues', () => {
        expect(testHook.getDelayBetweenRequests(1000000, 'http://somewhere')).to.equal(3000);
    })
})