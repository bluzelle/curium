import {MsgCreateNft, MsgCreateNftResponse} from "../codec/nft/tx";
import {NftSdk} from "../bz-sdk/bz-sdk";
import {passThroughAwait} from "promise-passthrough";
import {createHash} from "crypto";
import delay from "delay";

export type UploadNFTParams = Omit<MsgCreateNft, "creator" | "id">
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
        mode: 'cors'
    })
        .then(() => nft.tx.CreateNft({
            id: hash,
            creator: nft.address,
            ...params
        }))
        .then(passThroughAwait(waitForFullReplication(nft)))
};

const waitForFullReplication = (nft: NftSdk) => ({id}: MsgCreateNftResponse): Promise<unknown> =>
    delay(500)
        .then(() => nft.q.IsNftFullyReplicated({id}))
        .then(response => response.isReplicated ? true : waitForFullReplication(nft)({id}))







