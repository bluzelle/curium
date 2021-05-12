import { SDKOptions } from "./rpc";
import { AccountResult } from "../legacyAdapter/types/cosmos/AccountResult";
export interface CosmosAccount {
    getBNT: ({ ubnt, address }: {
        ubnt?: boolean;
        address?: string;
    }) => Promise<number>;
    getAccount: (address?: string) => Promise<AccountResult>;
    isExistingAccount: () => Promise<boolean>;
}
export declare const account: (options: SDKOptions) => Promise<CosmosAccount>;
//# sourceMappingURL=cosmos.d.ts.map