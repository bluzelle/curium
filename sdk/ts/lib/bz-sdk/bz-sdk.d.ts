import { SDK, SDKOptions } from "../client-lib/rpc";
import { QueryClientImpl as CrudQueryClientImpl } from "../codec/crud/query";
import { MsgClientImpl as CrudMsgClientImpl } from "../codec/crud/tx";
import { QueryClientImpl as NftQueryClientImpl } from "../codec/nft/query";
import { MsgClientImpl as NftMsgClientImpl } from "../codec/nft/tx";
import { QueryClientImpl as BankQueryClientImpl } from '../codec/cosmos/bank/v1beta1/query';
import { MsgClientImpl as BankMsgClientImpl } from '../codec/cosmos/bank/v1beta1/tx';
export declare type DbSdk = SDK<CrudQueryClientImpl, CrudMsgClientImpl>;
export declare type NftSdk = SDK<NftQueryClientImpl, NftMsgClientImpl>;
export declare type BankSdk = SDK<BankQueryClientImpl, BankMsgClientImpl>;
export declare type BluzelleSdk = {
    db: DbSdk;
    nft: NftSdk;
    bank: BankSdk;
};
export declare const bluzelle: (options: SDKOptions) => Promise<BluzelleSdk>;
//# sourceMappingURL=bz-sdk.d.ts.map