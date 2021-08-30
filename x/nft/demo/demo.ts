import {bluzelle, uploadNft} from "bluzelle";
import {sha256} from "js-sha256";

Promise.resolve({
    bz: bluzelle({
        mnemonic: '',
        endpoint: 'http://localhost:1327',
        uuid: ''
    }),
    data: new TextEncoder().encode('some nft data'),
    id: 'any-id'
})
    .then(ctx => ({...ctx, hash: sha256(ctx.data)}))
    .then(ctx =>
        ctx.bz.createNft({
            id: ctx.id,
            hash: ctx.hash,
            vendor: 'customer',
            userId: 'user-id',
            mime: 'text/txt',
            meta: 'meta',
            size: ctx.data.byteLength,
            gasInfo: {max_gas: 100_000_000, gas_price: 0.002}
        })
            .then(resp => ({...ctx, token: resp.token}))
    )
    .then(ctx => uploadNft(ctx.bz.url, ctx.data, ctx.token, 'customer'))

