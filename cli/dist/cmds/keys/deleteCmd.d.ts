import { Argv } from "yargs";
export declare const command = "delete <user>";
export declare const desc = "Remove key to local system and generate mnemonic";
export declare const builder: (yargs: Argv) => Argv<{
    user: string | undefined;
}>;
export declare const handler: (argv: {
    user: string;
}) => Promise<never>;
//# sourceMappingURL=deleteCmd.d.ts.map