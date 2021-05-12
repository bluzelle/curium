import {bluzelle} from "@bluzelle/sdk-js";
import {passThroughAwait} from "promise-passthrough";

const uuid = Date.now().toString()

bluzelle({
    mnemonic: "category health dinner question raise one home melt forum end nice good crucial turtle version talent resource whip provide ski boy athlete express fury",
    url: 'http://localhost:26657',
    maxGas: 100000000,
    gasPrice: 0.002
})
    .then(passThroughAwait(bz => bz.db.withTransaction(() => [1, 2, 3].map(n =>
            bz.db.tx.Create({
                creator: bz.db.address,
                metadata: new Uint8Array(),
                uuid,
                key: `my-key-${n}`,
                lease: {
                    seconds: 0,
                    minutes: 1,
                    hours: 0,
                    days: 0,
                    years: 0
                },
                value: new TextEncoder().encode('my-value'),
            }))
        , {memo: ''})))
    .then(bz => Promise.all([1, 2, 3].map(n =>
        bz.db.q.CrudValue({
            uuid,
            key: `my-key-${n}`,
        })
    )))
    .then(results => results.map(r => [r.CrudValue.key, new TextDecoder().decode(r.CrudValue.value)]))
    .then(console.log)