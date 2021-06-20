import {getBz} from "./getBz";
import {Lease} from "@bluzelle/sdk-js/lib/codec/crud/lease";

getBz()
    .then(bz => bz.db.tx.Upsert({
        creator: bz.db.address,
        metadata: new Uint8Array,
        lease: {days: 1} as Lease,
        uuid: 'my-site',
        key: 'dynamic-data.json',
        value: new TextEncoder().encode(JSON.stringify({now: Date.now()}))
    }))