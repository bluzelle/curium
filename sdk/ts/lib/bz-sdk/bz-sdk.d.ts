import { SDK, SDKOptions } from "../client-lib/rpc";
import { QueryClientImpl as CrudQueryClientImpl } from "../codec/crud/query";
import { MsgClientImpl as CrudMsgClientImpl } from "../codec/crud/tx";
import { QueryClientImpl as NftQueryClientImpl } from "../codec/nft/query";
import { MsgClientImpl as NftMsgClientImpl } from "../codec/nft/tx";
import { QueryClientImpl as BankQueryClientImpl } from '../codec/cosmos/bank/v1beta1/query';
import { MsgClientImpl as BankMsgClientImpl } from '../codec/cosmos/bank/v1beta1/tx';
import { QueryClientImpl as StakingQueryClientImpl } from '../codec/cosmos/staking/v1beta1/query';
import { MsgClientImpl as StakingMsgClientImpl } from '../codec/cosmos/staking/v1beta1/tx';
import { QueryClientImpl as DistributionQueryClientImpl } from '../codec/cosmos/distribution/v1beta1/query';
import { MsgClientImpl as DistributionMsgClientImpl } from '../codec/cosmos/distribution/v1beta1/tx';
import { SdkHelpers } from "../helpers/helpers";
export declare type DbSdk = SDK<CrudQueryClientImpl, CrudMsgClientImpl>;
export declare type NftSdk = SDK<NftQueryClientImpl, NftMsgClientImpl>;
export declare type BankSdk = SDK<BankQueryClientImpl, BankMsgClientImpl>;
export declare type StakingSdk = SDK<StakingQueryClientImpl, StakingMsgClientImpl>;
export declare type DistributionSdk = SDK<DistributionQueryClientImpl, DistributionMsgClientImpl>;
export declare type BluzelleSdk = {
    db: DbSdk;
    nft: NftSdk;
    bank: BankSdk;
    staking: StakingSdk;
    distribution: DistributionSdk;
};
export interface Bluzelle {
    (options: SDKOptions): Promise<BluzelleSdk>;
    newMnemonic: (entropy?: string) => string;
    helpers: SdkHelpers;
}
export declare const bluzelle: {
    (options: SDKOptions): Promise<BluzelleSdk>;
    newMnemonic: typeof newMnemonic;
    helpers: SdkHelpers;
};
export declare function newMnemonic(entropy?: string): string;
//# sourceMappingURL=bz-sdk.d.ts.map