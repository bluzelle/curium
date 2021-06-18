import { Arguments, Argv } from "yargs";
export declare const command = "crud <method>";
export declare const desc = "query crud method";
export declare const builder: (yargs: Argv) => Argv<{
    node: string;
}>;
export declare const handler: (argv: Arguments) => void;
//# sourceMappingURL=qCrudCli.d.ts.map