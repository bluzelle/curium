import { QueryClientImpl } from "./codec/crud/query";
import { MsgClientImpl } from "./codec/crud/tx";
export interface SDKOptions {
    mnemonic?: string;
    url: string;
    gasPrice: number;
    maxGas: number;
}
export interface SDK {
    q: QueryClientImpl;
    tx: MsgClientImpl;
    address: string;
    withTransaction: (fn: () => unknown, options: {
        memo: string;
    }) => unknown;
}
export declare const sdk: (options: SDKOptions) => Promise<SDK>;
//# sourceMappingURL=rpc.d.ts.map