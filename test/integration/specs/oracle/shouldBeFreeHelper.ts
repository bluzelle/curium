import {getBzClient} from "../../helpers/bluzelle-client";
import {passThroughAwait} from "promise-passthrough";
import {expect} from 'chai'

export const testShouldBeFree = (msgName: string, fn: (API) => Promise<unknown>) =>
    it(`message ${msgName} should be free`, () =>
        getBzClient().getBNT({ubnt: true})
            .then(passThroughAwait(() => fn(getBzClient())))
            .then(async (ubnt) => expect(await getBzClient().getBNT({ubnt: true})).to.equal(ubnt))
    )