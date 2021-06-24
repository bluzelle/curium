import { Argv } from "yargs";
export declare const command = "show <user>";
export declare const desc = "Show key info of specified user";
export declare const builder: (yargs: Argv) => Argv<{
    user: string | undefined;
} & {
    address: boolean;
}>;
export declare const handler: (argv: {
    user: string;
    address: boolean;
}) => Promise<never>;
//# sourceMappingURL=showCmd.d.ts.map