import Long from "long";
import _m0 from "protobufjs/minimal";
import { Lease } from "../crud/lease";
import { KeyValue } from "../crud/KeyValue";
export declare const protobufPackage = "bluzelle.curium.crud";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgRename {
    creator: string;
    uuid: string;
    key: string;
    newKey: string;
}
export interface MsgRenameResponse {
}
export interface MsgMultiUpdate {
    creator: string;
    uuid: string;
    keyValues: KeyValue[];
}
export interface MsgMultiUpdateResponse {
}
export interface MsgDeleteAll {
    creator: string;
    uuid: string;
}
export interface MsgDeleteAllResponse {
}
export interface MsgKeyValues {
    creator: string;
    uuid: string;
}
export interface MsgKeyValuesResponse {
    keyValues: KeyValue[];
}
export interface MsgHas {
    creator: string;
    uuid: string;
    key: string;
}
export interface MsgHasResponse {
    has: boolean;
}
export interface MsgGetLease {
    creator: string;
    uuid: string;
    key: string;
}
export interface MsgGetLeaseResponse {
    uuid: string;
    key: string;
    leaseBlocks: Long;
}
export interface MsgRead {
    creator: string;
    uuid: string;
    key: string;
}
export interface MsgReadResponse {
    value: Uint8Array;
    key: string;
}
export interface MsgUpsert {
    creator: string;
    uuid: string;
    key: string;
    value: Uint8Array;
    lease?: Lease;
    metadata: Uint8Array;
}
export interface MsgUpsertResponse {
}
export interface MsgCreate {
    creator: string;
    uuid: string;
    key: string;
    value: Uint8Array;
    lease?: Lease;
    metadata: Uint8Array;
}
export interface MsgCreateResponse {
}
export interface MsgUpdate {
    creator: string;
    uuid: string;
    key: string;
    value: Uint8Array;
    lease?: Lease;
    metadata: Uint8Array;
}
export interface MsgUpdateResponse {
}
export interface MsgDelete {
    creator: string;
    uuid: string;
    key: string;
}
export interface MsgDeleteResponse {
}
export declare const MsgRename: {
    encode(message: MsgRename, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgRename;
    fromJSON(object: any): MsgRename;
    toJSON(message: MsgRename): unknown;
    fromPartial(object: DeepPartial<MsgRename>): MsgRename;
};
export declare const MsgRenameResponse: {
    encode(_: MsgRenameResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgRenameResponse;
    fromJSON(_: any): MsgRenameResponse;
    toJSON(_: MsgRenameResponse): unknown;
    fromPartial(_: DeepPartial<MsgRenameResponse>): MsgRenameResponse;
};
export declare const MsgMultiUpdate: {
    encode(message: MsgMultiUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgMultiUpdate;
    fromJSON(object: any): MsgMultiUpdate;
    toJSON(message: MsgMultiUpdate): unknown;
    fromPartial(object: DeepPartial<MsgMultiUpdate>): MsgMultiUpdate;
};
export declare const MsgMultiUpdateResponse: {
    encode(_: MsgMultiUpdateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgMultiUpdateResponse;
    fromJSON(_: any): MsgMultiUpdateResponse;
    toJSON(_: MsgMultiUpdateResponse): unknown;
    fromPartial(_: DeepPartial<MsgMultiUpdateResponse>): MsgMultiUpdateResponse;
};
export declare const MsgDeleteAll: {
    encode(message: MsgDeleteAll, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDeleteAll;
    fromJSON(object: any): MsgDeleteAll;
    toJSON(message: MsgDeleteAll): unknown;
    fromPartial(object: DeepPartial<MsgDeleteAll>): MsgDeleteAll;
};
export declare const MsgDeleteAllResponse: {
    encode(_: MsgDeleteAllResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDeleteAllResponse;
    fromJSON(_: any): MsgDeleteAllResponse;
    toJSON(_: MsgDeleteAllResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteAllResponse>): MsgDeleteAllResponse;
};
export declare const MsgKeyValues: {
    encode(message: MsgKeyValues, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgKeyValues;
    fromJSON(object: any): MsgKeyValues;
    toJSON(message: MsgKeyValues): unknown;
    fromPartial(object: DeepPartial<MsgKeyValues>): MsgKeyValues;
};
export declare const MsgKeyValuesResponse: {
    encode(message: MsgKeyValuesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgKeyValuesResponse;
    fromJSON(object: any): MsgKeyValuesResponse;
    toJSON(message: MsgKeyValuesResponse): unknown;
    fromPartial(object: DeepPartial<MsgKeyValuesResponse>): MsgKeyValuesResponse;
};
export declare const MsgHas: {
    encode(message: MsgHas, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgHas;
    fromJSON(object: any): MsgHas;
    toJSON(message: MsgHas): unknown;
    fromPartial(object: DeepPartial<MsgHas>): MsgHas;
};
export declare const MsgHasResponse: {
    encode(message: MsgHasResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgHasResponse;
    fromJSON(object: any): MsgHasResponse;
    toJSON(message: MsgHasResponse): unknown;
    fromPartial(object: DeepPartial<MsgHasResponse>): MsgHasResponse;
};
export declare const MsgGetLease: {
    encode(message: MsgGetLease, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgGetLease;
    fromJSON(object: any): MsgGetLease;
    toJSON(message: MsgGetLease): unknown;
    fromPartial(object: DeepPartial<MsgGetLease>): MsgGetLease;
};
export declare const MsgGetLeaseResponse: {
    encode(message: MsgGetLeaseResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgGetLeaseResponse;
    fromJSON(object: any): MsgGetLeaseResponse;
    toJSON(message: MsgGetLeaseResponse): unknown;
    fromPartial(object: DeepPartial<MsgGetLeaseResponse>): MsgGetLeaseResponse;
};
export declare const MsgRead: {
    encode(message: MsgRead, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgRead;
    fromJSON(object: any): MsgRead;
    toJSON(message: MsgRead): unknown;
    fromPartial(object: DeepPartial<MsgRead>): MsgRead;
};
export declare const MsgReadResponse: {
    encode(message: MsgReadResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgReadResponse;
    fromJSON(object: any): MsgReadResponse;
    toJSON(message: MsgReadResponse): unknown;
    fromPartial(object: DeepPartial<MsgReadResponse>): MsgReadResponse;
};
export declare const MsgUpsert: {
    encode(message: MsgUpsert, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpsert;
    fromJSON(object: any): MsgUpsert;
    toJSON(message: MsgUpsert): unknown;
    fromPartial(object: DeepPartial<MsgUpsert>): MsgUpsert;
};
export declare const MsgUpsertResponse: {
    encode(_: MsgUpsertResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpsertResponse;
    fromJSON(_: any): MsgUpsertResponse;
    toJSON(_: MsgUpsertResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpsertResponse>): MsgUpsertResponse;
};
export declare const MsgCreate: {
    encode(message: MsgCreate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgCreate;
    fromJSON(object: any): MsgCreate;
    toJSON(message: MsgCreate): unknown;
    fromPartial(object: DeepPartial<MsgCreate>): MsgCreate;
};
export declare const MsgCreateResponse: {
    encode(_: MsgCreateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgCreateResponse;
    fromJSON(_: any): MsgCreateResponse;
    toJSON(_: MsgCreateResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateResponse>): MsgCreateResponse;
};
export declare const MsgUpdate: {
    encode(message: MsgUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpdate;
    fromJSON(object: any): MsgUpdate;
    toJSON(message: MsgUpdate): unknown;
    fromPartial(object: DeepPartial<MsgUpdate>): MsgUpdate;
};
export declare const MsgUpdateResponse: {
    encode(_: MsgUpdateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpdateResponse;
    fromJSON(_: any): MsgUpdateResponse;
    toJSON(_: MsgUpdateResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateResponse>): MsgUpdateResponse;
};
export declare const MsgDelete: {
    encode(message: MsgDelete, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDelete;
    fromJSON(object: any): MsgDelete;
    toJSON(message: MsgDelete): unknown;
    fromPartial(object: DeepPartial<MsgDelete>): MsgDelete;
};
export declare const MsgDeleteResponse: {
    encode(_: MsgDeleteResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDeleteResponse;
    fromJSON(_: any): MsgDeleteResponse;
    toJSON(_: MsgDeleteResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteResponse>): MsgDeleteResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    Rename(request: MsgRename): Promise<MsgRenameResponse>;
    MultiUpdate(request: MsgMultiUpdate): Promise<MsgMultiUpdateResponse>;
    DeleteAll(request: MsgDeleteAll): Promise<MsgDeleteAllResponse>;
    KeyValues(request: MsgKeyValues): Promise<MsgKeyValuesResponse>;
    Has(request: MsgHas): Promise<MsgHasResponse>;
    GetLease(request: MsgGetLease): Promise<MsgGetLeaseResponse>;
    Read(request: MsgRead): Promise<MsgReadResponse>;
    Upsert(request: MsgUpsert): Promise<MsgUpsertResponse>;
    Create(request: MsgCreate): Promise<MsgCreateResponse>;
    Update(request: MsgUpdate): Promise<MsgUpdateResponse>;
    Delete(request: MsgDelete): Promise<MsgDeleteResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Rename(request: MsgRename): Promise<MsgRenameResponse>;
    MultiUpdate(request: MsgMultiUpdate): Promise<MsgMultiUpdateResponse>;
    DeleteAll(request: MsgDeleteAll): Promise<MsgDeleteAllResponse>;
    KeyValues(request: MsgKeyValues): Promise<MsgKeyValuesResponse>;
    Has(request: MsgHas): Promise<MsgHasResponse>;
    GetLease(request: MsgGetLease): Promise<MsgGetLeaseResponse>;
    Read(request: MsgRead): Promise<MsgReadResponse>;
    Upsert(request: MsgUpsert): Promise<MsgUpsertResponse>;
    Create(request: MsgCreate): Promise<MsgCreateResponse>;
    Update(request: MsgUpdate): Promise<MsgUpdateResponse>;
    Delete(request: MsgDelete): Promise<MsgDeleteResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=tx.d.ts.map