import { GasInfo } from "../legacyAdapter/types/GasInfo";
import { MessageResponse } from "../legacyAdapter/types/MessageResponse";
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
export declare const withTransaction: <T>(service: CommunicationService, fn: () => T, { memo }: WithTransactionsOptions) => Promise<MessageResponse<T>>;
export declare const sendMessage: <T, R>(ctx: CommunicationService, message: Message<T>, gasInfo: GasInfo) => Promise<MessageResponse<R>>;
export declare const getClient: (service: CommunicationService) => Promise<SigningStargateClient>;
export {};
//# sourceMappingURL=CommunicationService.d.ts.map