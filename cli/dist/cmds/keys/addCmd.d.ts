import { Argv } from "yargs";
export declare const command = "add <user>";
export declare const desc = "Add key to local system and generate mnemonic";
export declare const builder: (yargs: Argv) => Argv<{
    recover: boolean;
} & {
    user: string | undefined;
}>;
export declare const handler: (argv: {
    user: string;
    recover: boolean;
}) => Promise<void>;
export declare const promptForMnemonic: (recover: boolean) => Promise<string>;
//# sourceMappingURL=addCmd.d.ts.map