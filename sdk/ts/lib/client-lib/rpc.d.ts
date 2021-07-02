/// <reference types="lodash" />
import { CommunicationService } from "./CommunicationService";
import { HdPath } from "@cosmjs/crypto";
export interface SDKOptions {
    mnemonic?: string;
    url: string;
    gasPrice: number;
    maxGas: number;
    legacyCoin?: boolean;
}
export interface SDK<Q, M> {
    q: Q;
    tx: M;
    address: string;
    url: string;
    withTransaction: (fn: () => unknown, options: {
        memo: string;
    }) => unknown;
}
export declare const sdk: <Q, M>(options: SDKOptions, qImpl: any, mImpl: any, msgTypes: Record<string, any>, cs: CommunicationService) => Promise<SDK<Q, M>>;
export declare const mnemonicToAddress: ((mnemonic: string, legacyCoin: boolean) => Promise<string>) & import("lodash").MemoizedFunction;
export declare const getHdPaths: (legacyCoin: boolean, index?: number) => HdPath;
//# sourceMappingURL=rpc.d.ts.map