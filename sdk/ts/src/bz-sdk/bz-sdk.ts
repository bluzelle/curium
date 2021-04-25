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

import {newCommunicationService} from "../client-lib/CommunicationService";

export type DbSdk = SDK<CrudQueryClientImpl, CrudMsgClientImpl>
export type NftSdk = SDK<NftQueryClientImpl, NftMsgClientImpl>
export type BankSdk = SDK<BankQueryClientImpl, BankMsgClientImpl>
export type StakingSdk = SDK<StakingQueryClientImpl, StakingMsgClientImpl>
export type BluzelleSdk = { db: DbSdk, nft: NftSdk, bank: BankSdk, staking: StakingSdk}

export const bluzelle = (options: SDKOptions): Promise<BluzelleSdk> =>
    Promise.resolve(newCommunicationService(options.url, options.mnemonic || ''))
        .then(cs => Promise.all([
                sdk<CrudQueryClientImpl, CrudMsgClientImpl>(options, CrudQueryClientImpl, CrudMsgClientImpl, CrudMsgTypes, cs),
            sdk<NftQueryClientImpl, NftMsgClientImpl>(options, NftQueryClientImpl, NftMsgClientImpl, NftMsgTypes, cs),
            sdk<BankQueryClientImpl, BankMsgClientImpl>(options, BankQueryClientImpl, BankMsgClientImpl, BankMsgTypes, cs),
            sdk<StakingQueryClientImpl, StakingMsgClientImpl>(options, StakingQueryClientImpl, StakingMsgClientImpl, StakingMsgTypes, cs),
            ])
        )
        .then(([db, nft, bank, staking]) => ({
            db, nft, bank, staking
        }))

// Promise.resolve(bluzelle({
//     mnemonic: "focus ill drift swift blood bitter move grace ensure diamond year tongue hint weekend bulb rebel avoid gas dose print remove receive yellow shoot",
//     url: "http://localhost:26657",
//     gasPrice: 0.002,
//     maxGas: 1000000
// }))
//     .then(sdk => sdk.staking.q.Pool({}))
//     .then(x => x)

    // .then(sdk => sdk.bank.q.Balance({address: "bluzelle13cpvky4s7e825ddwme4xh9g7ynxa4yes5uca7e", denom: "ubnt"}))
//     .then(passThroughAwait(sdk => sdk.db.tx.Create({
//         uuid: 'uuid2',
//         key: 'foo',
//         value: new TextEncoder().encode('bar'),
//         creator: sdk.db.address,
//         lease: Long.fromInt(10),
//         metadata: new Uint8Array()
//     })))
//     .then(sdk => sdk.db.q.CrudValue({
//         uuid: 'uuid2',
//         key: 'foo'
//     }))
//     .then(x => x);
