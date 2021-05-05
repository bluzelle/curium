import { MsgCreateNft, MsgCreateNftResponse } from "../codec/nft/tx";
import { NftSdk } from "../bz-sdk/bz-sdk";
export declare type UploadNFTParams = Omit<MsgCreateNft, "creator" | "id" | "host">;
export declare type ChunkCallback = (chunk: number, length: number) => unknown;
export interface NftHelpers {
    uploadNft: (params: UploadNFTParams, data: Uint8Array, cb?: ChunkCallback) => Promise<MsgCreateNftResponse>;
}
export declare const nftHelpers: (sdk: NftSdk) => {
    uploadNft: (params: UploadNFTParams, data: Uint8Array) => Promise<MsgCreateNftResponse>;
};
//# sourceMappingURL=nft-helpers.d.ts.map