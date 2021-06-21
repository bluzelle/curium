/// <reference types="node" />
import { BluzelleSdk } from "@bluzelle/sdk-js";
import { AccountData } from "@cosmjs/proto-signing";
export declare type Flags = {
    from: string;
    gas: number;
    gasPrice: string;
    node: string;
};
export declare const getSdkByName: (name: string, gasPrice: string, gas: number, url: string) => Promise<BluzelleSdk>;
export declare const getQuerySdk: (url: string) => Promise<BluzelleSdk>;
export declare const decodeBufferFromFile: (buf: Buffer) => Promise<string>;
export declare const readUserMnemonic: (user: string) => Promise<string>;
export declare const encryptMnemonic: (mnemonic: string) => Promise<string>;
export declare const decryptMnemonic: (mnemonic: string) => Promise<string>;
export declare const createUserFile: (user: string, mnemonic: string) => Promise<void>;
declare type DecodedAccountInfo = Omit<AccountData, 'pubkey'> & {
    pubkey: string;
};
export declare const makeCliDir: () => Promise<void>;
export declare const readCliDir: () => Promise<DecodedAccountInfo[]>;
export {};
//# sourceMappingURL=sdk-helpers.d.ts.map