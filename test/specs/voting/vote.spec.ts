import {expect} from 'chai'
import {bluzelle} from "@bluzelle/db-js";
import {getBzClient, sendVoteMessage} from "../../src/testClient";

describe('vote specs', () => {
    it('should work', () => {
        const bz = getBzClient();
        return sendVoteMessage(bz)
            .then(x => x)
    });
});