/// <reference types="node" />
import { BluzelleSdk } from "@bluzelle/sdk-js";
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
export declare const makeCliDir: () => Promise<void>;
//# sourceMappingURL=sdk-helpers.d.ts.map