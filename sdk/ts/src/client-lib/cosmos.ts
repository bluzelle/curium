import {mnemonicToAddress, SDKOptions} from "./rpc";
import {AccountResult} from "../legacyAdapter/types/cosmos/AccountResult";
import {memoize} from "lodash";
import {passThrough} from "promise-passthrough";
import {AccountsResult} from "../legacyAdapter/types/cosmos/AccountsResult";
import {CommunicationService} from "./CommunicationService";

const cosmosjs = require('@cosmostation/cosmosjs');

export interface CosmosAccount {
    getBNT: ({ubnt, address}: {ubnt?: boolean, address?: string}) => Promise<number>
    getAccount: (address?: string) => Promise<AccountResult>
    isExistingAccount: () => Promise<boolean>
}

export const account = (ctx: CommunicationService): Promise<CosmosAccount> =>
    Promise.all([
        mnemonicToAddress(ctx.mnemonic || ''),
        getCosmos(ctx.url)
    ])
        .then(([address, cosmos]) => ({
            getBNT: getBNT(address, cosmos),
            getAccount: getAccount(address, cosmos),
            isExistingAccount: isExistingAccount(address, cosmos)
        }))

const getBNT = (userAddress: string, cosmos: any) => ({ubnt, address = userAddress}: {ubnt?: boolean, address?: string}): Promise<number> => {
    return getAccount(address, cosmos)(address)
        .then(a => a.coins[0]?.amount || '0')
        .then(a => ubnt ? a : a.slice(0, -6) || '0')
        .then(parseInt)
}

const getAccount = (userAddress: string, cosmos: any) => (address: string = userAddress): Promise<AccountResult> => {
    return cosmos.getAccounts(address)
        .then((x: AccountsResult) => x.result.value);
}

const isExistingAccount = (address: string, cosmos: any) => (): Promise<boolean> => {
    return getAccount(address, cosmos)(address)
        .then(x => !!x.coins.length)
}

const getCosmos = memoize((url: string): Promise<any> =>
    // url input temporary
    fetch(`http://localhost:1317/node_info`, )
        .then(x => x.json())
        .then(x => x.node_info.network)
        .then(chainId => cosmosjs.network(url, chainId))
        .then(passThrough<any>(cosmos => cosmos.setPath("m/44\'/118\'/0\'/0/0")))
        .then(passThrough<any>(cosmos => cosmos.bech32MainPrefix = 'bluzelle'))
)