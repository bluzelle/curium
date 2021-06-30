import { Arguments, Argv } from "yargs";
export declare const command = "crud <method>";
export declare const desc = "transaction crud method";
export declare const builder: (yargs: Argv) => Argv<import("yargs").Defined<{
    from: string | undefined;
} & {
    gas: number;
} & {
    "gas-price": string;
} & {
    node: string;
}, "from">>;
export declare const handler: (argv: Arguments) => void;
//# sourceMappingURL=txCrudCli.d.ts.map