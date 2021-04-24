import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.crud";
export interface Lease {
    seconds: number | undefined;
    minutes: number;
    hours: number;
    days: number;
    years: number;
}
export declare const Lease: {
    encode(message: Lease, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Lease;
    fromJSON(object: any): Lease;
    toJSON(message: Lease): unknown;
    fromPartial(object: DeepPartial<Lease>): Lease;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=lease.d.ts.map