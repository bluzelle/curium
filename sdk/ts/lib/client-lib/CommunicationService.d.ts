import { GasInfo } from "../legacyAdapter/types/GasInfo";
import { Message } from "../legacyAdapter/types/Message";
import { SigningStargateClient } from "@cosmjs/stargate";
interface MessageQueueItem<T> {
    message: Message<T>;
    gasInfo: GasInfo;
}
export interface CommunicationService {
    mnemonic: string;
    url: string;
    seq: number;
    account: number;
    accountRequested?: Promise<unknown>;
    transactionMessageQueue?: TransactionMessageQueue;
}
interface TransactionMessageQueue {
    memo: string;
    items: MessageQueueItem<unknown>[];
}
export interface WithTransactionsOptions {
    memo: string;
}
export declare const mnemonicToAddress: (mnemonic: string) => Promise<string>;
export declare const newCommunicationService: (url: string, mnemonic: string) => {
    url: string;
    mnemonic: string;
    seq: number;
    account: number;
};
export declare const withTransaction: <T>(service: CommunicationService, fn: () => T, { memo }: WithTransactionsOptions) => Promise<Uint8Array>;
export declare const sendMessage: <T, R>(ctx: CommunicationService, message: Message<T>, gasInfo: GasInfo) => Promise<Uint8Array>;
export declare const getClient: (service: CommunicationService) => Promise<SigningStargateClient>;
export declare const testHook: {
    getDelayBetweenRequests: (length: number, url: string) => number;
};
export {};
//# sourceMappingURL=CommunicationService.d.ts.map