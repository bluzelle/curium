import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.nft";
export interface Nft {
    creator: string;
    id: number;
    mime: string;
    meta: string;
}
export declare const Nft: {
    encode(message: Nft, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Nft;
    fromJSON(object: any): Nft;
    toJSON(message: Nft): unknown;
    fromPartial(object: DeepPartial<Nft>): Nft;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=nft.d.ts.map