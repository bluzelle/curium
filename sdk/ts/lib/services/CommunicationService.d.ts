/// <reference types="lodash" />
import { GasInfo } from "../types/GasInfo";
import { API } from "../API";
import { MessageResponse } from "../types/MessageResponse";
import { Message } from "../types/Message";
import { SigningStargateClient } from "@cosmjs/stargate";
interface MessageQueueItem<T> {
    message: Message<T>;
    gasInfo: GasInfo;
}
export interface CommunicationService {
    api: API;
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
export declare const newCommunicationService: (api: API) => {
    api: API;
    seq: number;
    account: number;
};
export declare const withTransaction: <T>(service: CommunicationService, fn: () => T, { memo }: WithTransactionsOptions) => Promise<MessageResponse<T>>;
export declare const sendMessage: <T, R>(ctx: CommunicationService, message: Message<T>, gasInfo: GasInfo) => Promise<MessageResponse<R>>;
export declare const getClient: ((api: API) => Promise<SigningStargateClient>) & import("lodash").MemoizedFunction;
export {};
//# sourceMappingURL=CommunicationService.d.ts.map