import Long from "long";
import _m0 from "protobufjs/minimal";
import { Lease } from "../hackathon-crud/lease";
export declare const protobufPackage = "bluzelle.curium.crud";
export interface CrudValue {
    creator: string;
    uuid: string;
    key: string;
    value: Uint8Array;
    lease?: Lease;
    height: Long;
    metadata: Uint8Array;
}
export declare const CrudValue: {
    encode(message: CrudValue, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): CrudValue;
    fromJSON(object: any): CrudValue;
    toJSON(message: CrudValue): unknown;
    fromPartial(object: DeepPartial<CrudValue>): CrudValue;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=CrudValue.d.ts.map