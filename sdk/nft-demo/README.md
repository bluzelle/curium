This is a demo of the NFT storage protocol using a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The two main files are:

* pages/index.tsx
* pages/api/createNft.ts



index.tsx uses a helper function in the SDK to upload files to a bluzelle sentry node and then sends a call to  /createNFT to your application server which is serviced by createNFT.ts.  The first code uploads the data to the bluzelle node and the second code informs the server that the upload is complete and starts the process to notify all nodes that the file is ready to be replicated.

```typescript
.then(data =>   bluzelle.helpers.nftHelpers.uploadNft("https://client.sentry.testnet.private.bluzelle.com:1317", data as Uint8Array))
            .then(ctx => fetch(`http://localhost:3000/api/createNft`, {
                method: 'POST',
                body: JSON.stringify({
                    hash: ctx.hash,
                    mime: contentType(ev.target.files?.[0].name || '')
                })
```

```typescript
    return getSdk()gy
        .then((sdk: BluzelleSdk) => sdk.nft.tx.CreateNft({
            id: Date.now().toString(),
            hash: body.hash,
            mime: body.mime,
            meta: 'whatever metadata you want',
            creator: sdk.nft.address,
        }))
```

