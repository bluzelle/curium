import {SDK, sdk, SDKOptions} from "../client-lib/rpc";

import {QueryClientImpl as CrudQueryClientImpl} from "../codec/crud/query";
import {MsgClientImpl as CrudMsgClientImpl} from "../codec/crud/tx";
import * as CrudMsgTypes from "../codec/crud/tx";

import {QueryClientImpl as NftQueryClientImpl} from "../codec/nft/query";
import {MsgClientImpl as NftMsgClientImpl} from "../codec/nft/tx";
import * as NftMsgTypes from "../codec/nft/tx";

import {QueryClientImpl as BankQueryClientImpl} from '../codec/cosmos/bank/v1beta1/query'
import {MsgClientImpl as BankMsgClientImpl} from '../codec/cosmos/bank/v1beta1/tx'
import * as BankMsgTypes from '../codec/cosmos/bank/v1beta1/tx'

import {QueryClientImpl as StakingQueryClientImpl} from '../codec/cosmos/staking/v1beta1/query'
import {MsgClientImpl as StakingMsgClientImpl} from '../codec/cosmos/staking/v1beta1/tx'
import * as StakingMsgTypes from '../codec/cosmos/staking/v1beta1/tx'

import {QueryClientImpl as DistributionQueryClientImpl} from '../codec/cosmos/distribution/v1beta1/query'
import {MsgClientImpl as DistributionMsgClientImpl} from '../codec/cosmos/distribution/v1beta1/tx'
import * as DistributionMsgTypes from '../codec/cosmos/distribution/v1beta1/tx'



import {newCommunicationService} from "../client-lib/CommunicationService";
import {Left, Right} from "monet";
import {entropyToMnemonic, generateMnemonic} from "bip39";
import {SdkHelpers, sdkHelpers} from "../helpers/helpers";




export type DbSdk = SDK<CrudQueryClientImpl, CrudMsgClientImpl>
export type NftSdk = SDK<NftQueryClientImpl, NftMsgClientImpl>
export type BankSdk = SDK<BankQueryClientImpl, BankMsgClientImpl>
export type StakingSdk = SDK<StakingQueryClientImpl, StakingMsgClientImpl>
export type DistributionSdk = SDK<DistributionQueryClientImpl, DistributionMsgClientImpl>

export type BluzelleSdk = { db: DbSdk, nft: NftSdk, bank: BankSdk, staking: StakingSdk, distribution: DistributionSdk }
export interface Bluzelle {
    (options: SDKOptions): Promise<BluzelleSdk>,
    newMnemonic: (entropy?: string) => string,
    helpers: SdkHelpers
}

export const bluzelle = (options: SDKOptions): Promise<BluzelleSdk> =>
    Promise.resolve(newCommunicationService(options.url, options.mnemonic || '', options.legacyCoin ? "m/44'/118'/0'/0/0": "m/44'/483'/0'/0/0"))
        .then(cs => Promise.all([
                sdk<CrudQueryClientImpl, CrudMsgClientImpl>(options, CrudQueryClientImpl, CrudMsgClientImpl, CrudMsgTypes, cs),
                sdk<NftQueryClientImpl, NftMsgClientImpl>(options, NftQueryClientImpl, NftMsgClientImpl, NftMsgTypes, cs),
                sdk<BankQueryClientImpl, BankMsgClientImpl>(options, BankQueryClientImpl, BankMsgClientImpl, BankMsgTypes, cs),
                sdk<StakingQueryClientImpl, StakingMsgClientImpl>(options, StakingQueryClientImpl, StakingMsgClientImpl, StakingMsgTypes, cs),
                sdk<DistributionQueryClientImpl, DistributionMsgClientImpl>(options, DistributionQueryClientImpl, DistributionMsgClientImpl, DistributionMsgTypes, cs)
            ])
        )
        .then(([
                   db,
                   nft,
                   bank,
                   staking,
                    distribution
               ]) => ({
            db,
            nft,
            bank,
            staking,
            distribution
               } as BluzelleSdk))

bluzelle.newMnemonic = newMnemonic;
bluzelle.helpers = sdkHelpers;


export function newMnemonic(entropy: string = '' ): string {
    return Right<string, string>(entropy)
        .flatMap(entropy => entropy.length === 0 || entropy.length === 64 ? Right(entropy) : Left(entropy))
        .map(entropy => entropy ? entropyToMnemonic(entropy as string) : generateMnemonic(256))
        .leftMap(() => console.log("Entropy must be 64 char hex"))
        .cata(() => 'Invalid entropy', mnemonic => mnemonic)
}
