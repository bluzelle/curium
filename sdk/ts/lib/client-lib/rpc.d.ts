/// <reference types="lodash" />
import { CommunicationService } from "./CommunicationService";
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
export declare const mnemonicToAddress: ((mnemonic: string) => Promise<string>) & import("lodash").MemoizedFunction;
//# sourceMappingURL=rpc.d.ts.map