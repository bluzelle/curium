import {BLOCK, blzcli, STANDARD_GAS} from "../helpers/blzcli";
import {getBzClient} from "./oracle/bluzelle-client";
import {passThroughAwait} from "promise-passthrough";
import {expect} from 'chai'
import {addSource} from "./oracle/oracle-utils";

describe('Ante handler tests', () => {
    it("should charge for regular transactions", async () => {
        await shouldCharge(
            (bz) => bz.upsert('foo', 'bar', {gas_price: 0.002, max_gas: 10000000})
        )
    });

    it('should not charge for oracle transactions', async () => {
        await shouldBeFree(
            (bz) => addSource(bz, 'my-source', 'my-url', 'my-property', bz.address)
        )
    });

})

type CheckFn = (number) => number
const shouldCharge = (fn: (API) => Promise<unknown>, checkFn: CheckFn = (x) => x) =>
    getBzClient().getBNT({ubnt: true})
        .then(passThroughAwait(() => fn(getBzClient())))
        .then(async (before) =>
            expect(await getBzClient().getBNT({ubnt: true}))
                .to.be.lessThan(checkFn(before))
        )

const shouldBeFree = (fn: (API) => Promise<unknown>) =>
    getBzClient().getBNT({ubnt: true})
        .then(passThroughAwait(() => fn(getBzClient())))
        .then(async (before) =>
            expect(await getBzClient().getBNT({ubnt: true}))
                .to.equal(before)
        )