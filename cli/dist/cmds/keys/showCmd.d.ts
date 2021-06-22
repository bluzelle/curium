import { Argv } from "yargs";
export declare const command = "show <user>";
export declare const desc = "Show key info of specified user or bluzelle address";
export declare const builder: (yargs: Argv) => Argv<{
    user: string | undefined;
}>;
export declare const handler: (argv: {
    user: string;
}) => Promise<never>;
//# sourceMappingURL=showCmd.d.ts.map