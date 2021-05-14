import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.crud";
export interface KeyValue {
    key: string;
    value: Uint8Array;
}
export declare const KeyValue: {
    encode(message: KeyValue, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): KeyValue;
    fromJSON(object: any): KeyValue;
    toJSON(message: KeyValue): unknown;
    fromPartial(object: DeepPartial<KeyValue>): KeyValue;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=KeyValue.d.ts.map