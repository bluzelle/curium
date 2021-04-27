// package: cosmos.staking.v1beta1
// file: cosmos/staking/v1beta1/staking.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as cosmos_proto_cosmos_pb from "../../../cosmos_proto/cosmos_pb";
import * as cosmos_base_v1beta1_coin_pb from "../../../cosmos/base/v1beta1/coin_pb";
import * as tendermint_types_types_pb from "../../../tendermint/types/types_pb";

export class HistoricalInfo extends jspb.Message { 

    hasHeader(): boolean;
    clearHeader(): void;
    getHeader(): tendermint_types_types_pb.Header | undefined;
    setHeader(value?: tendermint_types_types_pb.Header): HistoricalInfo;
    clearValsetList(): void;
    getValsetList(): Array<Validator>;
    setValsetList(value: Array<Validator>): HistoricalInfo;
    addValset(value?: Validator, index?: number): Validator;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HistoricalInfo.AsObject;
    static toObject(includeInstance: boolean, msg: HistoricalInfo): HistoricalInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HistoricalInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HistoricalInfo;
    static deserializeBinaryFromReader(message: HistoricalInfo, reader: jspb.BinaryReader): HistoricalInfo;
}

export namespace HistoricalInfo {
    export type AsObject = {
        header?: tendermint_types_types_pb.Header.AsObject,
        valsetList: Array<Validator.AsObject>,
    }
}

export class CommissionRates extends jspb.Message { 
    getRate(): string;
    setRate(value: string): CommissionRates;
    getMaxRate(): string;
    setMaxRate(value: string): CommissionRates;
    getMaxChangeRate(): string;
    setMaxChangeRate(value: string): CommissionRates;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommissionRates.AsObject;
    static toObject(includeInstance: boolean, msg: CommissionRates): CommissionRates.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommissionRates, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommissionRates;
    static deserializeBinaryFromReader(message: CommissionRates, reader: jspb.BinaryReader): CommissionRates;
}

export namespace CommissionRates {
    export type AsObject = {
        rate: string,
        maxRate: string,
        maxChangeRate: string,
    }
}

export class Commission extends jspb.Message { 

    hasCommissionRates(): boolean;
    clearCommissionRates(): void;
    getCommissionRates(): CommissionRates | undefined;
    setCommissionRates(value?: CommissionRates): Commission;

    hasUpdateTime(): boolean;
    clearUpdateTime(): void;
    getUpdateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdateTime(value?: google_protobuf_timestamp_pb.Timestamp): Commission;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Commission.AsObject;
    static toObject(includeInstance: boolean, msg: Commission): Commission.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Commission, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Commission;
    static deserializeBinaryFromReader(message: Commission, reader: jspb.BinaryReader): Commission;
}

export namespace Commission {
    export type AsObject = {
        commissionRates?: CommissionRates.AsObject,
        updateTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class Description extends jspb.Message { 
    getMoniker(): string;
    setMoniker(value: string): Description;
    getIdentity(): string;
    setIdentity(value: string): Description;
    getWebsite(): string;
    setWebsite(value: string): Description;
    getSecurityContact(): string;
    setSecurityContact(value: string): Description;
    getDetails(): string;
    setDetails(value: string): Description;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Description.AsObject;
    static toObject(includeInstance: boolean, msg: Description): Description.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Description, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Description;
    static deserializeBinaryFromReader(message: Description, reader: jspb.BinaryReader): Description;
}

export namespace Description {
    export type AsObject = {
        moniker: string,
        identity: string,
        website: string,
        securityContact: string,
        details: string,
    }
}

export class Validator extends jspb.Message { 
    getOperatorAddress(): string;
    setOperatorAddress(value: string): Validator;

    hasConsensusPubkey(): boolean;
    clearConsensusPubkey(): void;
    getConsensusPubkey(): google_protobuf_any_pb.Any | undefined;
    setConsensusPubkey(value?: google_protobuf_any_pb.Any): Validator;
    getJailed(): boolean;
    setJailed(value: boolean): Validator;
    getStatus(): BondStatus;
    setStatus(value: BondStatus): Validator;
    getTokens(): string;
    setTokens(value: string): Validator;
    getDelegatorShares(): string;
    setDelegatorShares(value: string): Validator;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): Description | undefined;
    setDescription(value?: Description): Validator;
    getUnbondingHeight(): number;
    setUnbondingHeight(value: number): Validator;

    hasUnbondingTime(): boolean;
    clearUnbondingTime(): void;
    getUnbondingTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUnbondingTime(value?: google_protobuf_timestamp_pb.Timestamp): Validator;

    hasCommission(): boolean;
    clearCommission(): void;
    getCommission(): Commission | undefined;
    setCommission(value?: Commission): Validator;
    getMinSelfDelegation(): string;
    setMinSelfDelegation(value: string): Validator;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Validator.AsObject;
    static toObject(includeInstance: boolean, msg: Validator): Validator.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Validator, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Validator;
    static deserializeBinaryFromReader(message: Validator, reader: jspb.BinaryReader): Validator;
}

export namespace Validator {
    export type AsObject = {
        operatorAddress: string,
        consensusPubkey?: google_protobuf_any_pb.Any.AsObject,
        jailed: boolean,
        status: BondStatus,
        tokens: string,
        delegatorShares: string,
        description?: Description.AsObject,
        unbondingHeight: number,
        unbondingTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        commission?: Commission.AsObject,
        minSelfDelegation: string,
    }
}

export class ValAddresses extends jspb.Message { 
    clearAddressesList(): void;
    getAddressesList(): Array<string>;
    setAddressesList(value: Array<string>): ValAddresses;
    addAddresses(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValAddresses.AsObject;
    static toObject(includeInstance: boolean, msg: ValAddresses): ValAddresses.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValAddresses, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValAddresses;
    static deserializeBinaryFromReader(message: ValAddresses, reader: jspb.BinaryReader): ValAddresses;
}

export namespace ValAddresses {
    export type AsObject = {
        addressesList: Array<string>,
    }
}

export class DVPair extends jspb.Message { 
    getDelegatorAddress(): string;
    setDelegatorAddress(value: string): DVPair;
    getValidatorAddress(): string;
    setValidatorAddress(value: string): DVPair;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DVPair.AsObject;
    static toObject(includeInstance: boolean, msg: DVPair): DVPair.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DVPair, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DVPair;
    static deserializeBinaryFromReader(message: DVPair, reader: jspb.BinaryReader): DVPair;
}

export namespace DVPair {
    export type AsObject = {
        delegatorAddress: string,
        validatorAddress: string,
    }
}

export class DVPairs extends jspb.Message { 
    clearPairsList(): void;
    getPairsList(): Array<DVPair>;
    setPairsList(value: Array<DVPair>): DVPairs;
    addPairs(value?: DVPair, index?: number): DVPair;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DVPairs.AsObject;
    static toObject(includeInstance: boolean, msg: DVPairs): DVPairs.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DVPairs, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DVPairs;
    static deserializeBinaryFromReader(message: DVPairs, reader: jspb.BinaryReader): DVPairs;
}

export namespace DVPairs {
    export type AsObject = {
        pairsList: Array<DVPair.AsObject>,
    }
}

export class DVVTriplet extends jspb.Message { 
    getDelegatorAddress(): string;
    setDelegatorAddress(value: string): DVVTriplet;
    getValidatorSrcAddress(): string;
    setValidatorSrcAddress(value: string): DVVTriplet;
    getValidatorDstAddress(): string;
    setValidatorDstAddress(value: string): DVVTriplet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DVVTriplet.AsObject;
    static toObject(includeInstance: boolean, msg: DVVTriplet): DVVTriplet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DVVTriplet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DVVTriplet;
    static deserializeBinaryFromReader(message: DVVTriplet, reader: jspb.BinaryReader): DVVTriplet;
}

export namespace DVVTriplet {
    export type AsObject = {
        delegatorAddress: string,
        validatorSrcAddress: string,
        validatorDstAddress: string,
    }
}

export class DVVTriplets extends jspb.Message { 
    clearTripletsList(): void;
    getTripletsList(): Array<DVVTriplet>;
    setTripletsList(value: Array<DVVTriplet>): DVVTriplets;
    addTriplets(value?: DVVTriplet, index?: number): DVVTriplet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DVVTriplets.AsObject;
    static toObject(includeInstance: boolean, msg: DVVTriplets): DVVTriplets.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DVVTriplets, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DVVTriplets;
    static deserializeBinaryFromReader(message: DVVTriplets, reader: jspb.BinaryReader): DVVTriplets;
}

export namespace DVVTriplets {
    export type AsObject = {
        tripletsList: Array<DVVTriplet.AsObject>,
    }
}

export class Delegation extends jspb.Message { 
    getDelegatorAddress(): string;
    setDelegatorAddress(value: string): Delegation;
    getValidatorAddress(): string;
    setValidatorAddress(value: string): Delegation;
    getShares(): string;
    setShares(value: string): Delegation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Delegation.AsObject;
    static toObject(includeInstance: boolean, msg: Delegation): Delegation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Delegation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Delegation;
    static deserializeBinaryFromReader(message: Delegation, reader: jspb.BinaryReader): Delegation;
}

export namespace Delegation {
    export type AsObject = {
        delegatorAddress: string,
        validatorAddress: string,
        shares: string,
    }
}

export class UnbondingDelegation extends jspb.Message { 
    getDelegatorAddress(): string;
    setDelegatorAddress(value: string): UnbondingDelegation;
    getValidatorAddress(): string;
    setValidatorAddress(value: string): UnbondingDelegation;
    clearEntriesList(): void;
    getEntriesList(): Array<UnbondingDelegationEntry>;
    setEntriesList(value: Array<UnbondingDelegationEntry>): UnbondingDelegation;
    addEntries(value?: UnbondingDelegationEntry, index?: number): UnbondingDelegationEntry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UnbondingDelegation.AsObject;
    static toObject(includeInstance: boolean, msg: UnbondingDelegation): UnbondingDelegation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UnbondingDelegation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UnbondingDelegation;
    static deserializeBinaryFromReader(message: UnbondingDelegation, reader: jspb.BinaryReader): UnbondingDelegation;
}

export namespace UnbondingDelegation {
    export type AsObject = {
        delegatorAddress: string,
        validatorAddress: string,
        entriesList: Array<UnbondingDelegationEntry.AsObject>,
    }
}

export class UnbondingDelegationEntry extends jspb.Message { 
    getCreationHeight(): number;
    setCreationHeight(value: number): UnbondingDelegationEntry;

    hasCompletionTime(): boolean;
    clearCompletionTime(): void;
    getCompletionTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCompletionTime(value?: google_protobuf_timestamp_pb.Timestamp): UnbondingDelegationEntry;
    getInitialBalance(): string;
    setInitialBalance(value: string): UnbondingDelegationEntry;
    getBalance(): string;
    setBalance(value: string): UnbondingDelegationEntry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UnbondingDelegationEntry.AsObject;
    static toObject(includeInstance: boolean, msg: UnbondingDelegationEntry): UnbondingDelegationEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UnbondingDelegationEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UnbondingDelegationEntry;
    static deserializeBinaryFromReader(message: UnbondingDelegationEntry, reader: jspb.BinaryReader): UnbondingDelegationEntry;
}

export namespace UnbondingDelegationEntry {
    export type AsObject = {
        creationHeight: number,
        completionTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        initialBalance: string,
        balance: string,
    }
}

export class RedelegationEntry extends jspb.Message { 
    getCreationHeight(): number;
    setCreationHeight(value: number): RedelegationEntry;

    hasCompletionTime(): boolean;
    clearCompletionTime(): void;
    getCompletionTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCompletionTime(value?: google_protobuf_timestamp_pb.Timestamp): RedelegationEntry;
    getInitialBalance(): string;
    setInitialBalance(value: string): RedelegationEntry;
    getSharesDst(): string;
    setSharesDst(value: string): RedelegationEntry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RedelegationEntry.AsObject;
    static toObject(includeInstance: boolean, msg: RedelegationEntry): RedelegationEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RedelegationEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RedelegationEntry;
    static deserializeBinaryFromReader(message: RedelegationEntry, reader: jspb.BinaryReader): RedelegationEntry;
}

export namespace RedelegationEntry {
    export type AsObject = {
        creationHeight: number,
        completionTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        initialBalance: string,
        sharesDst: string,
    }
}

export class Redelegation extends jspb.Message { 
    getDelegatorAddress(): string;
    setDelegatorAddress(value: string): Redelegation;
    getValidatorSrcAddress(): string;
    setValidatorSrcAddress(value: string): Redelegation;
    getValidatorDstAddress(): string;
    setValidatorDstAddress(value: string): Redelegation;
    clearEntriesList(): void;
    getEntriesList(): Array<RedelegationEntry>;
    setEntriesList(value: Array<RedelegationEntry>): Redelegation;
    addEntries(value?: RedelegationEntry, index?: number): RedelegationEntry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Redelegation.AsObject;
    static toObject(includeInstance: boolean, msg: Redelegation): Redelegation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Redelegation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Redelegation;
    static deserializeBinaryFromReader(message: Redelegation, reader: jspb.BinaryReader): Redelegation;
}

export namespace Redelegation {
    export type AsObject = {
        delegatorAddress: string,
        validatorSrcAddress: string,
        validatorDstAddress: string,
        entriesList: Array<RedelegationEntry.AsObject>,
    }
}

export class Params extends jspb.Message { 

    hasUnbondingTime(): boolean;
    clearUnbondingTime(): void;
    getUnbondingTime(): google_protobuf_duration_pb.Duration | undefined;
    setUnbondingTime(value?: google_protobuf_duration_pb.Duration): Params;
    getMaxValidators(): number;
    setMaxValidators(value: number): Params;
    getMaxEntries(): number;
    setMaxEntries(value: number): Params;
    getHistoricalEntries(): number;
    setHistoricalEntries(value: number): Params;
    getBondDenom(): string;
    setBondDenom(value: string): Params;
    getPowerReduction(): string;
    setPowerReduction(value: string): Params;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Params.AsObject;
    static toObject(includeInstance: boolean, msg: Params): Params.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Params, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Params;
    static deserializeBinaryFromReader(message: Params, reader: jspb.BinaryReader): Params;
}

export namespace Params {
    export type AsObject = {
        unbondingTime?: google_protobuf_duration_pb.Duration.AsObject,
        maxValidators: number,
        maxEntries: number,
        historicalEntries: number,
        bondDenom: string,
        powerReduction: string,
    }
}

export class DelegationResponse extends jspb.Message { 

    hasDelegation(): boolean;
    clearDelegation(): void;
    getDelegation(): Delegation | undefined;
    setDelegation(value?: Delegation): DelegationResponse;

    hasBalance(): boolean;
    clearBalance(): void;
    getBalance(): cosmos_base_v1beta1_coin_pb.Coin | undefined;
    setBalance(value?: cosmos_base_v1beta1_coin_pb.Coin): DelegationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DelegationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DelegationResponse): DelegationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DelegationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DelegationResponse;
    static deserializeBinaryFromReader(message: DelegationResponse, reader: jspb.BinaryReader): DelegationResponse;
}

export namespace DelegationResponse {
    export type AsObject = {
        delegation?: Delegation.AsObject,
        balance?: cosmos_base_v1beta1_coin_pb.Coin.AsObject,
    }
}

export class RedelegationEntryResponse extends jspb.Message { 

    hasRedelegationEntry(): boolean;
    clearRedelegationEntry(): void;
    getRedelegationEntry(): RedelegationEntry | undefined;
    setRedelegationEntry(value?: RedelegationEntry): RedelegationEntryResponse;
    getBalance(): string;
    setBalance(value: string): RedelegationEntryResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RedelegationEntryResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RedelegationEntryResponse): RedelegationEntryResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RedelegationEntryResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RedelegationEntryResponse;
    static deserializeBinaryFromReader(message: RedelegationEntryResponse, reader: jspb.BinaryReader): RedelegationEntryResponse;
}

export namespace RedelegationEntryResponse {
    export type AsObject = {
        redelegationEntry?: RedelegationEntry.AsObject,
        balance: string,
    }
}

export class RedelegationResponse extends jspb.Message { 

    hasRedelegation(): boolean;
    clearRedelegation(): void;
    getRedelegation(): Redelegation | undefined;
    setRedelegation(value?: Redelegation): RedelegationResponse;
    clearEntriesList(): void;
    getEntriesList(): Array<RedelegationEntryResponse>;
    setEntriesList(value: Array<RedelegationEntryResponse>): RedelegationResponse;
    addEntries(value?: RedelegationEntryResponse, index?: number): RedelegationEntryResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RedelegationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RedelegationResponse): RedelegationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RedelegationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RedelegationResponse;
    static deserializeBinaryFromReader(message: RedelegationResponse, reader: jspb.BinaryReader): RedelegationResponse;
}

export namespace RedelegationResponse {
    export type AsObject = {
        redelegation?: Redelegation.AsObject,
        entriesList: Array<RedelegationEntryResponse.AsObject>,
    }
}

export class Pool extends jspb.Message { 
    getNotBondedTokens(): string;
    setNotBondedTokens(value: string): Pool;
    getBondedTokens(): string;
    setBondedTokens(value: string): Pool;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Pool.AsObject;
    static toObject(includeInstance: boolean, msg: Pool): Pool.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Pool, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Pool;
    static deserializeBinaryFromReader(message: Pool, reader: jspb.BinaryReader): Pool;
}

export namespace Pool {
    export type AsObject = {
        notBondedTokens: string,
        bondedTokens: string,
    }
}

export enum BondStatus {
    BOND_STATUS_UNSPECIFIED = 0,
    BOND_STATUS_UNBONDED = 1,
    BOND_STATUS_UNBONDING = 2,
    BOND_STATUS_BONDED = 3,
}
