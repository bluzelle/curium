import { AccountResult } from "../legacyAdapter/types/cosmos/AccountResult";
import { CommunicationService } from "./CommunicationService";
export interface CosmosAccount {
    getBNT: ({ ubnt, address }: {
        ubnt?: boolean;
        address?: string;
    }) => Promise<number>;
    getAccount: (address?: string) => Promise<AccountResult>;
    isExistingAccount: () => Promise<boolean>;
}
export declare const account: (ctx: CommunicationService) => Promise<CosmosAccount>;
//# sourceMappingURL=cosmos.d.ts.map