import {BLOCK, blzcli, STANDARD_GAS} from "../helpers/blzcli";
import {getBzClient} from "./oracle/bluzelle-client";
import {passThroughAwait} from "promise-passthrough";
import {expect} from 'chai'

describe('Ante handler tests', () => {
    it("should charge for regular transactions", async () => {
        await shouldCharge(
            () => blzcli('tx send vuser bluzelle1weav4c4j6nyxa5kggghhf7ymu4x0w7caaggcda 1000ubnt -y', STANDARD_GAS, BLOCK),
            x => x - 1000
        )
        await shouldCharge(
            () => blzcli('tx crud upsert uuid foo bar -y --from vuser', STANDARD_GAS, BLOCK)
        )
    });

    it('should not charge for oracle transactions', async () => {
        await shouldBeFree(
            () => blzcli('tx oracle add-source aaa bbb ccc -y --from vuser', STANDARD_GAS, BLOCK)
        )
    });

})

type CheckFn = (number) => number
const shouldCharge = (fn: () => Promise<unknown>, checkFn: CheckFn = (x) => x) =>
    getBzClient().getBNT({ubnt: true})
        .then(passThroughAwait(fn))
        .then(async (before) =>
            expect(await getBzClient().getBNT({ubnt: true}))
                .to.be.lessThan(checkFn(before))
        )

const shouldBeFree = (fn: () => Promise<unknown>) =>
    getBzClient().getBNT({ubnt: true})
        .then(passThroughAwait(fn))
        .then(async (before) =>
            expect(await getBzClient().getBNT({ubnt: true}))
                .to.equal(before)
        )