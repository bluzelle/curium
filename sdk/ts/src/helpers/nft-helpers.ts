import {MsgCreateNft, MsgCreateNftResponse} from "../codec/nft/tx";
import {NftSdk} from "../bz-sdk/bz-sdk";
import {passThroughAwait} from "promise-passthrough";
import {createHash} from "crypto";
import delay from "delay";
// @ts-ignore
import fetch from 'node-fetch'

export type UploadNFTParams = Omit<MsgCreateNft, "creator" | "id" | "host">
export type ChunkCallback = (chunk: number, length: number) => unknown

export interface NftHelpers {
    uploadNft: (params: UploadNFTParams, data: Uint8Array, cb?: ChunkCallback) => Promise<MsgCreateNftResponse>
}

export const nftHelpers = (sdk: NftSdk) => ({
    uploadNft: uploadNft(sdk)
})

const uploadNft = (nft: NftSdk) => (params: UploadNFTParams, data: Uint8Array): Promise<MsgCreateNftResponse> => {
    const hash = createHash("sha256")
        .update(data)
        .digest("hex")
    return fetch(`${nft.url.replace('26657', '1317')}/nft/upload/${hash}`, {
        method: 'POST',
        body: data,
    })
        .then(() => nft.tx.CreateNft({
            id: hash,
            creator: nft.address,
            host: nft.url,
            ...params
        }))
        .then(passThroughAwait(waitForFullReplication(nft)))
        .then(passThroughAwait(({id}: MsgCreateNftResponse) => nft.tx.PublishFile({id: id, creator: nft.address})))
};

const waitForFullReplication = (nft: NftSdk) => ({id}: MsgCreateNftResponse): Promise<unknown> =>
       nft.q.IsNftFullyReplicated({id})
        .then(response => response.isReplicated ? (
            true
        ):(
            delay(500)
                .then(() => waitForFullReplication(nft)({id}))
        ))







